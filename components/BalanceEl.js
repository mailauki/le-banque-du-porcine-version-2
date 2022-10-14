import styles from '../styles/Home.module.css'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BalanceEl({ balance, onEdit, onDelete }) {
  return (
    <div>
      <div 
        className={styles.row} 
        style={{ alignItems: "baseline" }}
      >
        <p>{balance.name}</p>
        <span 
          style={{ 
            width: "95%", 
            borderBottom: "solid 1px #999", 
            marginRight: "2.5%", 
            marginLeft: "2.5%"
          }} 
        />
        <p>${balance.amount.toFixed(2)}</p>
      </div>
      <div>
        <IconButton onClick={() => onEdit(balance)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(balance)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}