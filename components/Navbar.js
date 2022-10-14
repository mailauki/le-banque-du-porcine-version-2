import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { supabase } from '../utils/supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../features/users/userProfileSlice';
import { Typography, Box, Avatar, Button, IconButton, Tooltip } from '@mui/material';

export default function Navbar({ userId, onLogout }) {
  const router = useRouter()
  const { route } = router
  // const [activeTab, setActiveTab] = useState(route) 
  // const links = [{href: "/", name: "Home"}, {href: "/profile", name: "Profile"}]
  const [avatarUrl, setAvatarUrl] = useState(null)
  const profile = useSelector((state) => state.userProfile.entities)
  const dispatch = useDispatch()

  useEffect(() => {
    if(userId) dispatch(getProfile(userId))
  }, [userId])

  useEffect(() => {
    if (profile) downloadImage(profile.avatar_url)
  }, [profile])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  function handleChange(event, newValue) {
    setActiveTab(newValue)
  }

  function handleLogout() {
    supabase.auth.signOut()

    onLogout(null)
    // router.push("/")
  }

  return (
    <Box 
      className={`${styles.row} ${styles.navbar}`} 
      sx={{
        // padding: "0 20px",
        // padding: 1,
        pb: 0.5,
        pt: 0.5,
        pl: 2,
        pr: 2,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Typography 
        variant="h6" 
        component="a"
        onClick={(event) => {
          event.preventDefault()
  
          router.push("/")
        }}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
          cursor: "pointer"
        }}
      >
        Le Banque Du Porcine
      </Typography>
      {route === "/profile" ? (
        <Button
          variant="outlined"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Tooltip title="Account settings" arrow>
          <IconButton
            onClick={(event) => {
              event.preventDefault()
      
              router.push("/profile")
            }}
            size="small"
          >
            {profile ? (
              <Avatar 
                src={avatarUrl} 
                alt={profile.username}
              />
            ) : (
              <Avatar />
            )}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}