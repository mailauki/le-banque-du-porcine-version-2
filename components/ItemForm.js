import { useState } from 'react';
import styles from '../styles/Form.module.css'
import { TextField, Rating, InputAdornment, Button, } from '@mui/material';
import { styled } from '@mui/material/styles';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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

export default function ItemForm({ item, onAdd, onEdit, userId, defaultBalance }) {
  const [name, setName] = useState(item ? item.name : "")
  const [price, setPrice] = useState(item ? item.price : 0)
  const [priority, setPriority] = useState(item ? item.priority : 1)
  const [image, setImage] = useState(item ? item.image : "")
  const [hover, setHover] = useState(-1)
  
  function handleSubmit(event) {
    event.preventDefault()

    let formData = { name: name, price: parseFloat(price), priority: priority, image: image, balance_id: defaultBalance.id, user_id: userId }

    item ? onEdit(formData) : onAdd(formData)
  }

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          id="item-name"
          fullWidth
          label="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          id="item-price"
          fullWidth
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          label="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
          margin="normal"
        />
        <TextField
          id="item-priority"
          fullWidth
          disabled
          label="Priority" 
          value={labels[hover !== -1 ? hover : priority]} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
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
              </InputAdornment>
            ),
          }}
          margin="normal"
        />
        <TextField
          id="item-image"
          fullWidth
          label="Image Url" 
          value={image} 
          onChange={(e) => setImage(e.target.value)}
          margin="normal"
        />
        <Button 
          variant="contained" 
          type="submit"
          fullWidth
          sx={{ margin: "16px 0 8px 0", padding: "12px" }}
        >
          {item ? "Edit" : "Add"}
        </Button>
      </form>
    </div>
  )
}