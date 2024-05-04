import styles from './Slides.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageSlider from '~/components/ImageSlider';
import { useUpdateLayout } from '~/context/UpdateLayoutContext';
import { useAuth } from '~/context/AuthContext';

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

function Slides(): JSX.Element {
   const { updateLayout } = useUpdateLayout()!;
   const location = useLocation();
   const path = location.pathname;
   const [data, setData] = useState<Slide[]>([]);
   const { accessToken } = useAuth()!;

   useEffect(() => {
      document.title = 'Slide | NextStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      const fetchData = async () => {
         const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}${path}`,
            {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
               },
            },
         );
         const resData = await res.json();
         setData(resData.data);
      };
      fetchData();
   }, [path, updateLayout, accessToken]);

   return (
      <div className={cx('slides')}>
         <DefaultLayout
            active={'slides'}
            page={['Dashboard', 'Slides']}
            searchEngine={true}
            buttons={[
               <Button to={'/slides/add'} className="button-add">
                  <FontAwesomeIcon icon={faPlus} />
                  Add Slide
               </Button>,
            ]}
         >
            {data.length > 0 && <ImageSlider data={data} />}
         </DefaultLayout>
      </div>
   );
}

export default Slides;
