export const dynamicUserRepoPhrase = (numOfRepos: number): string => {
  let userReposPhrase = ''

  if (numOfRepos === 0) {
    userReposPhrase = 'No public repos 😔'
  } else if (numOfRepos < 25) {
    userReposPhrase = "You're a normal person, congrats 👏"
  } else if (numOfRepos < 32) {
    userReposPhrase =
      "You probably should focus on only one repo, don't you think so? "
  } else if (numOfRepos < 43) {
    userReposPhrase = "Don't you think you're a bit too much of a geek? 🤔"
  } else {
    userReposPhrase = 'Are you freaking kidding me? Like, really?😶'
  }

  return userReposPhrase
}

export const dynamicContributionPhrase = (
  numOfContribs: number | null,
): string => {
  let userContribsPhrase = ''

  if (numOfContribs === 0 || !numOfContribs) {
    userContribsPhrase = 'No contributions 😔'
  } else if (numOfContribs < 25) {
    userContribsPhrase = "You're a normal person, congrats 👏"
  } else if (numOfContribs < 100) {
    userContribsPhrase = "Sorry for asking, but don't you have a life?"
  } else if (numOfContribs < 500) {
    userContribsPhrase =
      "You're so good that I would risk to say you use VIM as your editor"
  } else {
    userContribsPhrase = 'Are you freaking kidding me? Like, really?😶'
  }
  return userContribsPhrase
}

type Repo = {
  id: number
  name: string
  owner: {
    login: string
  }
  html_url: string
  description?: string
  created_at: string
  updated_at: string
  stargazers_count: number
  homepage?: string
  language: string
}

type RepositoryProps = Repo[] | undefined

export const getUserMostUsedLanguage = (repos: RepositoryProps) => {
  const parsedArray = repos
  const languages = parsedArray?.map((repo: Repo) => repo.language)
  const filteredLanguages = languages?.filter(
    (language: string) => language !== null && language !== 'null',
  )
  const languageCount = filteredLanguages?.reduce(
    (acc: Record<string, number>, curr: string) => {
      if (acc[curr]) {
        acc[curr]++
      } else {
        acc[curr] = 1
      }
      return acc
    },
    {},
  )

  const languagePercentage = Object.keys(languageCount ?? {}).reduce(
    (acc: Record<string, number>, curr: string) => {
      acc[curr] =
        ((languageCount?.[curr] ?? 1) / (languages?.length ?? 1)) * 100
      return acc
    },
    {},
  )

  const sortedLanguages = Object.keys(languagePercentage).reduce(
    (acc: Record<string, number>, curr) => {
      acc[curr] = languagePercentage[curr]
      return acc
    },
    {},
  )

  const sortedLanguagesArray = Object.keys(sortedLanguages).reduce(
    (
      acc: {
        language: string
        percentage: number
      }[],
      curr: string,
    ) => {
      acc.push({
        language: curr,
        percentage: sortedLanguages[curr],
      })
      return acc
    },
    [],
  )

  const sortedLanguagesArraySorted = sortedLanguagesArray.sort(
    (a, b) => b.percentage - a.percentage,
  )

  const topFiveLanguages = sortedLanguagesArraySorted.slice(0, 5)

  // get top 5 languages as array of strings
  const topFiveLanguagesArray = topFiveLanguages.map(
    (language: { language: string }) => language.language,
  ) as string[]

  return {
    topFiveLanguages: sortedLanguagesArraySorted,
    languages: topFiveLanguagesArray,
  }
}
