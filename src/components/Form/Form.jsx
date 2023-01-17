import React from 'react'
import s from './styles.module.css'
import './style.css'

function FormMy({title, handleFormSubmit, children}) {
  return (
    <form className={s.form} onSubmit={handleFormSubmit}>
      <h1 className={s.title}>{title}</h1>
      {children}
    </form>
  )
}

export default FormMy
