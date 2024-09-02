'use client';

import { Room } from '@/shared/types/type';

type Props = {
  room: Room;
};

export default function MessageHeader(props: Props) {
  const { title } = props.room;

  return (
    <div className="flex-none flex flex-col h-fit px-5 2xl:px-6 py-2 2xl:py-4 gap-2 border-b-[0.4px] border-c border-opacity-50">
      {/* 채팅방 제목 */}
      <div>
        <p className="text-lg 2xl:text-xl font-semibold">{title}</p>
      </div>

      {/* 채팅방 인원수 */}
      <div className="flex gap-1">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 2xl:w-6 2xl:h-6 text-c"
        >
          <path
            d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z"
            fill="currentColor"
          />
        </svg>

        <span className="text-sm 2xl:text-base text-c">2/2</span>
      </div>
    </div>
  );
}
