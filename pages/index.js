import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/supabaseClient';
import Auth from '../components/Auth';
import Account from '../components/Account';
import Navbar from '../components/Navbar';
import Balances from '../components/Balances';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)

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

  return (
    <div className={styles.container}>
      <Navbar />
      <div>
        {!session ? (
          <Auth />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
      </div>
      {session ? (
        <div>
          <Balances key={session.user.id} session={session} />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
