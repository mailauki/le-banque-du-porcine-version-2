import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { supabase } from '../utils/supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../features/users/currentUserSlice';
import { getProfile } from '../features/users/userProfileSlice';
import Navbar from '../components/Navbar';
import Balances from '../components/Balances';
import Items from '../components/Items';
import { Fab } from '@mui/material';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)
  const router = useRouter()
  const currentUser = useSelector((state) => state.currentUser.entities)
  const profile = useSelector((state) => state.userProfile.entities)
  const dispatch = useDispatch()
  const id = currentUser ? currentUser.id : null

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  useEffect(() => {
    if(id) {
      dispatch(getProfile(id))
    }
  }, [id])

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
    <div className={styles.container}>
      <Navbar />
      {session ? (
        <div className={styles.main}>
          <Balances session={session} id={id} />
          <Items session={session} />
        </div>
      ) : (
        <div className={styles.main}>
          <Fab 
            onClick={handleClick} 
            variant="extended" 
            color="primary" 
          >
            Login
          </Fab>
        </div>
      )}
    </div>
  )
}
