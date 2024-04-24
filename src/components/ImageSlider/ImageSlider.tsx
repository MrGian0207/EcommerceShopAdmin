import styles from './ImageSlider.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  if (data.length === 0) setSlider([]);
  const [indexSlide, setindexSlide] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (indexSlide === slider.length - 1) {
        setindexSlide(0);
      } else {
        setindexSlide(indexSlide + 1);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [indexSlide, slider.length]);
  return (
    <div className={cx('slide')}>
      {slider.map((content) => {
        return (
          <div
            ref={slideRef}
            key={content._id}
            style={{
              backgroundImage: `url('${content.image}')`,
              translate: `${-100 * indexSlide}%`,
            }}
            className={cx('image-slide')}
          >
            <div className={cx('content-slide')}>
              {/* Title */}
              <div className={cx('title')}>
                <h1>{content.heading}</h1>
              </div>
              {/* Description */}
              <div className={cx('description')}>
                <h6>{content.description}</h6>
              </div>
              {/* Button */}
              <div className={cx('actions-button')}>
                <Link to={'/'} className={cx('delete-button')}>
                  <FontAwesomeIcon icon={faTrash} />
                  <p>Delete</p>
                </Link>
                <Link to={'/'} className={cx('edit-button')}>
                  <FontAwesomeIcon icon={faPen} />
                  <p>Edit</p>
                </Link>
              </div>
            </div>
            <div className={cx('slide-navigator')}>
              {data.map((_, index) => {
                return (
                  <div
                    className={cx('img-dot-btn', {
                      active: index === indexSlide,
                    })}
                    key={index}
                    onClick={() => {
                      setindexSlide(index);
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ImageSlider;
