import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <div className='app largeCard title'>
        <h1 >D 
          <img 
            src="/images/dndlogo.png" 
            alt="logo" 
            className="App-logo"
            style={{ width: "35px", height: "35px" }}
            />D 
          <br />
          Home Page
            <>Welcome to this app for D&D enthusiasts.</>
        </h1> 
        <p>This site was made for learning purposes only. <br />
        All API resources are property of https://www.dnd5eapi.co and are used under strict guidelines </p>
      </div>
    </main>
  )
}

export default Landing
