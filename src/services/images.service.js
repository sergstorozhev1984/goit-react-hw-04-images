import axios from 'axios';
const imagesService = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '31736182-1e49e5184d5967b35aa45da96',
    per_page: 12,
    orientation: 'horizontal',
    image_type: 'photo',
  },
});
export const getImages = async (query, page) => {
  const { data } = await imagesService.get(`?q=${query}&page=${page}`);
  return data;
};
