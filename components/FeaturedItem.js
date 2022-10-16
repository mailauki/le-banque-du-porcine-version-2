import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFeaturedItem } from '../features/items/featuredItemSlice';
import { Typography, LinearProgress } from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

export default function FeaturedItem({ userId }) {
  const featuredItem = useSelector((state) => state.featuredItem.entities)
  const dispatch = useDispatch()

  const priorityIcons = {
    1: <LooksOneIcon color="error" sx={{ fontSize: "inherit", verticalAlign: "text-top" }} />,
    2: <LooksTwoIcon color="warning" sx={{ fontSize: "inherit", verticalAlign: "text-top" }} />,
    3: <Looks3Icon color="success" sx={{ fontSize: "inherit", verticalAlign: "text-top" }} />,
  }
  
  useEffect(() => {
    if(userId) {
      dispatch(getFeaturedItem(userId))
    }
  }, [userId])

  return (
    <>
      {featuredItem ? (
        <div 
          className={styles.box}
          style={{ margin: "1.5rem 1rem", width: "calc(100% - 2rem)" }}
        >
          <div style={{ margin: "auto 0" }}>
            {featuredItem.image ? (
              <img 
                src={featuredItem.image} 
                alt={featuredItem.name} 
                style={{ margin: "20px 0" }}
              />
            ) : (
              <></>
            )}
          </div>
          <div>
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
            >
              {featuredItem.name}
            </Typography>
            <div 
              style={{ 
                display: "flex", 
                alignContent: "center", 
                justifyContent: "space-between" 
              }}
            >
              <Typography variant="h5">
                ${featuredItem.price.toFixed(2)}
              </Typography>
              <div 
                className={styles.row}
                style={{ justifyContent: "end" }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    ml: 1, 
                    mr: 1,
                    filter: "opacity(0.7)" 
                  }}
                >
                  {priorityIcons[featuredItem.priority]}
                </Typography>
                <Typography 
                  color="text.secondary"
                >
                  {featuredItem.percentage}%
                </Typography>
              </div>
            </div>
          </div>
          <LinearProgress 
            variant="determinate" 
            value={featuredItem.percentage} 
            sx={{ 
              borderRadius: "4px", 
              height: "12px",
            }} 
          />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}