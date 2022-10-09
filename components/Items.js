import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../features/items/itemsSlice';
import ItemEl from './ItemEl';
import ItemForm from './ItemForm';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

export default function Items({ id }) {
  const [open, setOpen] = useState(false)
  const items = useSelector((state) => state.items.entities)
  const defaultBalance = useSelector((state) => state.balances.entities[0])
  const dispatch = useDispatch()

  useEffect(() => {
    if(id) {
      dispatch(getItems(id))
    }
  }, [id])

  function handleOpen() {
    setOpen(!open)
  }

  async function handleAdd(formData) {
    const { data, error } = await supabase
    .from('items')
    .insert([formData])

    setOpen(false)
  }

  return (
    <div className={styles.column}>
      <div className={styles.row}>
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
            items.map((item) => <ItemEl key={item.id} item={item} />)
          ) : (
            <></>
          )}
        </div>
      ) : (
        <ItemForm onAdd={handleAdd} userId={session.user.id} defaultBalance={defaultBalance} />
      )}
    </div>
  )
}