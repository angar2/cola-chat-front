'use client';

import useRoomStore from '../stores/roomStore';
import { Tooltip } from 'react-tooltip';
import ChatRoomMenu from './chatRoomMenu';
import { useState } from 'react';

export default function MessageHeader() {
  const room = useRoomStore((state) => state.room);
  const chatters = useRoomStore((state) => state.chatters);

  const [isOpenMenuModal, setIsOpenMenuModal] = useState<boolean>(false);

  if (!room) return null;
  const { title, isPassword, expiresAt } = room;

  // 채팅방 메뉴 모달 열기
  const handleMenuModal = () => {
    setIsOpenMenuModal(!isOpenMenuModal);
  };

  const originDate = new Date(expiresAt);

  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  });
  const formattedDateParts = formatter.formatToParts(originDate);

  const year = formattedDateParts.find((part) => part.type === 'year')?.value;
  const month = formattedDateParts.find((part) => part.type === 'month')?.value;
  const day = formattedDateParts.find((part) => part.type === 'day')?.value;
  const hour = formattedDateParts.find((part) => part.type === 'hour')?.value;
  const minute = formattedDateParts.find(
    (part) => part.type === 'minute'
  )?.value;

  const date = `${year}-${month}-${day} ${hour}:${minute}`;

  const onlineBycapacity = `${chatters?.length || 0}/${room.capacity}`;

  return (
    <div className="relative w-full">
      {isOpenMenuModal && (
        <div className="sm:hidden absolute top-10 right-0">
          <ChatRoomMenu />
        </div>
      )}
      <div className="flex-none flex flex-col w-full h-fit px-4 sm:px-5 2xl:px-6 py-2 2xl:py-4 gap-2 bg-d border-b-[0.4px] border-c border-opacity-50">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {/* 채팅방 잠금 */}
            {isPassword && (
              <div className="flex items-center" id="lock">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 2xl:w-6 2xl:h-6 text-c"
                >
                  <path
                    d="M12 16.1905C12.4641 16.1905 12.9092 16.0299 13.2374 15.7442C13.5656 15.4584 13.75 15.0708 13.75 14.6667C13.75 13.821 12.9625 13.1429 12 13.1429C11.5359 13.1429 11.0908 13.3034 10.7626 13.5892C10.4344 13.8749 10.25 14.2625 10.25 14.6667C10.25 15.0708 10.4344 15.4584 10.7626 15.7442C11.0908 16.0299 11.5359 16.1905 12 16.1905ZM17.25 9.33333C17.7141 9.33333 18.1592 9.49388 18.4874 9.77965C18.8156 10.0654 19 10.453 19 10.8571V18.4762C19 18.8803 18.8156 19.2679 18.4874 19.5537C18.1592 19.8395 17.7141 20 17.25 20H6.75C6.28587 20 5.84075 19.8395 5.51256 19.5537C5.18437 19.2679 5 18.8803 5 18.4762V10.8571C5 10.0114 5.7875 9.33333 6.75 9.33333H7.625V7.80952C7.625 6.79918 8.08594 5.83021 8.90641 5.11578C9.72688 4.40136 10.8397 4 12 4C12.5745 4 13.1434 4.09854 13.6742 4.28998C14.205 4.48143 14.6873 4.76204 15.0936 5.11578C15.4998 5.46953 15.8221 5.88949 16.042 6.35168C16.2618 6.81387 16.375 7.30925 16.375 7.80952V9.33333H17.25ZM12 5.52381C11.3038 5.52381 10.6361 5.76463 10.1438 6.19328C9.65156 6.62193 9.375 7.20331 9.375 7.80952V9.33333H14.625V7.80952C14.625 7.20331 14.3484 6.62193 13.8562 6.19328C13.3639 5.76463 12.6962 5.52381 12 5.52381Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
            <Tooltip
              anchorSelect="#lock"
              delayShow={500}
              content="암호가 설정된 채팅방"
            />

            {/* 채팅방 제목 */}
            <div className="w-full overflow-hidden">
              <p className="text-lg 2xl:text-xl font-semibold text-g truncate">
                {title}
              </p>
            </div>
          </div>

          {/* 메뉴 버튼 */}
          <div className="sm:hidden flex items-center">
            <button className="active:scale-90" onClick={handleMenuModal}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-c"
              >
                <path
                  d={
                    isOpenMenuModal
                      ? 'M21 9H3C3 9 3 3 12 3C21 3 21 9 21 9ZM13.35 17H3V18C3 19.66 4.34 21 6 21H13.35C13.13 20.37 13 19.7 13 19C13 18.3 13.13 17.63 13.35 17ZM21.86 13.73C21.95 13.5 22 13.26 22 13C22 11.9 21.11 11 20 11H11L8.5 13L6 11H4C2.9 11 2 11.9 2 13C2 14.1 2.9 15 4 15H14.54C15.64 13.78 17.23 13 19 13C20.04 13 21 13.26 21.86 13.73ZM22.54 16.88L21.12 15.47L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88Z'
                      : 'M22 13C22 14.11 21.11 15 20 15H4C2.9 15 2 14.11 2 13C2 11.89 2.9 11 4 11H13L15.5 13L18 11H20C21.11 11 22 11.9 22 13ZM12 3C3 3 3 9 3 9H21C21 9 21 3 12 3ZM3 18C3 19.66 4.34 21 6 21H18C19.66 21 21 19.66 21 18V17H3V18Z'
                  }
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          {/* 채팅방 인원수 */}
          <div className="flex gap-1" id="headcount">
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
            <span className="text-sm 2xl:text-base text-c">
              {onlineBycapacity}
            </span>
            <Tooltip
              anchorSelect="#headcount"
              delayShow={500}
              content="현재 인원수"
            />
          </div>
          {/* 채팅방 만료기한 */}
          <div
            className="flex justify-start items-center gap-1"
            id="expiration"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 2xl:w-5 2xl:h-5 text-c"
            >
              <path
                d="M12 20C10.1435 20 8.36301 19.2625 7.05025 17.9497C5.7375 16.637 5 14.8565 5 13C5 11.1435 5.7375 9.36301 7.05025 8.05025C8.36301 6.7375 10.1435 6 12 6C13.8565 6 15.637 6.7375 16.9497 8.05025C18.2625 9.36301 19 11.1435 19 13C19 14.8565 18.2625 16.637 16.9497 17.9497C15.637 19.2625 13.8565 20 12 20ZM19.03 7.39L20.45 5.97C20 5.46 19.55 5 19.04 4.56L17.62 6C16.07 4.74 14.12 4 12 4C9.61305 4 7.32387 4.94821 5.63604 6.63604C3.94821 8.32387 3 10.6131 3 13C3 15.3869 3.94821 17.6761 5.63604 19.364C7.32387 21.0518 9.61305 22 12 22C17 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39ZM11 14H13V8H11M15 1H9V3H15V1Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-xs 2xl:text-sm text-c">{date}</span>
            <Tooltip
              anchorSelect="#expiration"
              delayShow={500}
              content="채팅방 만료기한"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
