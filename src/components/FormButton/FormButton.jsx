import cn from 'classnames'
import s from './styles.module.css';

export const FormButton = ({children, color, ...props}) => {
    return (
      <button className={cn(s.btn, s[color])} {...props}>
          {children}
      </button>
    )
}