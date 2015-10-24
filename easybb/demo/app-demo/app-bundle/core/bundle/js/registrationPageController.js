$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'registration') {

        jsonContext = {};

        $$.get('pages/registration.html', {}, function (data) {

            // Loading Page Template
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);

            // UI Elements Events
            $$('#registerNowButton').on('click', function(){
                
                var formData = myApp.formToJSON('#theForm');


                if (formData.hotelClass == "")
                {
                    myApp.alert("Seleziona la tipologia di struttura", "Errore");
                    return;
                }

                if (formData.numberOfRooms == "")
                {
                    myApp.alert("Seleziona il numero di camere", "Errore");
                    return;
                }

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
                user.set("numberOfRooms", formData.numberOfRooms);        

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
                        
                        myApp.alert('Registrazione effettuata correttamente. Creo la tua struttura.', 'Conferma!', function () {
                            
                            myApp.showPreloader();

                            // Pre-populating the B&B rooms....

                            var Room = Parse.Object.extend("Room");

                            // this will store the rows for use with Parse.Object.saveAll
                            var roomArray = [];

                            // create a few objects, with a random state 0 or 1.
                            for (var i = 0; i < 10; i++) { 
                              var room = new Room();
                              room.set('number',i+1);
                              room.set('name',"Stanza " + (i+1));
                              room.set('description', "");
                              room.set('owner', user);
                              roomArray.push(room);
                            }

                            
                            Parse.Object.saveAll(roomArray, {
                                success: function(objs) {

                                    // Pre-populating the B&B settings....
                                    var Setting = Parse.Object.extend("Setting");
                                    var setting = new Setting();

                                    setting.set("owner", user);
                                    setting.set("singlePrice", 0);
                                    setting.set("doublePrice", 0);
                                    setting.set("triplePrice", 0);
                                    setting.set("quadruplePrice", 0);
                                    setting.set("currency", "EUR");

                                    setting.save(null, {
                                      success: function(setting) {
                                        myApp.hidePreloader();
                                        mainView.router.load({url: "pages/login.html", context:{hideTopBackButton:true}});
                                      },
                                      error: function(setting, error) {
                                        myApp.hidePreloader();
                                        myApp.alert(JSON.stringify(error), 'Errore!');
                                      }
                                    });      

                                },
                                error: function(error) { 
                                    myApp.hidePreloader();
                                    myApp.alert(JSON.stringify(error), 'Errore!');

                                }
                            });
                            
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


