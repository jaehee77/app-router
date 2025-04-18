import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/css/global.scss';
import style from '@/css/index.module.scss';
import localFont from 'next/font/local';
import Link from 'next/link';

/*
const font = localFont({
  src: './fonts/aaa.woff',
  variable: '--font-name',
});
*/

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    return <footer>제작 @jaehee</footer>;
  }

  const books = await response.json();
  const bookCount = books.length;

  return (
    <>
      <footer>
        <div>제작 @jaehee</div>
        <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
      </footer>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={'/'}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
