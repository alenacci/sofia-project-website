$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'newReservation') {

        jsonContext = page.context;
        if (jsonContext.name)
        {
            jsonContext['customerSelected'] = true;
        }

        $$.get('pages/newReservation.html', {}, function (data) {
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);

            $$("#reservationDetailsSection").hide();


            $$('#selectedRoom').on('change', function (e) { 
              alert("value changed");
            });

            var checkinCalendar = myApp.calendar({
                input: '#calendar-checkin-date',
                dateFormat : 'dd-mm-yyyy'
            });               
                   
            var checkoutCalendar = myApp.calendar({
                input: '#calendar-checkout-date',
                dateFormat : 'dd-mm-yyyy'
            });               


            var checkinDate = null;
            var checkoutDate = null;


            $$('#calendar-checkin-date').on('change', function(){
                checkinCalendar.close();
                var tmp = new Date(parseInt(checkinCalendar.value));                
                checkinDate = new Date(Date.UTC(tmp.getFullYear(),  tmp.getMonth(),  tmp.getDate()));
            });             

            $$('#calendar-checkout-date').on('change', function(){
                checkoutCalendar.close();
                checkoutDate = new Date(parseInt(checkoutCalendar.value));
                var tmp = new Date(parseInt(checkoutCalendar.value));                
                checkoutDate = new Date(Date.UTC(tmp.getFullYear(),  tmp.getMonth(),  tmp.getDate()));
            });            

            $$('#checkRoomAvailabilityButton').on('click', function (e) { 
              
                if ((checkinDate == null) || (checkoutDate == null))
                {
                    myApp.alert("Devi selezionare le date di check-in e check-out!", 'Errore!');
                    return;

                }

                if (checkinDate > checkoutDate)
                {
                    myApp.alert("La data di checkout deve essere succesiva alla data di checkin!", 'Errore!');           
                    return;         
                }

                const stayDates = []
                
                var currentDate = new Date(checkinDate.getTime());
                while(currentDate < checkoutDate)
                {                  
                    stayDates.push(new Date(currentDate.getTime()));
                    var newDate = currentDate.setDate(currentDate.getDate() + 1);
                    currentDate = new Date(newDate);
                }

                var freeRoomsObjectList = []

                var Room = Parse.Object.extend("Room");
                var query = new Parse.Query(Room);
                var currentUser = Parse.User.current();
                query.equalTo("owner", currentUser);

                myApp.showPreloader();
                query.find({
                    success: function(results)
                        {
                            myApp.hidePreloader();
                            for (var i = 0; i < results.length; i++) {
                                var object = results[i];
                                freeRoomsObjectList.push(object);
                            }

                            $$.get('snippets/newReservationRoomList.html', {}, function (htmlTemplate) {

                                snippetContext = {availableRooms: []}

                                for (i = 0; i<freeRoomsObjectList.length; i++)
                                {
                                    var room = {
                                        id : freeRoomsObjectList[i].id,
                                        number : freeRoomsObjectList[i].get('number'),
                                        name : freeRoomsObjectList[i].get('name')
                                    }

                                    snippetContext.availableRooms.push(room);
                                }
                                console.log(JSON.stringify(snippetContext));
                                var compiledTemplate = Template7.compile(htmlTemplate);
                                var htmlContent = compiledTemplate(snippetContext);
                                $$("#availableRoomsListBlock").html(htmlContent);
                                $$("#reservationDetailsSection").show();

                                console.log(htmlContent);

                                $$('#saveReservationButton').on('click', function (e) { 

                                    var formData = myApp.formToJSON('#theForm');
                                
                                    var customerId = formData.customerId;
                                    var selectedRoom = formData.selectedRoom;
                                    var selectedRoomIndex = document.getElementById("selectedRoomField").selectedIndex;
                                    var selectedRoomId = snippetContext.availableRooms[selectedRoomIndex].id;
                                    var numberOfGuests = formData.numberOfGuests;
                                    var reservationNotes = formData.reservationNotes;



                                    if (customerId == undefined)
                                    {
                                        myApp.alert("Devi selezionare un cliente per poter salvare una prenotazione!", 'Errore!');           
                                        return;  
                                    }

                                    if (selectedRoomIndex == 0)
                                    {
                                        myApp.alert("Devi selezionare una camera per poter salvare una prenotazione!", 'Errore!');           
                                        return;  
                                    }

                                    if (numberOfGuests == "")
                                    {
                                        myApp.alert("Devi inserire il numero di ospiti per poter salvare una prenotazione!", 'Errore!');           
                                        return;                                          
                                    }

                                    if (isNaN(numberOfGuests) == true)
                                    {
                                        myApp.alert("Il numero di ospiti deve essere una cifra!", 'Errore!');           
                                        return;       
                                    }

                                    var Customer = Parse.Object.extend("Customer");
                                    var customer = new Customer()
                                    customer.id = customerId;

                                    var Room = Parse.Object.extend("Room");
                                    var room = new Room()
                                    room.id = selectedRoomId;

                                    var currentUser = Parse.User.current();
                                    var Reservation = Parse.Object.extend("Reservation");
                                    var reservation = new Reservation();

                                    reservation.set("owner", currentUser);
                                    reservation.set("customer", customer);
                                    reservation.set("room", room);
                                    reservation.set("checkinDate", checkinDate);
                                    reservation.set("checkoutDate", checkoutDate);
                                    reservation.set("notes", reservationNotes);
                                    reservation.set("guestsNumber", parseInt(numberOfGuests));
                                    reservation.set("pricePerNight", 0);

                                    myApp.showPreloader();
                                    reservation.save(null, {
                                      success: function(gameScore) {
                                        myApp.hidePreloader();
                                        myApp.alert("Prenotazione salvata correttamente", 'Errore!');           
                                        mainView.router.loadPage('pages/calendar.html');
                                      },
                                      error: function(gameScore, error) {
                                        myApp.hidePreloader();

                                        myApp.alert(JSON.stringify(error), 'Errore!');      
                                      }
                                    });


                                    
                                });

                            });     

                        },
                    error: function(error)
                        {
                            myApp.hidePreloader();
                            myApp.alert("Errore nella lettura delle camere!", 'Errore!');           
                        }
                    });

                           
            });             
            
        });

    }
});



