import 'react-toastify/dist/ReactToastify.css'

import Head from 'next/head'
import Router from 'next/router'
import { FormEvent, useState } from 'react'
import { GoMarkGithub } from 'react-icons/go'
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'

import { Footer } from '../src/components/Footer'
import Header from '../src/components/Header'
import { FormContainer, GithubIcon } from '../src/components/pages/styles'
import { api } from '../src/services/api'

import type { NextPage } from 'next'
const Home: NextPage = () => {
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(e: FormEvent) {
    setLoading(true)
    e.preventDefault()

    if (input.trim() === '') {
      toast.error('Enter a valid username')
      setLoading(false)
      return
    }

    const response = await api
      .post('/checkuser', { username: input })
      .catch((err) => {
        console.log(err)
        toast.error('Enter a valid username')
        setLoading(false)
      })

    if (response?.data.status !== 'ok') {
      setLoading(false)
      console.log(response?.data)
    } else {
      console.log(response?.data)
      Router.push(`/review/${input}`)
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Head>
        <title>Login | Judge Me</title>
      </Head>

      <main>
        <Header />
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <label>Tell me you Github username</label>
            <div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Github username"
                spellCheck="false"
              />
              <GithubIcon as={GoMarkGithub} />
            </div>
            <em>{"We're only able to access public information"}</em>
            <button type="submit">
              {loading ? (
                <ClipLoader loading={loading} color="#eba417" />
              ) : (
                'Confirm'
              )}
            </button>
          </form>
        </FormContainer>
      </main>

      <Footer />
    </>
  )
}

export default Home
