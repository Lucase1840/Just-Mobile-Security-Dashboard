import { forwardRef, useState } from 'react'

import { Input } from '@/components/ui/input'

import { OpenEyeIcon } from '@icons/index'
import { ClosedEyeIcon } from '@icons/index'

type PasswordInputProps = Readonly<
  React.ComponentPropsWithRef<'input'> & {
    showPasswordIcon?: boolean
  }
>

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showPasswordIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleShowPassword = () => setShowPassword((prevState) => !prevState)

    return showPasswordIcon ? (
      <div className='relative'>
        <Input {...props} ref={ref} type={showPassword ? 'text' : 'password'} />
        {showPassword ? (
          <OpenEyeIcon
            className='absolute right-0 top-[50%] translate-y-[-50%] mr-2'
            onClick={handleShowPassword}
          />
        ) : (
          <ClosedEyeIcon
            className='absolute right-0 top-[50%] translate-y-[-50%] mr-2'
            onClick={handleShowPassword}
          />
        )}
      </div>
    ) : (
      <Input {...props} ref={ref} type='password' />
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
