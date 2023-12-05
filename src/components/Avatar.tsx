type Props = {
  image?: string | null;
  size?: 'small' | 'normal';
  hightlight?: boolean;
};

export default function Avatar({
  image,
  size = 'normal',
  hightlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, hightlight)}>
      {/*eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white object-cover rounded-full p-[0.1rem] ${getImageSizeStyle(
          size
        )}`}
        alt='user profile'
        src={image ?? undefined}
      />
    </div>
  );
}

/** 기본적인 아바타 컨테이너 style */
function getContainerStyle(size: string, hightlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const hightlightStyle = hightlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const sizeStyle = size === 'small' ? 'w-9 h-9' : 'w-[68px] h-[68px]';

  return `${baseStyle} ${hightlightStyle} ${sizeStyle}`;
}

/** 아바타 이미지 style */
function getImageSizeStyle(size: string): string {
  return size === 'small'
    ? 'w-[34px] h-[34px] p-[0.1rem]'
    : 'w-16 h-16 p-[0.2rem]';
}
