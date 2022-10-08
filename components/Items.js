import { useState, useEffect } from "react";
import { supabase } from '../utils/supabaseClient';

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
        .select('name, price')
        .eq('user_id', user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setItems(data)
        console.log(data)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3>Items</h3>
      {items ? (
        items.map((item) => <p>{item.name} - ${item.price.toFixed(2)}</p>)
      ) : (
        <></>
      )}
    </div>
  )
}