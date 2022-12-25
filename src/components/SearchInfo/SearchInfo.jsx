import { useContext } from 'react'
import { CardContext } from '../../context/CardContext'
import './styles.css'

const SeachInfo = ({ searchText }) => {
  const { cards } = useContext(CardContext)
  const searchCount = cards.length
  return (
    searchText && (
      <section className="search-title">
        По запросу <span>{searchText}</span> найдено {searchCount} товаров
      </section>
    )
  )
}

export default SeachInfo
