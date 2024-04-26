import styles from './Setting.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import { useState, useRef } from 'react';
import ProfileSetting from '~/components/ProfileSetting';
import Roles from '~/components/Roles';
import AddRole from '~/components/AddRole';
import ChangePassword from '~/components/ChangePassword';

const cx = classNames.bind(styles);
type LineBreakProp = {
   nameRef: React.RefObject<HTMLButtonElement>;
   activeRef: React.RefObject<HTMLSpanElement>;
};

function Settings(): JSX.Element {
   const [component, setComponent] = useState<string>('Profile Setting');
   const profileSettingRef = useRef<HTMLButtonElement>(null);
   const rolesRef = useRef<HTMLButtonElement>(null);
   const addRoleRef = useRef<HTMLButtonElement>(null);
   const changePasswordRef = useRef<HTMLButtonElement>(null);
   const activeButtonRef = useRef<HTMLSpanElement>(null);

   function LineBreak({ nameRef, activeRef }: LineBreakProp) {
      // Tính toán width dựa trên kích thước của nút hiện tại
      const width = nameRef?.current?.offsetWidth || 126;

      let leftPosition = 0;
      switch (nameRef) {
         case profileSettingRef:
            leftPosition = 0;
            break;
         case rolesRef:
            if (profileSettingRef?.current)
               leftPosition = profileSettingRef?.current?.offsetWidth + 40;
            break;
         case addRoleRef:
            if (profileSettingRef?.current && rolesRef?.current)
               leftPosition =
                  profileSettingRef?.current?.offsetWidth +
                  rolesRef?.current?.offsetWidth +
                  80;
            break;
         case changePasswordRef:
            if (
               profileSettingRef?.current &&
               rolesRef?.current &&
               addRoleRef?.current
            )
               leftPosition =
                  profileSettingRef?.current?.offsetWidth +
                  rolesRef?.current?.offsetWidth +
                  addRoleRef?.current?.offsetWidth +
                  120;
            break;
         default:
            leftPosition = 0;
            break;
      }

      return (
         <span
            style={{
               width: `${width}px`,
               left: `${leftPosition}px`,
            }}
            ref={activeRef}
            className={`${styles['active-button']}`}
         ></span>
      );
   }

   const renderComponent = () => {
      switch (component) {
         case 'Profile Setting':
            return <ProfileSetting />;
         case 'Roles':
            return <Roles />;
         case 'Add Role':
            return <AddRole />;
         case 'Change Password':
            return <ChangePassword />;
         default:
            return <ProfileSetting />;
      }
   };

   const LineBreakRef = (
      component: string,
      profileSettingRef: React.RefObject<HTMLButtonElement>,
      rolesRef: React.RefObject<HTMLButtonElement>,
      addRoleRef: React.RefObject<HTMLButtonElement>,
      changePasswordRef: React.RefObject<HTMLButtonElement>,
   ): React.RefObject<HTMLButtonElement> => {
      switch (component) {
         case 'Profile Setting':
            return profileSettingRef;
         case 'Roles':
            return rolesRef;
         case 'Add Role':
            return addRoleRef;
         case 'Change Password':
            return changePasswordRef;
         default:
            return profileSettingRef;
      }
   };

   const nameRef = LineBreakRef(
      component,
      profileSettingRef,
      rolesRef,
      addRoleRef,
      changePasswordRef,
   );

   return (
      <div className={cx('brands')}>
         <DefaultLayout active={'settings'} page={['Dashboard', 'Setting']}>
            <div className={cx('settings')}>
               <nav className={cx('navigator')}>
                  <button
                     ref={profileSettingRef}
                     onClick={() => {
                        setComponent('Profile Setting');
                     }}
                  >
                     Profile Setting
                  </button>
                  <button
                     ref={rolesRef}
                     onClick={() => {
                        setComponent('Roles');
                     }}
                  >
                     Roles
                  </button>
                  <button
                     ref={addRoleRef}
                     onClick={() => {
                        setComponent('Add Role');
                     }}
                  >
                     Add Role
                  </button>
                  <button
                     ref={changePasswordRef}
                     onClick={() => {
                        setComponent('Change Password');
                     }}
                  >
                     Change Password
                  </button>
                  <LineBreak nameRef={nameRef} activeRef={activeButtonRef} />
               </nav>
               <div className={cx('content')}>{renderComponent()}</div>
            </div>
         </DefaultLayout>
      </div>
   );
}

export default Settings;
