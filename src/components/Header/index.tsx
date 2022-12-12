import Link from 'next/link'
import { useRouter } from 'next/router'
import { Brand, HeaderContainer } from './styles'

export default function Header() {
  const router = useRouter()
  const user = router.asPath.split('/')[2]

  return (
    <HeaderContainer>
      <div>
        <Link href="/">
          <Brand>Judge Me</Brand>
        </Link>
        <h2>{user ?? ''}</h2>
      </div>
    </HeaderContainer>
  )
}
