import s from './styles.module.css'
import cn from 'classnames';

import { ReactComponent as Favorite } from './favorites.svg';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';

function Header({ children }) {
  const {favorites} = useContext(CardContext)
  const location = useLocation()
  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconMenu}>
            <Link className={s.favoritesLink} to={{pathname: "/favorites"}}>
              <Favorite/>
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>
            <Link to='/login' state={{backgroundLocation: location, initialPath: location.pathname}}>Войти</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
