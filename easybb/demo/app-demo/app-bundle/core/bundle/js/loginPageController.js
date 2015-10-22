$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'login') {

        jsonContext = page.context;           

        $$.get('pages/login.html', {}, function (data) {

            // Loading Page Template
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);

            // UI Elements Events
            $$('#loginNowButton').on('click', function(){

                myApp.showPreloader();
                
                var formData = myApp.formToJSON('#theForm');
                //alert(JSON.stringify(formData));

                Parse.User.logIn(formData.email, formData.password, {
                  success: function(user) {
                        myApp.hidePreloader();
                        myApp.alert('Login effettuato!', 'Conferma!', function () {
                            mainView.router.loadPage(DEFAULT_AFTER_LOGIN_PAGE);
                        });
                  },
                  error: function(user, error) {
                    myApp.hidePreloader();
                    myApp.alert(JSON.stringify(error), 'Errore!');
                  }
                });

            }); 

            $$('#forgotPassword').on('click', function(){
                myApp.alert('Contatta il servizio clienti a customers@sofiasmartliving.com', 'Servizio clienti');
            }); 


        });
    }
});


