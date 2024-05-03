import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes/routes';
import { memo } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';

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
               </div>
               <ToastContainer role="alert" />
            </UserContextProvider>
         </AuthProvider>
      </Router>
   );
}

export default memo(App);
