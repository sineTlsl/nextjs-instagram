import './globals.css';
import { Open_Sans } from 'next/font/google';

// components
import NavBar from '@/components/NavBar';
import AuthContext from './context/AuthContext';
import SWRConfigContext from './context/SWRConfigContext';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={openSans.className}>
      <body className='w-full max-w-screen-xl overflow-auto mx-auto'>
        <AuthContext>
          <header className='sticky top-0 bg-white z-10 border-b'>
            <NavBar />
          </header>
          <main className='w-full flex justify-center bg-neutral-50 min-h-full'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
