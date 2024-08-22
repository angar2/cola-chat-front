import fetchApi from './api';

const endpoint = '/chat';

export async function createRoom(name: string) {
  return await fetchApi<{ id: string }>(`${endpoint}/rooms`, 'POST', { name });
}
