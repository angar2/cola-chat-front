'use client';

import { emitMessage } from '@/shared/webSockets/emit';
import { KeyboardEvent, RefObject, useEffect, useRef, useState } from 'react';
import useSocketStore from '../stores/socketStore';
import useRoomStore from '../stores/roomStore';
import { LIMIT } from '@/shared/constants/limit';

type Props = {
  feedRef: RefObject<HTMLDivElement>;
  textareaRef: RefObject<HTMLTextAreaElement>;
};

export default function MessageSender(props: Props) {
  const { feedRef, textareaRef } = props;

  const room = useRoomStore((state) => state.room);
  const { socket } = useSocketStore();

  const [content, setContent] = useState('');
  const [rows, setRows] = useState(1);

  // 사이즈(너비) 감지 이벤트 등록
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setRows(3);
      else setRows(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!room) return null;

  // 메세지 전송
  const handleSend = () => {
    if (socket && content.trim() !== '') {
      emitMessage(socket, { roomId: room.id, content }, () => {
        setContent('');
        const chatFeed = feedRef.current;
        if (chatFeed) chatFeed.scrollTop = chatFeed.scrollHeight;
      });
    }
  };

  // 전송 버튼 클릭
  const handleClick = () => {
    handleSend();
    textareaRef.current?.focus();
  };

  // 전송 키 클릭
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift + Enter: 줄바꿈
        setContent((prevContent) => prevContent + '\n');
      } else {
        // Enter: 메세지 전송
        handleSend();
      }
    }
  };

  return (
    <div className="flex-none w-full px-3 py-2">
      <div className="flex items-center sm:items-end w-full px-2 py-2 sm:px-4 sm:py-4 bg-a rounded-lg sm:rounded-xl">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyDown}
          maxLength={LIMIT.MESSAGE}
          className="w-full h-full outline-none resize-none"
          rows={rows}
        />
        <button
          type="button"
          onClick={handleClick}
          disabled={!socket}
          className="active:scale-90"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 sm:w-9 sm:h-9 text-f"
          >
            <g clipPath="url(#clip0_41_20)">
              <path
                d="M19.8 28.8V14.4L26.1 20.7L28.656 18.144L18 7.488L7.344 18.144L9.9 20.7L16.2 14.4V28.8H19.8ZM18 0C20.3638 0 22.7044 0.465584 24.8883 1.37017C27.0722 2.27475 29.0565 3.60062 30.7279 5.27208C32.3994 6.94353 33.7252 8.92784 34.6298 11.1117C35.5344 13.2956 36 15.6362 36 18C36 22.7739 34.1036 27.3523 30.7279 30.7279C27.3523 34.1036 22.7739 36 18 36C15.6362 36 13.2956 35.5344 11.1117 34.6298C8.92784 33.7252 6.94353 32.3994 5.27208 30.7279C1.89642 27.3523 0 22.7739 0 18C0 13.2261 1.89642 8.64773 5.27208 5.27208C8.64773 1.89642 13.2261 0 18 0Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_41_20">
                <rect width="36" height="36" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
}
