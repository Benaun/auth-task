import { useEffect, useMemo, useRef, useState } from 'react'

import { secondFactorSchema } from '@/features/auth'
import { useVerifyCode } from '@/features/auth'

import { formatTime } from '@/shared/assets/functions'
import { config } from '@/shared/config/config'
import { BackIcon } from '@/shared/icons'
import { Button, Logo, Text, Title } from '@/shared/ui'

import { SecondFactorForm } from './SecondFactorForm'

interface IProps {
  onBack: () => void
}

const initialState: string[] = ['', '', '', '', '', '']

export const SecondFactor = ({ onBack }: IProps) => {
  const [codeValues, setCodeValues] =
    useState<string[]>(initialState)
  const [hasError, setHasError] = useState<boolean>(false)
  const [enteredCode, setEnteredCode] = useState<string | null>(
    null
  )
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [secondsLeft, setSecondsLeft] = useState<number>(
    config.RESEND_SECONDS
  )

  const isComplete = useMemo(
    () => codeValues.every(v => v.length === 1),
    [codeValues]
  )

  const { isVerified, isLoading, error } =
    useVerifyCode(enteredCode)

  useEffect(() => {
    if (isComplete) return
    if (secondsLeft <= 0) return
    const interval = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [isComplete, secondsLeft])

  function handleChange(index: number, value: string) {
    if (!/^[0-9]?$/.test(value)) return
    setHasError(false)
    setCodeValues(prev => {
      const next = [...prev]
      next[index] = value
      return next
    })
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === 'Backspace') {
      if (codeValues[index]) {
        e.preventDefault()
        setCodeValues(prev => {
          const next = [...prev]
          next[index] = ''
          return next
        })
        setHasError(false)
        return
      }

      if (!codeValues[index] && index > 0) {
        e.preventDefault()
        inputRefs.current[index - 1]?.focus()
        setCodeValues(prev => {
          const next = [...prev]
          next[index - 1] = ''
          return next
        })
        setHasError(false)
        return
      }
    }
    if (e.key === 'ArrowLeft' && index > 0)
      inputRefs.current[index - 1]?.focus()
    if (e.key === 'ArrowRight' && index < 5)
      inputRefs.current[index + 1]?.focus()
  }

  function handleSubmit() {
    if (isLoading) return
    setHasError(false)
    const code = codeValues.join('')
    const parsed = secondFactorSchema.safeParse({ code })
    if (!parsed.success) {
      setHasError(true)
      return
    }
    setEnteredCode(code)
  }

  useEffect(() => {
    if (isVerified === true) {
      alert('Вход выполнен')
      setHasError(false)
      setCodeValues(['', '', '', '', '', ''])
      setEnteredCode(null)
      inputRefs.current[0]?.focus()
    } else if (isVerified === false) {
      setHasError(true)
      setEnteredCode(null)
    }
  }, [isVerified])

  useEffect(() => {
    if (error) {
      setHasError(true)
      setEnteredCode(null)
    }
  }, [error])

  useEffect(() => {
    if (isVerified !== undefined) {
      setEnteredCode(null)
    }
  }, [isVerified])

  return (
    <div className='w-[440px] min-h-[372px] bg-[#FFFFFF] relative'>
      <div className='flex flex-col m-8 items-center'>
        <Logo />
        <Title
          className='text-2xl h-8'
          text='Two-Factor Authentication'
        />
        <Text text='Enter the 6-digit code from the Google Authenticator app' />

        <div className='absolute top-10 left-15'>
          <Button
            type='button'
            onClick={onBack}
            className='w-full bg-transparent'
          >
            <BackIcon />
          </Button>
        </div>

        <SecondFactorForm
          codeValues={codeValues}
          hasError={hasError}
          inputRefs={inputRefs}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
        />

        {hasError && (
          <div className='w-full mt-2 text-left'>
            <p className='text-red-600 text-sm'>Invalid code</p>
          </div>
        )}

        {isComplete && (
          <div className='w-full mt-4'>
            <Button
              type='button'
              onClick={handleSubmit}
              className='w-full'
              disabled={hasError}
            >
              Continue
            </Button>
          </div>
        )}

        {!isComplete && (
          <div className='w-full mt-4'>
            <Button
              type='button'
              onClick={() =>
                secondsLeft === 0 &&
                setSecondsLeft(config.RESEND_SECONDS)
              }
              className='w-full'
              disabled={secondsLeft > 0}
            >
              {secondsLeft > 0
                ? `Get new (${formatTime(secondsLeft)})`
                : 'Get new'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
