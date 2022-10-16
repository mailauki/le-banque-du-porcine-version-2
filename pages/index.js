import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { supabase } from '../utils/supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../features/users/currentUserSlice';
import { getProfile } from '../features/users/userProfileSlice';
import Navbar from '../components/Navbar';
import Auth from '../components/Auth';
import FeaturedItem from '../components/FeaturedItem';
import Balances from '../components/Balances';
import Items from '../components/Items';
import { Fab } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Home() {
  const [session, setSession] = useState(null)
  const router = useRouter()
  // const currentUser = useSelector((state) => state.currentUser.entities)
  // const profile = useSelector((state) => state.userProfile.entities)
  const balances = useSelector((state) => state.balances.entities)
  const [defaultBalance, setDefaultBalance] = useState(null)
  // const dispatch = useDispatch()

  useEffect(() => {
    if(balances) {
      setDefaultBalance(balances[0])
    }
  }, [balances])

  // useEffect(() => {
  //   dispatch(getCurrentUser())
  // }, [dispatch])

  // useEffect(() => {
  //   if(id) {
  //     dispatch(getProfile(id))
  //   }
  // }, [id])

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        }
      }
    }

    getInitialSession()

    return () => {
      mounted = false
    }
  }, [])

  function handleClick(event) {
    event.preventDefault()

    router.push("/profile")
  }

  return (
    <div className={styles.container}>
      {session ? (
        <>
          <Navbar userId={session.user.id} />
          <div className={styles.main}>
            {defaultBalance ? (
              <FeaturedItem userId={session.user.id} />
            ) : (
              <></>
            )}
            <Balances userId={session.user.id} />
            {defaultBalance ? (
              <Items userId={session.user.id} />
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div 
            className={styles.main}
            style={{
              padding: "1.5rem",
            }}
          >
            <Auth />
          </div>
      )}
    </div>
  )
}
