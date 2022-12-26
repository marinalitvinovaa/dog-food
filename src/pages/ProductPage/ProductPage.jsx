import { useContext } from 'react'
import { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Logo from '../../components/Logo/Logo'
import { NotFound } from '../../components/NotFound/NotFound'
import Product from '../../components/Product/Product'
import Search from '../../components/Search/Search'
import Spinner from '../../components/Spinner/Spinner'
import { CardContext } from '../../context/cardContext'
import { UserContext } from '../../context/userContext'
import { useApi } from '../../hooks/useApi'
import api from '../../utils/api'
import { isLiked } from '../../utils/product'

// const ID_PRODUCT = '622c779c77d63f6e70967d1c';
export const ProductPage = () => {
  const { productId } = useParams();
  const { handleLike } = useContext(CardContext)

  const handleGetProduct = useCallback(() => api.getProductById(productId), [productId]);

  const {data: product, setData: setProduct, loading: isLoading, error: errorState} = useApi(handleGetProduct)

  const handleProductLike = useCallback(() => {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct)
    })
  }, [product, handleLike])


  return (
    <>
      <div className="content__cards">
        {isLoading ? (
          <Spinner />
        ) : (
          !errorState && (
            <Product
              {...product}
              setProduct={setProduct}
              onProductLike={handleProductLike}
            />
          )
        )}
        {!isLoading && errorState && <NotFound />}
      </div>
    </>
  )
}
