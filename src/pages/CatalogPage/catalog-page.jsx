import CardList from "../../components/CardList/CardLisrt"
import Sort from "../../components/Sort/Sort"
import Spinner from "../../components/Spinner/Spinner"


const CatalogPage = ({isLoading}) => {
  return (
    <>
      <Sort/>
        <div className='content__cards'>
          {isLoading 
          ? <Spinner/> 
          : <CardList/>
          }
        </div>
    </>
  )
}

export default CatalogPage