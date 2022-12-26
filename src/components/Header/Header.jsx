import s from './styles.module.css'
import cn from 'classnames';

import { ReactComponent as Favorite } from './favorites.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';

function Header({ children, user, onUpdateUser }) {
  const {favorites} = useContext(CardContext)
  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconMenu}>
            <Link className={s.favoritesLink} to={{pathname: "/favorites", state: {from: '123'}}}>
              <Favorite/>
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
