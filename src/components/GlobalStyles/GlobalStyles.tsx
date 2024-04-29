import { ReactNode } from 'react';
import './GlobalStyles.module.scss';

function GlobalStyles(props: { children: ReactNode }): JSX.Element {
   return <>{props.children}</>;
}

export default GlobalStyles;
