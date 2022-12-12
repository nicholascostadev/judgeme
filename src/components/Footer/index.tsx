import styles from './footer.module.scss'
export function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/nicholascostadev/judgeme"
        target="_blank"
        rel="noreferrer"
      >
        Source Code
      </a>
    </footer>
  )
}
