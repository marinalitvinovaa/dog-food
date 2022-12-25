import { children } from 'react';
import s from './index.module.css';
import cn from 'classnames'
// import { type } from '@testing-library/user-event/dist/type';


function Button({type, children}) {
  return (
    <button className={cn(s.button, {
      [s.primary]: type === 'primary',
      [s.secondary]: type === 'secondary',
    })}>
      {children}
    </button>
  )
}

export default Button