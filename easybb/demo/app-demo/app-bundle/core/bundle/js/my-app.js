// Let's register Template7 helper so we can pass json string in links
Template7.registerHelper('json_stringify', function (context) {
    return JSON.stringify(context);
});

// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    template7Pages: true,
    // Specify Template7 data for pages
    template7Data: { }
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
});

// Configs
var DEFAULT_AFTER_LOGIN_PAGE = "pages/newReservation.html";

// Initializing Parse Applicaiton
Parse.initialize("waWFtH73b4CqvFdELBjx4yyMIMvSgeZpx9uqKl1N", "ItBtIyyyTg8gP7jJdnB4pHKlab8JfbTs3z7pc9Fu");

// Check if the user is logged or not
var currentUser = Parse.User.current();
if (currentUser) {
    myApp.showPreloader();
    setTimeout(function(){
        myApp.hidePreloader();
        mainView.router.loadPage(DEFAULT_AFTER_LOGIN_PAGE);
    }, 500);
    
} 

//Default pages beahviours

$$(document).on('pageBeforeInit', function (e) {
    myApp.closePanel();
});



//Debug functions
function CFXinspect(o,i){
    if(typeof i=='undefined')i='';
    if(i.length>50)return '[MAX ITERATIONS]';
    var r=[];
    for(var p in o){
        var t=typeof o[p];
        r.push(i+'"'+p+'" ('+t+') => '+(t=='object' ? 'object:'+xinspect(o[p],i+'  ') : o[p]+''));
    }
    return r.join(i+'\n');
}


function CFStringTrim(s){ 
  return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
}


Array.prototype.remove = function(value) {
    var index = this.indexOf(value);
    if (index>-1) this.splice(index, 1);
    return true;
};