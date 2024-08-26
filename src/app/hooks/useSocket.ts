import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import generateNickname from '@/shared/utils/nickname';
import { Message } from '@/shared/types/type';

const SOCKET_BASE_URL = process.env.NEXT_PUBLIC_SOCKET_BASE_URL as string;

export default function useSocket(
  roomId: string,
  namespace: string,
  onMessage: (message: Message) => void
) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!namespace) return;

    const socket = io(`${SOCKET_BASE_URL}/${namespace}`, {
      transports: ['websocket'],
      autoConnect: false,
    });

    // 소켓 연결
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      const nickname = generateNickname();

      // 방 입장
      socket.emit('join', { roomId, nickname });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('ping', (message) => {
      console.log('New ping:', message);
      onMessage(message);
    });

    socket.on('message', (message) => {
      console.log('New message:', message);
      onMessage(message);
    });

    setSocket(socket);

    return () => {
      // 소켓 연결 해제
      socket.disconnect();
    };
  }, [namespace, roomId]);

  return socket;
}
