'use client';

import { useRef } from 'react';
import useCloseModal from '../hooks/useCloseModal';
import useRoomStore from '../stores/roomStore';
import useRoomChattersStore from '../stores/roomchatterStore';
import { Chatter } from '@/shared/types/type';

type Props = {
  chatters: Chatter[];
  onClose: () => void;
};
export default function ChatterListModal(props: Props) {
  const { chatters: onlineChatters, onClose } = props;

  const room = useRoomStore((state) => state.room);
  const roomChatters = useRoomChattersStore((state) => state.roomChatters);

  const elementRef = useRef<HTMLDivElement>(null);

  useCloseModal({ elementRef, onClose });

  const chatter = room?.id ? roomChatters[room.id] : null;
  if (!chatter) return null;

  return (
    <div
      ref={elementRef}
      className="absolute bottom-0 left-4 transform translate-y-full"
    >
      <div className="absolute top-0 left-7 sm:left-8 -translate-y-full w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-a border-opacity-80"></div>
      <div className="flex flex-col w-full h-full px-2 py-3 bg-a bg-opacity-80 rounded sm:rounded-r text-sm font-semibold text-c">
        {onlineChatters.map((onlineChatter, index) => (
          <div key={index} className="flex items-center gap-1 p-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 2xl:w-6 2xl:h-6"
            >
              <path
                d="M14 19.5C14 17.5 15.1 15.7 16.7 14.8C15.4 14.3 13.8 14 12 14C7.6 14 4 15.8 4 18V20H14V19.5ZM16 8C16 10.2 14.2 12 12 12C9.8 12 8 10.2 8 8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8Z"
                fill="currentColor"
              />
              <path
                d="M19.5 16C17.6 16 16 17.6 16 19.5C16 21.4 17.6 23 19.5 23C21.4 23 23 21.4 23 19.5C23 17.6 21.4 16 19.5 16Z"
                fill="#4CAF50"
              />
            </svg>
            <span className={`${onlineChatter.id === chatter.id && 'text-g'}`}>
              {onlineChatter.nickname}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
