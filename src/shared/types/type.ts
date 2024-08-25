import { MessageType } from './enum';

export type Room = {
  id: string;
  title: string;
  namespace: string;
  createdAt: Date;
  expiresAt: Date;
  isExpired: boolean;
  userId: string | null;
};

export type Participant = {
  id: string;
  nickname: string;
  createdAt: Date;
  deletedAt: Date | null;
  isActive: boolean;
};

export type Message = {
  id: number;
  type: MessageType;
  content: string;
  sentAt: Date;
  roomId: string;
  participantId: string;
  participant: Participant;
};
