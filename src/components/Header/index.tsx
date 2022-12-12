import { useRouter } from 'next/router'
import { Brand, HeaderContainer } from './styles'

export default function Header() {
  const router = useRouter()
  const user = router.asPath.split('/')[2]

  return (
    <HeaderContainer>
      <div>
        <Brand href="/">Judge Me</Brand>
        <h2>{user ?? ''}</h2>
      </div>
    </HeaderContainer>
  )
}
