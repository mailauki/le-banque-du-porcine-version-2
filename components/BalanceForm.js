import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import styles from '../styles/Form.module.css'
import { TextField, InputAdornment, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function BalanceForm({ onAdd, userId }) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)

  function handleSubmit(event) {
    event.preventDefault()

    let formData = {name: name, amount: parseFloat(amount), user_id: userId }

    onAdd(formData)
  }

  return (
    <div style={{ width: "100%" }}>
      <form 
        onSubmit={handleSubmit} 
        className={styles.form} 
        style={{ boxShadow: "none" }}
      >
        <TextField
          id="name"
          fullWidth
          label="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          id="amount"
          fullWidth
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          label="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
          margin="normal"
        />
        <Button 
          variant="contained" 
          type="submit"
          fullWidth
          sx={{ margin: "16px 0 8px 0", padding: "12px" }}
        >
          Add
        </Button>
      </form>
    </div>
  )
}