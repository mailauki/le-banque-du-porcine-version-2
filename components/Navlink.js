import { useRouter } from 'next/router';

export default function Navlink({ href, name }) {
  const router = useRouter()
  // const style = {
  //   marginRight: 10,
  //   color: router.pathname === href ? 'red' : 'black',
  // }
  const color = router.pathname === href ? "blue" : ""
  // const color = ""

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