

/** Connect to Moralis server */
//Mettre côter serveur, a récupérer avant tout autre choses avec un fetch puis lancer la function startMain
const serverUrl = "https://9rotklamvhur.usemoralis.com:2053/server";
const appId = "32qjS96gLON4ZUxrPSXbqM73w1h3HGDpFlbQ9tMM";
const CONTRACT_ADDRESS = "0x15E6b4129b56DC90b3409C3630a8Dddca3015e8C";
//DEV : 0x4EfC6600b04b14d786Fd0fc77790ca2f68335518
//PROD : 0xaC84A40eC35f0ae77aD22A08E1E3c6D280644b5b

/**
 * VARIABLE ET CONSTANTE
 */
var myMysticId = undefined;
var gasPriceNow = 0;
startMain();

var web3 = undefined;

var img1 = "";
var img2 = "";
var img3 = "";
var img4 = "";
var img5 = "";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var life = 0;
var hungry = 0;
var cleanliness = 0;
var moral = 0;
var rested = 0;
var eggs = {};
var foods = {};
var items = {};
var myMystic = {};
var invitsReceive = undefined;
var invitsSended = undefined;
var foodByZone = undefined;
var myMysticData = undefined;
var priceEth = 0;
var paramsContract = undefined;

/**
 * END OF VARIABLE
 */


