import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext, useState } from 'react';

interface UserContextProps {
	username: string;
	setUsername: (username: string) => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

function MyApp({ Component, pageProps }: AppProps) {
	let [username, setUsername] = useState<string>('');

	return (
		<UserContext.Provider value={{ username, setUsername }}>
			<Component {...pageProps} />
		</UserContext.Provider>
	);
}

export default MyApp;
