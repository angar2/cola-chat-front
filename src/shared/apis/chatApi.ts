import fetchApi from './api';
import { Message, Room } from '../types/type';

const endpoint = '/chat';

export async function createRoom(body: { title: string; namespace: string }) {
  return (await fetchApi<Room>(`${endpoint}/rooms`, 'POST', body))
    .payload;
}

export async function getRoom(param: string) {
  return (await fetchApi<Room>(`${endpoint}/rooms/${param}`, 'GET')).payload;
}

export async function getMessagesFromRoom(param: string) {
  return (await fetchApi<Message[]>(`${endpoint}/messages/${param}`, 'GET')).payload;
}
