import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import AvatarUpload from './AvatarUpload';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';

export default function Account({ session }) {
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

      let { error } = await supabase
        .from('profiles')
        .upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <h1>Update Profile</h1>
      <TextField 
        id="email"
        fullWidth
        label="Email"
        defaultValue={session.user.email}
        margin="normal"
        disabled
      />
      <TextField 
        id="username"
        fullWidth
        label="Username"
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <AvatarUpload 
        session={session}
        avatarUrl={avatar_url}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, avatar_url: url })
        }}
      />
      <Button
        // id="update"
        variant="contained"
        fullWidth
        onClick={() => {
          updateProfile({ username, avatar_url })
          router.push("/")
        }}
        disabled={loading}
        sx={{ margin: "16px 0 8px 0", padding: "12px" }}
      >
        {loading ? 'Loading ...' : 'Update'}
      </Button>
    </div>
  )
}