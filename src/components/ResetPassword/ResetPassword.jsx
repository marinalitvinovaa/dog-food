import { useForm } from "react-hook-form";
import { EMAIL_REGEXP, VALIDATE_CONFIG } from "../../utils/constant";
import Form from '../Form/Form'
import { FormButton } from "../FormButton/FormButton";
import { FormInput } from "../FormInput/FormInput";


export const ResetPassword = () => {
  const { register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})
 
  const sendRegisterApi = (data) => {
      console.log(data)
  }
  const emailRegister = register('email', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.emailMessage,
    },
  })

  return (
    <Form title="Восстановление пароля" handleFormSubmit={handleSubmit(sendRegisterApi)}>
      <p>Для получения временного пароля необходимо ввести email, указанный при регистрации</p>
      <FormInput
        {...emailRegister}
        id="email"
        type="text"
        placeholder="email"
      />
        {errors?.email && <p className="errorMessage">{errors?.email?.message}</p>}

      <p className="infoText">Срок действия временного пароля 24 часа</p>
      <FormButton type="submit" color="yellow">Отправить</FormButton>
    </Form>
  )
}