import cn from 'classnames'
import { forwardRef } from 'react'
import s from './styles.module.css'

export const FormInput = forwardRef((props, ref) => {
  return (
    props.type === 'textarea' ? <textarea ref={ref} className={cn(s.input, s.textarea)} {...props}></textarea> :
    <input ref={ref} className={s.input} {...props} />
  )
})