import { getToken } from "@/store/authToken";
import { api_url } from "@/app/_layout";


export const fetchFriends = async () => {
    const token = await getToken();
    const res = await fetch(`${api_url}/friends`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  };
  