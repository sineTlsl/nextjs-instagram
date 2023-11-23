'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// components
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import ColorBtn from './ui/ColorBtn';

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

  return (
    <div className='h-14 flex justify-between items-center px-4'>
      <Link href='/'>
        <h1 className='text-2xl font-semibold'>Sinegram</h1>
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
          <ColorBtn text='Sign in' onClick={() => {}} />
        </ul>
      </nav>
    </div>
  );
}
