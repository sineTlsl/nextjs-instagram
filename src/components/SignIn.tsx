'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import SocialBtn from './SocialBtn';
import ColorBtn from './ui/ColorBtn';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <SocialBtn
          key={name}
          name={name}
          onClick={() => signIn(id, { callbackUrl })}
        />
      ))}
    </>
  );
}
