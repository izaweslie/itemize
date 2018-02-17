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

export function ScannerModal({ onAfterOpen, onClose, onSubmit, handleChange, code}){
  
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
          <select name="input-stream_constraints" id="deviceSelection">
          </select>
        </label>

        <div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="code">EAN:</label>
              <input id="code" className="form-control" name="code" type="text" value = {code} onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div id="scanner-container"  className="viewport center-block">
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={onClose} className="btn btn-default pull-left camera-hide"
          data-dismiss="modal">Cancel</button>
      </div>
    </Modal>
  );
}

export function ManualModal({ onAfterOpen, onClose, onSubmit, handleChange }) {
  // fill in definition here
  return(<Modal isOpen
    onRequestClose={onClose}
    onAfterOpen={onAfterOpen}
    style={CUSTOM_STYLES}
    contentLabel="Manual Modal">Test</Modal>)
}
