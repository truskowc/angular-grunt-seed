webrdApp

.factory('HalService', ['halClient','$rootScope', '$q','$state','$window', function(halClient,$rootScope,$q,$state,$window) {
    json = undefined;
    //for development

    isFull = function(){
      return json.length > 0 ? 1 : 0;
    };

    return {
          load : function(giveMeProd) {

                return halClient.$get($rootScope.api);
                
          },
          setJSON : function(jsonData){
            json = jsonData;
          },
          getJSON: function(){
            return json;
          }
    };
}])

.factory('productsFactory',['HalService',function(HalService){
  
  data = undefined;

  return {
    holla: function(url, params){
      Hal = HalService;
      promise = Hal.load();
      return promise
                .then( function(res) {
                  Hal.setJSON(res);
                  try {
                      return res.$get(url,params);
                  }
                  catch(err) {
                    $scope.$parent.main.errorMsg = true;
                    document.getElementById('error').innerHTML = 'Request error: ' + err.message;  
                    //network error -> show error in error area
                  }
              })
              .then(function(res){
                //create data structure that works with angular
		            data = [];
                itm = res.item;
                for(k in itm){
		              n = 0;
                  if(itm[k].item_group !== undefined){
                    for(y in itm[k].item_group){
                      if(n==0){
                        itm[k].item_group[n].GROUP_ITEMS = [itm[k].item_group[n]]
                        data.push(itm[k].item_group[n]);
                      }else{
                        //assuming 0 index is the one to build off of
                        itm[k].item_group[0].GROUP_ITEMS.push(itm[k].item_group[y]);
                      }
                      n++;
                    }
                  }else{
                    itm[k].GROUP_ITEMS = [itm[k]];
                    data.push(itm[k]);
                  }
                }
                json = data;
                return json;
              })
    },
    getData: function(){
      return json;
    }
  }

}])

.factory('productDetailsFactory',['HalService',function(HalService){
  
  json = undefined;

  return {
    holla: function(url, params){
      Hal = HalService;
      promise = Hal.load();
      return promise
                .then( function(res) {
                  Hal.setJSON(res);
                  try {
                      return res.$get(url,params);
                  }
                  catch(err) {
                    $scope.$parent.main.errorMsg = true;
                    document.getElementById('error').innerHTML = 'Request error: ' + err.message;  
                    //network error -> show error in error area
                  }
              })
              .then(function(res){
                //create data structure that works with angular
                data = [];
                v = res.item_version;
                itm = res.item_grouped;
                n=0;

                for(y in itm){
                  itm[y].ORDER_VERSION_ID = v;
                  if(n==0){
                    itm[y].GROUP_ITEMS = [itm[y]];
                    data.push(itm[y]);
                  }else{
                    //assuming 0 index is the one to build off of
                    itm[0].GROUP_ITEMS.push(itm[y]);
                  }
                  n++;
                }
                
                json = data;
                return json;
              })
    },
    getData: function(){
      return json;
    }
  }

}])

.factory('getService', ['$http',function($http) {

	var doRequest = function(url, params, cache) {
      return $http({
        method: 'GET',
        url: url,
        params: params,
        cache: cache ? cache : false
      });
    }
    return {
      request: function(url, params, cache) { return doRequest(url, params, cache, 'request'); },
    };
	
}])

.factory('postService',['$http', function($http) {

	var doRequest = function(url, data) {
      return $http({
        method:'POST',
        dataType: 'json',
        url: url,
        data: data,
        headers: { 'Content-Type' : 'application/json' }
      });
    }
    return {
      submit: function(url, data) { return doRequest(url, data, 'submit'); },
    };
	
}])

.factory('putService',['$http', function($http) {

  var doRequest = function(url, data) {
      return $http({
        method:'PUT',
        dataType: 'json',
        url: url,
        data: data,
        headers: { 'Content-Type' : 'application/json' }
      });
    }
    return {
      submit: function(url, data) { return doRequest(url, data, 'submit'); },
    };
  
}])

//product page pagination
.factory('PPP',[ function(){
  
  currentPage=undefined;

  return{
    getCurrentPage: function(){
      return currentPage;
    },
    setCurrentPage: function(page){
      currentPage = page;
    }
  };
}])

.factory('Page',[ function(){
  	var title = 'Schnucks.com';
  	return {
    	title: function() { return title; }, 
    	setTitle: function(newTitle) { 
    	title = newTitle; 
    }
  };
}])

.factory('MetaInformation', function() {
      var metaDescription = '';
      var metaKeywords = '';
      return {
        metaDescription: function() { return metaDescription; },
        metaKeywords: function() { return metaKeywords; },
        reset: function() {
          metaDescription = '';
          metaKeywords = '';
        },
        setMetaDescription: function(newMetaDescription) {
          metaDescription = newMetaDescription;
        },
        setMetaKeywords: function(newKeywords) {
        	metaKeywords = newKeywords;
        },
        appendMetaKeywords: function(newKeywords) {
          for (var key in newKeywords) {
            if (metaKeywords === '') {
              metaKeywords += newKeywords[key].name;
            } else {
              metaKeywords += ', ' + newKeywords[key].name;
            }
          }
        }
      };
})

