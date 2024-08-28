'use client';

import React, { useState } from 'react';
import { createRoom } from '@/shared/apis/chatApi';

const NAMESPACE = 'anonymous';
export default function CreateChatRoomBox() {
  const [roomTitle, setRoomTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(event.target.value);
  };

  const handleClick = async () => {
    if (roomTitle.trim() === '') {
      setError('채팅방 이름을 입력해주세요.');
      return;
    }

    const room = await createRoom({
      title: roomTitle,
      namespace: NAMESPACE,
    });
    room && window.open(`/chat/${room.id}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <input
          type="text"
          value={roomTitle}
          onChange={handleChange}
          placeholder="채팅방 이름"
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-sm mt-2 text-red-500">{error}</p>}{' '}
      </div>
      <div className="">
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          만들기
        </button>
      </div>
    </div>
  );
}
