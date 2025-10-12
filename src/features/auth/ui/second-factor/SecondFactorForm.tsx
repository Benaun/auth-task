import { Logo, Title, Text } from "@/shared/ui"

export const SecondFactorForm = () => {
    return (
        <div className='w-[440px] min-h-[372px] bg-[#FFFFFF]'>
            <div className='flex flex-col m-8 items-center'>
                <Logo />
                <Title size="xl" height="8" text='Two-Factor Authentication' />
                <Text text='Enter the 6-digit code from the Google Authenticator app' />
            </div>
        </div>
    )
}