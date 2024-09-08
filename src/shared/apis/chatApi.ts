import fetchApi from './api';
import { Chatter, Message, Room } from '../types/type';
import { notFound } from 'next/navigation';

const endpoint = '/chat';

export async function createRoom(body: {
  title: string;
  namespace: string;
  capacity: number;
  isPassword: boolean;
  password: string;
}) {
  const response = await fetchApi<Room>(`${endpoint}/rooms`, 'POST', body);
  return response.data;
}

export async function getRoom(param: string) {
  const response = await fetchApi<Room>(`${endpoint}/rooms/${param}`, 'GET');
  if (!response.success) return notFound();
  return response.data;
}

export async function validateRoomEntry(
  param: string,
  body: { password?: string }
) {
  const response = await fetchApi<boolean>(
    `${endpoint}/rooms/${param}/access-check`,
    'POST',
    body
  );
  return response;
}

export async function verifyRoomPassword(
  param: string,
  body: { password: string }
) {
  const response = await fetchApi<Room>(
    `${endpoint}/rooms/${param}`,
    'POST',
    body
  );
  return response.data;
}

export async function checkReentry(param: {
  roomId: string;
  chatterId: string;
}) {
  const { roomId, chatterId } = param;
  const response = await fetchApi<boolean>(
    `${endpoint}/rooms/${roomId}/${chatterId}/reentry-check`,
    'GET'
  );
  return response.data;
}

export async function getMessagesFromRoom(param: {
  roomId: string;
  page: number;
  chatterId: string;
}) {
  const { roomId, page, chatterId } = param;
  const response = await fetchApi<Message[]>(
    `${endpoint}/messages/${roomId}/${page}${chatterId && '/' + chatterId}`,
    'GET'
  );
  return response.data;
}

export async function updateNickname(
  param: { chatterId: string },
  body: { nickname: string }
) {
  const { chatterId } = param;
  return await fetchApi<Chatter>(
    `${endpoint}/chatters/${chatterId}/nickname`,
    'PATCH',
    body
  );
}
