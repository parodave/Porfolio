import { describe, it, expect } from 'vitest';
import i18n from '../src/i18n';

describe('blog translation keys', () => {
  it('loads blog section and navigation labels', () => {
    const enTitle = i18n.t('blog.title', { lng: 'en' });
    const frTitle = i18n.t('blog.title', { lng: 'fr' });
    expect(enTitle).not.toBe('blog.title');
    expect(frTitle).not.toBe('blog.title');

    const enNav = i18n.t('nav.blog', { lng: 'en' });
    const frNav = i18n.t('nav.blog', { lng: 'fr' });
    expect(enNav).not.toBe('nav.blog');
    expect(frNav).not.toBe('nav.blog');
  });
});
