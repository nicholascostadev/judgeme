import styled from 'styled-components'

export const Repository = styled.div`
  width: 100%;
  min-height: 150px;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;

  padding: 1rem;

  background: var(--surface);
  border-radius: 0.5rem;

  h4 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
  }

  a {
    font-size: 1.25rem;
    padding: 0.5rem 0.5rem 0.5rem 0;

    transition: color 0.2s;

    & + a {
      margin-left: 0.5rem;
      padding: 0.5rem;
    }

    &:hover {
      color: var(--yellow-500);
    }
  }
`
