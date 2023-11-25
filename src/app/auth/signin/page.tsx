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
    <section className='w-full'>
      <div className='w-full mt-[30%] mx-auto flex flex-col items-center justify-center gap-2 w-full-mobile sm:max-w-sm px-2'>
        <SignIn providers={providers} />
      </div>
    </section>
  );
}
