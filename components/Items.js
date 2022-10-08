import { useState, useEffect } from "react";
import { supabase } from '../utils/supabaseClient';
import styles from '../styles/Home.module.css'
import ItemEl from "./ItemEl";

export default function Balances({ session }) {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState(null)

  useEffect(() => {
    getItems()
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

  async function getItems() {
    try {
      setLoading(true)
      const user = await getCurrentUser()

      let { data, error, status } = await supabase
        .from('items')
        .select('name, price, image, priority')
        .eq('user_id', user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setItems(data)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.column}>
      <h3>Items</h3>
      <div className={styles.grid}>
        {items ? (
          items.map((item) => <><ItemEl item={item} /><ItemEl item={item} /><ItemEl item={item} /></>)
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}