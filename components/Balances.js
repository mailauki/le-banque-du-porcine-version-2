import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { getBalances } from '../features/balances/balancesSlice';
import BalanceEl from "./BalanceEl";
import BalanceForm from "./BalanceForm";
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

export default function Balances({ id }) {
  const [open, setOpen] = useState(false)
  const balances = useSelector((state) => state.balances.entities)
  const dispatch = useDispatch()

  useEffect(() => {
    if(id) {
      dispatch(getBalances(id))
    }
  }, [id])

  function handleOpen() {
    setOpen(!open)
  }

  async function handleAdd(formData) {
    const { data, error } = await supabase
    .from('balances')
    .insert([formData])

    setOpen(false)
  }

  return (
    <div className={styles.box}>
      <div className={styles.row}>
        <h3>Balances</h3>
        {!open ? (
          <IconButton onClick={handleOpen}>
            <AddIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleOpen}>
            <ClearIcon />
          </IconButton>
        )}
      </div>
      {!open ? (
        balances ? (
          balances.map((balance) => <BalanceEl key={balance.id} balance={balance} />)
        ) : (
          <></>
        )
      ) : (
        <BalanceForm onAdd={handleAdd} userId={id} />
      )}
    </div>
  )
}