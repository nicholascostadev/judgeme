export type TUserInfo = {
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

export type Repo = {
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
