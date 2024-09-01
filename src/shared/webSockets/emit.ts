import { Socket } from 'socket.io-client';
import { Chatter } from '../types/type';
import { notFound } from 'next/navigation';

interface WSResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// 채팅방 입장
export function emitJoin(
  socket: Socket,
  data: { roomId: string; chatterId: string },
  callback: (param1: string, param2: string) => void
) {
  socket.emit('join', data, (response: WSResponse<Chatter>) => {
    if (response.success) callback(data.roomId, response.data.id);
    else return notFound();
  });
}

// 채팅방 퇴장
export function emitLeave(
  socket: Socket,
  data: { roomId: string },
  callback?: () => void
) {
  socket.emit('leave', data, (response: WSResponse<null>) => {
    if (response.success) callback && callback();
  });
}

// 메세지 전송
export function emitMessage(
  socket: Socket,
  data: { roomId: string; content: string },
  callback?: () => void
) {
  socket.emit('message', data, (response: WSResponse<null>) => {
    if (response.success) callback && callback();
    else return notFound();
  });
}
