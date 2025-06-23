import LoginForm from './components/login-form/login-form'

function LoginPage() {
  return (
    <section
      aria-labelledby='login-title'
      className='w-full flex items-center justify-center bg-gray-50'
    >
      <div className='bg-white rounded-lg shadow-md w-xl p-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Just Mobile Security</h1>
          <h2 className='text-xl text-gray-600' id='login-title'>
            Ingrese a su cuenta
          </h2>
        </div>
        <LoginForm />
      </div>
    </section>
  )
}

export default LoginPage
