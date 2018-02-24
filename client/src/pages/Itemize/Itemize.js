import React, { Component } from "react";
import Modal from 'react-modal';
import Quagga from 'quagga';
import "./styles.css";
import API from "../../utils/API";
import { ModalType, ManualModal, ScannerModal, ChooseModal } from '../../components/Modal';
import ReactTable from 'react-table';
import ItemList from '../../components/ItemList'
import {ItemPanel, SummaryPanel} from '../../components/Panel'
import icon from "./icon-small.png"
//import "../../node_modules/react-table/react-table.css";

//add price, add way to add up value, add quantity, remove the database form after submitting, add delete item, check for duplicate items, look at error checking for 0030100940340

class Itemize extends Component {
	constructor() {
		super();
		this.state = {
			currentModal: null,
			modalIsOpen: false,
			chooseModal: null,
			editBeforeDatabase: false,
			code: "", 
			data: "",
			profile: "", 
			user_id: "", 
			savedItems: [], 
			total_items: "",
			total_worth: "",
			delete_item: "",
			item: {
				productName:"",
				companyName:"",
				ean: "",
				upca: "",
				category: "",
				desc: "",
				price_new: "",
				image: "",
				location: "",
				quantity: ""
			},
			format:"", //remove

			//does livestreamconfig need to be in state?
			//need to test if can remove from state.
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
			//does canvas need to be in here?
			canvas: "" //maybe remove
		};

		this.openModal = this.openModal.bind(this);
		this.handleScannerModalChange = this.handleScannerModalChange.bind(this);
		this.handleManualModalChange = this.handleManualModalChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	login() {
		this.props.auth.login();
	}

	logout() {
		this.props.auth.logout();
		this.setState({user_id: ""})
	}

	calculateTotal = (items) => {
		//for (let i = 0; i<)
		var total_items=0;
		var total_worth=0;
		items.forEach((item, index) => {
			total_items += item.quantity;
			total_worth += item.price_new*item.quantity;
		})
		this.setState({total_items: total_items, total_worth: total_worth});
		console.log("total_items" , total_items)
		console.log("total_worth" , total_worth)
	}

	checkForUser(user_id){
		//if a user deletes all of their items, then what? Either add dummy data or do api call to search for user id
		API.getUserSavedItems(user_id).then(res => {
			console.log("res", res);
			if (res.data === null){
				API.createUser(this.state.user_id).then(res => {
					console.log("res", res);
				})
			}
			this.loadSavedItems();
		}).catch(err => console.log(err));
	}

	componentWillMount() {
		Modal.setAppElement('#root');
		this.setState({ profile: {} });
		const { userProfile, getProfile } = this.props.auth;
		console.log(userProfile)
		console.log(localStorage.user_id);
		console.log(JSON.stringify(localStorage.authresult))
		
		console.log(this.state);
		//console.log(localStorage.user_id)
		 //need to figure out how to check if user exists based on async
		
		//console.log("user", this.state.profile)


		//******check if this is necessary:*******
		if (!userProfile) {
		 console.log('here')
		     getProfile((err, profile) => {
		    this.setState({ profile });
		    this.setState({user_id: this.state.profile.sub})
		    this.checkForUser(this.state.user_id)
		    console.log(this.state.profile)
		  });
		} else {
		  this.setState({ profile: userProfile, user_id: userProfile.sub }, function () {
		//      console.log(this.state.profile);
			this.checkForUser(this.state.user_id)
		})
		//this.loggedIn();
		}
	}

	loadUserSavedItems = (userId) => {
		API.getUserSavedItems(userId).then(res => {
			this.setState({ savedItems: res.data.item })
		}).catch(err => console.log(err));
	}

	loadSavedItems = () => {
		API.getUserSavedItems(this.state.user_id).then(res => {
			this.setState({ savedItems: res.data.items })
			console.log(this.state.savedItems)
			this.calculateTotal(this.state.savedItems);
		}).catch(err => console.log(err));
	}

	loggedIn = () => {
		// this.setState({loggedIn: true, user_id: "4"},  function () {
		// 	console.log(this.state.user_id);
		// 	this.loadUserSavedItems(this.state.user_id)
		// 	console.log(this.state.profile);
		// });
	}

	deleteItem = (item_id) => {
		//this.setState({delete_item: id})
		console.log("item", item_id)
		this.handleItemDelete(this.state.user_id, item_id);
	}

	handleItemDelete = (id, item_id) => {
		console.log(item_id)
		API.deleteItem(id, item_id).then(res => {
			console.log("deleted");
			this.loadSavedItems();
		}).catch(err => console.log(err));
	}
	handleItemSave = (item) => {
		if (item.image === ""){
			item.image = icon;
		}
		API.saveItem(this.state.user_id,{
			productName: item.productName,
			companyName: item.companyName,
			ean: item.ean,
			upca: item.upca,
			category:item.category,
			desc:item.desc,
			price_new:item.price_new,
			image:item.image,
			quantity:item.quantity,
			location:item.location
		})
		.then(res => {
			console.log(res)
			//API.updateUserItems(this.state.user_id, res.data._id)
			this.loadSavedItems();
		})
		.catch(err => console.log(err));
	};

	handleScannerModalChange = (event) => {
		const { name, value } = event.target;
		console.log(event.target)
		this.setState({
			[name]: value
		});
	}

	handleManualModalChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			item: Object.assign({}, this.state.item, {
				[name]: value
			}),
		})
	}

	startQuagga = () => {
		//console.log("this is", this);
		//console.log(this.state.liveStreamConfig.inputStream.target)
		console.log(this.props.auth)
		console.log(this.state.profile);
		//this.loggedIn();
		let selector = Object.assign({}, this.state.liveStreamConfig);
		//while(selector.inputStream.target === null){
		selector.inputStream.target = document.querySelector('#scanner-container');
		//}
		//console.log(selector)
		this.setState({liveStreamConfig: selector});
		Quagga.init(
			this.state.liveStreamConfig, (err) => {
			if (err) {
				console.log(err);
				this.stopQuagga();
				return
			}
			//this.initCameraSelection();
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
		console.log(this.state.code)
		if(this.state.code){
			this.setState({editBeforeDatabase: true})
			this.stopQuagga();

			this.getProductInfo();
		}
		else if(this.state.item.productName){
			console.log("to the database!");
			console.log(this.state.item);
			this.closeModal();
			this.setState({editBeforeDatabase: false})
			this.handleItemSave(this.state.item);
			//this.setState({databaseCall: true});
		}
		//this.setState({code:result.codeResult.code, format:result.codeResult.format })
		//console.log(this.state.code)
	}

	getProductInfo = () => {
		API.getProduct(this.state.code).then(res => {
			console.log(res);
			//if(res !== "400"){
				this.setState({data: res.data, code: ""})
			//}

			// else if (res === "404"){
				// var newData = {
				// 	data: {
				// 		product:{
				// 			attributes:{
				// 				product: "Item not found. Please enter the Item details",
				// 				category_text: "",
				// 				long_desc: "",
				// 				price_new: ""
				// 			},
				// 			EAN13: this.state.data.product.EAN13,
				// 			UPCA: "",
				// 			image: ""
				// 		},
				// 		company:{
				// 			name: ""
				// 		}
				// 	}
				// }
				// this.setState({data: newData.data});
				console.log(this.state.data);
				let item = Object.assign({}, this.state.item);
					if(this.state.data.product.attributes.product){
						item.productName = this.state.data.product.attributes.product;
					}
					else{
						item.productName = "";
					}
					if(this.state.data.company.name !== undefined){
						item.companyName = this.state.data.company.name;
					}
					else{
						item.companyName = "";
					}
					if(this.state.data.product.EAN13){
						item.ean = this.state.data.product.EAN13;
					}
					else {
						item.ean = "";
					}
					if(this.state.data.product.UPCA){
						item.upca = this.state.data.product.UPCA;
					}
					else {
						item.upca = ""
					}
					if(this.state.data.product.attributes.category_text){
						item.category = this.state.data.product.attributes.category_text;
					}
					else {
						item.category = ""
					}
					if(this.state.data.product.attributes.long_desc){
						item.desc = this.state.data.product.attributes.long_desc;
					}
					else {
						item.desc = ""
					}
					if(this.state.data.product.attributes.price_new){
						item.price_new = this.state.data.product.attributes.price_new;
					}
					else {
						item.price_new = ""
					}
					if(this.state.data.product.image){
						item.image = this.state.data.product.image;
					}
					else {
						item.image = ""
					}

					this.setState({item});
					//this.setState({item[productName]: this.state.data.product.attributes.product})
					console.log(this.state.item);
			// }
			//else {
				//this.setState({data: "error", error: true});
				// console.log(this.state)
				// this.setState({code: "", codeInput: true})
				// var newData = {
				// 		data: {
				// 			product:{
				// 				attributes:{
				// 					product: "Item not found. Please enter the Item details",
				// 					category_text: "",
				// 					long_desc: "",
				// 					price_new: ""
				// 				},
				// 				EAN13: "",
				// 				UPCA: "",
				// 				image: ""
				// 			},
				// 			company:{
				// 				name: ""
				// 			}
				// 		}
				// 	}
				// 	this.setState({data: newData.data});
				// 	console.log(this.state.data);
				// 	let item = Object.assign({}, this.state.item);
				// 	item.productName = this.state.data.product.attributes.product;
				// 	item.companyName = this.state.data.company.name;
				// 	item.ean = this.state.data.product.EAN13;
				// 	item.upca = this.state.data.product.UPCA;
				// 	item.category = this.state.data.product.attributes.category_text;
				// 	item.desc = this.state.data.product.attributes.long_desc;
				// 	item.price_new = this.state.data.product.attributes.price_new;
				// 	item.image = this.state.data.product.image;
				// 	this.setState({item});
				// // let item = Object.assign({}, this.state.item);
				// // item.productName = this.state.data;
				// // console.log(item)
				// // this.setState({item});
				// console.log(this.state)
			//}
		})
	}

	initCameraSelection = () => {
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

	chooseModal(event){
		//event.preventDefault();
		const { name, value } = event.target;
		console.log(event.target.value)
		// this.setState({
		// 	[name]: value
		// });
	}

	choosePicked = () => {
		this.openModal(ModalType.CHOOSE)
	}

	scannerPicked = () =>{
		this.openModal(ModalType.SCANNER);
	}

	manualPicked = () => {
		this.openModal(ModalType.MANUAL)
	}

	openModal(modalType) {
		let selector = Object.assign({}, this.state.liveStreamConfig);
		this.setState({currentModal: modalType, editBeforeDatabase: false, data: "", code: ""});
		selector.inputStream.target = document.querySelector('#scanner-container');
		//resetting state
		let item = Object.assign({}, this.state.item);
		item.productName = "";
		item.companyName = "";
		item.ean = "";
		item.upca = "";
		item.category = "";
		item.desc = "";
		item.price_new = "";
		item.image = "";
		
		this.setState({item: item})
		console.log(this.state);
		//, liveStreamConfig.inputStream.target:
	}

	handleOpenModal() {
		// references are now sync'd and can be accessed.
		//this.subtitle.style.color = '#f00';
		if(this.state.currentModal === "scanner"){
			this.startQuagga()
		}
		
		//console.log(that)
	}

	closeModal() {
		this.setState({currentModal: null, modalIsOpen: false});
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		const columns = [
			{
				Header: 'Product Name',
				accessor: 'productName' // String-based value accessors!
			}, 
			{
				Header: 'Category',
				accessor: 'category',
			 // Custom cell components!
			},
			{
				Header: 'Location',
				accessor: 'location',
			 // Custom cell components!
			},
			{
				Header: 'Description',
				accessor: 'desc',
			 // Custom cell components!
			}
		]

		if (!isAuthenticated()) {
			return (
				<div>
					<h4>
						You are not logged in! Please{' '}
						<a
						style={{ cursor: 'pointer' }}
						onClick={this.login.bind(this)}
						>
					 		Log In
						</a>
						{' '}to continue.
					</h4>
				</div>
			)
		}

		return (
				<div className = "container-fluid">
					<SummaryPanel
						total_items = {this.state.total_items}
						total_worth = {this.state.total_worth}
					/>
							<div className = "row">
								<div className='col'>
									{this.state && this.state.editBeforeDatabase ? (
										<form onSubmit={this.handleSubmit}>
											<div className="form-group">
												<label htmlFor="productName">Product:</label>
												<input name="productName" className="form-control" type="text" value={this.state.item.productName} onChange={this.handleManualModalChange}/>

												<label htmlFor="ean">EAN/Bar Code Number:</label>
												<input name="ean" className="form-control" type="text" value={this.state.item.ean} onChange={this.handleManualModalChange}/>

												<label htmlFor="location">Location:</label>
												<input name="location" className="form-control" type="text" value={this.state.item.location} onChange={this.handleManualModalChange}/>

												<label htmlFor="companyName">Company:</label>
												<input name="companyName" className="form-control" type="text" value={this.state.item.companyName} onChange={this.handleManualModalChange}/>

												<label htmlFor="category">Category:</label>
												<input name="category" className="form-control" type="text" value={this.state.item.category} onChange={this.handleManualModalChange}/>

												<label htmlFor="quantity">Quantity:</label>
												<input name="quantity" className="form-control" type="text" value={this.state.item.quantity} onChange={this.handleManualModalChange}/>

												<label htmlFor="price_new">Price:</label>
												<input name="price_new" className="form-control" type="text" value={this.state.item.price_new} onChange={this.handleManualModalChange}/>

												<label htmlFor="desc">Description:</label>
												<input name="desc" className="form-control" type="text" value={this.state.item.desc} onChange={this.handleManualModalChange}/>
											</div>
											<button type="submit" className="btn btn-primary">Submit</button>
										</form>
									) : (
										<div/>

									)}
								</div>
							</div>
				

					
						<ItemPanel 
							items={this.state.savedItems}

							choose={this.choosePicked}
							deleteItem={this.deleteItem}
						/>

						
					
					{this.renderModal()}
				</div>
		);
	}

	renderModal() {
		switch (this.state.currentModal) {
			case ModalType.SCANNER:
				return <ScannerModal
					onAfterOpen={this.handleOpenModal}
					onClose={() => this.stopQuagga()}
					onSubmit={this.handleSubmit}
					onChange={this.handleScannerModalChange}
					code = {this.state.code}
				/>;
			case ModalType.MANUAL:
				return <ManualModal
					onAfterOpen={this.handleOpenModal}
					onClose={() => this.closeModal()}
					onChange={this.handleManualModalChange}
					onSubmit={this.handleSubmit}
					productName={this.state.item.productName}
					location={this.state.item.location}
					companyName={this.state.item.companyName}
					category={this.state.item.category}
					description={this.state.item.desc}
					ean={this.state.item.ean}
					quantity={this.state.item.quantity}
					price={this.state.item.price_new}
				/>;
			case ModalType.CHOOSE:
				return <ChooseModal
					onAfterOpen={this.handleOpenModal}
					onClose={() => this.closeModal()}
					onSubmit={this.handleSubmit}
					scanner={this.scannerPicked}
					manual={this.manualPicked}
				/>;
			default:
				return null;
		}
	}
}

export default Itemize;
