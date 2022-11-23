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
// import data from '../../assets/data.json'
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const debounceSearchQuery = useDebounce(searchQuery, 500)

  function handleRequest() {
    // const filterCards = cards.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));
    // setCards(prevState => filterCards)

    api.search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
    .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setCards(productsData.products)
    })
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])


  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest()
    
  }
 
  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
    .then((newUserData) => {
      setCurrentUser(newUserData)
    })
  }

  function handleProductLike(product) {
    const liked = isLiked(product.likes, currentUser._id)

    api.changeLikeProduct(product._id, liked)
      .then((newCard) => {
         const newProducts  = cards.map(cardState => {
            return cardState._id === newCard._id ? newCard : cardState
         })

         setCards(newProducts)
      })
  }


  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
        <Logo className="logo logo_place_header" href='/' />
        <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
        </>
      </Header>
      <main className='content container'>
        <SearchInfo searchText={searchQuery} searchCount={cards.length}/>
        <Sort/>
        <div className='content__cards'>
          <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default App;
