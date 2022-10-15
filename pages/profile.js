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
    <div
      style={{
        width: "100%",
        // width: "130vw",
        // width: "fit-content",
      }}
    >
      <div 
        className={styles.container}
        style={{
          // width: "100%",
          // width: "130vw",
          // width: "fit-content",
        }}
      >
        {session ? (
          <>
            <Navbar userId={session.user.id} onLogout={setSession} />
            <div 
              className={styles.main}
              // className={styles.box}
              style={{
                padding: "1.5rem",
              }}
            >
              <div 
                className={styles.box}
              >
                <Account session={session} />
              </div>
              {/* <h1>Hello</h1> */}
            </div>
          </>
        ) : (
          <div className={styles.main}>
            <Auth />
          </div>
        )}
      </div>
    </div>
  )
}