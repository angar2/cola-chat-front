'use client';

import { useRef, useState } from 'react';
import MessageFeed from './messageFeed';
import MessageSender from './messageSender';
import { Message } from '@/shared/types/type';
import MessageHeader from './messageHeader';
import { getLocalRoomChatters } from '@/shared/utils/storage';
import MessagePreview from './messagePreview';
import { scrollToBottom } from '@/shared/utils/scroll';

export default function MessageContainer() {
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [lastMessage, setLastMessage] = useState<Message>();

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative flex flex-col h-[86vh] w-full rounded-md bg-d border-[0.6px] border-c border-opacity-50 overflow-hidden">
      <MessageHeader />
      <MessageFeed
        setShowMessagePreview={setShowMessagePreview}
        setLastMessage={setLastMessage}
        endOfMessagesRef={endOfMessagesRef}
      />
      <MessageSender endOfMessagesRef={endOfMessagesRef} />

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
