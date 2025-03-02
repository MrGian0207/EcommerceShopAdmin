import { memo } from 'react'
import { publicRoutes } from '~/routes/routes'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from './context/AuthContext'
import { DeleteDataContextProvider } from './context/DeleteDataContext'
import { ModalContextProvider } from './context/ModalContext'
import { PathContextProvider } from './context/PathContext'
import { ProductContextProvider } from './context/ProductContext'
import { TableContextProvider } from './context/TableContext'
import { UserContextProvider } from './context/UserContext'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <PathContextProvider>
        <AuthProvider>
          <UserContextProvider>
            <ModalContextProvider>
              <ProductContextProvider>
                <TableContextProvider>
                  <DeleteDataContextProvider>
                    <div
                      style={{
                        display: 'block',
                        height: '100vh',
                      }}
                      className="App"
                    >
                      <Routes>
                        {publicRoutes.map((route, index) => {
                          const Page = route.component
                          return <Route key={index} path={route.path} element={<Page />} />
                        })}
                      </Routes>
                    </div>
                    <ToastContainer role="alert" />
                  </DeleteDataContextProvider>
                </TableContextProvider>
              </ProductContextProvider>
            </ModalContextProvider>
          </UserContextProvider>
        </AuthProvider>
      </PathContextProvider>
    </Router>
  )
}

export default memo(App)
