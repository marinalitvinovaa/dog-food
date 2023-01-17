import { useContext } from 'react'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { NotFound } from '../../components/NotFound/NotFound'
import Product from '../../components/Product/Product'
import Spinner from '../../components/Spinner/Spinner'
import { CardContext } from '../../context/cardContext'
import { useApi } from '../../hooks/useApi'
import api from '../../utils/api'

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
