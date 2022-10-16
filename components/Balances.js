import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { getBalances, balanceAdded, balanceEdited, balanceDeleted } from '../features/balances/balancesSlice';
import BalanceEl from './BalanceEl';
import BalanceForm from './BalanceForm';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

export default function Balances({ userId }) {
  const [open, setOpen] = useState(false)
  const balances = useSelector((state) => state.balances.entities)
  const [editBalance, setEditBalance] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if(userId) {
      dispatch(getBalances(userId))
    }
  }, [userId])

  function handleOpen() {
    setOpen(!open)
    setEditBalance(null)
  }

  async function handleAdd(formData) {
    try {
      const { data, error } = await supabase
        .from('balances')
        .insert(formData)
        .select()

      if (error) {
        throw error
      } else {
        console.log(data)
        dispatch(balanceAdded(data[0]))
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setOpen(false)
    }
  }

  async function handleEdit(formData) {
    console.log({formData})
    try {
      const { data, error } = await supabase
        .from('balances')
        .update(formData)
        .eq('id', editBalance.id)
        .select()

      if (error) {
        throw error
      } else {
        dispatch(balanceEdited(data[0]))
      }
      console.log({data})
    } catch (error) {
      alert(error.message)
    } finally {
      setOpen(false)
      setEditBalance(null)
    }
  }

  async function handleDelete(balance) {
    try {
      const { error } = await supabase
        .from('balances')
        .delete()
        .eq('id', balance.id)

      if (error) {
        throw error
      } else {
        dispatch(balanceDeleted(balance))
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div
      className={styles.column}
      style={{ 
        padding: "1.5rem",
      }}
    >
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
            balances.map((balance) => (
              <BalanceEl 
                key={balance.id} 
                balance={balance} 
                onEdit={(editingBalance) => {
                  setEditBalance(editingBalance)
                  setOpen(true)
                }}
                onDelete={(deletedBalance) => {
                  handleDelete(deletedBalance)
                }} 
              />
            ))
          ) : (
            <></>
          )
        ) : (
          <BalanceForm 
            userId={userId} 
            onAdd={handleAdd} 
            balance={editBalance} 
            onEdit={handleEdit} 
          />
        )}
      </div>
    </div>
  )
}