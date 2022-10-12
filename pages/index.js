import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { supabase } from '../utils/supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../features/users/currentUserSlice';
import { getProfile } from '../features/users/userProfileSlice';
import Navbar from '../components/Navbar';
import Auth from '../components/Auth';
import Account from '../components/Account';
import Balances from '../components/Balances';
import Items from '../components/Items';
import { Fab } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)
  const router = useRouter()
  const currentUser = useSelector((state) => state.currentUser.entities)
  const profile = useSelector((state) => state.userProfile.entities)
  const dispatch = useDispatch()
  const id = currentUser ? currentUser.id : null

  // useEffect(() => {
  //   dispatch(getCurrentUser())
  // }, [dispatch])

  // useEffect(() => {
  //   if(id) {
  //     dispatch(getProfile(id))
  //   }
  // }, [id])

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        }

        setIsLoading(false)
      }
    }

    getInitialSession()

    return () => {
      mounted = false
    }
  }, [])

  function handleClick(event) {
    event.preventDefault()

    router.push("/profile")
  }

  return (
    <div>
      <Navbar session={session} />
      {session ? (
        <div className={styles.container}>
          <div className={styles.main}>
            <Balances userId={session.user.id} />
            <Items userId={session.user.id} />
          </div>
        </div>
      ) : (
        // <div className={`${styles.container} ${styles.main}`}>
        //   <div className={styles.main}><div className={styles.container}><Auth /></div></div>
        //   <Fab 
        //     onClick={handleClick} 
        //     variant="extended" 
        //     color="primary" 
        //     sx={{ zIndex: 1 }}
        //   >
        //     <LoginIcon sx={{ mr: 1 }} />
        //     Login
        //   </Fab>
        // </div>
        <div className={styles.container}>
          <div className={styles.main}>
            <Auth />
          </div>
        </div>
        // <div className={styles.container}>
        //   {!session ? (
        //     <Auth />
        //   ) : (
        //     <Account session={session} onLogout={setSession} />
        //   )}
        // </div>
      )}
    </div>
  )
}
