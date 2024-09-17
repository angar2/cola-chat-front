import { Message } from '@/shared/types/type';

type Props = {
  lastMessage: Message | undefined;
  onClick: () => void;
};

export default function MessagePreview(props: Props) {
  const { lastMessage, onClick } = props;

  return (
    lastMessage && (
      <div
        className="absolute z-10 w-full bottom-[68px] sm:bottom-[124px] left-1/2 transform -translate-x-1/2 px-3 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex gap-2 px-4 py-2 bg-c bg-opacity-80 text-g rounded-xl">
          <p className="font-semibold whitespace-nowrap">
            {lastMessage.chatter.nickname}
          </p>
          <p className="truncate">{lastMessage.content}</p>
        </div>
        <div className="absolute bottom-0 left-6 transform translate-y-full w-0 h-0 border-l-2 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-c border-opacity-80"></div>
      </div>
    )
  );
}
