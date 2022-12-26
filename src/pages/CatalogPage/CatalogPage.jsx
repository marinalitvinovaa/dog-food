import { useContext } from "react"
import CardList from "../../components/CardList/CardLisrt"
import Sort from "../../components/Sort/Sort"
import Spinner from "../../components/Spinner/Spinner"
import { CardContext } from "../../context/cardContext";

const tabs = [
  {
    id: "cheap",
    title: 'Сначала дешевые',
  },

    {
    id: "low",
    title: 'Сначала дорогие',
  },
    {
    id: "sale",
    title: 'По скидке',
  },
]

export function CatalogPage() {
  const {cards} = useContext(CardContext)
  return (
    <>
      <Sort tabs={tabs}/>
      <div className='content__cards'>
         <CardList cards={cards}/>
      </div>
    </>
  )
}

