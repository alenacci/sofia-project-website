$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'calendar') {
      
        jsonContext = {
            reservations : []
        };

        $$.get('pages/calendar.html', {}, function (data) {

            var currentUser = Parse.User.current();
            var Reservation = Parse.Object.extend("Reservation");
            var query = new Parse.Query(Reservation);
            query.equalTo("owner", currentUser);
            query.descending("checkinDate");
            query.include("room");
            query.include("customer");

            myApp.showPreloader();
            query.find({
                success: function(results)
                    {
                        myApp.hidePreloader();
                        for (var i = 0; i < results.length; i++) {
                            var object = results[i];

                            var reservation = 
                            {
                                id : object.id,
                                checkinDate : object.get("checkinDate"),
                                checkoutDate : object.get("checkoutDate"),
                                room : object.get("room").name,
                                customer : object.get("customer").name + " " + object.get("customer").surname,
                                notes : object.get("notes"),
                                pricePerNight : object.get("pricePerNight"),
                                guestsNumber : object.get("guestsNumber")
                            }

                            jsonContext.reservations.push(reservation);

                        }

                        var compiledTemplate = Template7.compile(data);
                        var htmlContent = compiledTemplate(jsonContext);
                        $$(page.container).html(htmlContent);

                    },
                error: function(error)
                    {
                        myApp.hidePreloader();
                        myApp.alert(JSON.stringify(error), 'Errore!');     
                    }
                });


        });

    }
});
