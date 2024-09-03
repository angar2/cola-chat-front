import { MessageType } from './enum';

export type Room = {
  id: string;
  title: string;
  namespace: string;
  createdAt: Date;
  expiresAt: Date;
  isExpired: boolean;
  isPassword: boolean;
  userId: string | null;
};

export type Chatter = {
  id: string;
  nickname: string;
  createdAt: Date;
  deletedAt: Date | null;
  isActive: boolean;
};

export type RoomChatter = {
  id: number;
  joinedAt: Date;
  leftAt: Date;
  isActive: boolean;
  roomId: string;
  chatterId: string;
};

export type Message = {
  id: number;
  type: MessageType;
  content: string;
  sentAt: Date;
  roomId: string;
  chatterId: string;
  chatter: Chatter;
};
