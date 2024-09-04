'use client';

import { useRef, useState } from 'react';
import MessageFeed from './messageFeed';
import MessageSender from './messageSender';
import { Message, Room } from '@/shared/types/type';
import { Socket } from 'socket.io-client';
import MessageHeader from './messageHeader';
import { getLocalRoomChatters } from '@/shared/utils/storage';
import MessagePreview from './messagePreview';
import { scrollToBottom } from '@/shared/utils/scroll';

type Props = {
  room: Room;
  messages: {
    storageMessages: Message[];
    newMessages: Message[];
  };
  nextPage: () => void;
  socket: Socket;
};

export default function MessageContainer(props: Props) {
  const { room, messages, nextPage, socket } = props;

  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [lastMessage, setLastMessage] = useState<Message>();

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative flex flex-col h-[86vh] w-full rounded-md bg-d border-[0.6px] border-c border-opacity-50 overflow-hidden">
      <MessageHeader room={props.room} />
      <MessageFeed
        messages={messages}
        nextPage={nextPage}
        setShowMessagePreview={setShowMessagePreview}
        setLastMessage={setLastMessage}
        endOfMessagesRef={endOfMessagesRef}
      />
      <MessageSender
        roomId={room.id}
        socket={socket}
        endOfMessagesRef={endOfMessagesRef}
      />

      {/* 메세지 미리보기 */}
      {showMessagePreview &&
        lastMessage &&
        lastMessage.chatterId !==
          getLocalRoomChatters()[lastMessage.roomId] && (
          <MessagePreview
            lastMessage={lastMessage}
            onClick={() => {
              scrollToBottom(endOfMessagesRef);
              setShowMessagePreview(false);
            }}
          />
        )}
    </div>
  );
}
