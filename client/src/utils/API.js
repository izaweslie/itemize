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

    return axios.get("https://eandata.com/feed/?v=3", {params}).then(results =>{
      //Needs updating for error checking.
      var thing = results.data.product
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
