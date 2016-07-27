var jsonQuery = require('json-query');
var catalog = require('./public/data/catalog.json');

var Controllers = {
  ARTWORK: function(release_type,which_work){
    var work_info = jsonQuery(release_type+'[site_id='+which_work+']', {
      data: catalog
    });   // yes, I know, this kind of defeats the purpose of a login
          // will make more sense later, when there's user data such as shipping address
          // associated with each purchase and catalog can be a JSON file open to the world

    if(work_info.value){
      return {
        status: 'success',
        payload: work_info.value
      }
    }
    else{
      return {
        status: 'failure'
      }
    }
  },
  CATALOG: function(){
    return{
      artwork_list:catalog
    }
  },
  USER: {
    get: function(which_user){

    },
    set: function(which_user){

    }
  }
}

module.exports = Controllers;
