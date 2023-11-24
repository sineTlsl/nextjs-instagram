'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import SocialBtn from './SocialBtn';

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function SignIn({ providers }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <SocialBtn key={name} name={name} onClick={() => signIn(id)} />
      ))}
    </>
  );
}
