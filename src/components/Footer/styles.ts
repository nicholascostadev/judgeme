import styled from 'styled-components'

export const FooterContainer = styled.footer`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: ${({ theme }) => theme.yellow500};
    text-decoration: underline;
  }
`
