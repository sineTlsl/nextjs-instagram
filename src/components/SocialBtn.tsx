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
    bgColor: '#FFFFFF',
    hoverBgColor: '#FFFFFF',
    color: '#000000/0,0,0(54%)',
    icon: <GoogleIcon />,
  },
  {
    name: 'GitHub',
    bgColor: '#272E33',
    hoverBgColor: '#272E33',
    color: '#FFFFFF',
    icon: <GitHubIcon />,
  },
];

export default function SocialBtn({ name, onClick }: Props) {
  const { bgColor, hoverBgColor, color, icon } =
    socials.find((social) => social.name === name) || {};

  return (
    <button
      className={`flex items-center justify-center bg-[${bgColor}] :hover-bg${hoverBgColor} text-[${color}] px-2 py-2 rounded-md border`}
      onClick={onClick}
    >
      <div className='mr-2'>{icon}</div>
      Sign in With {name}
    </button>
  );
}
