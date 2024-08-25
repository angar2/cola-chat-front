'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/shared/types/type';

type Props = {
  messages: Message[];
};

export default function MessageFeed(props: Props) {
  const { messages } = props;
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 스크롤 위치 조정
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-2 p-4 h-[80vh] overflow-y-auto bg-white">
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

      {/* 스크롤 위치 */}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
