$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'contactDetails') {

        //Taking the page context for the new compilation
        jsonContext = page.context;
        

        $$.get('pages/contactDetails.html', {}, function (data) {
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);
        });

    }
});
