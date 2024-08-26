'use client';

import MessageFeed from './messageFeed';
import MessageSender from './messageSender';
import { Message } from '@/shared/types/type';
import { Socket } from 'socket.io-client';

type Props = {
  roomId: string;
  messages: Message[];
  socket: Socket | null;
};

export default function MessageContainer(props: Props) {
  const { roomId, messages, socket } = props;

  return (
    <div className="">
      <MessageFeed messages={messages} />
      <MessageSender roomId={roomId} socket={socket} />
    </div>
  );
}
