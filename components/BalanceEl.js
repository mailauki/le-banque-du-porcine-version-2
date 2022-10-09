import styles from '../styles/Home.module.css'

export default function BalanceEl({ balance }) {
  return (
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
  )
}