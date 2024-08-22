const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default async function fetchApi<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  body?: any
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}
