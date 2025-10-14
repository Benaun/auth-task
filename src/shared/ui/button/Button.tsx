import { type ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  className?: string
  disabled?: boolean
  type: ButtonType
  onClick?: () => void
}

type ButtonType = 'submit' | 'reset' | 'button' | undefined

export const Button = ({
  children,
  className,
  disabled,
  type,
  onClick
}: IProps) => {
  return (
    <button
      className={`w-full h-10 rounded-lg transition-all ${
        disabled
          ? 'bg-[#D9D9D9] border-[1px] border-[#D9D9D9] text-gray-400 cursor-not-allowed'
          : 'bg-[#1677FF] text-white cursor-pointer shadow-[0px_2px_0px_0px_#0591FF1A]'
      } ${className || ''}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
