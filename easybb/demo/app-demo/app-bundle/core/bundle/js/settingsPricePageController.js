$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'settingsPrice') {

        jsonContext = {
            singlePrice: 0.0,
            doublePrice: 0.0,
            triplePrice: 0.0,
            quadruplePrice: 0.0,
            currency : "EUR"
        }

        currentUserSettings = {}

        $$.get('pages/settingsPrice.html', {}, function (data) {

            var currentUser = Parse.User.current();
            var Setting = Parse.Object.extend("Setting");
            var query = new Parse.Query(Setting);
            query.equalTo("owner", currentUser);

            myApp.showPreloader();                    
            
            query.find({
              success: function(results) {

                myApp.hidePreloader();                    
                

                for (var i = 0; i < results.length; i++) {
                  currentUserSettings = results[i];
                  jsonContext.singlePrice = parseFloat(currentUserSettings.get('singlePrice'));
                  jsonContext.doublePrice = parseFloat(currentUserSettings.get('doublePrice'));
                  jsonContext.triplePrice = parseFloat(currentUserSettings.get('triplePrice'));
                  jsonContext.quadruplePrice = parseFloat(currentUserSettings.get('quadruplePrice'));
                  jsonContext.currency = currentUserSettings.get('currency');
                }

                var compiledTemplate = Template7.compile(data);
                var htmlContent = compiledTemplate(jsonContext);
                $$(page.container).html(htmlContent);


                $$('#savePriceSettings').on('click', function(){
                   
                    myApp.showPreloader();                    

                    var formData = myApp.formToJSON('#theForm');

                    currentUserSettings.set('singlePrice', parseFloat(formData.singlePrice));
                    currentUserSettings.set('doublePrice', parseFloat(formData.doublePrice));
                    currentUserSettings.set('triplePrice', parseFloat(formData.triplePrice));
                    currentUserSettings.set('quadruplePrice', parseFloat(formData.quadruplePrice));
                    currentUserSettings.set('currency', formData.currency);

                    currentUserSettings.save(null, {
                        success: function(setting) {
                                myApp.hidePreloader();
                                myApp.alert("Impostazioni salvate correttamente", 'Conferma');
                            },
                        error: function(setting, error) {
                                myApp.hidePreloader();
                                myApp.alert(JSON.stringify(error), 'Errore!');
                            }
                        });
                });             


              },
              error: function(error) {
                myApp.hidePreloader();
                myApp.alert(JSON.stringify(error), 'Errore!');

              }
            }); 

        });

    }
});
