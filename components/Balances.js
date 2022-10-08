import { useState, useEffect } from "react";
import { supabase } from '../utils/supabaseClient';

export default function Balances({ session }) {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(null)
  const [amount, setAmount] = useState(0)
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
        .select('name, amount')
        .eq('user_id', user.id)
        // .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        // setName(data.name)
        // setAmount(data.amount)
        setBalances(data)
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
      <h3>Balances</h3>
      {/* <p>{name} - ${amount.toFixed(2)}</p> */}
      {balances ? (
        balances.map((bal) => <p>{bal.name} - ${bal.amount.toFixed(2)}</p>)
      ) : (
        <></>
      )}
    </div>
  )
}