import axios from 'axios';
import { GetServerSideProps } from 'next';
import Header from '../../src/components/Header';
import styles from './user.module.scss';
import { GoLinkExternal, GoMarkGithub, GoGlobe } from 'react-icons/go';

// interface UserReviewProps {
// 	user: string;
// }
type UserInfo = {
	login: string;
	name: string;
	avatar_url: string;
	company?: string;
	location?: string;
	blog?: string;
	email?: string;
	bio?: string;
	html_url: string;
	public_repos: number;
	followers: number;
	following: number;
};

type Repo = {
	id: number;
	name: string;
	owner: {
		login: string;
	};
	html_url: string;
	description?: string;
	created_at: string;
	updated_at: string;
	stargazers_count: number;
	homepage?: string;
};

interface UserReviewProps {
	userInfo: {
		userMainInfo: UserInfo | undefined;
		reposInfo: Repo[] | undefined;
	};
}

export default function UserReview({ userInfo }: UserReviewProps) {
	if (userInfo === undefined) {
		return (
			<>
				<Header />
				<h1>User not found</h1>
			</>
		);
	}
	const user: UserInfo = JSON.parse(String(userInfo.userMainInfo));
	const repos: Repo[] = JSON.parse(String(userInfo.reposInfo));

	let userReposPhrase = '';

	if (user.public_repos === 0) {
		userReposPhrase = 'No public repos 😔';
	} else if (user.public_repos < 25) {
		userReposPhrase = "You're a normal person, congrats 👏";
	} else if (user.public_repos < 100) {
		userReposPhrase = "Sorry for asking, but don't you have a life?";
	} else if (user.public_repos < 500) {
		userReposPhrase =
			"You're so good that I would risk to say you use VIM as your editor";
	} else if (user.public_repos < 1000) {
		userReposPhrase = 'Are you freaking kidding me? Like, really?😶';
	} else {
		userReposPhrase = "You're a big person, congrats";
	}

	let userHasRepos = user.public_repos > 0;

	// TODO: Get user's most used languages

	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className={styles.userBlock}>
					<img alt="user image" src={user.avatar_url} />
					<hr />
					<div className={styles.userInfo}>
						<h1>{user.name}</h1>
						<a
							className={styles.githubLinkWrapper}
							href={user.html_url}
							target="_blank"
							rel="noreferrer"
						>
							<GoMarkGithub />
							{user.login}
						</a>
						<p>{user.bio}</p>
						<div>
							<p className={styles.follow}>
								{user.followers}{' '}
								<span className={styles.muted}>Followers</span>
							</p>
							<p className={styles.follow}>
								{user.following}{' '}
								<span className={styles.muted}>Following</span>
							</p>
						</div>
						{user.blog ? (
							<>
								<a
									href={`https://${user.blog}`}
									target="_blank"
									rel="noreferrer"
									className={styles.blogLink}
								>
									<GoGlobe />
									www.{user.blog}
								</a>
							</>
						) : (
							''
						)}
					</div>
				</div>
				<div className={styles.mainInfoContainer}>
					<div className={styles.mainInfo}>
						<div className={styles.analysis}>
							{user.public_repos ? (
								<>
									<p>Total Repositories: {user.public_repos}</p>
									<p> {userReposPhrase}</p>
								</>
							) : (
								<p>{userReposPhrase}</p>
							)}
						</div>
						<div className={styles.analysis}>
							<p>Total Contributions: 50</p>
							<p>
								Yeah, you're kind of contributing to the world, congrats 👌
							</p>
						</div>
						<div className={styles.analysis}>
							<p>Most used languages:</p>
							<span className={styles.muted}>
								JavaScript, TypeScript, HTML, CSS
							</span>

							<p>
								Great choice of languages 👏
								<br />
								Thankfully you're not programming in C, if you were I would
								have to Garbage collect you
							</p>
						</div>
						<div className={styles.analysis}>
							<p>Most used languages:</p>
							<span className={styles.muted}>
								JavaScript, TypeScript, HTML, CSS
							</span>
						</div>
						<div className={styles.analysis}>
							<p>Most used languages:</p>
							<span className={styles.muted}>
								JavaScript, TypeScript, HTML, CSS
							</span>
						</div>
						<div className={styles.analysis}>
							<p>Most used languages:</p>
							<span className={styles.muted}>
								JavaScript, TypeScript, HTML, CSS
							</span>
						</div>
					</div>
					<div className={styles.repositories}>
						{repos.map((repo, index) => {
							if (repo.owner.login === user.login) {
								<h3>Public Starred Repositories</h3>;
								return (
									<div key={repo.id}>
										<h4>{repo.name}</h4>
										<p>
											{repo.description ?? 'No description for the given repo'}
										</p>
										{repo.homepage && (
											<a
												href={repo.homepage ?? ''}
												target="_blank"
												rel="noreferrer"
											>
												<GoLinkExternal />
											</a>
										)}
										<a
											href={repo.html_url ?? ''}
											target="_blank"
											rel="noreferrer"
										>
											<GoMarkGithub />
										</a>
									</div>
								);
							} else {
								return;
							}
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	try {
		const userMainInfo = await axios({
			method: 'GET',
			url: `https://api.github.com/users/${params!.user}`,
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
				'Content-Type': 'application/json',
			},
		});

		const reposInfo = await axios({
			method: 'GET',
			url: `https://api.github.com/users/${params!.user}/starred`,
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
				'Content-Type': 'application/json',
			},
		});

		const userInfo = {
			userMainInfo: JSON.stringify(userMainInfo.data),
			reposInfo: JSON.stringify(reposInfo.data),
		};

		return {
			props: { userInfo },
		};
	} catch (err) {
		// @ts-ignore
		return {
			props: {},
		};
	}
};
