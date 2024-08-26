'use client';

import { useState } from 'react';
import { Socket } from 'socket.io-client';

type Props = {
  roomId: string;
  socket: Socket | null;
};

export default function MessageSender(props: Props) {
  const { roomId, socket } = props;

  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && content.trim() !== '') {
      socket.emit('message', { roomId, content });
      setContent('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex p-4">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-l"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r"
        disabled={!socket}
      >
        전송
      </button>
    </form>
  );
}
