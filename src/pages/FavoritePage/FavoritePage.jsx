import { useContext } from 'react'
import CardList from '../../components/CardList/CardList'
import { ContentHeader } from '../../components/ContentHeader/ContentHeader'
import Sort from '../../components/Sort/Sort'
import { CardContext } from '../../context/cardContext'

export function FavoritePage() {
  const { favorites } = useContext(CardContext)

  return (
    <>
      <ContentHeader title='Избранное'/>
      <Sort />
      <div className="content__cards">
       <CardList cards={favorites} />
      </div>
    </>
  )
}
