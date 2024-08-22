'use client';

import React, { useState } from 'react';
import { createRoom } from '@/shared/apis/chatApi';

export default function CreateChatRoomBox() {
  const [roomName, setRoomName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleClick = async () => {
    if (roomName.trim() === '') {
      setError('채팅방 이름을 입력해주세요.');
      return;
    }

    const response = await createRoom(roomName);
    const roomId = response.payload.id;
    window.open(`/chat/${roomId}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <input
          type="text"
          value={roomName}
          onChange={handleChange}
          placeholder="채팅방 이름"
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
