import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './header.module.scss';

export default function Header() {
	const router = useRouter();
	const user = router.asPath.split('/')[2];

	return (
		<div className={styles.container}>
			<div>
				<Link href="/">
					<a className={styles.brand}>Judge Me</a>
				</Link>
				<h2>{user ?? ''}</h2>
			</div>
		</div>
	);
}
