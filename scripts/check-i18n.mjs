// Checks the translation files in src/app/i18n:
//  - every language has the same keys as lv.json (plural groups may differ per language)
//  - every {{placeholder}} in Latvian also appears in the translation
//  - every key used in the app's templates and code exists in lv.json
//  - every category in category-names.json has an English and a Russian name
// Run: npm run i18n:check
//
// npm run i18n:categories also loads the categories the live site serves and
// lists any without a translation (add --categories=<url> to use another API).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const I18N_DIR = 'src/app/i18n';
const SOURCE = 'lv';
const LANGS = ['lv', 'en', 'ru'];
// Groups whose children are plural forms (zero/one/few/many/other), chosen per language.
const PLURAL_GROUPS = ['results.items', 'results.shops'];
const PLURAL_FORMS = ['zero', 'one', 'two', 'few', 'many', 'other'];

const load = (lang) => JSON.parse(readFileSync(join(I18N_DIR, `${lang}.json`), 'utf8'));

function flatten(obj, prefix = '', out = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') flatten(value, path, out);
    else out[path] = String(value);
  }
  return out;
}

const isPluralForm = (key) => PLURAL_GROUPS.some((group) => key.startsWith(`${group}.`));
const placeholders = (text) => (text.match(/{{\s*\w+\s*}}/g) ?? []).map((p) => p.replace(/\s/g, '')).sort();

const problems = [];
const source = flatten(load(SOURCE));

for (const lang of LANGS) {
  const strings = flatten(load(lang));
  for (const key of Object.keys(source)) {
    if (isPluralForm(key)) continue;
    if (!(key in strings)) problems.push(`${lang}: missing "${key}"`);
    else if (placeholders(source[key]).join() !== placeholders(strings[key]).join())
      problems.push(`${lang}: placeholders in "${key}" differ from ${SOURCE}`);
  }
  for (const key of Object.keys(strings)) {
    if (!isPluralForm(key) && !(key in source)) problems.push(`${lang}: unknown key "${key}" (not in ${SOURCE}.json)`);
  }
  for (const group of PLURAL_GROUPS) {
    const forms = Object.keys(strings).filter((k) => k.startsWith(`${group}.`)).map((k) => k.slice(group.length + 1));
    if (!forms.includes('other')) problems.push(`${lang}: plural group "${group}" needs an "other" form`);
    for (const form of forms)
      if (!PLURAL_FORMS.includes(form)) problems.push(`${lang}: "${group}.${form}" is not a plural form`);
  }
}

// Category names: Latvian name as the API sends it → { en, ru }.
const CATEGORY_FILE = join(I18N_DIR, 'category-names.json');
const CATEGORY_LANGS = LANGS.filter((lang) => lang !== SOURCE);
const categoryText = readFileSync(CATEGORY_FILE, 'utf8');
const categoryNames = JSON.parse(categoryText);
const seenCategories = new Set();
for (const [, name] of categoryText.matchAll(/^\s*"([^"]+)"\s*:\s*\{/gm)) {
  if (seenCategories.has(name)) problems.push(`category-names.json: "${name}" is listed twice`);
  seenCategories.add(name);
}
for (const [name, names] of Object.entries(categoryNames)) {
  if (name !== name.trim()) problems.push(`category-names.json: "${name}" has spaces at the start or end`);
  for (const lang of CATEGORY_LANGS)
    if (typeof names[lang] !== 'string' || !names[lang].trim())
      problems.push(`category-names.json: "${name}" needs a "${lang}" name`);
  for (const lang of Object.keys(names))
    if (!CATEGORY_LANGS.includes(lang)) problems.push(`category-names.json: "${name}" has an unknown language "${lang}"`);
}

// --categories: compare with the categories the live site serves.
const liveArg = process.argv.find((arg) => arg.startsWith('--categories'));
let liveSummary = '';
if (liveArg) {
  const url = liveArg.includes('=') ? liveArg.slice(liveArg.indexOf('=') + 1) : 'https://pricepeeker.lv/api/allCategories';
  let parents;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    parents = await response.json();
  } catch (error) {
    console.error(`Couldn't load categories from ${url}: ${error.message}`);
    process.exit(1);
  }
  const live = new Set(parents.flatMap((parent) => [parent, ...(parent.categories ?? [])]).map((c) => c.name.trim()));
  for (const name of live)
    if (!(name in categoryNames)) problems.push(`category "${name}" from ${url} has no translation in category-names.json`);
  const unused = Object.keys(categoryNames).filter((name) => !live.has(name));
  if (unused.length) console.warn(`In category-names.json but no longer on the site (safe to delete):\n - ${unused.join('\n - ')}`);
  liveSummary = ` All ${live.size} categories from ${url} are translated.`;
}

// Keys referenced in the app: 'some.key' | translate, labelKey: 'x.y', errorKey = 'x.y', plural('x.y', …), instant('x.y' …)
function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (/\.(html|ts)$/.test(name) && !name.endsWith('.spec.ts')) files.push(path);
  }
  return files;
}
const used = new Set();
const patterns = [
  /'([a-zA-Z]+\.[a-zA-Z.]+)'\s*\|\s*translate/g,
  /'([a-zA-Z]+\.[a-zA-Z.]+)'\s*:\s*'([a-zA-Z]+\.[a-zA-Z.]+)'\s*\)\s*\|\s*translate/g,
  /(?:labelKey|errorKey)\s*[:=]\s*'([a-zA-Z]+\.[a-zA-Z.]+)'/g,
  /(?:instant|plural|showLoginError)\(\s*'([a-zA-Z]+\.[a-zA-Z.]+)'/g,
  /\?\s*'([a-zA-Z]+\.[a-zA-Z.]+)'\s*:\s*'([a-zA-Z]+\.[a-zA-Z.]+)'/g,
];
for (const file of walk('src/app')) {
  const text = readFileSync(file, 'utf8');
  for (const pattern of patterns) for (const m of text.matchAll(pattern)) m.slice(1).filter(Boolean).forEach((k) => used.add(k));
}
const sourceGroups = new Set(Object.keys(source).flatMap((k) => k.split('.').map((_, i, a) => a.slice(0, i + 1).join('.'))));
for (const key of used) {
  if (!(key in source) && !sourceGroups.has(key) && !key.startsWith('shopType.'))
    problems.push(`app uses "${key}", which is not in ${SOURCE}.json`);
}

if (problems.length) {
  console.error(`i18n check failed (${problems.length}):\n - ` + problems.join('\n - '));
  process.exit(1);
}
console.log(
  `i18n check passed: ${Object.keys(source).length} keys in ${LANGS.join(', ')}; ${used.size} keys used in the app; ` +
    `${Object.keys(categoryNames).length} category names.${liveSummary}`,
);
