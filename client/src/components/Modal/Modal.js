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
		padding: '0'
	}
};

const ModalType = { SCANNER: 'scanner', MANUAL: 'manual' };
export { ModalType };

export function ScannerModal({ onAfterOpen, onClose, onSubmit, onChange, code}){

	return (
		<Modal isOpen
		onRequestClose={onClose}
		onAfterOpen={onAfterOpen}
		style={CUSTOM_STYLES}
		contentLabel="Scanner Modal">
			<div className="modal-header" style={{padding: "35px 50px"}}>
				<button type="button" className="close" onClick={onClose} data-dismiss="modal">&times;</button>
				<h4><span className="glyphicon glyphicon-camera"></span>Item Entry</h4>
			</div>
			<div className="modal-body" style={{padding:"40px 50px"}}>
				<label>
					<span>Camera</span>
					<select name="input-stream_constraints" id="deviceSelection"></select>
				</label>
				<div>
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<label htmlFor="code">Scan or Type Bar Code:</label>
							<input id="code" className="form-control" name="code" type="text" value = {code} onChange={onChange}/>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
				<div id="scanner-container"  className="viewport center-block"></div>
			</div>
			<div className="modal-footer">
				<button type="button" onClick={onClose} className="btn btn-default pull-left camera-hide"
				data-dismiss="modal">Cancel</button>
			</div>
		</Modal>
	);
}

export function ManualModal({ onAfterOpen, onClose, onSubmit, onChange, productName, location, companyName, category, desc, ean }) {
// fill in definition here
	return (
		<Modal isOpen
		onRequestClose={onClose}
		onAfterOpen={onAfterOpen}
		style={CUSTOM_STYLES}
		contentLabel="Manual Modal">
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

					<label htmlFor="desc">Description:</label>
					<input name="desc" className="form-control" type="text" value={desc} onChange={onChange}/>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</Modal>
	)
}
