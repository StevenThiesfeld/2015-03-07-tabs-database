var tabWindows = []

window.onload = function(){
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
  var windowID = url.substr(url.length - 1);
  return parseInt(windowID)
}