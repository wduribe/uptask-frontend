import { JSX } from 'react';
import { Header } from '../components';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    children: JSX.Element | JSX.Element[];
} 

export const UpTaskLayout = ({children}: Props) => {
  return (
    <div>
        <Header/>
        <main className='max-w-screen-2xl mx-auto mt-10 p-5 max-[420px]:p-2'>
            {children}
        </main>
        <footer
          className='py-5'
        >
          <p className="text-center">
            Todos los derechos reservados {new Date().getFullYear()}
          </p>
        </footer>
    </div>
  )
}
