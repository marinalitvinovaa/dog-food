import s from './styles.module.css'
import cn from 'classnames'
import { clacDiscountPrice, isLiked, createMarkUp } from '../../utils/product'
import { ReactComponent as Save } from '../../assets/images/save.svg'
import truck from '../../assets/images/truck.svg'
import quality from '../../assets/images/quality.svg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

const Product = ({
  onProductLike,
  pictures,
  likes = [],
  reviews,
  tags,
  name,
  price,
  discount,
  description,
  wight,
  _id,
}) => {
  const { user: currentUser } = useContext(UserContext)

  const navigate = useNavigate()
  const discount_price = clacDiscountPrice(price, discount)
  const isLike = isLiked(likes, currentUser?._id)
  const descriptionHTML = createMarkUp(description)

  return (
    <>
      <div>
        <a href="#" className="button-back" onClick={() => navigate(-1)}>
          Назад
        </a>
        <h1 className={s.productTitle}>{name}</h1>
        <div>
          <span>Артикул:</span> <b>234567</b>
        </div>
      </div>

      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img src={pictures} alt={`Изобраение ${name}`} />
        </div>
        <div className={s.desc}>
          <span className={discount ? s.oldPrice : s.price}>
            {price}&nbsp;₽
          </span>
          {discount !== 0 && (
            <span className={cn(s.price, 'card__price_type_discount')}>
              {discount_price}&nbsp;₽
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
            <a href="#" className={cn('btn', 'btn_type_primary', s.cart)}>
              В корзину
            </a>
          </div>
          <button
            className={cn(s.favorite, { [s.favoriteActive]: isLike })}
            onClick={onProductLike}
          >
            <Save />
            <span>{isLike ? 'В избранном' : 'В избранное'}</span>
          </button>

          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему миру</h3>
              <p className={s.text}>
                Доставка курьером - <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>

          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Гарантия качества</h3>
              <p className={s.text}>
                Если вам не понравилось качество нашей продукции, мы вернем
                деньги, либо сделем все возможное, чтобы удовлетворить ваши
                нужды
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <p className={s.subtitle} dangerouslySetInnerHTML={descriptionHTML}></p>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт 120-200 грамм</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>490 ₽ за 100 грамм</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
