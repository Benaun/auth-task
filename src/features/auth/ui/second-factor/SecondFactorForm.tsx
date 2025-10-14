import type { RefObject } from 'react'

interface IProps {
    codeValues: string[]
    hasError: boolean
    inputRefs: RefObject<Array<HTMLInputElement | null>>
    handleChange: (index: number, value: string) => void
    handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const SecondFactorForm = ({ codeValues, hasError, inputRefs, handleChange, handleKeyDown }: IProps) => {
    return (
        <div className='mt-8 flex gap-2 w-full justify-between'>
            {codeValues.map((val, i) => (
                <input
                    key={i}
                    ref={el => {
                        inputRefs.current[i] = el
                    }}
                    value={val}
                    onChange={e => handleChange(i, e.target.value.slice(-1))}
                    onKeyDown={e => handleKeyDown(i, e)}
                    inputMode='numeric'
                    aria-label={`Digit ${i + 1}`}
                    tabIndex={0}
                    className={`w-[52px] h-[60px] text-center text-xl font-bold rounded-md border ${hasError ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 ${hasError
                            ? 'focus:ring-red-300'
                            : 'focus:ring-blue-300'
                        }`}
                    maxLength={1}
                />
            ))}
        </div>
    )
}