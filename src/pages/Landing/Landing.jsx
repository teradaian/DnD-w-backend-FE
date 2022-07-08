import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <div className='app card title'>
        <h1>WELCOME</h1>
        <h1>D 
          <img 
            src="/images/dndlogo.png" 
            alt="logo" 
            className="App-logo"
            style={{ width: "35px", height: "35px" }}
          />D 
          <br />
          Home Page
        </h1> 
      </div>
    </main>
  )
}

export default Landing
