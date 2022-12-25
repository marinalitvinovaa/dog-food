import { useContext } from 'react'
import { CardContext } from '../../context/CardContext'
import Card from '../Card/Card'
import './styles.css'

function CardList() {
  const { cards } = useContext(CardContext)
  return (
    <div className="cards">
      {cards.map((item) => (
        <Card key={item._id} {...item} />
      ))}
    </div>
  )
}

export default CardList
