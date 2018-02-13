import React, { Component } from "react";
import Modal from 'react-modal';
import Quagga from 'quagga'; // ES6
import "./styles.css";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import Card from '../../components/Card'

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		transform             : 'translate(-50%, -50%)',
		overlay: {zIndex: '100'},
		padding: '0'
	}
};

class Articles extends Component {
	constructor() {
		super();
		this.state = {
			modalIsOpen: false,
			codeInput: false,
			databaseCall: false,
			code: "",
			error: false,
			data: "",
			savedItems: [],
			item: {
				productName:"",
				companyName:"",
				ean: "",
				upca: "",
				category: "",
				desc: "",
				price_new: "",
				image: "", 
				location: ""
			},
			
			format:"",
			liveStreamConfig: {
				inputStream: {
					name: "Live",
					type: "LiveStream",
					target: document.querySelector('#scanner-container'),
					constraints: {
						width: 1920,
						height: 1080,
						facingMode: "environment"
					},
				},
				locator: {
					patchSize: "medium",
					halfSample: true
				},
				numOfWorkers: 4,
				frequency: 1,
				decoder: {
					readers: [
					"code_128_reader",
					"ean_reader",
					"ean_8_reader",
					"code_39_reader",
					"code_39_vin_reader",
					"codabar_reader",
					"upc_reader",
					"upc_e_reader",
					"i2of5_reader",
					"2of5_reader",
					"code_93_reader"
					],
					debug: {
						showCanvas: true,
						showPatches: true,
						showFoundPatches: true,
						showSkeleton: true,
						showLabels: true,
						showPatchLabels: true,
						showRemainingPatchLabels: true,
						boxFromPatches: {
							showTransformed: true,
							showTransformedBox: true,
							showBB: true
						}
					}
				}
			},
			canvas: ""
		};

		this.openModal = this.openModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		//this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	componentWillMount() {
		Modal.setAppElement('#root');
	}

	pickPic(){
		Quagga.decodeSingle({
			decoder: {
			readers: ["code_128_reader"] // List of active readers
		},
		locate: true, // try to locate the barcode in the image
		// You can set the path to the image in your server
		// or using it's base64 data URI representation data:image/jpg;base64, + data
		src: '/barcode_image.jpg'
	}, function(result){
		if(result.codeResult) {
			console.log("result", result.codeResult.code);
			this.setState({code:result.codeResult.code }) ;

		} else {
			console.log("not detected");
		}
	});
	}

	loadSavedItems = () => {
		API.getSavedItems().then(res => {
			this.setState({ savedItems: res.data })
			console.log(this.state.savedItems)
		}).catch(err => console.log(err));
	}

	handleItemSave = (item) => {
		API.saveItem({
			productName: item.productName,
			companyName: item.companyName,
			ean: item.ean,
			upca: item.upca,
			category:item.category,
			desc:item.desc,
			price_new:item.price_new,
			image:item.image,
			location:item.location
		})
		.then(res => {
			this.loadSavedItems();
		})
		.catch(err => console.log(err));
	};

	handleChange = (event) => {
		//const newState = {...this.state, event[target]}
		const { name, value } = event.target;
		//console.log(name, value);
		if(!this.state.codeInput || this.state.error){
			this.setState({
				[name]: value
			});
		}
		else if(this.state.item.productName !== ""){
			//item: Object.assign({}, this.state.item);
			this.setState({
				item: Object.assign({}, this.state.item, {
					[name]: value
				}),
			})
		}
		
	}

	startQuagga = () => {
		console.log("this is", this);
		console.log(this.state.liveStreamConfig.inputStream.target)
		let selector = Object.assign({}, this.state.liveStreamConfig);
		//while(selector.inputStream.target === null){

			selector.inputStream.target = document.querySelector('#scanner-container');
		//}
		console.log(selector)
		this.setState({liveStreamConfig: selector});
		Quagga.init(
			this.state.liveStreamConfig, (err) => {
			if (err) {
				console.log(err);
				this.stopQuagga();
				return
			}
			this.initCameraSelection();
			console.log("Initialization finished. Ready to start");
			Quagga.start();

					// Set flag to is running
					//_scannerIsRunning = true;
		});

		Quagga.onProcessed((result) =>{
			var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;
			//console.log(drawingCanvas.getAttribute("width"))
			this.setState({canvas: drawingCanvas.getAttribute("width")})

			if (result) {
				if (result.boxes) {
					drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
					result.boxes.filter(function (box) {
						return box !== result.box;
					}).forEach(function (box) {
						Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
					});
				}

				if (result.box) {
					Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
				}

				if (result.codeResult && result.codeResult.code) {
					Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
				}
			}
		});


		Quagga.onDetected( (result) => {
			console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
			this.setState({code:result.codeResult.code, format:result.codeResult.format }) ;
			
		})
	}
	stopQuagga = () =>{
		Quagga.stop();
		this.closeModal();
	}

