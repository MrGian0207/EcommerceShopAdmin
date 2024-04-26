import styles from './UsersPreview.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import images from '~/assets/Image';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

type DataType = {
  fullName?: string;
  emailAddress?: string;
};

function UsersPreview(): JSX.Element {
  const location = useLocation();
  const path = location.pathname;
  const [data, setData] = useState<DataType>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000${path}`);
        const resData = await res.json();
        setData(resData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [path]);

  return (
    <div className={cx('users')}>
      <DefaultLayout active={'users'} page={['Dashboard', 'Users', 'Details']}>
        <div className={cx('user')}>
          <div className={cx('user-description')}>
            <div className={cx('user-info')}>
              <div className={cx('user-image')}>
                <img src={images.userDefaults} alt="default" />
              </div>
              <div className={cx('user-name-email')}>
                <h4>{data.fullName}</h4>
                <p>{data.emailAddress}</p>
              </div>
            </div>
          </div>
          <div className={cx('user-data')}>
            <img src={images.noDataUser} alt="no-data-user" />
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default UsersPreview;