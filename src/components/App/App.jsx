import React, { useEffect, useState, useCallback } from 'react';
import Header from '../Header/Header';
import Sort from '../Sort/Sort';
import CardList from '../CardList/CardLisrt';
import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Button from '../Button/Button';
import SearchInfo from '../SearchInfo/SearchInfo';
import './styles.css';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';
import Spinner from '../Spinner/Spinner';
import CatalogPage from '../../pages/CatalogPage/catalog-page'
import { ProductPage } from '../../pages/ProductPage/Product-page';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { NotFound, NotFoundPage } from '../../pages/NotFound/not-found-page';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { ThemeContext, themes } from '../../context/themeContext';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const [theme, setTheme] = useState(themes.light)
  const navigate = useNavigate()

const handleRequest = useCallback(() => {
    setIsLoading(true)
    api.search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [searchQuery])

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getProductList(), api.getUserInfo()])
    .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setCards(productsData.products)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])


  const handleFormSubmit = (inputText) => {
    navigate('/')
    setSearchQuery(inputText);
    handleRequest();
    
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

  const handleProductLike = useCallback ((product) => {
    const liked = isLiked(product.likes, currentUser._id)
    return api.changeLikeProduct(product._id, liked)
      .then((updateCard) => {
         const newProducts  = cards.map(cardState => {
            return cardState._id === updateCard._id ? updateCard : cardState
         })

         setCards(newProducts)
         return updateCard;
      })
  }, [currentUser])


  const toggleTheme = () => {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark) 
  }

  return (
    <ThemeContext.Provider value={{theme: themes.light, toggleTheme}}>
    <UserContext.Provider value={{user: currentUser}}>
      <CardContext.Provider value={{cards, handleLike: handleProductLike}}>
      <Header>
        <>
        <Logo className="logo logo_place_header" href='/' />
        <Routes>
        <Route path='/' element={
          <Search 
          onSubmit={handleFormSubmit} 
          onInput={handleInputChange}
          />
        }></Route>
        </Routes>
        </>
      </Header>
      <main className='content container' style={{backgroundColor: theme.background}}>
        <SearchInfo searchText={searchQuery}/>
        <Routes>
          <Route index element={
            <CatalogPage 
              isLoading={isLoading} 
             />
          }/>
        <Route path='/product/:productId' element={
           <ProductPage

              isLoading={isLoading}
            />
        }/>
        <Route path='*' element={
          <NotFoundPage />
        } />
        </Routes>
        
        

       
      </main>
      <Footer/>
      </CardContext.Provider>
    </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App;
