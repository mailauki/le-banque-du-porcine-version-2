import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { IconButton, Typography, Button, ButtonGroup } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BalanceEl({ balance, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{ 
        display: "flex",
        alignItems: "center", 
        height: "45px",
      }}
    >
      <div 
        className={styles.row} 
        style={{ 
          cursor: "pointer"
        }}
        onClick={() => setOpen(!open)}
      >
        <Typography sx={{ borderBottomStyle: "none" }}>{balance.name}</Typography>
        <Typography 
          sx={{
            alignItems: "baseline",
            borderBottom: 1,
            borderColor: "divider",
            flexGrow: 1,
            mr: 1,
            ml: 1,
            mt: -1.5,
            mb: 0,
            color: "transparent"
          }}
        >-</Typography>
        {!open ? (
          <Typography 
            color="text.secondary" 
          >
            ${balance.amount.toFixed(2)}
          </Typography>
        ) : (
          <div>
            <IconButton 
              size="small"
              onClick={() => onEdit(balance)}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              size="small"
              onClick={() => onDelete(balance)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  )
}