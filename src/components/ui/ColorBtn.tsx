type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorBtn({ text, onClick }: Props) {
  return (
    <div className='rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem]'>
      <button
        className='bg-white rounded-sm text-base px-[0.3rem] py-[0.1rem] hover:opacity-90 traslate-opacity'
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
