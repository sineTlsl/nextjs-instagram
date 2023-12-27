import { SimplePost } from '@/model/posts';
import Avatar from './Avatar';
import Image from 'next/image';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import parseDate from '../util/date';
import SmileIcon from './ui/icons/SmileIcon';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;

  return (
    <article className='rounded-lg shadow-md border-gray'>
      <div className='flex items-center p-2'>
        <Avatar image={userImage} size='medium' hightlight />
        <span className='text-gray-900 font-bold ml-2'>{username}</span>
      </div>
      <Image
        className='w-full object-cover aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />
      <div className='flex justify-between py-2 px-4'>
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className='px-4 py-1'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        <p>
          <span className='font-bold mr-1.5'>{username}</span>
          {text}
        </p>
        <p className='text-xs text-neutral-500 uppercase my-4 '>
          {parseDate(createdAt)}
        </p>
        <form className='flex border-t items-center text-neutral-300'>
          <SmileIcon />
          <input
            className='w-full ml-2 border-none outline-none p-3'
            type='text'
            placeholder='Add a comment...'
          />
          <button className='font-bold text-sky-500 ml-2'>Post</button>
        </form>
      </div>
    </article>
  );
}
