import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes/routes';
import { memo, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';
import Loading from './components/Loading';

function App() {
   return (
      <Router>
         <AuthProvider>
            <UserContextProvider>
               <div
                  style={{
                     display: 'block',
                     height: '100vh',
                  }}
                  className="App"
               >
                  <Suspense fallback={<Loading />}>
                     <Routes>
                        {publicRoutes.map((route, index) => {
                           let Page = route.component;
                           return (
                              <Route
                                 key={index}
                                 path={route.path}
                                 element={<Page />}
                              />
                           );
                        })}
                     </Routes>
                  </Suspense>
               </div>
               <ToastContainer role="alert" />
            </UserContextProvider>
         </AuthProvider>
      </Router>
   );
}

export default memo(App);
