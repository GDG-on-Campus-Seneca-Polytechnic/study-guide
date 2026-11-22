import '@fontsource-variable/roboto/standard.css';
import '@fontsource-variable/roboto-mono';
import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import './global.css';

export const metadata: Metadata = {
  title: { default: 'GDG Seneca Study Guide', template: '%s | GDG Seneca Study Guide' },
  description:
    'GDG on Campus @ Seneca Polytechnic study guide: sign up for free student tools, learn web, cloud, AI and mobile with Google tools, and get ready for the Code Jam.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
