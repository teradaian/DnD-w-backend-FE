import { Link } from "react-router-dom"

const Card = (props) => {

  console.log(props.charSheet.race);

  return (
    <>
      <div>
        <div className="card title"  >
        <img 
          style={{ width: "50px", height: "50px" }}
          src={`/images/${props.charSheet.class}.svg`} 
          alt="class-logo"
        />
         <img 
          style={{ width: "50px", height: "50px" }}
          src={`/images/${props.charSheet.race}.png`} 
          alt="race-logo"
        />
          <div>
            <Link 
              to='/CharSheetView'
              state={props.charSheet}
              >
              {props.charSheet.name}
              </Link>
          </div>
          {props.charSheet.class}<br/>
        <button 
          onClick={()=> props.handleDeleteCharSheet(props.charSheet._id)}
        >
          Delete
        </button>
        </div>
      </div>
    </>
  )
}

export default Card;