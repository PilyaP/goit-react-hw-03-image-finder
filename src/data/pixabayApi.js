import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '35020520-428c05ef93bb42e5f6e2895e2';

export const pixabayApi = async (query, page) => {
  const { data } = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
