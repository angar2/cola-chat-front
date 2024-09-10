import { validateRoomEntry, verifyRoomPassword } from '@/shared/apis/chatApi';
import { Room } from '@/shared/types/type';
import { saveSessionRoomChatters } from '@/shared/utils/storage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {
  isOpen: boolean;
  room: Room;
  setIsEntryConfirmed: (value: boolean) => void;
  setIsErrorModalOpen: (value: boolean) => void;
  setEerrorMessage: (value: string) => void;
};

export default function EnterConfirmModal(props: Props) {
  const {
    isOpen,
    room,
    setIsEntryConfirmed,
    setIsErrorModalOpen,
    setEerrorMessage,
  } = props;

  const router = useRouter();

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);

  if (!isOpen) return null;

  // 비밀번호 입력 인풋
  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 채팅방 입장 o
  const handleConfirm = async () => {
    const result = await validateRoomEntry(room.id, { password });
    if (!result.success) {
      setEerrorMessage(result.message);
      setIsErrorModalOpen(true);
    }
    if (!result.data) {
      setPassword('');
      setPasswordError(true);
      return;
    }

    saveSessionRoomChatters(room.id);
    setIsEntryConfirmed(true);
  };

  // 채팅방 입장 x
  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-fit min-w-48 px-6 pt-6 pb-4 rounded bg-a shadow-lg text-center">
        <h2 className="text-base 2xl:text-lg font-medium mb-4 whitespace-nowrap">
          채팅방에 입장하시겠습니까?
        </h2>
        {room.isPassword && (
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={handleInputPassword}
              placeholder={
                passwordError ? '비밀번호가 틀렸습니다.' : '비밀번호'
              }
              className={`w-[80%] px-2 py-1 border-[0.8px] border-g disabled:border-d focus:outline-none focus:ring-1 focus:ring-d placeholder:text-sm placeholder:text-center ${
                passwordError && 'placeholder:text-e'
              }`}
            />
          </div>
        )}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="w-16 py-2 bg-f text-a text-sm 2xl:text-base rounded"
          >
            네
          </button>
          <button
            onClick={handleClose}
            className="w-16 py-2 bg-c text-a text-sm 2xl:text-base rounded"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
