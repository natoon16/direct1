export const locales = ['en', 'es', 'fr', 'it', 'ar', 'ru', 'zh'] as const;
export type Locale = typeof locales[number]; 