import { Link } from "react-router-dom"

const Card = (props) => {



  return (
    <>
      <div className="app">
        <div className="card title"  >
          <div>
            <Link 
              to='/CharSheetView'
              state={props.charSheet}
              >
              {props.charSheet.name}
              </Link>
          </div>
          {props.charSheet.class}
        </div>
        <button 
          onClick={()=> props.handleDeleteCharSheet(props.charSheet._id)}
        >
          Delete
        </button>
      </div>
    </>
  )
}

export default Card;