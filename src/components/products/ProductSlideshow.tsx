import 'react-slideshow-image/dist/styles.css';

import { Slide } from 'react-slideshow-image';

import { routes } from '@/utils';

import styles from './ProductSlideshow.module.css';

interface ProductSlideshowProps {
  images: string[];
}

export const ProductSlideshow = ({ images }: ProductSlideshowProps) => {
  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((img) => {
        const url = `${routes.PUBLIC_PRODUCTS}/${img}`;
        return (
          <div key={img} className={styles['each-slide']}>
            <div style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}></div>
          </div>
        );
      })}
    </Slide>
  );
};
