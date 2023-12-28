'use client';

import { ProfileUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import GridSpinner from './GridSpinner';

export default function UserSearch() {
  // 사용자가 키워드를 입력하면, /api/search/${keyword}를 호출
  // 검색하는 키워드가 있다면, /api/search/bob -> 유저 네임이나 이름이 있다면 찾아서 반환
  // 검색하는 키워드가 없다면, /api/search -> 전체 유저를 반환
  const [keyword, setKeyword] = useState<string>('');
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);

  console.log(users);

  // 사용자가 키워드를 입력할 때마다 useSWR이 업데이트 된 키워드로 요청을 하고,
  // data 값이 업데이트 된다.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); // 페이지가 리로딩 되지 않도록
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          autoFocus
          placeholder='Search for a username or name'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>무언가가 잘못되었음 😛</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <p>{user.username}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
