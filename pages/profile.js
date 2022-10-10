import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';
import Auth from '../components/Auth';
import Account from '../components/Account';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

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

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {!session ? (
          <Auth />
        ) : (
          <Account session={session} onLogot={setSession} />
        )}
      </div>
    </div>
  )
}