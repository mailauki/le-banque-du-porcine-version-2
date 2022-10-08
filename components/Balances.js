import { useState, useEffect } from "react";
import { supabase } from '../utils/supabaseClient';
import styles from '../styles/Home.module.css'

export default function Balances({ session }) {
  const [loading, setLoading] = useState(true)
  const [balances, setBalances] = useState(null)

  useEffect(() => {
    getBalances()
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

  async function getBalances() {
    try {
      setLoading(true)
      const user = await getCurrentUser()

      let { data, error, status } = await supabase
        .from('balances')
        .select('id, name, amount')
        .eq('user_id', user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setBalances(data)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.box}>
      <h3>Balances</h3>
      {balances ? (
        balances.map((bal) => <p key={bal.id}>{bal.name} - ${bal.amount.toFixed(2)}</p>)
      ) : (
        <></>
      )}
    </div>
  )
}