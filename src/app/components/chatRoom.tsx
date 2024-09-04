'use client';

import { Message, Room } from '@/shared/types/type';
import MessageContainer from './messageContainer';
import ChatRoomMenu from './chatRoomMenu';
import { Socket } from 'socket.io-client';
import useMessageStore from '../hooks/useMessageStore';
import useSocket from '../hooks/useSocket';

type Props = {
  room: Room;
};

export default function ChatRoom(props: Props) {
  const { room } = props;

  const { messages, nextPage, addMessage } = useMessageStore(room.id);

  const handleMessage = (message: Message) => {
    addMessage(message);
  };

  const socket: Socket | null = useSocket(
    room.id,
    room.namespace,
    handleMessage
  );

  return (
    room &&
    socket && (
      <div className="flex w-full h-full ">
        <MessageContainer
          room={room}
          messages={messages}
          nextPage={nextPage}
          socket={socket}
        />
        <ChatRoomMenu room={room} socket={socket} />
      </div>
    )
  );
}
