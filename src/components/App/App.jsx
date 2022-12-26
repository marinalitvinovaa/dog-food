import React, { useCallback, useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Logo from '../Logo/Logo'
import Search from '../Search/Search'
import SearchInfo from '../SearchInfo/SearchInfo'
import './styles.css'
import api from '../../utils/api'
import useDebounce from '../../hooks/useDebounce'
import { isLiked } from '../../utils/product'
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage'
import { ProductPage } from '../../pages/ProductPage/ProductPage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage'
import { UserContext } from '../../context/userContext'
import { CardContext } from '../../context/cardContext'
import { FaqPage } from '../../pages/FAQPage/faq-page'
import { FavoritePage } from '../../pages/FavoritePage/FavoritePage'

function App() {
  const [cards, setCards] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const debounceSearchQuery = useDebounce(searchQuery, 300)
  const [favorites, setFavorites] = useState([])

  const navigate = useNavigate()
  const handleRequest = useCallback(() => {
    setIsLoading(true)
    api
      .search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [searchQuery])

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setCards(productsData.products)
        const favoriteProduct = productsData.products.filter((item) =>
          isLiked(item.likes, userData._id),
        )
        setFavorites((prevState) => favoriteProduct)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])

  const handleFormSubmit = (inputText) => {
    navigate('/')
    setSearchQuery(inputText)
    handleRequest()
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue)
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUserData) => {
      setCurrentUser(newUserData)
    })
  }

  const handleProductLike = useCallback(
    (product) => {
      const liked = isLiked(product.likes, currentUser._id)
      return api.changeLikeProduct(product._id, liked).then((updateCard) => {
        const newProducts = cards.map((cardState) => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })

        if (!liked) {
          setFavorites((prevState) => [...prevState, updateCard])
        } else {
          setFavorites((prevState) =>
            prevState.filter((card) => card._id !== updateCard._id),
          )
        }

        setCards(newProducts)
        return updateCard
      })
    },
    [currentUser, cards],
  )


  return (
      <UserContext.Provider value={{ user: currentUser, isLoading}}>
        <CardContext.Provider
          value={{ cards, favorites, handleLike: handleProductLike}}
        >
          <Header>
            <>
              <Logo className="logo logo_place_header" href="/" />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Search
                      onSubmit={handleFormSubmit}
                      onInput={handleInputChange}
                    />
                  }
                />
              </Routes>
            </>
          </Header>
          <main className="content container">
            <SearchInfo searchText={searchQuery} />
            <Routes>
              <Route path="/" element={<CatalogPage  />} />
              <Route
                path="/product/:productId/"
                element={<ProductPage isLoading={isLoading} />}
              />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/favorites" element={<FavoritePage/>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
  )
}

export default App
