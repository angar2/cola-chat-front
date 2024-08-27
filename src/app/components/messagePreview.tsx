import { Message } from '@/shared/types/type';

type Props = {
  // messages: {
  //   storageMessages: Message[];
  lastMessage: Message | undefined;
  // };
  onClick: () => void;
};
export default function MessagePreview(props: Props) {
  const { lastMessage, onClick } = props;

  return (
    lastMessage && (
      <div
        className="fixed bottom-36 left-4 flex gap-2 bg-gray-200 p-2 rounded cursor-pointer"
        onClick={onClick}
      >
        <p>
          <strong className="text-blue-500">
            {lastMessage.participant.nickname}
          </strong>
        </p>
        <p>{lastMessage.content}</p>
      </div>
    )
  );
}
