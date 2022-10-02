const ItemSubDocuments = (props) => {
  console.log(props);
  return (  
    <>
      <h4>Item Damage: {props.itemDetails.damage?.damage_dice} </h4>
      <h4>Damage type: {props.itemDetails.damage?.damage_type.name}</h4>
      <h4>Item Range: Normal: {props.itemDetails.range?.normal}</h4>
        {props.itemDetails.range?.long ? 
          <h4>Long: {props.itemDetails.range.long} </h4>
        :
        ''
      }
    </>
  )
}
 
export default ItemSubDocuments