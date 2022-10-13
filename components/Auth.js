import { useState } from 'react';
import styles from '../styles/Form.module.css'
import { supabase } from '../utils/supabaseClient';
import { TextField, Button } from '@mui/material';

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.form}>
      <h1>Login</h1>
      <p>
        Sign in via magic link with your email below.
      </p>
      <TextField 
        id="email"
        fullWidth
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        fullWidth
        onClick={(e) => {
          e.preventDefault()
          handleLogin(email)
        }}
        sx={{ margin: "16px 0 8px 0", padding: "12px" }}
        disabled={loading}
      >{loading ? 'Loading' : 'Send magic link'}</Button>
    </div>
  )
}