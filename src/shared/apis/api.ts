const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default async function fetchApi<T>(
  endpoint: string,
  method: HttpMethod,
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // const responseJson = response.json();
    // if (!response.ok) return 
    // if (!response.ok) {
    //   return {
    //     statusCode: response.status,
    //     payload: null,
    //     error: response.statusText,
    //   };
    // }

    return response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}
