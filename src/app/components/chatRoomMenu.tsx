'use client';

import { removeSessionRoomChatters } from '@/shared/utils/storage';
import { emitAlert } from '@/shared/webSockets/emit';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LeaveRoomModal from './leaveRoomModal';
import UpdateNicknameModal from './updateNicknameModal';
import { updateNickname } from '@/shared/apis/chatApi';
import { COMMENTS } from '@/shared/constants/comment';
import CompleteModal from './completeModal';
import useSocketStore from '../stores/socketStore';
import useRoomStore from '../stores/roomStore';
import useRoomChattersStore from '../stores/roomchatterStore';
import { Tooltip } from 'react-tooltip';
import formatDate from '@/shared/utils/date';

export default function ChatRoomMenu() {
  const router = useRouter();

  const room = useRoomStore((state) => state.room);
  const roomChatters = useRoomChattersStore((state) => state.roomChatters);
  const addRoomChatters = useRoomChattersStore(
    (state) => state.addRoomChatters
  );
  const { socket } = useSocketStore();

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [isOpenLeaveModal, setIsOpenLeaveModal] = useState<boolean>(false);
  const [isCompleteModal, setIsCompleteModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!room) return null;
  const { id: roomId, expiresAt } = room;
  const date = formatDate(expiresAt);
  const chatter = roomChatters[roomId];

  // 채팅방 URL 복사
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCompleteModal(true);
  };

  // 닉네임 변경 모달 열기
  const handleUpdateModal = () => {
    setIsOpenUpdateModal(true);
  };

  // 채팅방 나가기 모달 열기
  const handleLeaveModal = () => {
    setIsOpenLeaveModal(true);
  };

  // 닉네임 변경
  const handleUpdateNickname = async (nickname?: string) => {
    if (!nickname) return;

    // 닉네임 변경
    const result = await updateNickname(
      { chatterId: chatter.id },
      { nickname }
    );
    if (!result.success) {
      setError(result.message);
      return;
    }
    if (result.data) {
      const newNickname = result.data.nickname;

      // 모달 닫기
      setIsOpenUpdateModal(false);
      setIsCompleteModal(true);

      // 공지 전송
      if (socket)
        emitAlert(
          socket,
          {
            roomId,
            content: COMMENTS.SOCKET.nicknameUpdated(
              chatter.nickname,
              newNickname
            ),
          },
          () => addRoomChatters(roomId, result.data!)
        );
    }
  };

  // 채팅방 나가기
  const handleLeaveRoom = () => {
    if (socket) {
      removeSessionRoomChatters(roomId);
      delete roomChatters[roomId];
      router.push('/');
    }
  };

  return (
    <div className="h-full sm:pt-2">
      <div className="sm:hidden absolute top-0 right-6 transform -translate-y-full w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-a border-opacity-80"></div>
      <div className="flex flex-col gap-3 w-full h-full px-2 py-3 bg-a sm:bg-d bg-opacity-80 sm:bg-opacity-40 rounded sm:rounded-r text-sm sm:text-base font-semibold text-c">
        {/* URL 복사 */}
        <button
          className="flex items-center gap-1 p-1 active:scale-90"
          onClick={handleCopyUrl}
          id="copy"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 2xl:w-6 2xl:h-6"
          >
            <path
              d="M12 1L8 5H11V14H13V5H16M18 23H6C4.89 23 4 22.1 4 21V9C4 8.46957 4.21071 7.96086 4.58579 7.58579C4.96086 7.21071 5.46957 7 6 7H9V9H6V21H18V9H15V7H18C18.5304 7 19.0391 7.21071 19.4142 7.58579C19.7893 7.96086 20 8.46957 20 9V21C20 21.5304 19.7893 22.0391 19.4142 22.4142C19.0391 22.7893 18.5304 23 18 23Z"
              fill="currentColor"
            />
          </svg>
          <span className="sm:hidden">채팅방 URL 복사</span>
          <Tooltip
            anchorSelect="#copy"
            delayShow={500}
            content="채팅방 URL 복사"
            className="hidden sm:block"
          />
        </button>

        {/* 닉네임 변경 */}
        <button
          className="flex items-center gap-1 p-1 active:scale-90"
          onClick={handleUpdateModal}
          id="updateNickname"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 2xl:w-6 2xl:h-6"
          >
            <path
              d="M11 4C8.8 4 7 5.8 7 8C7 10.2 8.8 12 11 12C13.2 12 15 10.2 15 8C15 5.8 13.2 4 11 4ZM11 14C6.6 14 3 15.8 3 18V20H12.5C12.2 19.2 12 18.4 12 17.5C12 16.3 12.3 15.2 12.9 14.1C12.3 14.1 11.7 14 11 14ZM18 20C16.6 20 15.5 18.9 15.5 17.5C15.5 17.1 15.6 16.7 15.8 16.4L14.7 15.3C14.3 15.9 14 16.7 14 17.5C14 19.7 15.8 21.5 18 21.5V23L20.2 20.8L18 18.5V20ZM18 13.5V12L15.8 14.2L18 16.4V15C19.4 15 20.5 16.1 20.5 17.5C20.5 17.9 20.4 18.3 20.2 18.6L21.3 19.7C21.7 19.1 22 18.3 22 17.5C22 15.3 20.2 13.5 18 13.5Z"
              fill="currentColor"
            />
          </svg>
          <span className="sm:hidden">닉네임 변경</span>
          <Tooltip
            anchorSelect="#updateNickname"
            delayShow={500}
            content="닉네임 변경"
            className="hidden sm:block"
          />
        </button>

        {/* 채팅방 나가기 */}
        <button
          className="flex items-center gap-1 p-1 active:scale-90"
          onClick={handleLeaveModal}
          id="leave"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 2xl:w-6 2xl:h-6"
          >
            <path
              d="M9.99984 2.5C9.07484 2.5 8.33317 3.24167 8.33317 4.16667H2.49984V15.8333H1.6665V17.5H18.3332V15.8333H17.4998V4.16667C17.4998 3.24167 16.7582 2.5 15.8332 2.5H9.99984ZM9.99984 4.16667H15.8332V15.8333H9.99984V4.16667ZM4.1665 9.16667H5.83317V10.8333H4.1665V9.16667Z"
              fill="currentColor"
            />
          </svg>
          <span className="sm:hidden">채팅방 나가기</span>
          <Tooltip
            anchorSelect="#leave"
            delayShow={500}
            content="채팅방 나가기"
            className="hidden sm:block"
          />
        </button>

        <hr className="border-d" />

        {/* 채팅방 만료기한 */}
        <div className="flex items-start gap-1 p-1" id="expiration">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 2xl:w-6 2xl:h-6 text-c"
          >
            <path
              d="M12 20C10.1435 20 8.36301 19.2625 7.05025 17.9497C5.7375 16.637 5 14.8565 5 13C5 11.1435 5.7375 9.36301 7.05025 8.05025C8.36301 6.7375 10.1435 6 12 6C13.8565 6 15.637 6.7375 16.9497 8.05025C18.2625 9.36301 19 11.1435 19 13C19 14.8565 18.2625 16.637 16.9497 17.9497C15.637 19.2625 13.8565 20 12 20ZM19.03 7.39L20.45 5.97C20 5.46 19.55 5 19.04 4.56L17.62 6C16.07 4.74 14.12 4 12 4C9.61305 4 7.32387 4.94821 5.63604 6.63604C3.94821 8.32387 3 10.6131 3 13C3 15.3869 3.94821 17.6761 5.63604 19.364C7.32387 21.0518 9.61305 22 12 22C17 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39ZM11 14H13V8H11M15 1H9V3H15V1Z"
              fill="currentColor"
            />
          </svg>
          <div className="sm:hidden flex flex-col text-xs">
            <span>채팅방 만료기한</span>
            <span>{date}</span>
          </div>
          <Tooltip
            anchorSelect="#expiration"
            delayShow={500}
            content={`채팅방 만료기한: ${date}`}
            className="hidden sm:block"
          />
        </div>
      </div>
      {isOpenLeaveModal && (
        <LeaveRoomModal
          isOpen={isOpenLeaveModal}
          isInput={false}
          error={error}
          setIsOpen={setIsOpenLeaveModal}
          setError={setError}
          handleCallback={() => handleLeaveRoom()}
        />
      )}
      {isOpenUpdateModal && (
        <UpdateNicknameModal
          isOpen={isOpenUpdateModal}
          isInput={true}
          error={error}
          setIsOpen={setIsOpenUpdateModal}
          setError={setError}
          handleCallback={(value) => handleUpdateNickname(value)}
        />
      )}
      {isCompleteModal && (
        <CompleteModal
          isOpen={isCompleteModal}
          isInput={false}
          error={error}
          setIsOpen={setIsCompleteModal}
          setError={setError}
          handleCallback={() => {}}
        />
      )}
    </div>
  );
}
