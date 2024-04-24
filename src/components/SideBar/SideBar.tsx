import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import SideBarItems from '../SideBarItems';
import {
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

const cx = classNames.bind(styles);

type SideBarType = {
  active?: string;
};

function SideBar({ active }: SideBarType): JSX.Element {
  return (
    <div className={cx('sidebar')}>
      <div className={cx('logo')}>
        <span className={cx('style-logo')}>Next</span>
        store
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
          active={active === 'setting' && true}
          title={'setting'}
        />
      </div>
    </div>
  );
}

export default SideBar;
