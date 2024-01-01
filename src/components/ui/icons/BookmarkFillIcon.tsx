import { IoBookmark } from "react-icons/io5";

type Props = {
  className?: string;
};

export default function BookmarkFillIcon({ className }: Props) {
  return <IoBookmark className={className || "w-7 h-7"} />;
}
