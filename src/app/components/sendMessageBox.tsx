'use client';

import React, { useState } from 'react';
import { createRoom } from '@/shared/apis/chatApi';

export default function SendMessageBox({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    onSend(message);
    setMessage(''); // 메시지 전송 후 입력 필드를 비웁니다.
  };

  return (
    <div className="flex justify-between p-2 border-t">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Enter your message"
        className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none text-black"
      />
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
}