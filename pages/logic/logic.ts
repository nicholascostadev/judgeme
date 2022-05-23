export const dynamicUserRepoPhrase = (numOfRepos: number): string => {
	let userReposPhrase = '';

	if (numOfRepos === 0) {
		userReposPhrase = 'No public repos 😔';
	} else if (numOfRepos < 25) {
		userReposPhrase = "You're a normal person, congrats 👏";
	} else if (numOfRepos < 100) {
		userReposPhrase = "Sorry for asking, but don't you have a life?";
	} else if (numOfRepos < 500) {
		userReposPhrase =
			"You're so good that I would risk to say you use VIM as your editor";
	} else if (numOfRepos < 1000) {
		userReposPhrase = 'Are you freaking kidding me? Like, really?😶';
	} else {
		userReposPhrase = "You're a big person, congrats";
	}

	return userReposPhrase;
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

type RepositoryProps = Repo[] | undefined;

type getUserMostUsedLanguagesReturn = [
	{ language: string; percentage: number }[],
	string[]
];

export const getUserMostUsedLanguage = (
	repos: RepositoryProps
): getUserMostUsedLanguagesReturn => {
	const parsedArray = JSON.parse(String(repos));
	const languages = parsedArray?.map((repo: Repo) => repo.language);
	const filteredLanguages = languages?.filter(
		(language: string) => language !== null && language !== 'null'
	);
	const languageCount = filteredLanguages?.reduce((acc: any, curr: any) => {
		if (acc[curr]) {
			acc[curr]++;
		} else {
			acc[curr] = 1;
		}
		return acc;
	}, {});

	const languagePercentage = Object.keys(languageCount).reduce(
		(acc: any, curr: any) => {
			acc[curr] = (languageCount[curr] / languages.length) * 100;
			return acc;
		},
		{}
	);

	const sortedLanguages = Object.keys(languagePercentage).reduce(
		(acc: any, curr: any) => {
			acc[curr] = languagePercentage[curr];
			return acc;
		},
		{}
	);

	const sortedLanguagesArray = Object.keys(sortedLanguages).reduce(
		(acc: any, curr: any) => {
			acc.push({
				language: curr,
				percentage: sortedLanguages[curr],
			});
			return acc;
		},
		[]
	);

	const sortedLanguagesArraySorted = sortedLanguagesArray.sort(
		(a: any, b: any) => b.percentage - a.percentage
	);

	const topFiveLanguages = sortedLanguagesArraySorted.slice(0, 5);

	// get top 5 languages as array of strings
	const topFiveLanguagesArray = topFiveLanguages.map(
		(language: any) => language.language
	);

	return [topFiveLanguages, topFiveLanguagesArray];
};
