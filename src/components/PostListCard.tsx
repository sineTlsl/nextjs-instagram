'use client';

import { useState } from 'react';
import { SimplePost } from '@/model/posts';
import Avatar from './Avatar';
import Image from 'next/image';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvator from './PostUserAvator';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <article className='rounded-lg shadow-md border-gray'>
      <PostUserAvator image={userImage} username={username} />
      <Image
        className='w-full object-cover aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
