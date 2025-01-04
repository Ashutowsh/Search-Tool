import axios from 'axios';

export async function fetchSearchResults(query: string) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
      params: { q: query },
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return { data: res.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response?.data?.message || error.message };
  }
}
