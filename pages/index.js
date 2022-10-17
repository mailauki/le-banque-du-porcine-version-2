import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { supabase } from '../utils/supabaseClient';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Auth from '../components/Auth';
import FeaturedItem from '../components/FeaturedItem';
import Balances from '../components/Balances';
import Items from '../components/Items';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from "swiper";
import 'swiper/css';

export default function Home() {
  const [session, setSession] = useState(null)
  const router = useRouter()
  const balances = useSelector((state) => state.balances.entities)
  const [defaultBalance, setDefaultBalance] = useState(null)
  const defaultSlide = 1


  useEffect(() => {
    if(balances) {
      setDefaultBalance(balances[0])
    }
  }, [balances])

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

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
            {defaultSlide ? (
              <Swiper
                slidesPerView={1}
                direction={"vertical"}
                mousewheel={true}
                modules={[Mousewheel]}
                initialSlide={defaultSlide}
                style={{ height: "calc(100vh - 8rem)" }}
              >
                <SwiperSlide>
                  {defaultBalance ? (
                    <FeaturedItem userId={session.user.id} />
                  ) : (
                    <></>
                  )}
                </SwiperSlide>
                <SwiperSlide>
                  <Balances userId={session.user.id} />
                </SwiperSlide>
                <SwiperSlide>
                  {defaultBalance ? (
                    <Items userId={session.user.id} />
                  ) : (
                    <></>
                  )}
                </SwiperSlide>
              </Swiper>
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
