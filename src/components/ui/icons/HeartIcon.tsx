import { IoHeartOutline } from 'react-icons/io5';

type Props = {  
  className?: string;
}

export default function HeartIcon({className}: Props) {
  return <IoHeartOutline className={className || 'w-7 h-7'} />;
}
