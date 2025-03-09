import { ReactNode } from 'react'

import './GlobalStyles.module.scss'

function GlobalStyles(props: { children: ReactNode }) {
  return <>{props.children}</>
}

export default GlobalStyles
