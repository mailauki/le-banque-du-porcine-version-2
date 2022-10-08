import styles from '../styles/Home.module.css'

export default function ItemEl({ item }) {
  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.name} />
      <p>{item.name} - ${item.price.toFixed(2)}</p>
    </div>
  )
}