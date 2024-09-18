'use client';

import useRoomStore from '../stores/roomStore';
import { Tooltip } from 'react-tooltip';
import { useState } from 'react';
import useRoomChattersStore from '../stores/roomchatterStore';
import ChatterListModal from './chatterListModal';
import ChatRoomMenuModal from './chatRoomMenuModal';

export default function MessageHeader() {
  const room = useRoomStore((state) => state.room);
  const chatters = useRoomStore((state) => state.chatters);
  const roomChatters = useRoomChattersStore((state) => state.roomChatters);

  const [isOpenMenuModal, setIsOpenMenuModal] = useState<boolean>(false);
  const [isOpenChatterListModal, setIsOpenChatterListModal] =
    useState<boolean>(false);

  if (!room) return null;
  const { id: roomId, title, isPassword } = room;

  const chatter = roomChatters[roomId];
  if (!chatter) return null;

  // 채팅방 메뉴 모달 열기
  const handleMenuModal = () => {
    setIsOpenMenuModal(!isOpenMenuModal);
  };

  // 채터 리스트 모달 열기
  const handlehatterListModal = () => {
    setIsOpenChatterListModal(!isOpenChatterListModal);
  };

  const onlineBycapacity = `${chatters?.length || 0}/${room.capacity}`;

  return (
    <div className="relative w-full">
      {isOpenMenuModal && (
        <ChatRoomMenuModal onClose={() => setIsOpenMenuModal(false)} />
      )}
      {isOpenChatterListModal && (
        <ChatterListModal
          chatters={chatters}
          onClose={() => setIsOpenChatterListModal(false)}
        />
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
              content="프라이빗 채팅방"
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
          <button
            className="relative flex gap-1"
            onClick={handlehatterListModal}
            id="headcount"
          >
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
          </button>

          {/* 닉네임 */}
          <div className="flex justify-start items-center gap-1" id="nickname">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 2xl:w-5 2xl:h-5 text-c"
            >
              <path
                d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20ZM8.5 11C8.10218 11 7.72064 10.842 7.43934 10.5607C7.15804 10.2794 7 9.89782 7 9.5C7 9.10218 7.15804 8.72064 7.43934 8.43934C7.72064 8.15804 8.10218 8 8.5 8C8.89782 8 9.27936 8.15804 9.56066 8.43934C9.84196 8.72064 10 9.10218 10 9.5C10 9.89782 9.84196 10.2794 9.56066 10.5607C9.27936 10.842 8.89782 11 8.5 11ZM17 9.5C17 9.89782 16.842 10.2794 16.5607 10.5607C16.2794 10.842 15.8978 11 15.5 11C15.1022 11 14.7206 10.842 14.4393 10.5607C14.158 10.2794 14 9.89782 14 9.5C14 9.10218 14.158 8.72064 14.4393 8.43934C14.7206 8.15804 15.1022 8 15.5 8C15.8978 8 16.2794 8.15804 16.5607 8.43934C16.842 8.72064 17 9.10218 17 9.5ZM16 14V16H8V14H16Z"
                fill="currentColor"
              />
            </svg>

            <span className="text-sm 2xl:text-base font-semibold text-c">
              {chatter.nickname}
            </span>
            <Tooltip
              anchorSelect="#nickname"
              delayShow={500}
              content="닉네임"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
