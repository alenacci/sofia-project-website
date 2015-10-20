$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'newCustomer') {

        jsonContext = {};

        $$.get('pages/newCustomer.html', {}, function (data) {

            // Loading Page Template
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);

            myApp.alert("Non disponibile", 'Errore!');

            // UI Elements Events
            $$('#registerNowButton').on('click', function(){
                
                var formData = myApp.formToJSON('#theForm');

                if (formData.district == "")
                {
                    myApp.alert("Seleziona la provincia", "Errore");
                    return;
                }


                if (formData.email != formData.confirmEmail)
                {
                    myApp.alert("La e-mail e la sua conferma non coincidono.", "Errore");
                    return;
                }

                if (formData.password != formData.confirmPassword)
                {
                    myApp.alert("La password e la sua conferma non coincidono.", "Errore");
                    return;
                }

                if (formData.privacyRead != "on")
                {
                    myApp.alert("Per poter proseguire devi leggere l'informativa sulla privacy", "Errore");
                    return;
                }

                if (formData.privacyAccepted != "on")
                {
                    myApp.alert("Per poter proseguire devi accettare l'informativa sulla privacy", "Errore");
                    return;
                }


                var user = new Parse.User();
                user.set("hotelName", formData.hotelName);
                user.set("hotelClass", formData.hotelClass);         
                user.set("district", formData.district);              

                user.set("name", formData.name);
                user.set("surname", formData.surname);
                user.set("phoneNumber", formData.phoneNumber);

                user.set("username", formData.email);
                user.set("password", formData.password);
                user.set("email", formData.email);
                user.set("privacyRead", formData.privacyRead);
                user.set("privacyAccepted", formData.privacyAccepted);

                myApp.showPreloader();

                user.signUp(null, {
                  success: function(user) {
                    myApp.hidePreloader();

                        myApp.alert('Registrazione effettuata correttamente.', 'Conferma!', function () {
                            mainView.router.load({url: "pages/login.html", context:{hideTopBackButton:true}});
                        });
                    
                  },
                  error: function(user, error) {
                    myApp.hidePreloader();
                    myApp.alert(JSON.stringify(error), 'Errore!');
                  }
                });



            }); 

        });
    }
});


