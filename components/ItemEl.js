import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { LinearProgress, Typography, Button, ButtonGroup } from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ItemEl({ item, onEdit, onDelete }) {
  const [flip, setFlip] = useState(false)

  const priorityIcons = {
    1: <LooksOneIcon color="error" sx={{ fontSize: "inherit", verticalAlign: "text-top" }} />,
    2: <LooksTwoIcon color="warning" sx={{ fontSize: "inherit", verticalAlign: "text-top" }} />,
    3: <Looks3Icon color="success" sx={{ fontSize: "inherit", verticalAlign: "text-top" }} />,
  }

  return (
    <div className={styles.cardShadow}>
      <div 
        className={`${styles.card} ${flip ? styles.flip : ""}`} 
        onClick={() => setFlip(!flip)}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardFront} >
            <div style={{ margin: "auto 0" }}>
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <></>
              )}
            </div>
            <div>
              <div className={styles.row}>
                <Typography>{item.name}</Typography>
                <Typography 
                  color="text.secondary"
                >
                  {item.percentage}%
                </Typography>
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
          </div>
          <div className={styles.cardBack}>
            <ButtonGroup 
              fullWidth
              sx={{ 
                display: "flex",
                justifyContent: "center", 
                color: "text.secondary",
              }} 
            >
              <Button 
                startIcon={<EditIcon />} 
                onClick={() => onEdit(item)}
              >
                Edit
              </Button>
              <Button  
                startIcon={<DeleteIcon />} 
                onClick={() => onDelete(item)}
              >
                Delete
              </Button>
            </ButtonGroup>
            <div>
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
              >
                {item.name}
              </Typography>
              <div 
                style={{ 
                  display: "flex", 
                  alignContent: "center", 
                  justifyContent: "space-between" 
                }}
              >
                <Typography variant="h5">
                  ${item.price.toFixed(2)}
                </Typography>
                <Typography 
                  variant="h5" 
                  style={{ 
                    marginLeft: "4px", 
                    filter: "opacity(0.7)" 
                  }}
                >
                  {priorityIcons[item.priority]}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}