	handleSubmit(event){
		event.preventDefault();
		
		if(this.state.code){
			this.stopQuagga();
			this.getProductInfo();
		}
		else if(this.state.item.productName){
			console.log("to the database!");
			console.log(this.state.item);
			this.handleItemSave(this.state.item);
			this.setState({databaseCall: true});
		}
		//this.setState({code:result.codeResult.code, format:result.codeResult.format })
		//console.log(this.state.code)

	}

	getProductInfo = () => {
		API.getProduct(this.state.code).then(res => {
			console.log(res);
			if(res !== "Error"){
				this.setState({data: res.data, code: "", codeInput: true})
				if (this.state.data.product.attributes === undefined){
					var newData = { data: {
				          product:{
				            attributes:{
				              product: "Item not found. Please enter the Item details",
				              category_text: "",
				              long_desc: "",
				              price_new: ""
				            },
				            EAN13: this.state.data.product.EAN13,
				            UPCA: "",
				            image: ""
				          },
				          company:{
				            name: ""
				          }
				        }
			    	}
			        this.setState({data: newData.data});
			        console.log(this.state.data);
				}
				else{
					let item = Object.assign({}, this.state.item);
					item.productName = this.state.data.product.attributes.product;
					item.companyName = this.state.data.company.name;
					item.ean = this.state.data.product.EAN13;
					item.upca = this.state.data.product.UPCA;
					item.category = this.state.data.product.attributes.category_text;
					item.desc = this.state.data.product.attributes.long_desc;
					item.price_new = this.state.data.product.attributes.price_new;
					item.image = this.state.data.product.image;
					this.setState({item});
					//this.setState({item[productName]: this.state.data.product.attributes.product})
					console.log(this.state.item);
				}
			
				
			}
			else{
				this.setState({data: "error", error: true});
				console.log(this.state)
				let item = Object.assign({}, this.state.item);
				item.productName = this.state.data;
				console.log(item)
				this.setState({item});
				console.log(this.state)
			}

			
		})
	}
	initCameraSelection = () =>{
		var streamLabel = Quagga.CameraAccess.getActiveStreamLabel();

		return Quagga.CameraAccess.enumerateVideoDevices()
		.then(function(devices) {
			function pruneText(text) {
				return text.length > 30 ? text.substr(0, 30) : text;
			}
			var $deviceSelection = document.getElementById("deviceSelection");
			while ($deviceSelection.firstChild) {
				$deviceSelection.removeChild($deviceSelection.firstChild);
			}
			devices.forEach(function(device) {
				var $option = document.createElement("option");
				$option.value = device.deviceId || device.id;
				$option.appendChild(document.createTextNode(pruneText(device.label || device.deviceId || device.id)));
				$option.selected = streamLabel === device.label;
				$deviceSelection.appendChild($option);
			});
		})

	}
	openModal() {

		let selector = Object.assign({}, this.state.liveStreamConfig);
		selector.inputStream.target = document.querySelector('#scanner-container');
		let item = Object.assign({}, this.state.item);
		item.productName = "";
		item.companyName = "";
		item.ean = "";
		item.upca = "";
		item.category = "";
		item.desc = "";
		item.price_new = "";
		item.image = ""; 
		this.setState({modalIsOpen: true, codeInput: false, databaseCall: false, item, error:false, data: "", code: ""});
		console.log(this.state);
		//, liveStreamConfig.inputStream.target:
	}

	afterOpenModal(that) {
		// references are now sync'd and can be accessed.
		//this.subtitle.style.color = '#f00';
		that.startQuagga()
		//console.log(that)
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}


