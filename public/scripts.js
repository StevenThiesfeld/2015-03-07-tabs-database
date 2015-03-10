var tabWindows = []

window.onload = function(){
  
  next_link = document.getElementById("next_link");
  prev_link = document.getElementById("prev_link");
  prev_link.style.display = "none";
  next_link.addEventListener("click", nextPage);
  // prev_link.addEventListener("click", prevPage);
  
  
  //gets all tab windows
  var tabWindowDivs = document.getElementsByClassName("tab_window");
  for (var divCounter = 0; divCounter < tabWindowDivs.length; divCounter ++ ){
    var links = tabWindowDivs[divCounter].getElementsByClassName("tab_tag");
    var tabWindow = {navTabs: [], tabs: []};
    for (var i = 0; i < links.length; i ++ ) {
      var id = getHash( links[i].getAttribute ("href") );
      tabWindow.navTabs[id] = links[i];
      tabWindow.tabs[id] = document.getElementById(id);
    }
    
    var i = 0;
    for ( id in tabWindow.navTabs ){
      tabWindow.navTabs[id].addEventListener("click", swapTab);
      if (i == 0) tabWindow.navTabs[id].className = "active";
      i ++;
    }
    
    var i = 0
    for (var id in tabWindow.tabs){
      if (i != 0){tabWindow.tabs[id].className = "tab_content hide"}
      i ++
    }
    
    tabWindows[tabWindowDivs[divCounter].id] = tabWindow;
  }
}


var swapTab = function(e){
  e.preventDefault()
  var selectedId = getHash( this.getAttribute('href') );
  var tabWindow = tabWindows[getTabWindow(this.getAttribute('href'))]
  for (var id in tabWindow.tabs){
    if ( id == selectedId ) {
      tabWindow.navTabs[id].className = 'active';
      tabWindow.tabs[id].className = 'tab_content';
    } else {
      tabWindow.navTabs[id].className = '';
      tabWindow.tabs[id].className = 'tab_content hide';
    }
  }
}

function getHash( url ) {
  var hashPos = url.lastIndexOf ( '#' );
  return url.substring( hashPos + 1 );
}

function getTabWindow( url ) {
  return parseInt(url);
}


// PAGINATION===============================================
var getRange = 0

var nextPage = function(event){
  event.preventDefault();
  var form = new FormData();
  form.append("range", getRange + 10)
  getRange += 10;
  var request = new XMLHttpRequest();
  request.open("post", this.href );
  request.send(form);
  request.addEventListener("load", updatePage);
}

var updatePage = function(){
  if (getRange !== 0){prev_link.style.display = "inline"}else{prev_link.style.display = "none"};
  var new_products = JSON.parse(this.response);
  productDivs = document.getElementsByClassName("product_container");
  for (var i = 0; i < new_products.length; i++){
    // console.log(new_products);
    productDivs[i].children[0].innerHTML = "Product ID: " + new_products[i].id;
    // document.getElementById()
  }
  
}

