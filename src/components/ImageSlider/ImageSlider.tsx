import styles from './ImageSlider.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Toastify from '~/services/Toastify';

const cx = classNames.bind(styles);

type Slide = {
   _id?: string;
   heading?: string;
   primaryButtonText?: string;
   primaryButtonLink?: string;
   secondaryButtonText?: string;
   secondaryButtonLink?: string;
   description?: string;
   displaySlide?: string;
   image?: string;
};

interface ImageSliderProps {
   data: Slide[];
}

function ImageSlider({ data }: ImageSliderProps): JSX.Element {
   const slideRef = useRef<HTMLDivElement>(null);
   const [slider, setSlider] = useState<Slide[]>(data);
   if (data.length === 0) {
      setSlider([]);
   }
   const [deleteButtonOnclick, SetDeleteButtonOnclick] = useState(false);

   useEffect(() => {
      const interval = setInterval(() => {
         setSlider((prevSliderArray) => [
            ...prevSliderArray.filter((_, index) => index !== 0),
            prevSliderArray[0],
         ]);
      }, 5000);
      return () => {
         clearInterval(interval);
      };
   }, [slider.length]);

   return (
      <div className={cx('slide')}>
         <div
            ref={slideRef}
            key={slider[0]._id}
            style={{
               backgroundImage: `url('${slider[0].image}')`,
            }}
            className={`${styles['image-slide']} ${styles['animate-slide']}`}
         >
            <div className={cx('content-slide')}>
               {/* Title */}
               <div className={cx('title')}>
                  <h1>{slider[0].heading}</h1>
               </div>
               {/* Description */}
               <div className={cx('description')}>
                  <h6>{slider[0].description}</h6>
               </div>
               {/* Button */}
               <div className={cx('actions-button')}>
                  <button
                     className={cx('delete-button')}
                     onClick={() => {
                        if (!deleteButtonOnclick) {
                           Toastify.handleDeteleToastify(
                              'slide',
                              slider[0]._id as string,
                              '/slides',
                              SetDeleteButtonOnclick,
                           );
                           SetDeleteButtonOnclick(true);
                        }
                     }}
                  >
                     <FontAwesomeIcon icon={faTrash} />
                     <p>Delete</p>
                  </button>
                  <Link
                     to={`/slides/${slider[0]._id}`}
                     className={cx('edit-button')}
                  >
                     <FontAwesomeIcon icon={faPen} />
                     <p>Edit</p>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ImageSlider;
