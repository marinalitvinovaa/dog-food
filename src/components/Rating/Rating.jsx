import { useEffect } from "react";
import { useState } from "react"
import { ReactComponent as StarIcon } from "./star.svg";
import cn from 'classnames'
import s from './styles.module.css'
import { useCallback } from "react";

const Rating = ({isEditable = false, rating, setRating = null}) => {
  const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));

 
  const constructRating = useCallback((currentRating) => {
    const updateArray = ratingArray.map((ratingElement, index) => {
      return (
          <StarIcon
            className={cn(s.star, {
              [s.filled]: index < currentRating,
              [s.editable]: isEditable,
            })}
            onMouseEnter={() => changeDispaly(index + 1)}
            onMouseLeave={() => changeDispaly(rating)}
            onClick={() => changeRating(index + 1)}
          />
      )
    })
    setRatingArray(updateArray)
  }, [rating, isEditable])

  function changeDispaly(rating) {
      if (!isEditable) {
        return
      }
      constructRating(rating)
  }

  function changeRating (rating) {
    if (!isEditable || !setRating) return

    setRating(rating)
  }

    useEffect(() => {
    constructRating(rating)
  }, [rating, constructRating])
  
  return (
    <div>
      {ratingArray.map((r, i) => <span key={i}>{r}</span>)}
    </div>
  
  )
}

export default Rating