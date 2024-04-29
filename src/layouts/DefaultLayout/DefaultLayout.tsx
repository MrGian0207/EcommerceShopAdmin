import classNames from 'classnames/bind';
import styles from './DefautLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faBell,
   faCheck,
   faChevronDown,
   faClock,
   faHome,
   faMoon,
   faSearch,
   faSun,
   faUser,
} from '@fortawesome/free-solid-svg-icons';
import { ReactNode, useEffect, useRef, useState, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/Image';

const cx = classNames.bind(styles);

type DefaultLayoutType = {
   active?: string;
   page: string[];
   children?: ReactNode;
   searchEngine?: boolean;
   buttons?: JSX.Element[];
};

type User = {
   fullName?: string;
   gender?: string;
   phoneNumber?: number;
   emailAddress?: string;
   password?: string;
   status?: string;
   role?: string;
   about?: string;
   image?: string;
};

function DefaultLayout({
   active,
   page,
   children,
   searchEngine = false,
   buttons,
}: DefaultLayoutType): JSX.Element {
   const { logout, accessToken } = useAuth()!;
   const navigate = useNavigate();
   const [languageToggle, setLanguageToggle] = useState(false);
   const [notificationToggle, setNotificationToggle] = useState(false);
   const [menuToggle, setMenuToggle] = useState(false);
   const [changeTheme, setChangeTheme] = useState(false);
   const languageRef = useRef<HTMLDivElement>(null);
   const languageTitleRef = useRef<HTMLDivElement>(null);
   const notificationRef = useRef<HTMLDivElement>(null);
   const notificationIconRef = useRef<HTMLDivElement>(null);
   const menuRef = useRef<HTMLDivElement>(null);
   const imageMenuRef = useRef<HTMLDivElement>(null);
   const inputSearchRef = useRef<HTMLInputElement>(null);

   const location = useLocation();
   let path = location.pathname; // Lấy đường dẫn từ URL
   let titleNavigator: string = '';

   const handleSearchButtonClick = () => {
      // Kiểm tra inputRef có tồn tại trước khi focus
      if (inputSearchRef.current) {
         inputSearchRef.current.focus();
      }
   };

   const [dataUser, setdataUser] = useState<User>({});
   useEffect(() => {
      const fetchData = async () => {
         const id_user: string = localStorage.getItem('id_user')
            ? (localStorage.getItem('id_user') as string)
            : '';
         try {
            const res = await fetch(`http://localhost:8000/users/${id_user}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
               },
               credentials: 'include',
            });
            const resData = await res.json();
            setdataUser(resData.data);
         } catch (error) {
            console.log(error);
         }
      };
      fetchData();
   }, [accessToken]);

   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (
            !languageRef.current?.contains(event.target as Element) &&
            !languageTitleRef.current?.contains(event.target as Element)
         ) {
            setLanguageToggle(false);
         }

         if (
            !notificationRef.current?.contains(event.target as Element) &&
            !notificationIconRef.current?.contains(event.target as Element)
         ) {
            setNotificationToggle(false);
         }

         if (
            !menuRef.current?.contains(event.target as Element) &&
            !imageMenuRef.current?.contains(event.target as Element)
         ) {
            setMenuToggle(false);
         }
      }
      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, []);

   return (
      <div className={cx('default-layout')}>
         <div className={cx('sideBar')}>
            <SideBar active={active} />
         </div>
         <div className={cx('content-layout')}>
            <div className={cx('header')}>
               {/* SearchEngine */}
               {searchEngine && (
                  <div className={cx('search-box')}>
                     <div className={cx('search-engine')}>
                        <div
                           onClick={handleSearchButtonClick}
                           className="icon-search"
                        >
                           <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <div className={cx('input-search')}>
                           <input
                              ref={inputSearchRef}
                              type="text"
                              placeholder="Search"
                           />
                        </div>
                     </div>
                  </div>
               )}
               {/*End SearchEngine */}

               {/* Language */}
               <div
                  ref={languageTitleRef}
                  onClick={() => {
                     setLanguageToggle((prevState) => !prevState);
                  }}
                  className={cx('language')}
               >
                  English
                  <span>
                     <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                  <div
                     ref={languageRef}
                     className={cx('language-popper')}
                     style={{
                        display: languageToggle ? 'block' : 'none',
                     }}
                  >
                     <div
                        onClick={(e) => e.stopPropagation()}
                        className={cx('title')}
                     >
                        <h6>Select Language</h6>
                     </div>
                     <ul
                        onClick={(e) => e.stopPropagation()}
                        className={cx('list-lang')}
                     >
                        <li>
                           <span className={cx('nation-flag')}>
                              <img
                                 src="https://i.pinimg.com/736x/47/29/c1/4729c12f2d0c55ab7aaba63e09cb5f67.jpg"
                                 alt="Nation Flag"
                              />
                           </span>
                           <p>English</p>
                           <span className={cx('check')}>
                              <FontAwesomeIcon icon={faCheck} />
                           </span>
                        </li>
                        <li>
                           <span className={cx('nation-flag')}>
                              <img
                                 src="https://i.pinimg.com/564x/96/ed/5b/96ed5b109524a2705a4e3aaeaa9048f6.jpg"
                                 alt="Nation Flag"
                              />
                           </span>
                           <p>Viet Nam</p>
                           <span className={cx('check')}>
                              <FontAwesomeIcon icon={faCheck} />
                           </span>
                        </li>
                     </ul>
                  </div>
               </div>
               {/* END Language */}

               {/* Notification */}
               <div
                  ref={notificationIconRef}
                  onClick={() => {
                     setNotificationToggle((prevState) => !prevState);
                  }}
                  className={cx('notification')}
               >
                  <FontAwesomeIcon className={cx('icon')} icon={faBell} />
                  <span className={cx('quantity-noti')}>2</span>
                  <div
                     ref={notificationRef}
                     style={{
                        display: notificationToggle ? 'block' : 'none',
                     }}
                     className={cx('notification-popper')}
                  >
                     <div
                        onClick={(e) => e.stopPropagation()}
                        className={cx('title')}
                     >
                        <h6>Notifications</h6>
                     </div>
                     <ul
                        onClick={(e) => e.stopPropagation()}
                        className={cx('list-nofi')}
                     >
                        <li>
                           <span className={cx('user-img')}>
                              <img
                                 src="https://i.pinimg.com/564x/ed/5a/15/ed5a159c5812ac0f16b620b082a816e7.jpg"
                                 alt="User"
                              />
                           </span>
                           <div className={cx('content-nofi')}>
                              <p className={cx('content')}>
                                 <b>MrGian</b> is placed an order from Viet Nam
                              </p>
                              <div className={cx('time')}>
                                 <FontAwesomeIcon icon={faClock} />
                                 <span
                                    style={{
                                       marginLeft: '5px',
                                    }}
                                 >
                                    3 days
                                 </span>
                              </div>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
               {/* END Notification */}

               {/* Theme Mode */}
               <div
                  onClick={() => {
                     setChangeTheme((prevState) => !prevState);
                  }}
                  className={cx('theme-mode')}
               >
                  <FontAwesomeIcon
                     className={cx('icon')}
                     icon={changeTheme ? faSun : faMoon}
                  />
               </div>
               {/* END Theme Mode */}

               {/* User Menu */}
               <div
                  ref={imageMenuRef}
                  onClick={() => {
                     setMenuToggle((prevState) => !prevState);
                  }}
                  className={cx('user-menu')}
               >
                  <img src={dataUser?.image ? dataUser.image : ''} alt="user" />
                  <div
                     onClick={(e) => {
                        e.stopPropagation();
                     }}
                     style={{
                        display: menuToggle ? 'block' : 'none',
                     }}
                     ref={menuRef}
                     className={cx('menu-popper')}
                  >
                     <div
                        onClick={(e) => e.stopPropagation()}
                        className={cx('title')}
                     >
                        <b>
                           {dataUser?.fullName
                              ? dataUser?.fullName
                              : images.userDefaults}
                        </b>
                        <p>
                           {dataUser?.emailAddress
                              ? dataUser?.emailAddress
                              : ''}
                        </p>
                     </div>
                     <ul className={cx('list-options-menu')}>
                        <li>
                           <Link to="/dashboard">
                              <FontAwesomeIcon
                                 className={cx('icon')}
                                 icon={faHome}
                              />
                              <p>Home</p>
                           </Link>
                        </li>
                        <li>
                           <Link to="/settings">
                              <FontAwesomeIcon
                                 className={cx('icon')}
                                 icon={faUser}
                              />
                              <p>Profile Setting</p>
                           </Link>
                        </li>
                     </ul>
                     <div className={cx('logout')}>
                        <button
                           onClick={() => {
                              logout();
                              navigate('/auth/login');
                           }}
                           className={cx('button-logout')}
                        >
                           Logout
                        </button>
                     </div>
                  </div>
               </div>
               {/* End User Menu */}
            </div>

            <div className={cx('page-title')}>
               <div className={cx('title')}>
                  {page.length > 0 &&
                     page.map((value, index) => {
                        if (index === 0 && page.length > 1) {
                           for (let i: number = path.length - 1; i >= 0; i--) {
                              if (path[i] === '/') {
                                 titleNavigator = path.slice(0, i);
                                 path = titleNavigator;
                                 break;
                              }
                           }
                           return (
                              <span
                                 key={index}
                                 className={cx('page-title-item-first')}
                              >
                                 <Link to={`/${value.toLowerCase()}`}>
                                    {value}
                                 </Link>
                              </span>
                           );
                        } else if (index > 0 && index < page.length - 1) {
                           return (
                              <span
                                 key={index}
                                 className={cx('page-title-item-middle')}
                              >
                                 <Link to={titleNavigator}>{value}</Link>
                              </span>
                           );
                        } else if (index === page.length - 1) {
                           return (
                              <span
                                 key={index}
                                 className={cx('page-title-item-last')}
                              >
                                 {value}
                              </span>
                           );
                        }
                        return null;
                     })}
               </div>
               <div className={cx('button')}>
                  {buttons && (
                     <>
                        {buttons?.map((button, index) => {
                           return (
                              <div key={`${index}-button-edit`}>{button}</div>
                           );
                        })}
                     </>
                  )}
               </div>
            </div>
            <div className={cx('content')}>{children}</div>
         </div>
      </div>
   );
}

export default memo(DefaultLayout);
