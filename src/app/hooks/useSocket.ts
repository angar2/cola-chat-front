import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message, Participant } from '@/shared/types/type';
import {
  getLocalRoomParticipants,
  saveLocalRoomParticipants,
} from '@/shared/utils/storage';
import { emitJoin, emitLeave } from '@/shared/webSockets/emit';

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

      // 채팅방 입장
      emitJoin(
        socket,
        { roomId, participantId: getLocalRoomParticipants()[roomId] },
        (param1, param2) => saveLocalRoomParticipants(param1, param2)
      );
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

    const handleBeforeUnload = () => {
      // 채팅방 퇴장
      emitLeave(socket, { roomId }, () => setSocket(null));
    };

    // 페이지 이벤트 설정(방 퇴장)
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // 페이지 이벤트 제거
      window.removeEventListener('beforeunload', handleBeforeUnload);

      // 소켓 연결 해제
      socket.disconnect();
    };
  }, [namespace, roomId]);

  return socket;
}
