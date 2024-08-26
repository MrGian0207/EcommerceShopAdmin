import React from 'react'
import GlobalStyles from '~/components/GlobalStyles'
import ReactDOM from 'react-dom/client'

import App from './App'
import { SearchContextProvider } from './context/SearchContext'
import { UpdateLayoutContextProvider } from './context/UpdateLayoutContext'
import reportWebVitals from './reportWebVitals'

import './i18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  //<React.StrictMode>
  <GlobalStyles>
    <SearchContextProvider>
      <UpdateLayoutContextProvider>
        <App />
      </UpdateLayoutContextProvider>
    </SearchContextProvider>
  </GlobalStyles>
  //</React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
