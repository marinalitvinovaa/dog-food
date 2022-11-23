import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Sort from '../Sort/Sort';
import CardList from '../CardList/CardLisrt';
import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Button from '../Button/Button';
import SearchInfo from '../SearchInfo/SearchInfo';
import './styles.css';
import data from '../../assets/data.json'

function App() {
  const [cards, setCards] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');


  function handleRequest() {
    const filterCards = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));
    setCards(prevState => filterCards)
  }

  useEffect(() => {
    handleRequest()
  }, [searchQuery])


  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest()
    
  }
 
  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  return (
    <>
      <Header>
        <>
        <Logo className="logo logo_place_header" href='/' />
        <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
        </>
      </Header>
      <main className='content container'>
        <SearchInfo searchText={searchQuery} searchCount={cards.length}/>
        <Sort/>
        <div className='content__cards'>
          <CardList goods={cards}/>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default App;
