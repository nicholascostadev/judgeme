import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid ${({ theme }) => theme.gray300};

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0 15%;
    height: 100%;

    color: ${({ theme }) => theme.yellow500};

    @media (max-width: 768px) {
      margin: 0 1rem;

      h2 {
        font-size: 1rem;
      }
    }
  }
`

export const Brand = styled.a`
  font-size: 2.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`
