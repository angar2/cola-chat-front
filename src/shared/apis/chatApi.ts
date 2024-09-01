import fetchApi from './api';
import { Message, Room } from '../types/type';
import { notFound } from 'next/navigation';

const endpoint = '/chat';

export async function createRoom(body: { title: string; namespace: string }) {
  const response = await fetchApi<Room>(`${endpoint}/rooms`, 'POST', body);
  return response.data;
}

export async function getRoom(param: string) {
  const response = await fetchApi<Room>(`${endpoint}/rooms/${param}`, 'GET');
  if (!response.success) return notFound();
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
