import { describe, it, expect } from 'vitest';
import i18n from '../src/i18n';
import { countries } from '../src/data/countries';

describe('country translations', () => {
  it('loads descriptions for each language', () => {
    countries.forEach(({ descriptionKey }) => {
      const en = i18n.t(descriptionKey, { lng: 'en' });
      const fr = i18n.t(descriptionKey, { lng: 'fr' });
      expect(en).not.toBe(descriptionKey);
      expect(fr).not.toBe(descriptionKey);
    });
  });
});
