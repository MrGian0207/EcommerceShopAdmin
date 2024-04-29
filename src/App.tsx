import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes/routes';
import { memo } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';

function App() {
   return (
      <Router>
         <AuthProvider>
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
         </AuthProvider>
      </Router>
   );
}

export default memo(App);
