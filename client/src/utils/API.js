import axios from "axios";

export default {
  
  getProduct: function(code) {

    if (code.length < 13){
      var diff = 13 - code.length;

      var padding ="";
      for(var i = 0; i< diff; i++){
        padding += '0'
      }
      code = padding + code;

    }

    var params = {
      'keycode': 'CDED97825A77DBEB',
      'mode': 'json',
      'find': code
    }


// item.productName = this.state.data.product.attributes.product;
//       item.companyName = this.state.data.company.name;
//       item.ean = this.state.data.product.EAN13;
//       item.upca = this.state.data.product.UPCA;
//       item.category = this.state.data.product.attributes.category_text;
//       item.desc = this.state.data.product.attributes.long_desc;
//       item.price_new = this.state.data.product.attributes.price_new;
//       item.image = this.state.data.product.image;

    //https://eandata.com/feed/?v=3&keycode=CDED97825A77DBEB&mode=json&find=0049000006582
    // if(search.startYear !== ""){
    //   search.startYear += '0101';
    //   params.begin_date = search.startYear;
    // }
    // if(search.endYear !== ""){
    //   search.endYear+= '1231'
    //   params.end_date = search.endYear
    // }

    return axios.get("https://eandata.com/feed/?v=3", {params}).then(results =>{

      console.log(results)
      var thing = results.data.product
      console.log(thing.length)
      console.log(thing.isArray)
      if(thing.length === undefined ){
        return results
      }
      else if(thing.length === 0){
        return "Error"
      }
    }).catch(error => {
      console.log(error);
      var notFound = "Error"
        // data: {
        //   product:{
        //     attributes:{
        //       product: "Error: Please enter a valid EAN code",
        //       category_text: "",
        //       long_desc: "",
        //       price_new: ""
        //     }
        //     EAN13: "",
        //     UPCA: "",
        //     image: ""
        //   }
        //   company:{
        //     name: ""
        //   }
        // }
      
      return notFound;
    })
  },

  createUser: function(userId) {
    return axios.post("api/user/" + userId)
  },

  getSavedItems: function() {
    return axios.get("/api/item/");
  },

  getUserSavedItems: function(id) {
    return axios.get("/api/user/" + id)
  },

  updateUserItems: function(id,item_id){
    return axios.put("/api/user/" + id, item_id)
  },
  // deleteArticle: function(id) {
  //   return axios.delete("/api/articles/" + id);
  // },

  saveItem: function(id,item) {
    return axios.post("/api/user/" + id + "/item",{id, item});
  }
};
