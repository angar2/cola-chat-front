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
        className="absolute z-10 w-full bottom-[64px] sm:bottom-[120px] left-1/2 transform -translate-x-1/2 px-3 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex gap-2 px-4 py-2 bg-a bg-opacity-80 text-g rounded-2xl">
          <p className="font-semibold whitespace-nowrap">
            {lastMessage.chatter.nickname}
          </p>
          <p className="truncate">{lastMessage.content}</p>
        </div>
      </div>
    )
  );
}
