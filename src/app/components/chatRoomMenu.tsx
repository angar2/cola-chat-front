'use client';

import { Room } from '@/shared/types/type';
import {
  getLocalRoomChatters,
  removeLocalRoomChatters,
} from '@/shared/utils/storage';
import { emitLeave, emitPing } from '@/shared/webSockets/emit';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Socket } from 'socket.io-client';
import LeaveRoomModal from './leaveRoomModal';
import UpdateNicknameModal from './updateNicknameModal';
import { updateNickname } from '@/shared/apis/chatApi';
import { COMMENTS } from '@/shared/constants/comment';
import CompleteModal from './completeModal';

type Props = {
  room: Room;
  socket: Socket;
};

export default function ChatRoomMenu(props: Props) {
  const { room, socket } = props;
  const { id: roomId } = room;

  const router = useRouter();

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [isOpenLeaveModal, setIsOpenLeaveModal] = useState<boolean>(false);
  const [isCompleteModal, setIsCompleteModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
      { chatterId: getLocalRoomChatters()[roomId] },
      { nickname }
    );
    if (!result.success) {
      setError(result.message);
      return;
    }
    const newNickname = result.data!.nickname;

    // 모달 닫기
    setIsOpenUpdateModal(false);
    setIsCompleteModal(true);

    // 핑 전송
    emitPing(socket, {
      roomId,
      content: COMMENTS.SOCKET.nicknameUpdated(newNickname, newNickname),
    });
  };

  // 채팅방 나가기
  const handleLeaveRoom = () => {
    emitLeave(socket, { roomId }, () => {
      removeLocalRoomChatters(roomId);
      router.push('/');
    });
  };

  return (
    <div className="h-full pt-2">
      <div className="flex flex-col gap-3 w-full h-full px-2 py-3 bg-d bg-opacity-40 text-g rounded-r">
        <button className="p-1 active:scale-90" onClick={handleCopyUrl}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 2xl:w-6 2xl:h-6 text-c"
          >
            <path
              d="M12 1L8 5H11V14H13V5H16M18 23H6C4.89 23 4 22.1 4 21V9C4 8.46957 4.21071 7.96086 4.58579 7.58579C4.96086 7.21071 5.46957 7 6 7H9V9H6V21H18V9H15V7H18C18.5304 7 19.0391 7.21071 19.4142 7.58579C19.7893 7.96086 20 8.46957 20 9V21C20 21.5304 19.7893 22.0391 19.4142 22.4142C19.0391 22.7893 18.5304 23 18 23Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button className="p-1 active:scale-90" onClick={handleUpdateModal}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 2xl:w-6 2xl:h-6 text-c"
          >
            <path
              d="M11 4C8.8 4 7 5.8 7 8C7 10.2 8.8 12 11 12C13.2 12 15 10.2 15 8C15 5.8 13.2 4 11 4ZM11 14C6.6 14 3 15.8 3 18V20H12.5C12.2 19.2 12 18.4 12 17.5C12 16.3 12.3 15.2 12.9 14.1C12.3 14.1 11.7 14 11 14ZM18 20C16.6 20 15.5 18.9 15.5 17.5C15.5 17.1 15.6 16.7 15.8 16.4L14.7 15.3C14.3 15.9 14 16.7 14 17.5C14 19.7 15.8 21.5 18 21.5V23L20.2 20.8L18 18.5V20ZM18 13.5V12L15.8 14.2L18 16.4V15C19.4 15 20.5 16.1 20.5 17.5C20.5 17.9 20.4 18.3 20.2 18.6L21.3 19.7C21.7 19.1 22 18.3 22 17.5C22 15.3 20.2 13.5 18 13.5Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <hr className="border-d" />
        <button className="p-1 active:scale-90" onClick={handleLeaveModal}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 2xl:w-6 2xl:h-6 text-c"
          >
            <path
              d="M9.99984 2.5C9.07484 2.5 8.33317 3.24167 8.33317 4.16667H2.49984V15.8333H1.6665V17.5H18.3332V15.8333H17.4998V4.16667C17.4998 3.24167 16.7582 2.5 15.8332 2.5H9.99984ZM9.99984 4.16667H15.8332V15.8333H9.99984V4.16667ZM4.1665 9.16667H5.83317V10.8333H4.1665V9.16667Z"
              fill="currentColor"
            />
          </svg>
        </button>
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
