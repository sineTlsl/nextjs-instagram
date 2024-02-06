'use client';

import { ProfileUser } from '@/model/user';
import Button from './ui/Button';
import useMe from '@/hooks/useMe';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username, id } = user;
  const { user: loggedInUser, toggleFollow } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;

  // 내가 팔로우를 하고 있는 지 안하고 있는 지 판별
  const following =
    loggedInUser &&
    loggedInUser.following.find(item => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  const handleFollow = () => {
    toggleFollow(id, !following);
  };

  return (
    <>
      {showButton && (
        <Button text={text} onClick={handleFollow} red={text === 'Unfollow'} />
      )}
    </>
  );
}
