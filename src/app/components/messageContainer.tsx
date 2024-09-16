'use client';

import { useEffect, useRef, useState } from 'react';
import MessageFeed from './messageFeed';
import MessageSender from './messageSender';
import { Message } from '@/shared/types/type';
import MessageHeader from './messageHeader';
import { getSessionRoomChatters } from '@/shared/utils/storage';
import MessagePreview from './messagePreview';
import { scrollToBottom } from '@/shared/utils/scroll';
import throttle from 'lodash/throttle';

export default function MessageContainer() {
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [lastMessage, setLastMessage] = useState<Message>();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = throttle(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      setTimeout(() => {
        const windowHeight = Number(window.innerHeight);
        const visualHeight = Number(window.visualViewport?.height);
        const difference = windowHeight - visualHeight;
        if (containerRef.current)
          document.documentElement.style.height = `calc(100% - ${difference}px)`;
      }, 0);
    }, 400);

    handleResize();
    visualViewport?.addEventListener('resize', handleResize);

    return () => visualViewport?.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col w-full h-full bg-d border-[0.6px] border-c border-opacity-50 sm:rounded-md overflow-hidden"
    >
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
          getSessionRoomChatters()[lastMessage.roomId] && (
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
