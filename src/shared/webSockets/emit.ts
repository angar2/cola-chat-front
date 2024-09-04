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
  callback1: (param1: string, param2: string) => void,
  callback2: (param1: string, param2: Chatter) => void
) {
  socket.emit('join', data, (response: WSResponse<Chatter>) => {
    if (response.success) {
      callback1(data.roomId, response.data.id);
      callback2(data.roomId, response.data);
    } else return notFound();
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

// 공지 전송
export function emitPing(
  socket: Socket,
  data: { roomId: string; content: string },
  callback?: () => void
) {
  socket.emit('ping', data, (response: WSResponse<null>) => {
    if (response.success) callback && callback();
  });
}
