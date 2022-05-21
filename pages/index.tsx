import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';
import Header from '../src/components/Header';
import styles from './styles.module.scss';
import Router from 'next/router';
import { UserContext } from './_app';

const Home: NextPage = () => {
	const [input, setInput] = useState<string>('');
	const { setUsername } = useContext(UserContext);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (input.trim() === '') {
			return;
		}

		setUsername(input);

		Router.push(`/review/${input}`);
	}

	return (
		<div>
			<Head>
				<title>Login | Judge Me</title>
			</Head>

			<main>
				<Header />

				<div className={styles.formContainer}>
					<form onSubmit={handleSubmit}>
						<label>Tell me you Github username</label>
						<input
							value={input}
							onChange={e => setInput(e.target.value)}
							type="text"
							placeholder="Github username"
						/>
						<em>We're only able to access public informations</em>
						<button type="submit">Confirm</button>
					</form>
				</div>
			</main>

			<footer></footer>
		</div>
	);
};

export default Home;
