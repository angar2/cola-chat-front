'use client';

import { useEffect, useRef, useState } from 'react';
import MessageFeed from './messageFeed';
import MessageSender from './messageSender';
import { Message } from '@/shared/types/type';
import MessageHeader from './messageHeader';
import { getSessionRoomChatters } from '@/shared/utils/storage';
import MessagePreview from './messagePreview';
import { getViewportHeightGap, scrollToBottom } from '@/shared/utils/scroll';
import useResize from '../hooks/useResize';

export default function MessageContainer() {
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [lastMessage, setLastMessage] = useState<Message>();

  const feedRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 사이즈(높이) 감지 이벤트 등록
  useResize({ feedRef });

  return (
    <div className="relative flex flex-col w-full h-full bg-d border-[0.6px] border-c border-opacity-50 sm:rounded-md overflow-hidden">
      <MessageHeader />
      <MessageFeed
        setShowMessagePreview={setShowMessagePreview}
        setLastMessage={setLastMessage}
        feedRef={feedRef}
      />
      <MessageSender feedRef={feedRef} textareaRef={textareaRef} />

      {/* 메세지 미리보기 */}
      {showMessagePreview &&
        lastMessage &&
        lastMessage.chatterId !==
          getSessionRoomChatters()[lastMessage.roomId] && (
          <MessagePreview
            lastMessage={lastMessage}
            onClick={() => {
              scrollToBottom(feedRef);
              setShowMessagePreview(false);
              if (getViewportHeightGap() !== 0) textareaRef.current?.focus();
            }}
          />
        )}
    </div>
  );
}
