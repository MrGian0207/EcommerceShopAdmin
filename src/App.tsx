import { memo } from 'react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import AppProviders from './AppProvider'

import { publicRoutes } from '~/routes/routes'

import 'swiper/css'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <AppProviders>
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
      </AppProviders>
    </Router>
  )
}

export default memo(App)
