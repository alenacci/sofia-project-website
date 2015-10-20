$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'contacts') {

        myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
        }, 2000);

        jsonContext = {
            tel: '+39 340 6890565 12312312312321312312',
            email: 'alessandro.nacci@polimi.it',
            country: 'ITALIA',
            city: 'San Francisco',
            zip: '12345',
            street: 'Awesome st'
        };

        $$.get('pages/contacts.html', {}, function (data) {
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);
        });

    }
});
