import { API_URL } from '../../../constants/constants';
import ImageContentPlaceholder from '../../../assets/images/placeholder/content-placeholder.png';

export const getImageURL = (post: { image: string | null }) => {
  const imageURL: string = post.image
    ? `${API_URL}/${post.image}`
    : ImageContentPlaceholder;

  return imageURL;
};
