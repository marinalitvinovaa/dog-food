import { FormInput } from '../FormInput/FormInput'
import { useForm } from 'react-hook-form'

function Registrationform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })
  const cbSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <form onSubmit={handleSubmit(cbSubmit)}>
      <h3>Регистрация</h3>
      <FormInput
        {...register('name', {
          required: {
            value: true,
            message: 'Имя пользователя обязательно',
          },
          minLength: {
            value: 3,
            message: 'Имя пользователя не менее трех символов',
          },
        })}
        type="text"
        placeholder="Имя"
      />
      <div>
        {errors?.name && (
          <p className="errorMessage">{errors?.name?.message}</p>
        )}
      </div>
      <input {...register('email')} type="text" placeholder="Email" />
      <input
        {...register('password', {
          required: {
            value: true,
            message: 'Поле пароля обязательно для заполнения',
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message:
              'Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру',
          },
        })}
        type="password"
        placeholder="Password"
      />
      <div>
        {errors?.password && (
          <p className="errorMessage">{errors?.password?.message}</p>
        )}
      </div>

      <button>Зарегистрироваться</button>
    </form>
  )
}
export default Registrationform
