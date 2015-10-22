$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'newCustomer') {

        jsonContext = {};

        $$.get('pages/newCustomer.html', {}, function (data) {

            // Loading Page Template
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);

            // UI Elements Events
            $$('#createNewCustomerButton').on('click', function(){
                
                var formData = myApp.formToJSON('#theForm');

                if (CFStringTrim(formData.name) == "")
                {
                    myApp.alert("Inserire il nome del cliente", "Errore");
                    return;
                }

                if (CFStringTrim(formData.surname) == "")
                {
                    myApp.alert("Inserire il cognome del cliente", "Errore");
                    return;
                }

                var Customer = Parse.Object.extend("Customer");
                var customer = new Customer();

                var currentUser = Parse.User.current();
                customer.set("owner", currentUser);                

                customer.set("name", formData.name);
                customer.set("surname", formData.surname);
                customer.set("address", formData.address);
                customer.set("district", formData.district);
                customer.set("zip", formData.zip);
                customer.set("city", formData.city);

                customer.set("phone", formData.phone);
                customer.set("mobile", formData.mobile);
                customer.set("email", formData.email);

                customer.set("notes", formData.notes);

                myApp.showPreloader();

                customer.save(null, {
                  success: function(gameScore) {
                    
                    myApp.hidePreloader();
                    myApp.alert('Cliente salvato correttamente.', 'Conferma!', function () {
                        mainView.router.load({url: "pages/addressBook.html"});
                    });


                  },
                  error: function(gameScore, error) {
                    myApp.hidePreloader();
                    myApp.alert(JSON.stringify(error), 'Errore!');
                  }
                });                

            }); 

        });
    }
});


