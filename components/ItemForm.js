import { useState } from 'react';
// import { supabase } from '../utils/supabaseClient';
import styles from '../styles/Form.module.css'
import { TextField, Typography, Rating, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import { supabase } from '../utils/supabaseClient';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}))

const priorityIcons = {
  1: {
    icon: <LooksOneIcon color="error" fontSize="large" sx={{ mr: 1, ml: 1 }} />,
    label: 'High'
  },
  2: {
    icon: <LooksTwoIcon color="warning" fontSize="large" sx={{ mr: 1, ml: 1 }} />,
    label: 'Medium'
  },
  3: {
    icon: <Looks3Icon color="success" fontSize="large" sx={{ mr: 1, ml: 1 }} />,
    label: 'Low'
  },
}

const labels = {
  1: 'High',
  2: 'Medium',
  3: 'Low',
}

function IconContainer(props) {
  const { value, ...other } = props
  return <span {...other}>{priorityIcons[value].icon}</span>
}

export default function ItemForm({ item, onAdd, userId, defaultBalance }) {
  const [name, setName] = useState(item ? item.name : "")
  const [price, setPrice] = useState(item ? item.price : 0)
  const [priority, setPriority] = useState(item ? item.priority : 1)
  const [image, setImage] = useState(item ? item.image : "")
  const [errors, setErrors] = useState([])
  const [hover, setHover] = useState(-1)
  
  function handleSubmit(event) {
    event.preventDefault()

    let formData = {name: name, price: parseFloat(price), priority: priority, image: image, balance_id: defaultBalance.id, user_id: userId }

    onAdd(formData)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.input}>
          <label>Name</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className={styles.input}>
          <label>Price</label>
          <input type="number" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} />
        </div>
        <div className={styles.input}>
          <label>Priority</label>
          <div 
            className="priority"
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <StyledRating
              name="priority"
              value={priority}
              onChange={(event, newValue) => {
                setPriority(newValue)
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover)
              }}
              max={3}
              IconContainerComponent={IconContainer}
              getLabelText={(value) => priorityIcons[value].label}
              highlightSelectedOnly 
            />
            <Typography component="span" sx={{ ml: 1, width: "80px" }}>{labels[hover !== -1 ? hover : priority]}</Typography>
          </div>
        </div>
        <div className={styles.input}>
          <label>Image Url</label>
          <input type="url" value={image} onChange={(event) => setImage(event.target.value)} />
        </div>
        <button className={styles.button} type="submit">{!item ? "Add" : "Edit"}</button>
      </form>
    </div>
  )
}