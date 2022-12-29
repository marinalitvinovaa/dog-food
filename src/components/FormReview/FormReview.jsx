import { useForm } from "react-hook-form"
import { VALIDATE_CONFIG } from "../../utils/constant"
import { FormButton } from "../FormButton/FormButton"
import { FormInput } from "../FormInput/FormInput"
import Form from '../Form/Form'
import Rating from "../Rating/Rating"
import { useState } from "react"
import api from "../../utils/api"


export const FormReview = ({title = 'Отзыв о товаре', productId, setProduct}) => {
  const { register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})
  const [rating, setRating] = useState(1)

  const sendReviewProduct = (data) => {
      api.createReviewProduct(productId, {...data, rating})
      .then(newProduct => {
        setProduct && setProduct(newProduct)
      })
  }


  const textReview = register('text', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    }
  })

  return (
    <Form title={title} handleFormSubmit={handleSubmit(sendReviewProduct)}>
      <Rating rating={rating} isEditable setRating={setRating}/>

      <FormInput
        {...textReview}
        id="text"
        type="textarea"
        placeholder="Введите текст отзыва"
      />
        {errors?.email && <p className="errorMessage">{errors?.email?.message}</p>}

      <FormButton type="submit" color="yellow">Оставить отзыв</FormButton>
    </Form>
  )
}