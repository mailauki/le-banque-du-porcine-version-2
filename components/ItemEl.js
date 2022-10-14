import styles from '../styles/Home.module.css'
import { LinearProgress, IconButton, Typography, Button, ButtonGroup } from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip } from "swiper";
import 'swiper/css';
import "swiper/css/effect-flip";

export default function ItemEl({ item, onEdit, onDelete }) {
  const priorityIcons = {
    1: <LooksOneIcon color="error" sx={{ fontSize: "inherit", verticalAlign: "text-top" }} />,
    2: <LooksTwoIcon color="warning" sx={{ fontSize: "inherit", verticalAlign: "text-top" }} />,
    3: <Looks3Icon color="success" sx={{ fontSize: "inherit", verticalAlign: "text-top" }} />,
  }

  return (
    <div 
      className={styles.card}
      style={{ padding: 0 }}
    >
      <Swiper 
        effect={"flip"}
        loop={true}
        modules={[EffectFlip]}
        slidesPerView="auto"
        onClick={(swiper) => swiper.slideNext()}
      >
        <SwiperSlide>
          <div 
            className={styles.card} 
            style={{ 
              margin: 0, 
              boxShadow: "none", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
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
                <Typography sx={{ color: "text.secondary" }}>
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
        </SwiperSlide>
        <SwiperSlide>
          <div 
            className={styles.card} 
            style={{ 
              margin: 0, 
              boxShadow: "none", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <ButtonGroup 
              // size="small" 
              // color="text.secondary"
              sx={{ 
                display: "flex",
                justifyContent: "center", 
                color: "text.secondary"
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
            {/* <div style={{ margin: "auto 0" }}>
            </div> */}
            {/* <div
              style={{ 
                display: "flex", 
                alignContent: "center", 
                justifyContent: "center",
                margin: "auto 0" 
              }}
            >
              <IconButton onClick={() => onEdit(item)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(item)}>
                <DeleteIcon />
              </IconButton>
            </div> */}
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
              {/* <ButtonGroup 
                // size="small" 
                sx={{ 
                  display: "flex",
                  justifyContent: "center" 
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
              </ButtonGroup> */}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}