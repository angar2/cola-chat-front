'use client';

import { useRef } from 'react';
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

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="">
      <MessageFeed
        messages={messages}
        nextPage={nextPage}
        endOfMessagesRef={endOfMessagesRef}
      />

      <MessageSender
        roomId={roomId}
        socket={socket}
        endOfMessagesRef={endOfMessagesRef}
      />
    </div>
  );
}
