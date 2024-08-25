'use client';

import useSocket from '@/app/hooks/useSocket';
import useMessageStore from '@/app/hooks/useMessageStore';
import { Message, Room } from '@/shared/types/type';

type Props = {
  room: Room;
};

export default function EnteredChatRoom(props: Props) {
  const { id: roomId, namespace, title } = props.room;

  const { messages, addMessage } = useMessageStore(roomId);

  const handleMessage = (message: Message) => {
    addMessage(message);
  };

  useSocket(roomId, namespace, handleMessage);

  return (
    <div className="flex flex-col w-full">
      <div className="p-2">
        <p className="relative mx-auto max-w-3xl">{namespace}</p>
        <p className="relative mx-auto max-w-3xl">{title}</p>
      </div>
      <div className="flex flex-col space-y-2 p-4">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div key={index} className="border p-2 rounded bg-gray-100">
              <p>
                <strong>{message.participant.nickname}</strong>
              </p>
              <p>{message.content}</p>
              <p className="text-xs text-gray-500">
                {message.sentAt.toLocaleString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
