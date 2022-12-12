import axios from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { GoGlobe, GoMarkGithub } from 'react-icons/go'
import { Footer } from '../../src/components/Footer'

import Header from '../../src/components/Header'
import {
  Container,
  UserBlock,
  UserInfo,
  GithubLinkWrapper,
  Muted,
  BlogLink,
  MainInfoContainer,
  MainInfo,
  Analysis,
  ContributionBoard,
  Repositories,
} from '../../src/components/pages/review/styles'
import { Repository } from '../../src/components/Repository'
import {
  dynamicContributionPhrase,
  dynamicUserRepoPhrase,
  getUserMostUsedLanguage,
} from '../../src/services/logic/logic'

type TUserInfo = {
  login: string
  name: string
  avatar_url: string
  company?: string
  location?: string
  blog?: string
  email?: string
  bio?: string
  html_url: string
  public_repos: number
  followers: number
  following: number
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

interface UserReviewProps {
  userInfo: {
    userMainInfo: TUserInfo | undefined
    reposInfo: Repo[] | undefined
    userRepos: Repo[] | undefined
    userTotalContributions: number
  }
}

export default function UserReview({ userInfo }: UserReviewProps) {
  const user: TUserInfo = JSON.parse(String(userInfo.userMainInfo))
  const repos: Repo[] = JSON.parse(String(userInfo.reposInfo))

  const userRepos = repos.filter(
    (repo, i) => repo.owner.login === user.login && i < 8,
  )

  const [topFiveLanguages, languages]: [
    { language: string; percentage: number }[],
    string[],
  ] = getUserMostUsedLanguage(userInfo.userRepos)
  const userReposPhrase: string = dynamicUserRepoPhrase(user.public_repos)
  const contributionPhrase: string = dynamicContributionPhrase(
    userInfo.userTotalContributions,
  )

  return (
    <>
      <Head>
        <title>{user.login} | Judgeme </title>
      </Head>
      <main>
        <Header />
        <Container>
          <UserBlock>
            <img alt="user image" src={user.avatar_url} />
            <hr />
            <UserInfo>
              <h1>{user.name}</h1>
              <GithubLinkWrapper
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <GoMarkGithub />
                {user.login}
              </GithubLinkWrapper>
              <p>{user.bio}</p>
              <div>
                <p>
                  {user.followers} <Muted>Followers</Muted>
                </p>
                <p>
                  {user.following} <Muted>Following</Muted>
                </p>
              </div>
              {user.blog ? (
                <>
                  <BlogLink
                    href={`https://${user.blog}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GoGlobe />
                    www.{user.blog}
                  </BlogLink>
                </>
              ) : (
                ''
              )}
            </UserInfo>
          </UserBlock>
          <MainInfoContainer>
            <MainInfo>
              <Analysis>
                {userRepos ? (
                  <>
                    <p>Total Repositories: {user.public_repos}</p>
                    <p> {userReposPhrase}</p>
                  </>
                ) : (
                  <p>{userReposPhrase}</p>
                )}
              </Analysis>
              <Analysis>
                <p>Total Contributions: {userInfo.userTotalContributions}</p>
                <p>{contributionPhrase}</p>
              </Analysis>
              <Analysis>
                <p>Most used languages:</p>
                <Muted>{languages.join(', ')}</Muted>
                <p>
                  Great choice of languages 👏
                  <br />
                  {"Thankfully you're not programming in C 😁."}
                </p>
              </Analysis>
              <Analysis>
                {userRepos && <p>Most used languages: </p>}
                {topFiveLanguages.map((language) => (
                  <span key={language.language}>
                    {language.language} -{' '}
                    {Number(language.percentage).toFixed(2)}% <br />
                  </span>
                ))}
              </Analysis>
            </MainInfo>
            <ContributionBoard>
              <h2>{"User's Contributions"}</h2>
              <img
                src={`https://ghchart.rshah.org/eba417/${user.login}`}
                alt={`${user.login}'s Github chart`}
              />
            </ContributionBoard>
            <Repositories>
              {userRepos && <h2>Public Starred Repositories</h2>}
              {userRepos.map((repo) => (
                <Repository repo={repo} key={repo.id} />
              ))}
            </Repositories>
          </MainInfoContainer>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
    }

    const userMainInfo = await axios({
      method: 'GET',
      url: `https://api.github.com/users/${params!.user}`,
      headers: {
        Authorization: headers.Authorization,
        'Content-Type': 'application/json',
      },
    })

    const userRepos = await axios({
      method: 'GET',
      url: `https://api.github.com/users/${params!.user}/repos`,
      headers: {
        Authorization: headers.Authorization,
        'Content-Type': 'application/json',
      },
    })

    const reposInfo = await axios({
      method: 'GET',
      url: `https://api.github.com/users/${params!.user}/starred`,
      headers: {
        Authorization: headers.Authorization,
        'Content-Type': 'application/json',
      },
    })

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
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })

    const data = await response.json()

    const userTotalContributions = Number(
      data?.data?.user?.contributionsCollection?.contributionCalendar
        ?.totalContributions,
    )

    const userInfo = {
      userMainInfo: JSON.stringify(userMainInfo.data),
      reposInfo: JSON.stringify(reposInfo.data),
      userRepos: JSON.stringify(userRepos.data),
      userTotalContributions,
    }

    return {
      props: { userInfo },
    }
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: '/',
      },
    }
  }
}
