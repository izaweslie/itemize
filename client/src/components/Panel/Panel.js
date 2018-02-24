import React from "react";
import ItemList from '../ItemList'

export function SummaryPanel ({total_items, total_worth}){
	return (
		<div className="card" id ='summary'>
			<div className="card-header">
				Summary
			</div>
			<div className="card-body">
				<div className = 'row justify-content-around'>
					<div className="col-sm-4" id ="total-items-card">
						<div className="row" id ="total-items">
							<div className ="col col-sm-5 col-md-4 col-lg-3 my-auto" id ="summ-icon-container">
								<i className="fas fa-shopping-bag fa-4x" id = "summ-icon"></i>
							</div>
							<div className ='col-9 col-sm-7 col-md-8 col-lg-9 text-center my-auto'>
								<h1 className="card-title">{total_items}</h1>
								<div className ='row text-center'>
									<div className = 'col'>Total Items</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-4" id ="total-price-card">
						<div className="row" id ="total-price">
							<div className ="col col-sm-5 col-md-4 col-lg-3 my-auto" id ="price-icon">
								<i className="fas fa-dollar-sign fa-4x"></i>
							</div>
							<div className ='col-9 col-sm-7 col-md-8 col-lg-9 text-center my-auto'>
								<h1 className="card-title">${total_worth}</h1>
								<div className ='row text-center'>
									<div className = 'col'>Total Value</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export function ItemPanel ({items, choose, deleteItem}){
	return (
		<div className="card" id ='items'>
			<div className="card-header">
				<div className ='row justify-content-between'>
					<div className='col-md-4 col-6 panel-icon' id ="">
						Catalogued Items
					</div>
					<div className = "plus col-4" id="plus-container">
						<button type = "button" data-toggle="modal" onClick={choose} className="btn btn-primary float-right" id="choose-btn"><i className="far fa-plus-square fa-2x align-middle" id ="plus"></i><span>&nbsp;&nbsp;Add an item</span></button>
					</div>
				</div>
			</div>
			<div className="card-body" id="item-list">
				{items.length ? (
					<div className = 'col' id ="item-col">
						{items.map(item => (
							<ItemList item ={item} key={item._id} deleteItem = {deleteItem} />
						))}
					</div>
				) : (
					<h3>No Results to Display</h3>
				)}
			</div>
		</div>
	)
}