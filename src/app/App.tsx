import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { useState } from 'react'

import { LoginForm, SecondFactor } from '@/features/auth'
import { type LoginFormData } from '@/features/auth'

const queryClient = new QueryClient()

function App() {
  const [currentStep, setCurrentStep] = useState<
    'login' | 'secondFactor'
  >('login')
  const [lastLoginData, setLastLoginData] =
    useState<LoginFormData | null>(null)

  const handleLoginSuccess = (data: LoginFormData) => {
    setLastLoginData(data)
    setCurrentStep('secondFactor')
  }

  const handleBackToLogin = () => {
    setCurrentStep('login')
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full h-screen flex items-center justify-center bg-[#F5F5F5]'>
        {currentStep === 'login' ? (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            initialValues={lastLoginData || undefined}
          />
        ) : (
          <SecondFactor onBack={handleBackToLogin} />
        )}
      </div>
    </QueryClientProvider>
  )
}

export default App
