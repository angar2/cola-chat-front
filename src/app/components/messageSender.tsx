'use client';

import { emitMessage } from '@/shared/webSockets/emit';
import { RefObject, useState } from 'react';
import { Socket } from 'socket.io-client';

type Props = {
  roomId: string;
  socket: Socket | null;
  endOfMessagesRef: RefObject<HTMLDivElement>;
};

export default function MessageSender(props: Props) {
  const { roomId, socket, endOfMessagesRef } = props;

  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && content.trim() !== '') {
      // 메세지 전송
      emitMessage(socket, { roomId, content }, () => {
        setContent('');
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
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
