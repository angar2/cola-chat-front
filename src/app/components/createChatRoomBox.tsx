'use client';

import React, { useState } from 'react';
import { createRoom } from '@/shared/apis/chatApi';
import { Tooltip } from 'react-tooltip';

const NAMESPACE = 'anonymous';
const headCount = [2, 4, 8, 16];
export default function CreateChatRoomBox() {
  const [roomTitle, setRoomTitle] = useState<string>('');
  const [roomPassword, setRoomPassword] = useState<string>('');
  const [selected, setSelected] = useState<number>(2);
  const [isPassword, setIsPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 제목 입력 인풋
  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(event.target.value);
  };

  // 비밀번호 입력 인풋
  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomPassword(event.target.value);
  };

  // 인원수 라디오 버튼
  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(Number(event.target.value));
  };

  // 비밀번호 설정 체크박스
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isPassword) setRoomPassword('');
    setIsPassword(event.target.checked);
  };

  // 채팅방 생성 버튼
  const handleClick = async () => {
    if (roomTitle.trim() === '') {
      setError('채팅방 제목을 입력해주세요.');
      return;
    }
    if (isPassword && roomPassword.trim() === '') {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    const room = await createRoom({
      title: roomTitle,
      namespace: NAMESPACE,
      capacity: selected,
      isPassword,
      password: roomPassword,
    });
    if (room) {
      window.location.reload();
      window.open(`/chat/${room.id}`, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-col justify items-start w-full p-4 bg-a text-g rounded-sm">
        {/* 채팅방 제목 입력 */}
        <div className="flex items-center gap-4">
          <div className="p-2" id="title">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-g"
            >
              <path d="M5 4V7H10.5V19H13.5V7H19V4H5Z" fill="currentColor" />
            </svg>
            <Tooltip anchorSelect="#title" delayShow={500} content="제목" />
          </div>
          <div className="w-full">
            <input
              type="text"
              value={roomTitle}
              onChange={handleInputTitle}
              placeholder="채팅방 제목"
              className="min-w-60 w-full px-2 py-1 border-[0.8px] border-g focus:outline-none focus:ring-1 focus:ring-d placeholder:text-sm"
            />
          </div>
        </div>

        {/* 인원수 선택 */}
        <div className="flex items-center gap-4">
          <div className="p-2" id="capacity">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-g"
            >
              <path
                d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z"
                fill="currentColor"
              />
            </svg>
            <Tooltip
              anchorSelect="#capacity"
              delayShow={500}
              content="인원수"
            />
          </div>
          <div className="flex gap-6">
            {headCount.map((count) => (
              <label key={count} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={count}
                  checked={selected === count}
                  onChange={handleRadio}
                  className=""
                />
                <span>{count}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 비밀번호 입력 */}
        <div className="flex items-center gap-4 w-full">
          <div className="p-2" id="password">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-g"
            >
              <path
                d="M22 18V22H18V19H15V16H12L9.74 13.74C9.19 13.91 8.61 14 8 14C6.4087 14 4.88258 13.3679 3.75736 12.2426C2.63214 11.1174 2 9.5913 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8C14 8.61 13.91 9.19 13.74 9.74L22 18ZM7 5C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7C5 7.53043 5.21071 8.03914 5.58579 8.41421C5.96086 8.78929 6.46957 9 7 9C7.53043 9 8.03914 8.78929 8.41421 8.41421C8.78929 8.03914 9 7.53043 9 7C9 6.46957 8.78929 5.96086 8.41421 5.58579C8.03914 5.21071 7.53043 5 7 5Z"
                fill="currentColor"
              />
            </svg>
            <Tooltip
              anchorSelect="#password"
              delayShow={500}
              content="비밀번호"
            />
          </div>
          <div className="flex items-center gap-4 min-w-60 w-full">
            <input
              type="checkbox"
              checked={isPassword}
              onChange={handleCheckbox}
              className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <input
              type="password"
              value={roomPassword}
              onChange={handleInputPassword}
              placeholder={isPassword ? '비밀번호' : ''}
              disabled={!isPassword}
              className="w-full px-2 py-1 border-[0.8px] border-g disabled:border-d focus:outline-none focus:ring-1 focus:ring-d placeholder:text-sm"
            />
          </div>
        </div>
      </div>

      {/* 생성 버튼 */}
      <div className="w-full">
        <button
          onClick={handleClick}
          className="w-full px-12 py-4 bg-d text-f text-2xl font-extrabold rounded active:scale-95"
        >
          Open Cola Chat
        </button>
      </div>
      {error && <p className="text-sm mt-2 text-e">{error}</p>}
    </div>
  );
}
