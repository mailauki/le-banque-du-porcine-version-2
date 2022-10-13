import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, itemAdded, itemEdited } from '../features/items/itemsSlice';
import { getBalances } from '../features/balances/balancesSlice';
import ItemEl from './ItemEl';
import ItemForm from './ItemForm';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

export default function Items({ userId }) {
  const [open, setOpen] = useState(false)
  const items = useSelector((state) => state.items.entities)
  const [editItem, setEditItem] = useState(null)
  // const defaultBalance = useSelector((state) => state.balances.entities[0])
  const balances = useSelector((state) => state.balances.entities)
  const [defaultBalance, setDefaultBalance] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if(userId) {
      dispatch(getItems(userId))
      dispatch(getBalances(userId))
    }
  }, [userId])

  useEffect(() => {
    if(balances) {
      setDefaultBalance(balances[0])
    }
  }, [balances])

  function handleOpen() {
    setOpen(!open)
    setEditItem(null)
  }

  async function handleAdd(formData) {
    const { data, error } = await supabase
      .from('items')
      .insert([formData])

    dispatch(itemAdded(formData))

    setOpen(false)
  }

  async function handleEdit(formData) {
    try {
      const { data, error } = await supabase
      .from('items')
      .update(formData)
      .eq('id', editItem.id)
      .select()

      if (error) {
        throw error
      } else {
        dispatch(itemEdited(data[0]))
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setOpen(false)
      setEditItem(null)
    }
  }

  return (
    <div className={styles.column}>
      <div 
        className={styles.row} 
        style={{ 
          padding: "1rem" 
        }}
      >
        <h3>Items</h3>
        {!open ? (
          <IconButton className={styles.button} onClick={handleOpen}>
            <AddIcon />
          </IconButton>
        ) : (
          <IconButton className={styles.button} onClick={handleOpen}>
            <ClearIcon />
          </IconButton>
        )}
      </div>
      {!open ? (
        <div className={styles.grid}>
          {items ? (
            items.map((item) => <ItemEl key={item.id} item={item} onEdit={(editingItem) => {
              setEditItem(editingItem)
              setOpen(true)
            }} />)
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div
          className={styles.column}
          style={{ 
            padding: "1rem",
          }}
        >
          <ItemForm onAdd={handleAdd} userId={userId} defaultBalance={defaultBalance} item={editItem} onEdit={handleEdit} />
        </div>
      )}
    </div>
  )
}