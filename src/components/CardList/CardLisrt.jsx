import Card from '../Card/Card';
import './styles.css';


function CardList({goods, onProductLike, currentUser}) {
  return (
    <div className='cards'>
      {
      goods.map((item) => <Card key={item._id} {...item} onProductLike={onProductLike} currentUser={currentUser}/>)
      }
    </div>
  );
}

export default CardList;