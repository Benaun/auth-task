import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { type LoginFormData, loginSchema } from '@/features/auth/model'
import { Button, Input, Logo, Title } from '@/shared/ui'
import { LockIcon, UserIcon } from '@/shared/icons'

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    })

    const email = watch('email')
    const password = watch('password')

    const isDisabled = !email || !password

    const onSubmit: SubmitHandler<LoginFormData> = data => {
        alert(JSON.stringify(data))
    }

    return (
        <div className='w-[440px] min-h-[372px] bg-[#FFFFFF]'>
            <div className='flex flex-col m-8 items-center'>
                <Logo />
                <Title size='2xl' height='16' text='Sign in to your account to continue' />
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
                    <Button type='submit' text='Log in' disabled={isDisabled} />
                </form>
            </div>
        </div>
    )
}
