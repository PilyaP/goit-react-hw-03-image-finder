import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '35020520-428c05ef93bb42e5f6e2895e2';

export const pixabayApi = async (query, page) => {
  try {
    const response = await axios.get('', {
      params: {
        q: query,
        page: page,
        key: KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    toast.error('Произошла ошибка при загрузке данных');
    throw error;
  }
};
