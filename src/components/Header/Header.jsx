import { useCallback, useState } from 'react';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import SelectUser from '../SelecetUser/SelectUser';
import styles from './Header.module.css';

const logos = ['/logo.svg', '/vite.svg'];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);


	const toggleLogo = () => {
		setLogoIndex(state => Number(!state));
	};


	return (
		<>
			<Logo image={logos[0]} />
			<SelectUser />
			<Button onClick={toggleLogo}>Change logo</Button>
		</>
	);
}

export default Header;