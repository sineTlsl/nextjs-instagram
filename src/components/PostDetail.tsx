import { FullPost, SimplePost } from '@/model/posts';
import Image from 'next/image';
import useSWR from 'swr';
import PostUserAvator from './PostUserAvator';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Avatar from './Avatar';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  const handlePostComment = (comment: string) => {};

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvator image={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, idx) => (
                <li key={idx} className="flex items-center">
                  <Avatar
                    image={image}
                    size="small"
                    hightlight={commentUsername === username}
                  />
                  <div className="ml-2">
                    <span className="font-bold mr-1">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              ),
            )}
        </ul>
        <ActionBar post={post} />
        <CommentForm onPostComment={handlePostComment} />
      </div>
    </section>
  );
}
