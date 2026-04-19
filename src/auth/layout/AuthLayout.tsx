import { JSX } from 'react';
import { Logo } from '../../uptasks/components';


export const AuthLayout = ({children}: {children: JSX.Element | JSX.Element[] }) => {
  return (
    <div className='bg-gray-800 min-h-screen'>
      <div className='py-10 lg:py-20 mx-auto w-[450px]'>
        <Logo/>
        <div className='mt-10'>
          {children}
        </div>
      </div>
    </div>
  )
}
 