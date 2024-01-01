import { IoHeart } from "react-icons/io5";

type Props = {
  className?: string;
};

export default function HeartFillIcon({ className }: Props) {
  return <IoHeart className={className || "w-7 h-7 fill-red-500"}/>;
}
