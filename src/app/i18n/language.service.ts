import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type LanguageCode = 'lv' | 'en' | 'ru';

export interface Language {
  code: LanguageCode;
  /** Short label for the switcher. */
  label: string;
  /** The language's own name, for screen readers and the menu. */
  name: string;
}

export const LANGUAGES: Language[] = [
  { code: 'lv', label: 'LV', name: 'Latviešu' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'lv';
const STORAGE_KEY = 'lang';

/** Current UI language: remembered choice, else the browser's language, else Latvian. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);

  readonly languages = LANGUAGES;
  readonly current = signal<LanguageCode>(DEFAULT_LANGUAGE);

  init(): void {
    this.apply(this.storedLanguage() ?? this.browserLanguage() ?? DEFAULT_LANGUAGE);
  }

  use(code: LanguageCode): void {
    this.apply(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Private mode etc. — the choice just isn't remembered.
    }
  }

  /** Picks the right plural form, e.g. plural('results.items', 5) → "5 товаров". */
  plural(key: string, count: number): string {
    const category = new Intl.PluralRules(this.current()).select(count);
    const formKey = `${key}.${category}`;
    const text = this.translate.instant(formKey, { count });
    return text === formKey
      ? this.translate.instant(`${key}.other`, { count })
      : text;
  }

  private apply(code: LanguageCode): void {
    this.current.set(code);
    this.translate.use(code);
    document.documentElement.lang = code;
  }

  private storedLanguage(): LanguageCode | null {
    try {
      return this.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  private browserLanguage(): LanguageCode | null {
    const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const tag of preferred) {
      const code = this.parse(tag?.slice(0, 2).toLowerCase() ?? null);
      if (code) {
        return code;
      }
    }
    return null;
  }

  private parse(value: string | null): LanguageCode | null {
    return LANGUAGES.some((language) => language.code === value)
      ? (value as LanguageCode)
      : null;
  }
}
