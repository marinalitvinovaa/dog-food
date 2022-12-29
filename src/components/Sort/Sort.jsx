import './styles.css';
import cn from 'classnames'
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';

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


function Sort() {
  const {currentSort, setCurrentSort, onSortData} = useContext(CardContext)

  const handleClick = (e, tab) => {
        e.preventDefault()
        setCurrentSort(tab.id)
        onSortData(tab.id)
  }
  return ( 
    <div className='sort content__sort'>
        {tabs.map(tab => (
          <div key={tab.id} id={tab.id} className={cn('sort__link', {'sort__link_selected': currentSort === tab.id})}>
            <a onClick={(e) => handleClick(e, tab)}>{tab.title}</a>
          </div>
        ))}
    </div>
  );
}

export default Sort;