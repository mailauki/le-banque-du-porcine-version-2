import { useRouter } from 'next/router';
import Link from 'next/link';
import Navlink from './Navlink';

export default function Navbar() {
  const links = [{href: "/", name: "Home"}, {href: "/profile", name: "Profile"}]

  return (
    <nav style={{ display: "flex", justifyContent: "space-evenly" }}>
      {/* <p>{router.pathname}</p>
      {links.map((link) => <a href={link.href} onClick={handleClick} style={style}>{link.name}</a>)} */}
      {links.map((link) => <Navlink href={link.href} name={link.name} />)}
      {/* <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link> */}
    </nav>
  )
}