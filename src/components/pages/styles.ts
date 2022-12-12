import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);

  form {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 500px;

    label {
      margin-bottom: 0.5rem;
    }

    > div {
      position: relative;
      max-width: 100%;
      display: flex;
      input {
        background-color: ${({ theme }) => theme.white};
        outline: none;
        border: 0;
        border-radius: 0.25rem;
        padding: 1rem 1.5rem 1rem 3rem;
        width: 100%;

        font-size: 1.25rem;

        &::placeholder {
          color: ${({ theme }) => theme.gray700};
        }
      }
    }

    em {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.gray300};
      margin: 0.2rem 0 0.5rem 0;
    }

    button {
      border: none;
      border-radius: 0.25rem;
      background-color: ${({ theme }) => theme.gray800};

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${({ theme }) => theme.white};

      font-size: 1.25rem;
      padding: 1rem 1.5rem;

      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;

    form {
      button {
        position: relative;
        max-height: 55px;
        span {
          max-height: 100%;
        }
      }
    }
  }
`

export const GithubIcon = styled.svg`
  position: absolute;
  color: ${({ theme }) => theme.yellow500};

  justify-self: flex-end;
  align-self: center;
  margin-left: 1rem;
`
