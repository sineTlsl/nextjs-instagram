'use client';

import { SimplePost } from '@/model/posts';
import useSWR from 'swr';
import PostListCard from './PostListCard';
import GridSpinner from './GridSpinner';

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {isLoading && (
        <div className='text-center mt-32'>
          <GridSpinner />
        </div>
      )}
      <ul>
        {posts &&
          posts.map((post, idx) => (
            <li key={post.id} className='mb-5'>
              <PostListCard post={post} priority={idx < 2} />
            </li>
          ))}
      </ul>
    </section>
  );
}
