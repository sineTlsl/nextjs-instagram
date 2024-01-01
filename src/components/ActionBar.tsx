import parseDate from "@/util/date";
import { useState } from "react";
import ToggleButton from "./ToggleButton";
import { SimplePost } from "@/model/posts";
import { useSession } from "next-auth/react";

// icons
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { useSWRConfig } from "swr";

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const hasHeart = user ? likes.includes(user.username) : false;
  const [hasBookmarked, setHasBookmarked] = useState<boolean>(false);
  const { mutate } = useSWRConfig();
  // const { trigger } = useSWRMutation(`/api/posts/${id}`);

  const handleLike = (like: boolean) => {
    fetch(`api/likes`, {
      method: "PUT",
      body: JSON.stringify({
        id,
        like,
      }),
    }).then(() => mutate("/api/posts"));
  };
  return (
    <>
      <div className="flex justify-between py-2 px-4">
        <ToggleButton
          toggled={hasHeart}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={hasBookmarked}
          onToggle={setHasBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {text && (
          <p>
            <span className="font-bold mr-1.5">{username}</span>
            {text}
          </p>
        )}
        <p className="text-xs text-neutral-500 uppercase my-4 ">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
