import styles from '../styles/Home.module.css'
import { LinearProgress, IconButton } from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Pagination, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/effect-flip";
import "swiper/css/navigation";

export default function ItemEl({ item, onEdit, onDelete }) {
  const priorityIcons = {
    1: <LooksOneIcon color="error" />,
    2: <LooksTwoIcon color="warning" />,
    3: <Looks3Icon color="success" />,
  }

  return (
    <div style={{ width: "calc(250px + 2rem)" }}>
      <Swiper 
        effect={"flip"}
        loop={true}
        modules={[EffectFlip]}
        slidesPerView="auto"
        // width="800px"
        // width="fit-content"
        onClick={(swiper) => swiper.slideNext()}
      >
        <SwiperSlide
          // onClick={(swiper) => console.log(swiper)}
        >
          <div className={styles.card}>
            {item.image ? <img src={item.image} alt={item.name} /> : <></>}
            <div className={styles.row}>
              <p>{item.name}</p>
              <p>{item.percentage}%</p>
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
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.card}>
            <p>Price: ${item.price.toFixed(2)}</p>
            <div style={{ display: "flex", alignContent: "center" }}>
              <p>Priority: </p>
              <p style={{ marginLeft: "4px", filter: "opacity(0.7)" }}>{priorityIcons[item.priority]}</p>
            </div>
            <div>
              <IconButton onClick={() => onEdit(item)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(item)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    
    // <div className={styles.card}>
    //   {item.image ? <img src={item.image} alt={item.name} /> : <></>}
    //   <p>{item.name} - ${item.price.toFixed(2)}</p>
    //   <div style={{ display: "flex", alignContent: "center" }}>
    //     <p>Priority: </p>
    //     <p style={{ marginLeft: "4px", filter: "opacity(0.7)" }}>{priorityIcons[item.priority]}</p>
    //   </div>
    //   <div>
    //     <IconButton onClick={() => onEdit(item)}>
    //       <EditIcon />
    //     </IconButton>
    //     <IconButton onClick={() => onDelete(item)}>
    //       <DeleteIcon />
    //     </IconButton>
    //   </div>
    //   <p>{item.percentage}%</p>
    //   <LinearProgress 
    //     variant="determinate" 
    //     value={item.percentage} 
    //     sx={{ 
    //       borderRadius: "4px", 
    //       height: "12px",
    //     }} 
    //   />
    // </div>
  )
}