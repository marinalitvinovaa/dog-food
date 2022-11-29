import Header from "../../components/Header/Header"
import Logo from "../../components/Logo/Logo"
import Search from "../../components/Search/Search"
import Sort from "../../components/Sort/Sort"
import Spinner from "../../components/Spinner/Spinner"
import Footer from "../../components/Footer/Footer"
import { useCallback, useContext, useEffect, useState } from "react"
import api from "../../utils/api"
import { isLiked } from "../../utils/product"
import { Product } from "../../components/Product/Product"
import { useNavigate, useParams } from "react-router-dom"
import { NotFound } from "../../components/NotFound/NotFound"
import { CardContext } from "../../context/cardContext"

// const ID_PRODUCT = '622c77e877d63f6e70967d22';


export const ProductPage = ({isLoading}) => {
  const {productId} = useParams();
  const [product, setProduct] = useState(null)
  const [errorState, setErrorState] = useState(null)

  const {handleLike} = useContext(CardContext)

   const handleProductLike = useCallback(()=> {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    });
  }, [product, handleLike]) 

    useEffect(() => {
    // setIsLoading(true)
   api.getProductById(productId)
    .then((productsData) => {
        // setCurrentUser(userData)
        setProduct(productsData)
    })
    .catch(err => setErrorState(err))
    // .finally(() => {
    //   setIsLoading(false)
    // })
}, [])




  return  (
     <>
        <div className='content__cards'>
          {isLoading 
          ? <Spinner/> 
          : !errorState && <Product {...product} setProduct={setProduct} onProductLike={handleProductLike}/>
          }

          {!isLoading && errorState && <NotFound/>}
        </div>
    </>
  )
}