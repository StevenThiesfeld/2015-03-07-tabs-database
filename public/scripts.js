var navTabs = [];
var tabs = [];

window.onload = function(){
  
  var links = document.getElementsByClassName("tab_tag");
  
  for (var i = 0; i < links.length; i ++ ) {
    var id = getHash( links[i].getAttribute ("href") );
    navTabs[id] = links[i];
    tabs[id] = document.getElementById(id);
  }
  var i = 0;
  for ( id in navTabs ){
    navTabs[id].addEventListener("click", swapTab);
    if (i == 0) navTabs[id].className = "active";
    i ++;
  }
  var i = 0
  for (var id in tabs){
    if (i != 0){tabs[id].className = "tab_content hide"}
    i ++
  }
}


var swapTab = function(e){
  e.preventDefault()
  var selectedId = getHash( this.getAttribute('href') );
  
  for (var id in tabs){
    if ( id == selectedId ) {
      navTabs[id].className = 'active';
      tabs[id].className = 'tab_content';
    } else {
      navTabs[id].className = '';
      tabs[id].className = 'tab_content hide';
    }
  }
  return false
}

function getHash( url ) {
  var hashPos = url.lastIndexOf ( '#' );
  return url.substring( hashPos + 1 );
}