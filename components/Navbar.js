import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navlink from './Navlink';
import { Tabs, Tab } from '@mui/material';

function LinkTab(props) {
  const router = useRouter()

  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault()

        router.push(props.href)
      }}
      {...props}
    />
  )
}

export default function Navbar() {
  const router = useRouter()
  const { route } = router
  const [activeTab, setActiveTab] = useState(route) 
  const links = [{href: "/", name: "Home"}, {href: "/profile", name: "Profile"}]

  function handleChange(event, newValue) {
    setActiveTab(newValue)
  }

  return (
    <Tabs value={activeTab} onChange={handleChange} aria-label="navbar">
      {links.map((link) => <LinkTab key={link.href} label={link.name} value={link.href}  href={link.href} />)}
    </Tabs>
  )
}