import type { SVGProps } from 'react'
import type { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface IProps<T extends FieldValues> {
    label: Path<T>
    register: UseFormRegister<T>
    required: boolean
    placeholder: string
    type: string
    className?: string
    icon?: React.ComponentType<SVGProps<SVGSVGElement>>
    error?: FieldError
}

export const Input = <T extends FieldValues>({
    label,
    register,
    required,
    placeholder,
    type,
    className,
    icon: Icon,
    error
}: IProps<T>) => {
    return (
        <div className='w-full'>
            <label className='hidden'>{label}</label>
            <div className='relative w-full'>
                {Icon && (
                    <div className='absolute left-[11px] top-1/2 -translate-y-1/2 pointer-events-none'>
                        <Icon />
                    </div>
                )}
                <input
                    className={`w-full border-[1px] py-2 pl-[31px] pr-[11px] rounded-lg focus:outline-none transition-colors ${error
                        ? 'border-red-500 focus:border-red-500 focus:shadow-[0px_0px_0px_2px_rgba(239,68,68,0.1)]'
                        : 'border-[#D9D9D9] focus:border-[#1677FF] focus:shadow-[0px_0px_0px_2px_#0591FF1A]'
                        } ${className || ''}`}
                    {...register(label, { required })}
                    placeholder={placeholder}
                    type={type}
                />
            </div>
            {error && (
                <p className='text-red-500 text-sm mt-1 ml-1'>{error.message}</p>
            )}
        </div>
    )
}
