import fetchApi from './api';
import { Message, Room } from '../types/type';

const endpoint = '/chat';

export async function createRoom(body: { title: string; namespace: string }) {
  return (await fetchApi<Room>(`${endpoint}/rooms`, 'POST', body)).payload;
}

export async function getRoom(param: string) {
  return (await fetchApi<Room>(`${endpoint}/rooms/${param}`, 'GET')).payload;
}

export async function getMessagesFromRoom(param: {
  roomId: string;
  page: number;
  participantId: string;
}) {
  const { roomId, page, participantId } = param;
  return (
    await fetchApi<Message[]>(
      `${endpoint}/messages/${roomId}/${page}${
        participantId && '/' + participantId
      }`,
      'GET'
    )
  ).payload;
}
