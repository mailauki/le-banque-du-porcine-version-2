import styles from '../styles/Home.module.css'
import { LinearProgress } from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

export default function ItemEl({ item }) {
  const priorityIcons = {
    1: <LooksOneIcon color="error" />,
    2: <LooksTwoIcon color="warning" />,
    3: <Looks3Icon color="success" />,
  }

  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.name} />
      <p>{item.name} - ${item.price.toFixed(2)}</p>
      <div style={{ display: "flex", alignContent: "center" }}>
        <p>Priority: </p>
        <p style={{ marginLeft: "4px", filter: "opacity(0.7)" }}>{priorityIcons[item.priority]}</p>
      </div>
      <LinearProgress 
        variant="determinate" 
        value={item.percentage} 
        sx={{ 
          borderRadius: "4px", 
          height: "12px",
        }} 
      />
    </div>
  )
}