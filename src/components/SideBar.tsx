'use client';

import { User } from '@/model/user';
import Avatar from './Avatar';

type Props = {
  user: User;
};

export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div className='flex items-center'>
        {image && <Avatar image={image} />}
        <div className='ml-2'>
          <h4 className='font-bold text-gray-900'>{username}</h4>
          <p className='text-lg text-neutral-500 leading-4'>{name}</p>
        </div>
      </div>
      <p className='text-sm text-neutral-500 mt-5'>
        About﹒Help﹒Press﹒API﹒Jobs﹒Privacy﹒Terms﹒Location﹒Language
      </p>
      <p className='font-bold text-sm mt-5 text-neutral-500'>
        @Copyright SINEGRAM from METAL
      </p>
    </>
  );
}
