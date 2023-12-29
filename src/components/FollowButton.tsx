'use client';

import { HomeUser, ProfileUser } from '@/model/user';
import useSWR from 'swr';
import Button from './ui/Button';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { name, username, image, followers, following, posts } = user;
  const { data: loggedInUser } = useSWR<HomeUser>('/api/me');

  const showButton = loggedInUser && loggedInUser.username !== username;

  // 내가 팔로우를 하고 있는 지 안하고 있는 지 판별
  const Myfollowing =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === 'Unfollow'} />
      )}
    </>
  );
}
