import './styles.css';
import cn from 'classnames'

function Sort({currentSort, tabs = [], onChangeSort }) {
  const handleClick = (e, tab) => {
        e.preventDefault()
        onChangeSort(tab.id)
  }
  return ( 
    <div className='sort content__sort'>
        {tabs.map(tab => (
          <div key={tab.id} id={tab.id} className={cn('sort_link', {'sort__link_selected': currentSort === tab.id})}>
            <a onClick={(e) => handleClick(e, tab)}>{tab.title}</a>
          </div>
        ))}
    </div>
  );
}

export default Sort;