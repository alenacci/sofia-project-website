$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'addressBook') {


        var Customer = Parse.Object.extend("Customer");
        var query = new Parse.Query(Customer);
        var currentUser = Parse.User.current();
        query.equalTo("owner", currentUser);

        myApp.showPreloader();

        query.find({
          success: function(results) {
            //alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values

            jsonContext = {
                contactList:[],
                parameters:
                {
                    itemSelectedPageUrl : "contactDetails.html"
                }
            }


            for (var i = 0; i < results.length; i++) {
              //alert(results[i].id + ' - ' + results[i].get('playerName'));

                var currentCustomer = {}
                currentCustomer["name"] = results[i].get('name');
                currentCustomer["surname"] = results[i].get('surname');
                currentCustomer["address"] = results[i].get('address');
                currentCustomer["district"] = results[i].get('district');
                currentCustomer["zip"] = results[i].get('zip');
                currentCustomer["city"] = results[i].get('city');
                currentCustomer["phone"] = results[i].get('phone');
                currentCustomer["mobile"] = results[i].get('mobile');
                currentCustomer["email"] = results[i].get('email');
                currentCustomer["notes"] = results[i].get('notes');


                jsonContext.contactList.push(currentCustomer);

            }

            if (page.query.contactPicker)
            {
                jsonContext.parameters.itemSelectedPageUrl = "newReservation.html"
            }
            
            //Updating the app context
            myApp.template7Data.addressBook = jsonContext;


            $$.get('pages/addressBook.html', {}, function (data) {
                var compiledTemplate = Template7.compile(data);
                var htmlContent = compiledTemplate(jsonContext);
                $$(page.container).html(htmlContent);
                myApp.hidePreloader();
            });



          },
          error: function(error) {
            myApp.hidePreloader();
            myApp.alert(JSON.stringify(error), 'Errore!');

          }
        });


    }
});

