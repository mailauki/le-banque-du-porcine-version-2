import { useState, useEffect } from "react";
import { supabase } from '../utils/supabaseClient';
import styles from '../styles/Home.module.css'
import BalanceEl from "./BalanceEl";
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

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
      <div className={styles.row}>
        <h3>Balances</h3>
        <IconButton>
          <AddIcon />
        </IconButton>
      </div>
      {balances ? (
        balances.map((balance) => <BalanceEl balance={balance} />)
      ) : (
        <></>
      )}
    </div>
  )
}