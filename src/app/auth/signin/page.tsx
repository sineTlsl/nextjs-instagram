import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignIn from '@/components/SignIn';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className='flex flex-col justify-center gap-2 w-full-mobile mt-[30%] mx-2 sm:max-w-sm align-center'>
      <SignIn providers={providers} />
    </section>
  );
}
