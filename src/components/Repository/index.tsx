import { GoLinkExternal, GoMarkGithub } from 'react-icons/go';

import styles from './repository.module.scss';

type RepoType = {
	id: number;
	name: string;
	html_url: string;
	description?: string;
	homepage?: string;
};

interface RepositoryProps {
	repo: RepoType;
}

export function Repository({ repo }: RepositoryProps) {
	return (
		<div className={styles.repository}>
			<h4>{repo.name}</h4>
			<p>{repo.description ?? 'No description for the given repo'}</p>
			{repo.homepage && (
				<a href={repo.homepage ?? ''} target="_blank" rel="noreferrer">
					<GoLinkExternal />
				</a>
			)}
			<a href={repo.html_url ?? ''} target="_blank" rel="noreferrer">
				<GoMarkGithub />
			</a>
		</div>
	);
}
