'use client';

import MessageFeed from './messageFeed';
import MessageSender from './messageSender';
import { Message } from '@/shared/types/type';
import { Socket } from 'socket.io-client';

type Props = {
  roomId: string;
  messages: {
    storageMessages: Message[];
    newMessages: Message[];
  };
  nextPage: () => void;
  socket: Socket | null;
};

export default function MessageContainer(props: Props) {
  const { roomId, messages, nextPage, socket } = props;

  return (
    <div className="">
      <MessageFeed messages={messages} nextPage={nextPage} />
      <MessageSender roomId={roomId} socket={socket} />
    </div>
  );
}
