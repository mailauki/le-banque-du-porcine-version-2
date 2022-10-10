import { useState, useEffect } from 'react';
import styles from '../styles/Form.module.css'
import { supabase } from '../utils/supabaseClient';
import Avatar from './Avatar';
import { useRouter } from 'next/router';

export default function Account({ session, onLogout }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const router = useRouter()

  useEffect(() => {
    getProfile()
  }, [session])

  async function getCurrentUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      throw error
    }

    if (!session?.user) {
      throw new Error('User not logged in')
    }

    return session.user
  }

  async function getProfile() {
    try {
      setLoading(true)
      const user = await getCurrentUser()

      let { data, error, status } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true)
      const user = await getCurrentUser()

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    supabase.auth.signOut()

    onLogout(null)
    // router.push("/")
  }

  return (
    <div className={styles.form}>
      <h1 className={styles.title}>Update Profile</h1>
      <div className={styles.input}>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div className={styles.input}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, website, avatar_url: url })
        }}
      />
      <button
        className={styles.button}
        onClick={() => updateProfile({ username, website, avatar_url })}
        disabled={loading}
      >
        {loading ? 'Loading ...' : 'Update'}
      </button>

      <button
        className={styles.button}
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  )
}