import { Socket } from 'socket.io-client';
import { Chatter } from '../types/type';
import { notFound } from 'next/navigation';
import { SocketEvent } from '../types/enum';

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
  socket.emit(SocketEvent.JOIN, data, (response: WSResponse<Chatter>) => {
    if (response.success) {
      callback1(data.roomId, response.data.id);
      callback2(data.roomId, response.data);
    } else return notFound();
  });
}

// 채팅방 퇴장
export function emitLeave(socket: Socket, callback?: () => void) {
  socket.emit(SocketEvent.LEAVE, (response: WSResponse<null>) => {
    if (response.success) callback && callback();
  });
}

// 메세지 전송
export function emitMessage(
  socket: Socket,
  data: { roomId: string; content: string },
  callback?: () => void
) {
  socket.emit(SocketEvent.MESSAGE, data, (response: WSResponse<null>) => {
    if (response.success) callback && callback();
    else return notFound();
  });
}

// 공지 전송
export function emitAlert(
  socket: Socket,
  data: { roomId: string; content: string },
  callback?: () => void
) {
  socket.emit(SocketEvent.ALERT, data, (response: WSResponse<null>) => {
    if (response.success) callback && callback();
  });
}

// 온라인 채터 상태 요청
export function emitChatters(
  socket: Socket,
  data: { roomId: string },
  callback?: () => void
) {
  socket.emit(SocketEvent.CHATTERS, data, (response: WSResponse<null>) => {
    if (response.success) callback && callback();
  });
}
