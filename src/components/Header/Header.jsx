import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import './styles.css';

function Header({children, user, onUpdateUser}) {
  const {toggleTheme} = useContext(ThemeContext)
  // const handleClickButtoEdit = (e) => {
  //   e.preventDefault();

  //   onUpdateUser({name: 'Максим', about: 'Ментор'})
 


  return (

    <header className='header'>
      <div className="container">
        {/* {user?.email && <span>{user.email}</span>}
        {user?.name && <span>{user.name}</span>} */}
        {/* <button className='btn' onClick={toggleTheme}>Изменить</button> */}

        <div className="header__wrapper">
          {children}
        </div>
      </div>
    </header>
  );
 }

export default Header;