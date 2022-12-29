import { useContext } from "react"
import CardList from "../../components/CardList/CardLisrt"
import Sort from "../../components/Sort/Sort"
import Spinner from "../../components/Spinner/Spinner"
import { CardContext } from "../../context/cardContext";


export function CatalogPage() {
  const {cards} = useContext(CardContext)
  return (
    <>
      <Sort/>
      <div className='content__cards'>
         <CardList cards={cards}/>
      </div>
    </>
  )
}

