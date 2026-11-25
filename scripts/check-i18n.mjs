// Checks the translation files in src/app/i18n:
//  - every language has the same keys as lv.json (plural groups may differ per language)
//  - every {{placeholder}} in Latvian also appears in the translation
//  - every key used in the app's templates and code exists in lv.json
// Run: npm run i18n:check
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
console.log(`i18n check passed: ${Object.keys(source).length} keys in ${LANGS.join(', ')}; ${used.size} keys used in the app.`);
