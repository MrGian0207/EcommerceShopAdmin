import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '~/context/AuthContext'
import { usePath } from '~/context/PathContext'
import * as Toastify from '~/services/Toastify'
import { Slide } from '~/types/ImageSliderType'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './ImageSlider.module.scss'

const cx = classNames.bind(styles)

type ImageSliderProps = {
  slider: Slide
}

function ImageSlider({ slider }: ImageSliderProps): JSX.Element {
  const { path } = usePath()
  const { accessToken } = useAuth()

  const handleDeleteSlide = async (id: string | undefined) => {
    if (id) {
      try {
        Toastify.showToastMessagePending()
        const fetchDelete = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}${path}/delete/${id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        const resData = await fetchDelete.json()

        if (fetchDelete.ok) {
          Toastify.showToastMessageSuccessfully(resData.message)
        } else {
          Toastify.showToastMessageFailure(resData.message)
        }
      } catch (error) {
        Toastify.showToastMessageFailure('Error occurred while deleting slide')
      }
    }
  }

  return (
    <div className={cx('slide')}>
      <div
        key={slider._id}
        style={{
          backgroundImage: `url('${slider.image}')`,
        }}
        className={`${styles['image-slide']} ${styles['animate-slide']}`}
      >
        <div className={cx('content-slide')}>
          {/* Title */}
          <div className={cx('title')}>
            <h1>{slider.heading}</h1>
          </div>
          {/* Description */}
          <div className={cx('description')}>
            <h6>{slider.description}</h6>
          </div>
          {/* Button */}
          <div className={cx('actions-button')}>
            <button
              className={cx('delete-button')}
              onClick={() => {
                handleDeleteSlide(slider._id)
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
              <p>Delete</p>
            </button>
            <Link to={`/slides/${slider._id}`} className={cx('edit-button')}>
              <FontAwesomeIcon icon={faPen} />
              <p>Edit</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageSlider
