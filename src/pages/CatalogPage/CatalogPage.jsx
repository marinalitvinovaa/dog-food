import CardList from "../../components/CardList/CardLisrt"
import Sort from "../../components/Sort/Sort"
import Spinner from "../../components/Spinner/Spinner"

export function CatalogPage({isLoading}) {
  return (
    <>
      <Sort/>
      <div className='content__cards'>
        {isLoading ? <Spinner/> : <CardList/>}
      </div>
    </>
  )
}

