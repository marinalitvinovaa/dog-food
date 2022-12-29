import s from './styles.module.css';
import cn from 'classnames'

export const FormButton = ({children, color, ...props}) => {
    return (
      <button className={cn(s.btn, s[color])} {...props}>
          {children}
      </button>
    )
}