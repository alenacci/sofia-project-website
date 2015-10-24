$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'settings') {

        jsonContext = {};

        $$.get('pages/settings.html', {}, function (data) {
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);

            $$('#editAccountButton').on('click', function(){
                myApp.alert("Per modificare le informaizoni del tuo account, scrivi a info@sofiasmartliving.com", 'Informazione');
            }); 

            $$('#logoutButton').on('click', function(){
                Parse.User.logOut();
                mainView.router.loadPage("index.html")           
            }); 

            $$('#manageRoomsButton').on('click', function(){
                mainView.router.loadPage("pages/settingsRooms.html")
            }); 

            $$('#managePriceButton').on('click', function(){
                mainView.router.loadPage("pages/settingsPrice.html")
            });             

            $$('#paymentButton').on('click', function(){
                myApp.alert("Questa è una versione Beta. Il servizio di pagamento non è ancora arrivo. Per maggiori informazioni scrivi a info@sofiasmartliving.com.", 'Informazione');
            }); 

            $$('#invoicesButton').on('click', function(){
                myApp.alert("Questa è una versione Beta. Il servizio di fatturazione non è ancora arrivo. Per maggiori informazioni scrivi a info@sofiasmartliving.com.", 'Informazione');
            }); 



        });

    }
});
