# Itemizr


![Alt Text](client/src/images/logo.png)


### Synopsis

Itemizr is an inventory application to support the cataloging of items in your home, condo, apartment, storage, etc. for purposes such as, but not limited to: organization, item location search-ability, and insurance claims using barcode and QR technologies. 


### Motivation

Our idea start with identifying a problem we all had, which was the difficulty of keeping track of items in our homes.  We developed an outline for an app where the user can create a database of all of their belongings that listed the location of each item. While figuring out methods for how to log each item, we discovered QuaggaJS, a javascript library for scanning barcodes using a computer or phone camera.  We also needed an API that would take the UPC number and return info on each item, and we found EANdata would do just that.  We realized while working on the project that another way the app could be useful was for taking inventory for homeowners or renters insurance.  In case of an event like a fire or another disaster the homeowner would have a thorough list of all of their belongings they might have possibly lost.

### Code Example

Below is some example code showing how we used QuaggaJS to scan the barcodes:

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



### Technologies & APIs Used

* QuaggaJS - A javascript library that uses a camera to scan barcodes.
* EANdata - An API that retrieves info on items based on UPC/EAN numbers.


### Built With

* MongoDB
* ExpressJS
* ReactJS
* NodeJS
* Bootstrap
* Body-Parser


### What's Next?

Here are some additional features we would like to implement in the future: 
 * The option to take a picture of the receipt associated with the item and have that stored with the item info.
 * The ability to upload saved photos of barcodes instead of only using a live streaming camera feature.
 * An option to take your own photo of the item 
 * Option to sort total values by category or location - i.e. the total value of my items in the office is $3,000 or the total value of my electronics is $5,000
 


### Authors

* Umer Rathore
* Gary Marroquin
* Weslie Iza
* Spencer Hawk
* Nick Dehmlow 


