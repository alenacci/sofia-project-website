$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'cars') {

        myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
        }, 2000);

        jsonContext = [
                        {
                            vendor: 'Volkswagen 222222',
                            model: 'Passat',
                            power: 152,
                            speed: 280,
                            weight: 1400,
                            color: 'black',
                            year: 2012,
                            description: ''
                        },
                        {
                            vendor: 'Skoda',
                            model: 'Superb',
                            power: 152,
                            speed: 260,
                            weight: 1600,
                            color: 'white',
                            year: 2013,
                            description: ''
                        },
                        {
                            vendor: 'Ford',
                            model: 'Mustang',
                            power: 480,
                            speed: 320,
                            weight: 1200,
                            color: 'red',
                            year: 2014,
                            description: ''
                        },
                    ];

        //Updating the context
        myApp.template7Data.cars = jsonContext;

        $$.get('pages/cars.html', {}, function (data) {
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);
        });

    }
});
