import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import NavMenu from './NavMenu';
import { useCheckAuth } from '../../hooks/useCheckAuth';

export const Header = () => {

	const {isLoading, data} = useCheckAuth();
	
	if(isLoading) return 'Cargando...';

	if(data)return (
		<header
			className="bg-gray-800 py-5"
		>
			<div className="max-w-full w-[1250px] mx-auto flex flex-col lg:flex-row	justify-between items-center">
				<div className='w-64'>
					<Link to={'/'}>
						<Logo />
					</Link>
				</div>

				<NavMenu name={data.name}/>
			</div>
		</header>
	)
}
