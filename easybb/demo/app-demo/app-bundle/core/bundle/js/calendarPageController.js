$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'calendar') {

        myApp.alert("Non disponibile", 'Errore!');
        jsonContext = {};

        $$.get('pages/calendar.html', {}, function (data) {
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);
        });

    }
});
