import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';
import Auth from '../components/Auth';
import Account from '../components/Account';

export default function Profile() {
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
      }}
    >
      <div 
        className={styles.container}
      >
        {session ? (
          <>
            <Navbar userId={session.user.id} onLogout={setSession} />
            <div 
              className={styles.main}
              style={{
                padding: "1.5rem",
              }}
            >
              <div 
                className={styles.box}
              >
                <Account session={session} />
              </div>
            </div>
          </>
        ) : (
          <div 
            className={styles.main}
            style={{
              padding: "1.5rem",
            }}
          >
            <Auth />
          </div>
        )}
      </div>
    </div>
  )
}