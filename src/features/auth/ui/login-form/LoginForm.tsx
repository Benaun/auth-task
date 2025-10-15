import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useLogin } from '@/features/auth'
import {
  type AuthResponse,
  type LoginFormData,
  loginSchema
} from '@/features/auth/model'

import { LockIcon, UserIcon } from '@/shared/icons'
import { Button, Input, Logo, Title } from '@/shared/ui'

interface IProps {
  onLoginSuccess: (data: LoginFormData) => void
  initialValues?: LoginFormData
}

export const LoginForm = ({
  onLoginSuccess,
  initialValues
}: IProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { login, isLoading } = useLogin()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: initialValues ?? { email: '', password: '' }
  })

  useEffect(() => {
    if (!initialValues) return
  }, [initialValues])

  const email = watch('email')
  const password = watch('password')

  const isDisabled = !email || !password || isLoading

  const onSubmit: SubmitHandler<LoginFormData> = formData => {
    setErrorMessage('')
    login(formData, {
      onSuccess: (response: AuthResponse) => {
        if (response.success) {
          onLoginSuccess(formData)
        } else {
          setErrorMessage(response.message)
        }
      },
      onError: () => {
        setErrorMessage(
          'Произошла ошибка при входе. Попробуйте позже.'
        )
      }
    })
  }

  return (
    <div className='w-[440px] min-h-[372px] bg-[#FFFFFF]'>
      <div className='flex flex-col m-8 items-center'>
        <Logo />
        <Title
          className='text-2xl h-16'
          text='Sign in to your account to continue'
        />

        {errorMessage && (
          <div className='w-full mt-4 p-3 bg-red-50 border border-red-200 rounded-md'>
            <p className='text-red-600 text-sm'>
              {errorMessage}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 w-full mt-6'
        >
          <Input
            label='email'
            type='email'
            register={register}
            required
            placeholder='email'
            icon={UserIcon}
            error={errors.email}
          />
          <Input
            label='password'
            type='password'
            register={register}
            required
            placeholder='password'
            icon={LockIcon}
            error={errors.password}
          />
          <Button type='submit' disabled={isDisabled}>
            {isLoading ? 'Вход...' : 'Log in'}
          </Button>
        </form>
      </div>
    </div>
  )
}
