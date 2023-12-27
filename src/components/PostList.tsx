'use client';

import { SimplePost } from '@/model/posts';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import PostListCard from './PostListCard';

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {isLoading && (
        <div className='text-center mt-32'>
          <GridLoader color='red' />
        </div>
      )}
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id} className='mb-5'>
              <PostListCard post={post} />
            </li>
          ))}
      </ul>
    </section>
  );
}
