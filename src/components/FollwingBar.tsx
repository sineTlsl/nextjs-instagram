'use client';

import { DetailUser } from '@/model/user';
import Link from 'next/link';
import { PacmanLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>('/api/me');
   console.log(data?.following);
  const users = data?.following;

  // --- 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 사용자의 정보를 얻어옴
  // --- 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
  // --- 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴 (follwings)
  // 4. 여기에서, 클라이언트 컴포넌트에서 follwings의 정보를 UI에 보여줌
  //    (image, username)

  return (
    <section>
      {isLoading ? (
        <PacmanLoader size={8} color='#35917f' />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ul>
          {users.map(({ image, username }, idx) => (
            <li key={idx}>
              <Link href={`/user/${username}`}>
                <Avatar image={image} hightlight />
                <p>{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
