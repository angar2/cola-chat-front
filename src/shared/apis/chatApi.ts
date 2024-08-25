import fetchApi from './api';
import { Room } from '../types/type';

const endpoint = '/chat';

export async function createRoom(body: { title: string; namespace: string }) {
  return (await fetchApi<Room>(`${endpoint}/rooms`, 'POST', body))
    .payload;
}

export async function getRoom(param: string) {
  return (await fetchApi<Room>(`${endpoint}/rooms/${param}`, 'GET')).payload;
}
