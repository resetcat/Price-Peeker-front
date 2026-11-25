import { Injectable } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import lv from './lv.json';
import en from './en.json';
import ru from './ru.json';

const TRANSLATIONS: Record<string, TranslationObject> = { lv, en, ru };

/**
 * The three translation files are small, so they ship inside the app bundle:
 * switching language is instant and the page never shows untranslated keys.
 */
@Injectable()
export class BundledTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of(TRANSLATIONS[lang] ?? TRANSLATIONS['lv']);
  }
}
