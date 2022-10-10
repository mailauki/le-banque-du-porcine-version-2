import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navlink from './Navlink';
import styles from '../styles/Home.module.css';
import { Tabs, Tab, Typography, Box } from '@mui/material';

function LinkTab(props) {
  const router = useRouter()

  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault()

        router.push(props.href)
      }}
      sx={{
        "&:hover": {
          bgcolor: "action.hover",
        }
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
    <Box 
      className={styles.row} 
      sx={{
        padding: "0 20px",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" component="span">Le Banque Du Porcine</Typography>
      <Tabs 
        value={activeTab} 
        onChange={handleChange} 
        aria-label="navbar"
      >
        {links.map((link) => (
          <LinkTab 
            key={link.href} 
            label={link.name} 
            value={link.href}  
            href={link.href} 
          />
        ))}
      </Tabs>
    </Box>
  )
}