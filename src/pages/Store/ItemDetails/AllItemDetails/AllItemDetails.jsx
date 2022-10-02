import ItemSubDocuments from "./ItemSubDocuments";

const AllItemDetails = (props) => {
  return (
    <>
        <h3>Weight: {props.itemDetails.weight} lbs</h3>
        <h4>Cost: {props.itemDetails.cost?.quantity}{props.itemDetails.cost?.unit}</h4>
        <ItemSubDocuments itemDetails={props.itemDetails}/>
    </>
  )
}
 
export default AllItemDetails;