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
							<div className ='col-8 col-sm-7 col-md-8 col-lg-9 text-center my-auto'>
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
							<div className ='col-8 col-sm-7 col-md-8 col-lg-9 text-center my-auto'>
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

export function EditPanel ({item, onSubmit, onChange}){
	return (
		<div className="card">
			<div className="card-header">
				Edit Item
			</div>
			<div className="card-body">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="productName">Product:</label>
						<input name="productName" className="form-control" type="text" value={item.productName} onChange={onChange}/>

						<label htmlFor="ean">EAN/Bar Code Number:</label>
						<input name="ean" className="form-control" type="text" value={item.ean} onChange={onChange}/>

						<label htmlFor="location">Location:</label>
						<input name="location" className="form-control" type="text" value={item.location} onChange={onChange}/>

						<label htmlFor="companyName">Company:</label>
						<input name="companyName" className="form-control" type="text" value={item.companyName} onChange={onChange}/>

						<label htmlFor="category">Category:</label>
						<input name="category" className="form-control" type="text" value={item.category} onChange={onChange}/>

						<label htmlFor="quantity">Quantity:</label>
						<input name="quantity" className="form-control" type="text" value={item.quantity} onChange={onChange}/>

						<label htmlFor="price_new">Price:</label>
						<input name="price_new" className="form-control" type="text" value={item.price_new} onChange={onChange}/>

						<label htmlFor="desc">Description:</label>
						<input name="desc" className="form-control" type="text" value={item.desc} onChange={onChange}/>
					</div>
					<button type="submit" className="btn btn-primary blue-btn float-right">Submit</button>
				</form>
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