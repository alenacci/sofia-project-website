$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'settingsRooms') {

        jsonContext = {
            bbRooms:[],
            parameters:
            {
                roomsNumber : 0
            }
        }

        $$.get('pages/settingsRooms.html', {}, function (data) {


            var currentUser = Parse.User.current();
            var roomsNumber = currentUser.get("numberOfRooms");
            jsonContext.parameters.roomsNumber = roomsNumber;
            
            var Room = Parse.Object.extend("Room");
            var query = new Parse.Query(Room);
            query.equalTo("owner", currentUser);
            query.ascending("number");

            myApp.showPreloader();
            query.find({
              success: function(results) {
                myApp.hidePreloader();
                // Do something with the returned Parse.Object values
                
                for (var i = 0; i < results.length; i++) {

                    var room = {
                        objectId : results[i].id,
                        number : results[i].get('number'),
                        description : results[i].get('description'),
                        name : results[i].get('name')
                    };
                    jsonContext.bbRooms.push(room);
                }

                var compiledTemplate = Template7.compile(data);
                var htmlContent = compiledTemplate(jsonContext);
                $$(page.container).html(htmlContent);

                
                // ---->  Managing events
                // UI Elements Events

                $$('#saveRoomNumberButton').on('click', function(){
                    
                    var formData = myApp.formToJSON('#hotelSizeForm');
                    var currentUser = Parse.User.current();
                    currentUser.set('numberOfRooms', formData.numberOfRooms);
                    currentUser.save(null, {
                      success: function(user) {
                            myApp.hidePreloader();
                            myApp.alert('Numero camere salvato correttamente.', 'Conferma!');
                      },
                      error: function(user, error) {
                        myApp.hidePreloader();
                        myApp.alert(JSON.stringify(error), 'Errore!');
                      }
                    });

                }); 

                $$('#saveRoomsSettingsButton').on('click', function(){
                    
                    var formData = myApp.formToJSON('#theForm');                    
                    myApp.showPreloader();

                    var Room = Parse.Object.extend("Room");

                    // this will store the rows for use with Parse.Object.saveAll
                    var roomArray = [];



                    // create a few objects, with a random state 0 or 1.
                    for (var i = 0; i < 10; i++) { 
                      var room = new Room();
                      room.id = formData['roomId_' + i];
                      room.set('name', formData['roomName_' + i]);
                      room.set('description', formData['roomDescription_' + i]);
                      roomArray.push(room);
                    }

                    // save all the newly created objects
                    Parse.Object.saveAll(roomArray, {
                        success: function(objs) {
                            myApp.hidePreloader();
                            myApp.alert('Infomrazioni salvate correttamente.', 'Conferma!');
                        },
                        error: function(error) { 
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
