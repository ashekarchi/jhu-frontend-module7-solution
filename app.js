(function () {
'use-strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter("TotalPrice", TotalPriceFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();
  toBuy.buyItem = function (i){
    ShoppingListCheckOffService.buyItem(i);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'TotalPriceFilter']
function AlreadyBoughtController(ShoppingListCheckOffService, totalPriceFilter){
  var bought = this;
  bought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

function ShoppingListCheckOffService(){
  var service = this;

  var toBuyItems = [
    {name: "Apple(s)",
    quantity: 10,
    price: 7},
    {name: "Orange(s)",
    quantity: 1,
    price: 8},
    {name: "Mango(s)",
    quantity: 7,
    price: 4},
    {name: "Banana(s)",
    quantity: 5,
    price: 2.25}
  ]

  var alreadyBoughtItems = [];

  service.getToBuyItems = function(){
    return toBuyItems;
  }

  service.getAlreadyBoughtItems = function(){
    return alreadyBoughtItems;
  }

  service.buyItem = function (i) {
    console.log(i);
    var item = toBuyItems.splice(i, 1);
    alreadyBoughtItems.push(item[0]);
  };

}

function TotalPriceFilter(){
  return function(quantity, price) {
  total = quantity*price;
  total = total.toFixed(2);
  return "$$$" + total
  };
}

})();
