import axios from 'axios';
import { GetServerSideProps } from 'next';
import Header from '../../src/components/Header';
import styles from './user.module.scss';
import { GoMarkGithub, GoGlobe } from 'react-icons/go';
import { Repository } from '../../src/components/Repository';
import {
	dynamicContributionPhrase,
	dynamicUserRepoPhrase,
	getUserMostUsedLanguage,
} from '../logic/logic';

import { useRouter } from 'next/router';

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
	language: string;
};

interface UserReviewProps {
	userInfo: {
		userMainInfo: UserInfo | undefined;
		reposInfo: Repo[] | undefined;
		userRepos: Repo[] | undefined;
		userTotalContributions: number;
	};
}

export default function UserReview({ userInfo }: UserReviewProps) {
	const user: UserInfo = JSON.parse(String(userInfo.userMainInfo));
	const repos: Repo[] = JSON.parse(String(userInfo.reposInfo));

	let [topFiveLanguages, languages]: [
		{ language: string; percentage: number }[],
		string[]
	] = getUserMostUsedLanguage(userInfo.userRepos);
	let userReposPhrase: string = dynamicUserRepoPhrase(user.public_repos);
	let contributionPhrase: string = dynamicContributionPhrase(
		userInfo.userTotalContributions
	);

	let userHasRepos: boolean = false;

	if (user.public_repos > 0) {
		repos.map((repo, index) => {
			if (repo.owner.login === user.login && index < 8) {
				userHasRepos = true;
			}
		});
	}

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
							{userHasRepos ? (
								<>
									<p>Total Repositories: {user.public_repos}</p>
									<p> {userReposPhrase}</p>
								</>
							) : (
								<p>{userReposPhrase}</p>
							)}
						</div>
						<div className={styles.analysis}>
							<p>Total Contributions: {userInfo.userTotalContributions}</p>
							<p>{contributionPhrase}</p>
						</div>
						<div className={styles.analysis}>
							<p>Most used languages:</p>
							<span className={styles.muted}>
								{languages.map((language, index) => {
									if (index < languages.length - 1) {
										return <span>{' ' + language + ','}</span>;
									} else {
										return <span>{' ' + language}</span>;
									}
								})}
							</span>
							<p>
								Great choice of languages 👏
								<br />
								Thankfully you're not programming in C 😁.
							</p>
						</div>
						<div className={styles.analysis}>
							{userHasRepos && <p>Most used languages with percentage:</p>}
							{topFiveLanguages.map(language => (
								<span key={language.language}>
									{language.language} -{' '}
									{Number(language.percentage).toFixed(2)}% <br />
								</span>
							))}
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
					<div className={styles.contributionBoard}>
						<h2>User's Contributions</h2>
						<img
							src={`https://ghchart.rshah.org/eba417/${user.login}`}
							alt="Name Your Github chart"
						/>
					</div>
					<div className={styles.repositories}>
						{userHasRepos && <h3>Public Starred Repositories</h3>}
						{userHasRepos &&
							repos.map((repo, index) => {
								if (repo.owner.login === user.login && index < 8) {
									return <Repository repo={repo} key={repo.id} />;
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
		const headers = {
			Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
		};

		const userMainInfo = await axios({
			method: 'GET',
			url: `https://api.github.com/users/${params!.user}`,
			headers: {
				Authorization: headers.Authorization,
				'Content-Type': 'application/json',
			},
		});

		const userRepos = await axios({
			method: 'GET',
			url: `https://api.github.com/users/${params!.user}/repos`,
			headers: {
				Authorization: headers.Authorization,
				'Content-Type': 'application/json',
			},
		});

		const reposInfo = await axios({
			method: 'GET',
			url: `https://api.github.com/users/${params!.user}/starred`,
			headers: {
				Authorization: headers.Authorization,
				'Content-Type': 'application/json',
			},
		});

		const body = {
			query: `query {
						user(login: "${params!.user}") {
							name
							contributionsCollection {
								contributionCalendar {
									totalContributions
								}
							}
						}
					}`,
		};

		const response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			body: JSON.stringify(body),
			headers,
		});

		const data = await response.json();

		let userTotalContributions = Number(
			data?.data?.user?.contributionsCollection?.contributionCalendar
				?.totalContributions
		);

		const userInfo = {
			userMainInfo: JSON.stringify(userMainInfo.data),
			reposInfo: JSON.stringify(reposInfo.data),
			userRepos: JSON.stringify(userRepos.data),
			userTotalContributions,
		};

		return {
			props: { userInfo },
		};
	} catch (err) {
		return {
			props: {},
			redirect: {
				destination: '/',
			},
		};
	}
};
