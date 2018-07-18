App = {
  web3Provider: null,
  contracts: {},

  init: function() {

 

  /*  $.getJSON('../pets.json', function(data) {
   

   var petsRow = $('#petsRow');
 

     var petTemplate = $('#petTemplate');

   

   for (i = 0; i < data.length; i ++) {
    

    petTemplate.find('.panel-title').text(data[i].breed);
 

       petTemplate.find('img').attr('src', data[i].picture);
   
      
     petTemplate.find('.pet-age').text(data[i].age);
   

      petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

  

      petsRow.append(petTemplate.html());
  
    }
  
  }); */

  

  return App.initWeb3();
 

 },

  initWeb3: function() {
    

// If there is injected web3
  
if(typeof web3 !== 'undefined') {
    

  App.web3Provider = web3.currentProvider;
  

  } 

else {
  

    // Else fallback to Ganache
    console.log('No Web3 Detected');

 // App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
 

   }

   

 web3 = new Web3(App.web3Provider);

 

   return App.initContract();
 

 },

  initContract: function() {
    $.getJSON('CryptoDog.json', function(data) {

      

// Retrieve data, init truffle contract
      

    var CryptoDogArtifact = data;


      App.contracts.CryptoDog = TruffleContract(CryptoDogArtifact);

    

  // Set provider for contract
     
 App.contracts.CryptoDog.setProvider(App.web3Provider);



      // Use contract to mark adopted pets
  
  })

   

 return App.bindEvents();
 

 },

 

 bindEvents: function() {
   
  
 $(document).on('click', '.buybtn', App.handlePurchase);
 
 },

 

    handlePurchase: function(event) {
  

    event.preventDefault();
  

  
    // event.target gives clicked element
   
      // 'id' data is retrieved from element
    

   var _tokenId = parseInt($(event.target).data('id'));

 

   var adoptionInstance;

   
  
   web3.eth.getAccounts(function(err, accounts) {
 

     if(err) {
    
    console.log(error);
    
  }

     

   var account = accounts[0];

   

   App.contracts.CryptoDog.deployed().then(function(instance) {
  

      adoptionInstance = instance;

	  
	
       

     return adoptionInstance.purchase(_tokenId, {from: account});
  

    }).then(function(result) {
		
	 var x= adoptionInstance.priceOf(_tokenId);
	  var y= adoptionInstance.ownerOf(_tokenId);
     // Execute adopt as a transaction by sending account
	 
     $('.modal-content').eq(_tokenId).find('.price').text(x.toString());
     $('.modal-content').eq(_tokenId).find('.buy').text(y.toString());
 
}).catch(function(err) {
      

    console.log(err.message);
   
     })
   
   });
   
 
  }

};



// Initialize app when window loaded


$(function() {
  

$(window).ready(function() {
 

   App.init();
  
});

});
