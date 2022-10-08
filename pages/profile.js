import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Image from 'next/image';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';

export default function Profile({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  useEffect(() => {
    if (avatar_url) downloadImage(avatar_url)
  }, [avatar_url])

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

  return (
    <div>
      <Navbar />
      <h1 className={styles.title}>Profile</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>Hello, {username}.</h1>
        {avatar_url ? (
          <img
            src={avatar_url}
            alt="Avatar"
            className="avatar image"
            style={{ height: "100px", width: "100px" }}
          />
        ) : (
          <div
            className="avatar no-image"
            style={{ height: "100px", width: "100px" }}
          />
        )}
      </div>
    </div>
    
  )
}