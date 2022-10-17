import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, itemAdded, itemEdited, itemDeleted } from '../features/items/itemsSlice';
import { getBalances } from '../features/balances/balancesSlice';
import ItemEl from './ItemEl';
import ItemForm from './ItemForm';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from "swiper";
import 'swiper/css';

export default function Items({ userId }) {
  const [open, setOpen] = useState(false)
  const items = useSelector((state) => state.items.entities)
  const [editItem, setEditItem] = useState(null)
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
    try {
      const { data, error } = await supabase
        .from('items')
        .insert(formData)
        .select()

      if (error) {
        throw error
      } else {
        console.log(data)
        dispatch(itemAdded(data[0]))
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setOpen(false)
    }
  }

  async function handleEdit(formData) {
    try {
      const { data, error } = await supabase
        .from('items')
        .update(formData)
        .eq('id', editItem.id)
        .select('id, name, price, image, priority, balances ( id, name, amount )')

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

  async function handleDelete(item) {
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', item.id)

      if (error) {
        throw error
      } else {
        dispatch(itemDeleted(item))
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div 
      className={`${styles.column} ${styles.shadow}`}
      style={{ margin: "1rem", width: "calc(100% - 2rem)" }}
    >
      <div 
        className={styles.row} 
        style={{ 
          padding: "1.5rem 1.5rem 0 1.5rem" 
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
      <div 
        style={{
          padding: 0,
          margin:  0,
          width: "100%",
        }}
      >
        {items ? (
          !open ? (
            <Swiper 
              slidesPerView="auto" 
              mousewheel={true}
              loop={true}
              modules={[Mousewheel]}
              style={{ width: "100%" }}
            >
              {items.map((item) => (
                <SwiperSlide 
                  key={item.id} 
                  style={{
                    padding: "1rem",
                    width: "fit-content"
                  }}
                >
                  <ItemEl 
                    key={item.id} 
                    item={item} 
                    onEdit={(editingItem) => {
                      setEditItem(editingItem)
                      setOpen(true)
                    }}
                    onDelete={(deletedItem) => {
                      handleDelete(deletedItem)
                    }} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div
              className={styles.column}
              style={{ 
                padding: "1rem",
              }}
            >
              <ItemForm 
                userId={userId} 
                defaultBalance={defaultBalance} 
                onAdd={handleAdd} 
                item={editItem} 
                onEdit={handleEdit} 
              />
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}