import React from "react";
const ItemList = props => (
	<div className="list-group">
		<a href={"#"+props.item._id} data-toggle="collapse" className="list-group-item list-group-item-action flex-column align-items-start">
			<div className = "row">
				<div className = "col col-md-1 text-center">
					<img className="list-img-left" src={props.item.image}/>
				</div>
				<div className = "col-sm-10 col-md-11">
					<div className="d-flex w-100 justify-content-between">
						<h5 className="mb-1">{props.item.productName}</h5>
						<small>Qty. {props.item.quantity}</small>
					</div>
					<div className = "d-flex w-100 justify-content-between">
						<div className =""><small>${props.item.price_new}</small></div>
						<div className = ""><small>{props.item.location}</small></div>
					</div>
				</div>
			</div>
			<div className = "collapse top-padding" id ={props.item._id}>
				<div className = 'row justify-content-between'>
					<div className='col-8 col-sm-9'>{props.item.desc}</div>
					<div className ='col-4 col-sm-3 col-md-3 col-lg-3'><button type = "button" onClick = {() => props.deleteItem(props.item._id)}className="btn btn-primary float-right" id="delete-btn"><span>Delete Item</span></button></div>
				</div>

			</div>
		</a>
	</div>
)

export default ItemList;