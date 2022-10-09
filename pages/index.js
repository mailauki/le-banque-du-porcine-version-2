import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';
import Balances from '../components/Balances';
import Items from '../components/Items';
import { Fab } from '@mui/material';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)
  const router = useRouter()

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
          <Balances session={session} />
          <Items session={session} />
        </div>
      ) : (
        <div className={styles.main}>
          <Fab onClick={handleClick} variant="extended">Login</Fab>
        </div>
      )}
    </div>
  )
}