.factory('localStorageFactory', ['$window', function ($window) {

      return {

          get: function (key) {
              if ($window.localStorage.getItem(key)) {
                  var cart = angular.fromJson($window.localStorage.getItem(key));
                  return JSON.parse(cart);
              }
              return false;

          },


          set: function (key, val) {

              if (val === undefined) {
                  $window.localStorage.removeItem(key);
              } else {
                  $window.localStorage.setItem(key, angular.toJson(val))
              }
              return $window.localStorage.getItem(key);
          }
      }
}])

.service('cart', ['$window','$rootScope', 'localStorageFactory', '$filter', function ($window, $rootScope, localStorageFactory, $filter) {  

    var cart = {
      shipping : null,
      taxRate : null,
      tax : null,
      items : []
    };
    
    this.addItem = function (id, vid, name, price, quantity, options, comments, disabled, item) {
        _item = { 
                  id: id, 
                  item_version_id: vid, 
                  title: name, 
                  price: price, 
                  quantity: quantity, 
                  options: options, 
                  comments: comments,
                  disabled: disabled,
                  item: item
        };
        cart.items.push(_item);
        this.save();
    };

    this.getItemById = function (itemId) {
        var items = this.getCart().items;
        var build = false;

        angular.forEach(items, function (item) {
            if  (item.id === itemId) {
                build = item;
            }
        });
        return build;
    };

    this.setQtyById = function(itemId,plusMinus,newQty){
        var items = this.getCart().items;
        _self = this;

        angular.forEach(items, function (item) {
          if (item.id === itemId) {
            if(plusMinus == '+' && item.options[0].qty.max > item.quantity){
              item.quantity = Number(item.quantity) + 1;
              _self.save();
            }else if(plusMinus == '-' && item.options[0].qty.min < item.quantity){
              item.quantity = Number(item.quantity) - 1;
              _self.save();
            }else if(plusMinus == '='){
              item.quantity = newQty;
              _self.save();
            }
          }
        });
    }

    this.setCart = function (cart) {
        cart = cart;
        return this.getCart();
    };

    this.getCart = function(){
        return cart;
    };

    this.getItems = function(){
        return cart.items;
    };

    this.getTotalQtyForAllItems = function(){
        sum = 0;
        items = this.getItems();
        for(y=0;y<items.length;y++){
          sum += items[y].disabled === false ? Number(items[y].quantity) : Number(0);
        }
        return sum;
    }

    this.save = function () {
        cart = this.getCart();
        return localStorageFactory.set('cartStore', JSON.stringify(cart));
    };

    this.removeItemById = function (id) {
        var cart = this.getCart();
        angular.forEach(cart.items, function (item, index) {
            if  (item.id === id) {
                cart.items.splice(index, 1);
            }
        });
        this.setCart(cart);
        this.save();
        return true;
    };

    this.toggleDisabledItemById = function(id){
        var cart = this.getCart();
        angular.forEach(cart.items, function (item, index) {
            if (item.id === id) {
               item.disabled = !item.disabled; 
            }
        });
        this.setCart(cart);
        this.save();
        return true;
    };

    this.load = function(){
      if(cart.items.length > 0){
        return cart.items;
      }else if(localStorageFactory.get('cartStore') !== false){
        angular.forEach(localStorageFactory.get('cartStore').items, function (item) {
          cart.items.push(item);
        }); 
      }else{
        return false;
      }
    };

    this.getSubTotal = function(){
        total = 0;
        nonDisabled = $filter('filter')(this.getCart().items,{disabled : false});
        angular.forEach(nonDisabled, function (item) {
            total += +parseFloat(item.quantity * item.price).toFixed(2);
        });
        return +parseFloat(total).toFixed(2);
    };

    this.totalCost = function () {
        return +parseFloat(this.getSubTotal() + this.getShipping() + this.getTax()).toFixed(2);
    };

    this.setShipping = function(shipping){
        cart.shipping = shipping;
        return this.getShipping();
    };

    this.getShipping = function(){
        nonDisabled = $filter('filter')(this.getCart().items,{disabled : false});
        if (nonDisabled.length == 0) return 0;
        return  this.getCart().shipping;
    };

    this.setTaxRate = function(taxRate){
        cart.taxRate = +parseFloat(taxRate).toFixed(2);
        return this.getTaxRate();
    };

    this.getTaxRate = function(){
        return cart.taxRate
    };

    this.getTax = function(){
        return +parseFloat(((this.getSubTotal()/100) * this.getCart().taxRate )).toFixed(2);
    };

    this.removeCartItems = function(){
      if(cart.items.length > 0){
        cart.items = [];
      }
      $window.localStorage.removeItem('cartStore');
      return cart;
    }

}])

.factory('dateFactory',[ function(){

  return {
    todaysDate: function(){
      var d = new Date();
    
      y = d.getFullYear().toString();
      month = (d.getMonth() + 1).toString();
      m = (month.length == 1 ? '0' + month : month).toString();
      date = d.getDate().toString();
      da = (date.length == 1 ? '0' + date : date).toString();
      ho = d.getHours().toString();
      h = (ho.length == 1 ? '0' + ho : ho).toString();
      min = d.getMinutes().toString();
      mi = (min.length == 1 ? '0' + min : min).toString();
      sec = d.getSeconds().toString();
      s = (sec.length == 1 ? '0' + sec : sec).toString();
      
      return y+m+da+h+mi+s;
    }
  }

}])