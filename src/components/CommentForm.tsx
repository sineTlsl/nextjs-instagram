'use client';

import { FormEvent, useState } from 'react';
import SmileIcon from './ui/icons/SmileIcon';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState<string>('');
  const buttonDisabled = comment.length === 0;

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex border-t px-3 items-center text-neutral-300"
    >
      <SmileIcon />
      <input
        className="w-full ml-2 border-none outline-none p-3 text-black"
        type="text"
        required
        onChange={e => setComment(e.target.value)}
        value={comment}
        placeholder="Add a comment..."
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ml-2 ${
          buttonDisabled ? 'text-sky-300' : ' text-sky-500'
        }`}
      >
        Post
      </button>
    </form>
  );
}
