import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import SideBarItems from '../SideBarItems';
import {
   faBars,
   faCartShopping,
   faCopyright,
   faEnvelope,
   faGaugeHigh,
   faGears,
   faImages,
   faLayerGroup,
   faStore,
   faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

type SideBarType = {
   active?: string;
   handleCloseSideBar?: () => void;
   backGroundColor?: string;
};

function SideBar({
   active,
   handleCloseSideBar,
   backGroundColor,
}: SideBarType): JSX.Element {
   const sideBarRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (backGroundColor && sideBarRef.current) {
         sideBarRef.current.style.backgroundColor = backGroundColor;
      }
   }, [backGroundColor]);

   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (
            sideBarRef.current &&
            !sideBarRef.current.contains(event.target as Node)
         ) {
            handleCloseSideBar && handleCloseSideBar();
         }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [handleCloseSideBar]);

   return (
      <div ref={sideBarRef} className={cx('sidebar')}>
         <div className={cx('logo')}>
            <div>
               <span className={cx('style-logo')}>MrGian</span>
               store
            </div>
            <span
               onClick={handleCloseSideBar}
               className={cx('icon-toggleSideBar')}
            >
               <FontAwesomeIcon icon={faBars} />
            </span>
         </div>
         <div className={cx('sidebar-navigator')}>
            <SideBarItems
               iconLeft={faGaugeHigh}
               children={['Dashboard']}
               active={active === 'dashboard' && true}
               title={'dashboard'}
            />
            <SideBarItems
               iconLeft={faLayerGroup}
               children={['Categories', 'Main Categories', 'Sub Categories']}
               iconRight={true}
               active={active === 'categories' && true}
               title={'categories'}
            />
            <SideBarItems
               iconLeft={faCopyright}
               children={['Brands']}
               active={active === 'brands' && true}
               title={'brands'}
            />
            <SideBarItems
               iconLeft={faStore}
               children={['Product']}
               active={active === 'product' && true}
               title={'products'}
            />
            <SideBarItems
               iconLeft={faCartShopping}
               children={['Orders']}
               active={active === 'orders' && true}
               title={'orders'}
            />
            <SideBarItems
               iconLeft={faUsers}
               children={['Users']}
               active={active === 'users' && true}
               title={'users'}
            />
            <SideBarItems
               iconLeft={faEnvelope}
               children={['Newletter']}
               active={active === 'newletter' && true}
               title={'newletter'}
            />
            <SideBarItems
               iconLeft={faImages}
               children={['Slides']}
               active={active === 'slides' && true}
               title={'slides'}
            />
            <SideBarItems
               iconLeft={faGears}
               children={['Setting']}
               active={active === 'settings' && true}
               title={'settings'}
            />
         </div>
      </div>
   );
}

export default SideBar;