/**
 * FONCTION OUTILS
 */


 function randRang(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
/**
 * FIN DES FONCTIONS OUTILS
 */



/**
 * Démarrage de la page index
 */
 async function startMain(){
  await Moralis.enableWeb3()
  window.web3 = new Web3(Moralis.provider)
  let connected = await window.web3.eth.net.isListening();
  document.getElementById("btn-login").onclick = login;
  document.getElementById("btn-log-meta").onclick = login;
  document.getElementById("btn-logout").onclick = logOut;

    if(connected == true){
      web3.eth.getGasPrice().then((result) => {console.log(result)
          gasPriceNow = (result)
      })

        let abi = await getAbi();
        let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
        window.web3 = await Moralis.Web3.enableWeb3();
        let eggOneRemain = await contract.methods.getParamsContract("eggOneRemain").call({from: ethereum.selectedAddress});
        let eggTwoRemain = await contract.methods.getParamsContract("eggTwoRemain").call({from: ethereum.selectedAddress});
        let eggThreeRemain = await contract.methods.getParamsContract("eggThreeRemain").call({from: ethereum.selectedAddress});

        $(".iconic-egg-remain").html("Buy ( "+(eggOneRemain)+" / 1000 )")
        $(".rare-egg-remain").html("Buy ( "+(eggTwoRemain)+" / 3000 )")
        $(".classic-egg-remain").html("Buy ( "+(eggThreeRemain)+" / 6000 )")
   }

}

eggRenderImg(0);
eggRenderImg(4);
eggRenderImg(8);

/**
 * Rendu des eggs de card d'achat
 * @param {*} type 
 */
function eggRenderImg(type){
  colorInt = randRang(0,3);
  if(colorInt == 0)color ="blue"
  if(colorInt == 1)color ="green"
  if(colorInt == 2)color ="purple"
  if(colorInt == 3)color ="red"
  type1 = randRang(0,3)+type;
  type1 ="img/eggs/type1/"+color+"/"+(type1+1)+".webp"
  type2 = randRang(0,3)+type;
  type2 ="img/eggs/type2/"+color+"/"+(type2+1)+".webp"
  type3 = randRang(0,3)+type;
  type3 ="img/eggs/type3/"+color+"/"+(type3+1)+".webp"
  type4 = randRang(0,3)+type;
  type4 ="img/eggs/type4/"+color+"/"+(type4+1)+".webp"
  let card = $(".card-fourth");
  let classType = "layer-egg-classic";
  if(type==4){card = $(".card-third");classType = "layer-egg-rare";}
  if(type==8){card = $(".card-second");classType = "layer-egg-iconic";}
  card.prepend("<div class='eggLayer'>"
  +'<img loading="lazy" src="img/eggs/egg_color'+(((colorInt+1)+(type==0||type==4?0:4)))+'.webp" class="layer-egg '+classType+'" alt="mystic">'
  +'<img loading="lazy" src="'+type4+'" class="layer-egg" style="opacity:0.5;" alt="mystic">'
  +'<img loading="lazy" src="'+type3+'" class="layer-egg" style="opacity:0.8;" alt="mystic">'
  +'<img loading="lazy" src="'+type2+'" class="layer-egg" alt="mystic">'
  +'<img loading="lazy" src="'+type1+'" class="layer-egg" style="opacity:0.8;" alt="mystic">'
  +"<div>") 
  
  var rotated = 0;
  setInterval(() => {
      var slides = document.getElementsByClassName("eggLayer");
      for (var i = 0; i < slides.length; i++) {
          
          var div = slides[i],
              deg = rotated ? -randRang(0,6) : randRang(0,6);
      
          div.style.webkitTransform = 'rotate('+deg+'deg)'; 
          div.style.mozTransform    = 'rotate('+deg+'deg)'; 
          div.style.msTransform     = 'rotate('+deg+'deg)'; 
          div.style.oTransform      = 'rotate('+deg+'deg)'; 
          div.style.transform       = 'rotate('+deg+'deg)'; 
      
          rotated = !rotated;
      }
  }, randRang(2000,4900));

}



/**
 * GENERATE META DATA OF TOKEN 
 * @param {*} egg 
 * @param {*} id 
 * @returns 
 */
function generateMetaData(egg,id){
  return {
    "name": "NYXIES #"+id,
    "description": "Nyxies are mystical and tame creatures that can be reproduced ad infinitum",
    "image": "https://tam.nyxiesnft.com/img/generated/"+id+".png",
    "edition": 0,
    "seller_fee_basis_points": 250,
    "collection": {
        "name": "NYXIES",
        "family": "EGGS"
    },
    "symbol": "NYXS",
    "properties": {
        "files": [
            {
                "uri": "https://tam.nyxiesnft.com/img/generated/"+id+".png",
                "type": "image/png"
            }
        ],
        "category": "image",
        "creators": [
            {
                "address": "0x0cE1A376d6CC69a6F74f27E7B1D65171fcB69C80",
                "share": 100
            }
        ]
    },
    "attributes": [
        {
            "trait_type": "egg",
            "value": (parseInt(egg.params8[0])+(parseInt(egg["params256"][7])==2||parseInt(egg["params256"][7])==1?0:4))
        },
        {
            "trait_type": "ears",
            "value": egg.params8[1]
        },
        {
            "trait_type": "horn",
            "value": egg.params8[2]
        },
        {
            "trait_type": "mouth",
            "value": egg.params8[3]
        },
        {
            "trait_type": "eyes",
            "value": egg.params8[4]
        }
    ]
}
}


//sendToServerMeta({params8:{0:1,1:1,2:1,3:1,4:1,},id:1})
/**
 * Envoi des méta data et de l'image en base 64 juste après le mint de l'egg
 * @param {*} egg 
 * @param {*} id 
 */
async function sendToServerMeta(egg,id){
  var meta = generateMetaData(egg,id);
  var allMeta = await getMeta();
  allMeta.push(meta)
  var formData = new FormData();
  saveImageEgg(egg,id);
  setTimeout(() => {
    formData.append('base64', canvas.toDataURL("image/png") );
    formData.append('id', id);
    formData.append('allMeta', JSON.stringify(allMeta));
    formData.append('meta', JSON.stringify(meta));
    
    fetch('saveFile.php', {
        method: 'POST',
        body: formData,
      }).then(res => res.json())
      .then(res => {console.log(res)
      });
  }, 2000);
}

/**
 * Génération de l'image par rapport au params récupéré de l'egg mint
 * @param {*} egg 
 * @param {*} id 
 */
function saveImageEgg(egg,id){
  var type=0;
  console.log(egg["params256"][7])
  colorInt = parseInt(egg["params8"][0]);
  if(colorInt == 0)color ="blue"
  if(colorInt == 1)color ="green"
  if(colorInt == 2)color ="purple"
  if(colorInt == 3)color ="red"
  img0 = loadImage('img/ilu_bg.webp', main);
  img1 = loadImage('img/eggs/egg_color'+(((colorInt+1)+((egg["params256"][7])==2||(egg["params256"][7])==1?0:4)))+'.webp', main);//
  img2 = loadImage('img/eggs/type1/'+color+'/'+egg.params8[1]+'.webp', main);
  img3 = loadImage('img/eggs/type2/'+color+'/'+egg.params8[2]+'.webp', main);
  img4 = loadImage('img/eggs/type3/'+color+'/'+egg.params8[3]+'.webp', main);
  img5 = loadImage('img/eggs/type4/'+color+'/'+egg.params8[4]+'.webp', main);
}

function main() {
  ctx.drawImage(img0, 0, 0);
  ctx.drawImage(img1, 0, 0);
  
  ctx.globalAlpha = 0.5;
  ctx.drawImage(img5, 0, 0);
  ctx.globalAlpha = 0.8;
  ctx.drawImage(img4, 0, 0);
  ctx.globalAlpha = 1;
  ctx.drawImage(img3, 0, 0);
  ctx.globalAlpha = 0.8;
  ctx.drawImage(img2, 0, 0);
}

function loadImage(src, onload) {
    var img = new Image();
    img.onload = onload;
    img.src = src;
    return img;
}




  /**
   * Login 
   */
  async function login() {
    await Moralis.enableWeb3()
    window.web3 = new Web3(Moralis.provider)
    let connected = await window.web3.eth.net.isListening();
    if(connected == true){
    try {
       // user = await Moralis.authenticate({ signingMessage: "Connect to mystic tamable !" })
        renderGame();
    } catch(error) {
      console.log(error)
    }
    }else{
      renderGame();
    }
  }

  /**
   * logout
   */
  async function logOut() {
    await Moralis.User.logOut();
    $(".unlogged-btn").fadeIn("fast");
    $(".logged-btn").fadeOut("fast");

    $("#contentBody").fadeOut("fast");
    $("#myMystics").html('');
  }

  function navAllUnactive(){
    $(".nav-link").each(function(){
      $(this).removeClass("active")
    })
  }

  /**
   * Génération de la modal avec contenu FAQ
   */
  async function faq(){
      $(".modal-title").html("FAQ");
      $(".modal-body").html(
        '<div class="container mt-5">'
        
        +'<h4 class="mt-5">Can I earn money by playing ? : </h4>'
        +'<p>Yes with the breeding system, however it will take time (one month minimum per reproduction) and each creature will be able to give only 3 eggs maximum, to limit the number of tokens.</p><br/>'

        +'<h4 class="mt-5">How to buy NYXIES? : </h4>'
        +'<p>You will need a <a href="https://metamask.io/download/">meta mask</a> account to start, then you will need to <a href="https://autofarm.gitbook.io/autofarm-network/how-tos/polygon-chain-matic/metamask-add-polygon-matic-network">add the polygon network</a>, and add MATIC crypto <a href="https://wallet.polygon.technology/gas-swap/">by converting your eth</a>, or your dollars, you will finally just click on the egg you want and then buy it</p><br/>'
        
        +'<h4 class="mt-5">Why Polygon Network ? : </h4>'
        +'<p>Because it is ecological, economical, and simple to use, it may scare some at the installation, but this network is simple to use and you will gain a lot in gas costs, your MATIC will also be very easily convertible into ETH or other coin at very low cost.</p><br/>'
        
        +'<h4 class="mt-5">Can we buy more than one egg ? : </h4>'
        +'<p>Yes, but you can only have one adult at a time, to control the speed of reproduction.</p><br/>'
        
        +'<h4 class="mt-5">Can we sell our eggs ? : </h4>'
        +'<p>Yes at the minimum price or you will buy them, however this will be done only on our platform to avoid abuse.</p><br/>'

        +'<h4 class="mt-5">Can my nft be lost permanently ? : </h4>'
        +'<p>Yes, if you treat it badly, but it happens if you don\'t take care of it for several days.</p>'
        +'<p>But a creature has also a limited lifespan, it will live several months, then die of old age, in this case your token is lost, you will have to have reproduced your creature before that happens not to have losses</p><br/>'

        +'<h4 class="mt-5">How long will the game take me by day ? : </h4>'
        +'<p>In general, the game will not take you more than 10 minutes per day, you can also put your account in vacation mode as many times as you want </p><br/>'

        +'<h4 class="mt-5">How to add my nyxies balances to meta mask ? : </h4>'
        +'<p>You just have to launch meta mask, click on "import tokens", then add the following contract address 0xfB68d56954f011C3Ea24691df9BEf073C8a78F51 , give it a name (NYXIES preferably) and a decimal ( 1 )</p><br/>'

        
        +'<h4 class="mt-5">Who are you ? : </h4>'
        +'<p>We are a team of an experienced blockchain and smart contract backend developer, a web integrator, a graphic designer and a digital marketing professional, each with between three and seven years experience.</p>'
        +'<a href="https://www.linkedin.com/in/kevin-dell-ova-270431184/">Dell\'Ova Kevin</a><br/>'
        +'<a href="https://www.linkedin.com/in/florian-scouarnec-7829856a/">Florian Lescouarnec</a><br/>'
        +'<a href="https://www.linkedin.com/in/vinibch/">Vincent Boucher</a><br/>'


        +'</div>'
      );
  }
  
  /**
   * récuperer Le abi (ensemble des fonctions du smart contract)
   */
  function getAbi(){
    return new Promise((res)=>{
      $.getJSON("js/Delegate_contract.json",((json)=>{
        res(json.abi)
      }))
    })
    
  }
  /**
   * récuperer Le json des metadata pendant le mint
   */
  function getMeta(){
    return new Promise((res)=>{
      $.getJSON("img/generated/_metadata.json",((json)=>{
        res(json)
      }))
    })
    
  }

  


  const headers = document.querySelectorAll('.highlight');
  const modal = document.querySelector('#aboutModal');
  // debounce function to limit function running to 1 time every 10ms. just copied directly from stackoverflow
  function debounce(func, wait = 10, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
           timeout = null;
           if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
   }
  
  // function that will make headers font-size increase when scrolled into view!
  function dynamicHeaders(e){
      headers.forEach(header => {
  const totalScroll = (modal.scrollTop + window.innerHeight);
  const inView = totalScroll > header.offsetTop;
  const headerBottom = (header.offsetTop + header.clientHeight); 
  const notScrolledPast = headerBottom < totalScroll;
      if(inView){
      header.classList.add('fadeIntoView');	
      } else {
          header.classList.remove('fadeIntoView');	
          }
      })
  };



$(".convert-eth").each(function(){
    //console.log(($(this).data("price")))
    $(this).html(($(this).data("price"))+" MATIC")
  })



$("#title-mystic").fadeIn("fast", function() {
  $("#subtitle-mystic").fadeIn("fast", function() {

  })
})

/**
   * Créer un mystic de façon aléatoire et l'envoyé vers le contrat intélligent
   */
  async function mint(typeMint) {
    await Moralis.enableWeb3()
    window.web3 = new Web3(Moralis.provider)
    let connected = await window.web3.eth.net.isListening();
    if(connected == true){
      let abi = await getAbi();
      let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
      let price = 0;
      if(typeMint==0)price = await contract.methods.getParamsContract("priceEggOne").call({from: ethereum.selectedAddress});
      if(typeMint==1)price = await contract.methods.getParamsContract("priceEggTwo").call({from: ethereum.selectedAddress});
      if(typeMint==2)price = await contract.methods.getParamsContract("priceEggThree").call({from: ethereum.selectedAddress});console.log(gasPriceNow)
      let minted = await contract.methods.mintDelegate(typeMint).send({
        from: ethereum.selectedAddress,
        value:web3.utils.toWei(price, "wei"),
        gasPrice: gasPriceNow,
      }).catch((error)=>{console.log(error)}).then((success)=>{

        mintMeta();
        
        console.log(success)
      });
    }
    //renderGame();
  }

  async function mintMeta(){
    await Moralis.enableWeb3()
    window.web3 = new Web3(Moralis.provider)
    let connected = await window.web3.eth.net.isListening();
    if(connected == true){
      let abi = await getAbi();
      let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
      let mystics = await contract.methods.getAllTokensForUser(ethereum.selectedAddress).call({from: ethereum.selectedAddress}).catch((error)=>{console.log(error)});

      console.log('mystics',mystics)

      mystics.forEach((MSTC) => {
        //error map viens d'ici
        contract.methods.getTokenDetails(MSTC).call({from: ethereum.selectedAddress}).catch((error)=>{console.log(error)}).then((data)=>{
          sendToServerMeta(data,MSTC)
        });
      })
    }
  }

  async function modalBuy(){
    $(".modal-body").html(
      "<h4 class='title-first-egg'>BUY YOUR FIRST EGG</h4>"
      +"<p style='margin:20'>Préparer vous à acheter votre première créature</br>Ces créatures sont des NFT, échangeable et reproductible avec d'autres utilisateurs</br>Attention ils sont à durer limité, chaque mystic possède une durée de vie, soutenez le depuis sa tendre jeunesse, jusqu'au vieil age</br></p>"
      +"<button class='btn btn-secondary modal-close' style='margin:10px' onClick='mint()'>BUY CLASSIC EGG (3 euros)</button>"
      +"<button class='btn btn-secondary modal-close' style='margin:10px' onClick='mint()'>BUY RARE EGG (30 euros)</button>"
    );
  }


  /**
   * démarage du jeu après connection, affiché les buttons, connection au contrat puis trouver le mystic et les oeufs de l'user, les affichés, puis envoyé ces datas au serveur node.js
   */
  async function renderGame(){
      
    let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    window.web3 = await Moralis.Web3.enableWeb3();

    $(".unlogged-btn").fadeOut("fast");

    $("#contentBody").fadeIn("fast");
    $("#myMystics").fadeOut("fast").fadeIn("fast")
    $("#myEggs").fadeIn("fast")

    setTimeout(() => {
      let parent = $("#btn-log-meta").parent();
      $("#btn-log-meta").html("Your Eggs")
      $("#btn-log-meta").attr('data-toggle', 'modal')
      $("#btn-log-meta").attr('data-target', '#Modal')
      parent.find("h3").html('Nest')
      parent.find("p").html('Explore your nest and look at your previously purchased eggs')
      document.getElementById("btn-log-meta").onclick = allEggs;
    }, 1000);


    await Moralis.enableWeb3()
    window.web3 = new Web3(Moralis.provider)
    
    let connected = await window.web3.eth.net.isListening();
    if(connected == true){
      let abi = await getAbi();
      let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
      let mystics = await contract.methods.getAllTokensForUser(ethereum.selectedAddress).call({from: ethereum.selectedAddress}).catch((error)=>{console.log(error)});

      let eggOneRemain = await contract.methods.getParamsContract("eggOneRemain").call({from: ethereum.selectedAddress});
      let eggTwoRemain = await contract.methods.getParamsContract("eggTwoRemain").call({from: ethereum.selectedAddress});
      let eggThreeRemain = await contract.methods.getParamsContract("eggThreeRemain").call({from: ethereum.selectedAddress});

      $(".iconic-egg-remain").html("Buy ( "+(eggOneRemain)+" / 1000 )")
      $(".rare-egg-remain").html("Buy ( "+(eggTwoRemain)+" / 3000 )")
      $(".classic-egg-remain").html("Buy ( "+(eggThreeRemain)+" / 6000 )")

      var lastMystic=undefined;
      var lastIdMystic=undefined;
      $("#myMystics").html('');
      //renderEggs = '';
      await mystics.forEach((MSTC) => {
        //error map viens d'ici
        contract.methods.getTokenDetails(MSTC).call({from: ethereum.selectedAddress}).catch((error)=>{console.log(error)}).then((data)=>{
          if(data.egg==true){
            eggs[MSTC] = data;
          }else{
            lastMystic = data;
            lastIdMystic = MSTC;
            myMysticId = MSTC;
            myMystic = data;
          }
        });
      })

      setTimeout(() => {
        if(lastMystic){
          mintToNodeServer(lastMystic,lastIdMystic)
          $(".born").remove()
          $('#nest-egg').fadeIn("fast")
          $('#mail-box').fadeIn("fast")

          $("#title-mystic").fadeOut()
          $(".img-intro").fadeOut()
          $("#subtitle-mystic").fadeOut("fast")
          $(".logged-btn").fadeIn("fast")

        }else{
          $("#btn-logout").parent().fadeIn("fast")
          
            $("#title-mystic").fadeIn("fast", function() {
              $("#subtitle-mystic").fadeIn("fast", function() {
              })
            })
        }
      }, 500);
    }
  }

  function myMysticModal(){
    var myMisticRender = renderMysticCard(myMysticId,{mystic:myMystic},true,ethereum.selectedAddress);
      $(".modal-title").html("My Mystic");
      $(".modal-body").html(myMisticRender);
  }

  async function allEggs(){
    $(".modal-title").html("My Eggs");
    $(".modal-body").html("");
    let connected = await window.web3.eth.net.isListening();
    if(connected == true){
      renderEggs = '';
      await Object.keys(eggs).forEach((egg) => {
        renderEggs += renderEgg(egg,eggs[egg],true,ethereum.selectedAddress)
      });
      $(".modal-body").html(renderEggs);
    }
  }

  async function allItems(){
    let connected = await window.web3.eth.net.isListening();
    if(connected == true){
      renderItemsHtml = '';
      await Object.keys(items).forEach((item) => {
        renderItemsHtml += renderItems(item,items[item],true,ethereum.selectedAddress)
      });
      $(".modal-title").html("My Items");
      $(".modal-body").html(renderItemsHtml);
    }
  }

  

  /**
   * Appels vers le serveur pour récuperer tous les mystics enregistré dans le serveur puis les affichés
   */
  function allMystics(){
    $("#myMystics").fadeOut("slow").fadeIn("fast")
    $("#myEggs").fadeOut("fast")
    fetch('http://localhost:3000/getAllMystics', {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())
    .then(res => {
      var allMysticsRender = "";
      Object.keys(res).forEach((MSTC) => {
          allMysticsRender += renderMysticCard(res[MSTC].mystic.id,res[MSTC],(parseInt(MSTC)==parseInt(ethereum.selectedAddress))?true:false,MSTC);
      })
      $(".modal-title").html("All Mystics");
      $(".modal-body").html(allMysticsRender);
    });
  }


  /**
   * récupérer tous les token d'un utilisateur
   */
  async function getAllTokensForUser(){
    let connected = await window.web3.eth.net.isListening();
    if(connected == true){
      let abi = await getAbi();
      let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
      let mystics = await contract.methods.getAllTokensForUser(ethereum.selectedAddress).call({from: ethereum.selectedAddress}).catch((error)=>{console.log(error)});
    }
  }

  /**
   * Fonction permettant de faire le rendu html d'un mystic
   * @param {*} id 
   * @param {*} data 
   * @param {*} owned 
   * @returns 
   */
  function renderEgg(id,data,owned,addr){
    
    colorInt = parseInt(data["params8"][0]);
    if(colorInt == 0)color ="blue"
    if(colorInt == 1)color ="green"
    if(colorInt == 2)color ="purple"
    if(colorInt == 3)color ="red"
    type1 = parseInt(data["params8"][1]);
    type1 ="img/eggs/type1/"+color+"/"+(type1+1)+".webp"
    type2 = parseInt(data["params8"][2]);
    type2 ="img/eggs/type2/"+color+"/"+(type2+1)+".webp"
    type3 = parseInt(data["params8"][3]);
    type3 ="img/eggs/type3/"+color+"/"+(type3+1)+".webp"
    type4 = parseInt(data["params8"][4]);
    type4 ="img/eggs/type4/"+color+"/"+(type4+1)+".webp"
    let classType = "layer-egg-classic";
    if(data["params256"][7]==1){card = $(".card-third");classType = "layer-egg-rare";}
    if(data["params256"][7]==0){card = $(".card-second");classType = "layer-egg-iconic";}

    dataStringified = (JSON.stringify(data).replaceAll("\"", '%84'));
    date = (new Date(data.createdAt* 1000));
    return '<div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">'
      +'<div class="card '+(data.params256[7]==0?"card-second":(data.params256[7]==1?"card-third":("card-fourth")))+'">'
        +"<div class='eggLayer'>"
          +'<img loading="lazy" src="img/eggs/egg_color'+(((colorInt+1)+(data["params256"][7]==2||data["params256"][7]==1?0:4)))+'.webp" class="layer-egg '+classType+'" alt="mystic">'
          +'<img loading="lazy" src="'+type4+'" class="layer-egg" style="opacity:0.5;" alt="mystic">'
          +'<img loading="lazy" src="'+type3+'" class="layer-egg" style="opacity:0.8;" alt="mystic">'
          +'<img loading="lazy" src="'+type2+'" class="layer-egg" alt="mystic">'
          +'<img loading="lazy" src="'+type1+'" class="layer-egg" style="opacity:0.8;" alt="mystic">'
        +'</div>'
        +"<div>"
          +'<div class="content">'
            +'<h3 class="title">'+(data.params256[7]==0?"Iconic Egg":(data.params256[7]==1?"Rare Egg":("Classic Egg")))+'</h3>'
            +'<p class="copy">#'+id+'</p>'
            +'<span>An egg that seems to be as soft as it is restless</span>'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  }


  (function() {
    window.addEventListener('scroll', function(event) {
      var depth, layer, layers, movement, topDistance, translate3d, _i, _len;
      topDistance = this.pageYOffset;
      layers = document.querySelectorAll("[data-type='parallax']");
      for (_i = 0, _len = layers.length; _i < _len; _i++) {
        layer = layers[_i];
        depth = layer.getAttribute('data-depth');
        movement = -(topDistance * depth);
        translate3d = 'translate3d(0, ' + movement + 'px, 0)';
        layer.style['-webkit-transform'] = translate3d;
        layer.style['-moz-transform'] = translate3d;
        layer.style['-ms-transform'] = translate3d;
        layer.style['-o-transform'] = translate3d;
        layer.style.transform = translate3d;
      }
    });
  
  }).call(this);