	render() {
		return (
			<div>
				<Container fluid>
					<div className = "row buttonDiv">
						
						<div className="offset-md-3 col col-md-3 col-sm-6 text-center">
							<a data-toggle="modal" href="" id="manualBtn"><span className="glyphicon glyphicon-pencil disabled"></span>Manual Entry</a>
						</div>
						<div className="col col-md-3 col-sm-6 text-center">
							<a data-toggle="modal" onClick={() => this.openModal()} href="#" id="cameraBtn"><span className="glyphicon glyphicon-camera"></span>Camera Entry</a>
						</div>
					</div>

					<div className="row list">
						<Col size ="sm-12 xs-12">
							
						{this.state && !this.state.databaseCall ?(<h1 className="list-group-item active" id="headerOne">Enter Item</h1>): (<h1 className="list-group-item active" id="headerOne">Your Items</h1>)}
						</Col>
					</div>
					
						<Row>
						{this.state && !this.state.databaseCall ? (
							<form onSubmit={this.handleSubmit}>
						
								<div className="form-group">
									<label htmlFor="productName">Product:</label>
									<input name="productName" className="form-control" type="text" value={this.state.item.productName} onChange={this.handleChange}/>

									<label htmlFor="location">Location:</label>
									<input name="location" className="form-control" type="text" value={this.state.item.location} onChange={this.handleChange}/>

									<label htmlFor="companyName">Company:</label>
									<input name="companyName" className="form-control" type="text" value={this.state.item.companyName} onChange={this.handleChange}/>

									<label htmlFor="category">Category:</label>
									<input name="category" className="form-control" type="text" value={this.state.item.category} onChange={this.handleChange}/>

									<label htmlFor="desc">Description:</label>
									<input name="desc" className="form-control" type="text" value={this.state.item.desc} onChange={this.handleChange}/>

								</div>
								
								<button type="submit" className="btn btn-primary">Submit</button>
								
								
							</form>

						) : (
							<Col size='md-12'>
								{this.state.savedItems.length ? (
									<div className="card-columns">
										{this.state.savedItems.map(item => (
											
											<div key = {item._id} className = 'card'>
												<img className="card-img-top" src={item.image} alt="Card image cap"/>
												<div className="card-block">
													<h4 className="card-title">{item.productName}</h4>
													<div className="card-text">
														<div><strong>Category:</strong> {item.category}</div>
														<div><strong>Location:</strong> {item.location}</div>
														<div><strong>Description:</strong> {item.desc}</div>
													</div>
												</div>

												<div className="card-footer">
													<small className="text-muted">Price: {item.price_new}</small>
												</div>
											</div>
											
										))}
									</div>
								) : (
									<h3>No Results to Display</h3>
								)}
							</Col>


						)}


							

						</Row>

					
					<Row>


					</Row>
					<Modal isOpen={this.state.modalIsOpen}
					onRequestClose={this.stopQuagga}
					onAfterOpen={() =>this.afterOpenModal(this)}
					style={customStyles}
					contentLabel="Scanner Modal">
						<div className="modal-header" style={{padding: "35px 50px"}}>
							<button type="button" className="close"  onClick={() => this.stopQuagga()} data-dismiss="modal">&times;</button>
							<h4><span className="glyphicon glyphicon-camera"></span>Item Entry</h4>
						</div>
						<div className="modal-body" style={{padding:"40px 50px"}}>
							<label>
								<span>Camera</span>
								<select name="input-stream_constraints" id="deviceSelection">
								</select>
							</label>
							
							<div>
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label htmlFor="code">EAN:</label>
									<input id="code" className="form-control" name="code" type="text" value={this.state.code} onChange={this.handleChange}/>
								</div>
								
								<button type="submit" className="btn btn-primary">Submit</button>
								
								
							</form>
							</div>
							<div id="scanner-container"  className="viewport center-block">


							</div>
						</div>
						<div className="modal-footer">
							<button type="button" onClick={() => this.stopQuagga()} className="btn btn-default pull-left camera-hide" 
								data-dismiss="modal">Cancel</button>
							
						</div>
				
							
						
				
				</Modal>


				</Container>
			</div>

				
			
		);
	}
}

export default Articles;
