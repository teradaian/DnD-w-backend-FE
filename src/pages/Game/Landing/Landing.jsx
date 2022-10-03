import styles from './Landing.module.css'
import NavBar from '../../components/NavBar/NavBar'

const Landing = ({ user }) => {
  return (
    <>
      <NavBar/>
      <main className={styles.container}>
        <div className='app largeCard title'>
          <h2>So you think your Character is strong enough to survive!</h2>
        </div>
      </main>
    </>
  )
}

export default Landing
