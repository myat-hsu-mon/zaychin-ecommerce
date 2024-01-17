import styles from '../scss/Timeline.module.scss'
export default function Timeline({ ...props }) {
  console.log('total', props.total)
  console.log('active', props.active)
  return (
    <>
      {
        props.total === 3 ?
          (
            <div className={styles.container}>
              <div className={`${styles.children} ${props.active >= 1 && styles.active}`}></div>
              <div className={`${styles.children} ${props.active >= 2 && styles.active}`}></div>
              <div className={`${styles.children} ${props.active >= 3 && styles.active}`}></div>
            </div>
          ) :
          (
            <div className={styles.container}>
              <div className={`${styles.children} ${props.active >= 1 && styles.active}`}></div>
              <div className={`${styles.children} ${props.active >= 2 && styles.active}`}></div>
              <div className={`${styles.children} ${props.active >= 3 && styles.active}`}></div>
              <div className={`${styles.children} ${props.active >= 4 && styles.active}`}></div>
              <div className={`${styles.children} ${props.active >= 5 && styles.active}`}></div>
            </div>
          )
      }

    </>
  )
}