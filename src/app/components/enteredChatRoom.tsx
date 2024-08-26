'use client';

import useSocket from '@/app/hooks/useSocket';
import useMessageStore from '@/app/hooks/useMessageStore';
import { Message, Room } from '@/shared/types/type';
import RoomHeader from './roomHeader';
import MessageContainer from './messageContainer';
import { Socket } from 'socket.io-client';

type Props = {
  room: Room;
};

export default function EnteredChatRoom(props: Props) {
  const { id: roomId, namespace, title } = props.room;

  const { messages, addMessage } = useMessageStore(roomId);

  const handleMessage = (message: Message) => {
    addMessage(message);
  };

  const socket: Socket | null = useSocket(roomId, namespace, handleMessage);

  return (
    <div className="flex flex-col w-full">
      <RoomHeader room={props.room} />
      <MessageContainer roomId={roomId} messages={messages} socket={socket} />
    </div>
  );
}
