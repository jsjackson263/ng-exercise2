(function() {
  'use strict'

  var app = angular.module('ShoppingListCheckOff', []);
  app.controller('ToBuyController',ToBuyController);
  app.controller('AlreadyBoughtController', AlreadyBoughtController);
  app.service('checkOffService', ShoppingListCheckOffService);


  ToBuyController.$inject = ['checkOffService'];
  function ToBuyController(checkOffService) {
    var toBuy = this;

    toBuy.items = checkOffService.getToBuyList();

    toBuy.removeFromList = function(itemIndex) {
      checkOffService.removeFromToBuyList(itemIndex);
      // checkOffService.setMessage();

      toBuy.message = checkOffService.getToBuyMessage();
      console.log("toBuy.message: ", toBuy.message);
    };

  }

  AlreadyBoughtController.$inject = ['checkOffService'];
  function AlreadyBoughtController(checkOffService) {
    var bought = this;

    bought.items = checkOffService.getBoughtList();

    bought.$doCheck = function() {
      bought.message = checkOffService.getBoughtMessage();
      console.log("  bought.$doCheck - bought.message: ", bought.message);
    };


  }


  function ShoppingListCheckOffService() {
    var service = this;

    // holds "To Buy" items
    var toBuyList = [];

    // holds "Already Bought" items
    var boughtList = [];

    var toBuyMessage = "";
    var boughtMessage = "";

    service.getToBuyList = function() {
      toBuyList = loadToBuyList();
      updateMessage();
      return toBuyList;
    };

    service.removeFromToBuyList = function(itemIndex) {
      var itemToRemove = toBuyList[itemIndex];
      // first, add it to the "Bought" List
      boughtList.push(itemToRemove);

      // next, remove it from "To Buy" list
      toBuyList.splice(itemIndex, 1);

      updateMessage();

    };

    service.getBoughtList = function() {
      return boughtList;
    };

    service.getToBuyMessage = function() {
      return toBuyMessage;
    };

    service.getBoughtMessage = function() {
      return boughtMessage;
    };

    function updateMessage() {
      if (boughtList.length === 0) {
          boughtMessage = "Nothing bought yet! !!!";
          toBuyMessage = "";
      } else if (toBuyList.length === 0) {
          toBuyMessage = "Every thing is bought! !!!";
          boughtMessage = "";
      } else {
        toBuyMessage = "";
        boughtMessage = "";
      }

    }

    function loadToBuyList() {
      // var toBuyList = [];

      var item = new Object();
      item.name = "cookies";
      item.quantity = 10;
      toBuyList.push(item);

      item = new Object();
      item.name = "snacks";
      item.quantity = 3;
      toBuyList.push(item);

      item = new Object();
      item.name = "soft drink";
      item.quantity = 7;
      toBuyList.push(item);

      item = new Object();
      item.name = "pies";
      item.quantity = 5;
      toBuyList.push(item);

      item = new Object();
      item.name = "sandwiches";
      item.quantity = 6;
      toBuyList.push(item);

      item = new Object();
      item.name = "paper plates";
      item.quantity = 9;
      toBuyList.push(item);

      item = new Object();
      item.name = "sausages";
      item.quantity = 10;
      toBuyList.push(item);

      item = new Object();
      item.name = "muffins";
      item.quantity = 29;
      toBuyList.push(item);

      item = new Object();
      item.name = "apples";
      item.quantity = 16;
      toBuyList.push(item);

      item = new Object();
      item.name = "potato chips";
      item.quantity = 4;
      toBuyList.push(item);


      return toBuyList;
    }

  }



})();
