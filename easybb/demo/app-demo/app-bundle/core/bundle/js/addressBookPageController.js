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

            jsonContext = []

            for (var i = 0; i < results.length; i++) {
              //alert(results[i].id + ' - ' + results[i].get('playerName'));

                var currentCustomer = {}
                currentCustomer['name'] = results[i].get('name');
                currentCustomer['surname'] = results[i].get('surname');
                currentCustomer['city'] = results[i].get('city');
                currentCustomer['district'] = results[i].get('district');

                jsonContext.push(currentCustomer);

            }

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

