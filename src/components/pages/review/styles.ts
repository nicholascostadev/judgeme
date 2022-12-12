import styled from 'styled-components'

export const Container = styled.div`
  margin: 0 15%;
  padding: 6% 0;
  min-height: calc(100vh - 150px);

  position: relative;

  display: flex;

  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
    min-height: 100vh;

    flex-direction: column;
  }
`

export const UserBlock = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;

  min-width: 250px;
  max-width: 325px;

  max-height: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2rem 0;

  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 150px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  }

  hr {
    margin-top: 2rem;

    width: 50%;
  }

  @media (max-width: 1300px) {
    max-width: 250px;
  }

  @media (max-width: 1150px) {
  }

  @media (max-width: 768px) {
    max-width: 100%;

    border-radius: 0;

    max-height: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 2rem 0;
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 0 5%;

  h1 {
    margin-bottom: 0;
  }

  > p {
    margin-top: 0.2rem;

    & + p {
      margin-top: 1rem;
    }
  }

  div {
    display: flex;
    align-items: center;

    p {
      & + p {
        margin-left: 0.5rem;
      }
    }
  }
`

export const GithubLinkWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.yellow500};
  }

  > svg {
    margin-right: 0.25rem;
  }
`

export const MainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 1rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`

export const MainInfo = styled.div`
  width: 100%;
  border-radius: 0.5rem;

  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1150px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

export const Analysis = styled.div`
  min-height: 200px;
  padding: 1rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

  p:first-child {
    margin-top: 0;
  }

  &:last-child {
    grid-column: 1/-1;
  }
`

export const Repositories = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 2rem;

  gap: 2rem;

  > h2 {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    > h2 {
      font-size: 1.25rem;
    }
  }
`

export const Muted = styled.span`
  color: ${({ theme }) => theme.gray300};
`

export const BlogLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.yellow500};
  }

  > svg {
    margin-right: 0.25rem;
  }
`

export const ContributionBoard = styled.div`
  width: 100%;
  position: relative;

  margin: 2rem 0;

  h2 {
    margin-top: 0;
  }

  > img {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    > h2 {
      font-size: 1.25rem;
    }
  }
`
