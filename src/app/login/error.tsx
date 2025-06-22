'use client'

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>Error</h1>
      <p className='text-sm text-muted-foreground'>{error.message}</p>
    </div>
  )
}

export default ErrorComponent
