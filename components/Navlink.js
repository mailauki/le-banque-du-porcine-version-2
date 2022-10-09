import { useRouter } from 'next/router';

export default function Navlink({ href, name }) {
  const router = useRouter()
  const color = router.pathname === href ? "blue" : ""

  const handleClick = (e) => {
    e.preventDefault()
    
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={{ color: color }}>
      {name}
    </a>
  )
}