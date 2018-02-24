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
      console.log(results)
      var status = results.data.status.code
      if(status === '200' ){
        if(results.data.company && results.data.product.attributes && results.data.product.image){
          return results
        }
        else if(!results.data.company){
          if(results.data.product.attributes){
            var newData = {
              data: {
                product:{
                  attributes:{
                    product: results.data.product.attributes.product,
                    category_text: results.data.product.attributes.category_text,
                    long_desc: results.data.product.attributes.long_desc,
                    price_new: results.data.product.attributes.price_new
                  },
                  EAN13: code,
                  UPCA: "",
                  image: ""
                },
                company:{
                  name: ""
                }
              }
            }
            return newData
          }
          else {
            var newData = {
              data: {
                product:{
                  attributes:{
                    product: "Item not found. Please enter the Item details",
                    category_text: "",
                    long_desc: "",
                    price_new: ""
                  },
                  EAN13: code,
                  UPCA: "",
                  image: ""
                },
                company:{
                  name: ""
                }
              }
            }
            return newData

          }
        } 
        else if(!results.data.product.attributes){
          var newData = {
            data: {
              product:{
                attributes:{
                  product: "Item not found. Please enter the Item details",
                  category_text: "",
                  long_desc: "",
                  price_new: ""
                },
                EAN13: code,
                UPCA: "",
                image: ""
              },
              company:{
                name: results.data.company
              }
            }
          }
          return newData
        } 
        else if(!results.data.product.image){
          var newData = {
          data: {
            product:{
              attributes:{
                product: results.data.product.attributes.product,
                category_text: results.data.product.attributes.category_text,
                long_desc: results.data.product.attributes.long_desc,
                price_new: results.data.product.attributes.price_new
              },
              EAN13: code,
              UPCA: "",
              image: ""
            },
            company:{
              name: results.data.company
            }
          }
        }
        return newData
        }
        
      }
      else if(status === '404'){
        var newData = {
          data: {
            product:{
              attributes:{
                product: "Item not found. Please enter the Item details",
                category_text: "",
                long_desc: "",
                price_new: ""
              },
              EAN13: code,
              UPCA: "",
              image: ""
            },
            company:{
              name: ""
            }
          }
        }
        return newData
      }
      else if(status === '400'){
        var errorData = {
          data: {
            product:{
              attributes:{
                product: "Invalid EAN. Please manually enter the item details",
                category_text: "",
                long_desc: "",
                price_new: ""
              },
              EAN13: code,
              UPCA: "",
              image: ""
            },
            company:{
              name: ""
            }
          }
        }
        return errorData
      }
    }).catch(error => {
      console.log(error);
      return error;
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

  setTotalItems: function(id){
    return axios.post()
  },

  deleteItem: function(id, item_id){
    console.log(item_id)
    return axios.delete("/api/user/" + id + "/item/" + item_id, item_id)
  },
  
  // deleteArticle: function(id) {
  //   return axios.delete("/api/articles/" + id);
  // },

  saveItem: function(id,item) {
    return axios.post("/api/user/" + id + "/item",{id, item});
  }
};
