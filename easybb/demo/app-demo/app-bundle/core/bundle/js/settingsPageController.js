$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'settings') {

        jsonContext = {};

        $$.get('pages/settings.html', {}, function (data) {
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);

            $$('#logoutButton').on('click', function(){
                
                Parse.User.logOut();
                mainView.router.loadPage("index.html")           

            }); 

        });

    }
});
