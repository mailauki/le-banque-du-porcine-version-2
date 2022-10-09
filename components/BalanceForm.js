import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import styles from '../styles/Form.module.css'
import { TextField, Typography, Alert } from '@mui/material';

export default function BalanceForm({ onAdd, userId }) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)

  function handleSubmit(event) {
    event.preventDefault()

    let formData = {name: name, amount: parseFloat(amount), user_id: userId }

    onAdd(formData)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.input}>
          <label>Name</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className={styles.input}>
          <label>Amount</label>
          <input type="number" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} />
        </div>
        <button className={styles.button} type="submit">Add</button>
      </form>
    </div>
  )
}