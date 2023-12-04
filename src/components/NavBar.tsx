'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

// components
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import ColorBtn from './ui/ColorBtn';
import Avatar from './Avatar';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];

export default function NavBar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className='h-14 flex justify-between items-center px-4'>
      <Link href='/'>
        <h1 className='text-2xl font-semibold'>SINEGRAM</h1>
      </Link>
      <nav>
        <ul className='flex gap-2.5 items-center'>
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {pathName === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.name}`}>
                <Avatar image={user.image} size='small' hightlight={true} />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorBtn
                text='Sign out'
                onClick={() => {
                  signOut();
                }}
              />
            ) : (
              <ColorBtn
                text='Sign in'
                onClick={() => {
                  signIn();
                }}
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
