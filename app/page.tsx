import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function RootPage() {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') || 'en';
  const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
  const supportedLocales = ['en', 'es', 'fr', 'it', 'ar', 'ru', 'zh'];
  const locale = supportedLocales.includes(preferredLocale) ? preferredLocale : 'en';
  
  redirect(`/${locale}`);
} 