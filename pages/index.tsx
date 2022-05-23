import type { NextPage } from 'next';
import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';
import Header from '../src/components/Header';
import styles from './styles.module.scss';
import Router from 'next/router';
import { UserContext } from './_app';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../src/services/api';

const Home: NextPage = () => {
	const [input, setInput] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	async function handleSubmit(e: FormEvent) {
		setLoading(true);
		e.preventDefault();

		if (input.trim() === '') {
			toast.error('Enter a valid username');
			setLoading(false);
			return;
		}

		const response = await api
			.post('/checkuser', { username: input })
			.catch(err => {
				toast.error('Enter a valid username');
				setLoading(false);
				return;
			});

		if (response?.data.status !== 'ok') {
			toast.error('Enter a valid username');
			setLoading(false);
			console.log(response?.data);
			return;
		} else {
			console.log(response?.data);
			Router.push(`/review/${input}`);
		}
	}

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
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
							spellCheck="false"
						/>
						<em>{"We're only able to access public informations"}</em>
						<button type="submit">
							{loading ? <ClipLoader loading={loading} /> : 'Confirm'}
						</button>
					</form>
				</div>
			</main>

			<footer></footer>
		</>
	);
};

export default Home;
