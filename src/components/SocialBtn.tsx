'use client';

// components
import GoogleIcon from './ui/icons/GoogleIcon';
import GitHubIcon from './ui/icons/GitHubIcon';

type Props = {
  name: string;
  onClick: () => void;
};

const socials = [
  {
    name: 'Google',
    bgColor: 'bg-white',
    hoverBgColor: 'hover:bg-white',
    color: 'text-black',
    icon: <GoogleIcon />,
  },
  {
    name: 'GitHub',
    bgColor: 'bg-[#272E33]',
    hoverBgColor: 'bg-[#272E33]',
    color: 'text-white',
    icon: <GitHubIcon />,
  },
];

export default function SocialBtn({ name, onClick }: Props) {
  const { bgColor, hoverBgColor, color, icon } =
    socials.find((social) => social.name === name) || {};

  return (
    <button
      className={`w-full flex items-center justify-center ${bgColor} hover:${hoverBgColor} ${color} p-2 rounded-md border`}
      onClick={onClick}
    >
      <div className='mr-2'>{icon}</div>
      Sign in With {name}
    </button>
  );
}
