import './styles.css';

function Header({children, user, onUpdateUser}) {

  const handleClickButtoEdit = (e) => {
    e.preventDefault();

    onUpdateUser({name: 'Василий', about: 'Ментор'})
  }


  return (

    <header className='header'>
      <div className="container">
        {user?.email && <span>{user.email}</span>}
        {user?.name && <span>{user.name}</span>}

        <button className='btn' onClick={handleClickButtoEdit}>Изменить</button>

        <div className="header__wrapper">
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;