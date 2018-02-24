import React, { Component } from "react";
import Modal from 'react-modal';

//custom styles for the modal; should probably move to a separate sytles file
const CUSTOM_STYLES = {
	content : {
		top : '50%',
		left : '50%',
		right : 'auto',
		bottom : 'auto',
		transform : 'translate(-50%, -50%)',
		overlay: {zIndex: '100'},
		padding: '0',
		minWidth: '20rem',
		maxHeight: '40rem',
	}
};

const ModalType = { CHOOSE: 'choose', SCANNER: 'scanner', MANUAL: 'manual' };
export { ModalType };

export function ChooseModal ({ onAfterOpen, onClose, onSubmit, scanner, manual}){

	return (
		<Modal isOpen
		onRequestClose={onClose}
		onAfterOpen={onAfterOpen}
		style={CUSTOM_STYLES}
		contentLabel="Choose Modal">
			<div className="modal-header" style={{padding: "35px 50px"}}>
				<h4><span className="glyphicon glyphicon-camera"></span>Item Entry</h4>
				<button type="button" className="close" onClick={onClose} data-dismiss="modal"><i className="fas fa-times"></i></button>
			</div>
			<div className="modal-body text-center" style={{padding:"40px 50px"}}>
				<div className = "row">
					<div className ="col-12">
						<button type = "button" data-toggle="modal" onClick={scanner} className="btn btn-primary blue-btn" id="scan-btn"><i className="fas fa-camera fa-2x align-middle" id ="plus"></i><span>&nbsp;&nbsp;Scan</span></button>
					</div>
					<div className = 'col-12'>
						<button type = "button" data-toggle="modal" onClick={manual} className="btn btn-primary blue-btn" id="manual-btn"><i className="fas fa-keyboard fa-2x align-middle" id ="plus"></i><span>&nbsp;&nbsp;Type</span></button>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export function ScannerModal({ onAfterOpen, onClose, onSubmit, onChange, code}){

	return (
		<Modal isOpen
		onRequestClose={onClose}
		onAfterOpen={onAfterOpen}
		style={CUSTOM_STYLES}
		contentLabel="Scanner Modal">
			<div className="modal-header" style={{padding: "35px 50px"}}>
				<h4><span className="glyphicon glyphicon-camera"></span>Item Entry</h4>
				<button type="button" className="close" onClick={onClose} data-dismiss="modal"><i className="fas fa-times"></i></button>
			</div>
			<div className="modal-body" style={{padding:"40px 50px"}}>
				<label id = "camera-selection">
					<span>Camera</span>
					<select name="input-stream_constraints" id="deviceSelection"></select>
				</label>
				<div>
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<label htmlFor="code">Scan or Type Bar Code:</label>
							<input id="code" className="form-control" name="code" type="text" value = {code} onChange={onChange}/>
						</div>
						
					</form>
				</div>
				<div id="scanner-container"  className="viewport center-block"></div>
			</div>
			<div className="modal-footer">
				<button type="submit" onClick={onSubmit} className="btn btn-primary blue-btn">Submit</button>
			</div>
		</Modal>
	);
}

export function ManualModal({ onAfterOpen, onClose, onSubmit, onChange, productName, location, companyName, category, desc, ean, quantity, price }) {
// fill in definition here
	return (
		<Modal isOpen
		onRequestClose={onClose}
		onAfterOpen={onAfterOpen}
		style={CUSTOM_STYLES}
		contentLabel="Manual Modal">
			<div className="modal-header" style={{padding: "35px 50px"}}>
				<h4><span className="glyphicon glyphicon-camera"></span>Manual Entry</h4>
				<button type="button" className="close" onClick={onClose} data-dismiss="modal"><i className ="fas fa-times"></i></button>
			</div>
			<div className="modal-body" style={{padding:"20px 30px"}}>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="productName">Product:</label>
						<input name="productName" className="form-control" type="text" value={productName} onChange={onChange}/>

						<label htmlFor="ean">EAN/Bar Code Number:</label>
						<input name="ean" className="form-control" type="text" value={ean} onChange={onChange}/>

						<label htmlFor="location">Location:</label>
						<input name="location" className="form-control" type="text" value={location} onChange={onChange}/>

						<label htmlFor="companyName">Company:</label>
						<input name="companyName" className="form-control" type="text" value={companyName} onChange={onChange}/>

						<label htmlFor="category">Category:</label>
						<input name="category" className="form-control" type="text" value={category} onChange={onChange}/>

						<label htmlFor="quantity">Quantity:</label>
						<input name="quantity" className="form-control" type="text" value={quantity} onChange={onChange}/>

						<label htmlFor="price_new">Price:</label>
						<input name="price_new" className="form-control" type="text" value={price} onChange={onChange}/>

						<label htmlFor="desc">Description:</label>
						<input name="desc" className="form-control" type="text" value={desc} onChange={onChange}/>
					</div>
				</form>
			</div>
			<div className="modal-footer">
				<button type="submit" onClick={onSubmit} className="btn btn-primary blue-btn">Submit</button>
			</div>
		</Modal>
	)
}
