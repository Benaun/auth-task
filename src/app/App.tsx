import { LoginForm, SecondFactorForm } from '@/features/auth'

function App() {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-[#F5F5F5]'>
      <LoginForm />
      <SecondFactorForm />
    </div>
  )
}

export default App
