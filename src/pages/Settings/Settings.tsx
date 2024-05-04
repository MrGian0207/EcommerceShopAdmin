import styles from './Setting.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import { useState, useRef, useEffect } from 'react';
import ProfileSetting from '~/pages/Settings/ProfileSetting';
import Roles from '~/pages/Settings/Roles';
import AddRole from '~/pages/Settings/AddRole';
import ChangePassword from '~/pages/Settings/ChangePassword';
import { useUser } from '~/context/UserContext';

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
   const { dataUser } = useUser()!;

   useEffect(() => {
      document.title = 'Setting | NextStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   function LineBreak({ nameRef, activeRef }: LineBreakProp) {
      // Tính toán width dựa trên kích thước của nút hiện tại
      let width = nameRef?.current?.offsetWidth || 140;

      let leftPosition = 0;
      switch (nameRef) {
         case profileSettingRef:
            width = 140;
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
         case 'Roles':
            return <Roles />;
         case 'Add Role':
            return <AddRole />;
         case 'Change Password':
            return <ChangePassword />;
         default:
            profileSettingRef?.current &&
               profileSettingRef?.current.classList.add(cx('active'));
            return <ProfileSetting />;
      }
   };

   const removeActiveButton = (nameButton: string) => {
      switch (nameButton) {
         case 'Profile Setting':
            profileSettingRef?.current &&
               profileSettingRef?.current.classList.remove(cx('active'));
            break;
         case 'Roles':
            rolesRef?.current &&
               rolesRef?.current.classList.remove(cx('active'));
            break;
         case 'Add Role':
            addRoleRef?.current &&
               addRoleRef?.current.classList.remove(cx('active'));
            break;
         case 'Change Password':
            changePasswordRef?.current &&
               changePasswordRef?.current.classList.remove(cx('active'));
            break;
         default:
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
      <div className={cx('settings-container')}>
         <DefaultLayout active={'settings'} page={['Dashboard', 'Setting']}>
            <div className={cx('settings')}>
               <nav className={cx('navigator')}>
                  <button
                     ref={profileSettingRef}
                     className={cx('active')}
                     onClick={() => {
                        profileSettingRef?.current &&
                           profileSettingRef?.current.classList.add(
                              cx('active'),
                           );
                        setComponent((prevComponet) => {
                           removeActiveButton(prevComponet);
                           return 'Profile Setting';
                        });
                     }}
                  >
                     Profile Setting
                  </button>
                  {dataUser?.role === 'Admin' && (
                     <>
                        <button
                           ref={rolesRef}
                           onClick={() => {
                              rolesRef?.current &&
                                 rolesRef?.current.classList.add(cx('active'));
                              setComponent((prevComponent) => {
                                 removeActiveButton(prevComponent);
                                 return 'Roles';
                              });
                           }}
                        >
                           Roles
                        </button>
                        <button
                           ref={addRoleRef}
                           onClick={() => {
                              addRoleRef?.current &&
                                 addRoleRef?.current.classList.add(
                                    cx('active'),
                                 );
                              setComponent((prevComponent) => {
                                 removeActiveButton(prevComponent);
                                 return 'Add Role';
                              });
                           }}
                        >
                           Add Role
                        </button>
                     </>
                  )}
                  <button
                     ref={changePasswordRef}
                     onClick={() => {
                        changePasswordRef?.current &&
                           changePasswordRef?.current.classList.add(
                              cx('active'),
                           );
                        setComponent((prevComponent) => {
                           removeActiveButton(prevComponent);
                           return 'Change Password';
                        });
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
