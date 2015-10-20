$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'projects') {

        myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
        }, 2000);

        jsonContext = {
            firstname: 'John',
            lastname: 'Doe',
            age: 32,
            position: 'CEO',
            company: 'Google',
            interests: ['swimming', 'music', 'JavaScript', 'iMac', 'iOS apps', 'sport'],
            projects: [
                {
                    title: 'Google',
                    description: 'Nice search engine'
                },
                {
                    title: 'YouTube',
                    description: 'Online video service'
                },
                {
                    title: 'Android',
                    description: 'Mobile operating system'
                }
            ]
        };

        $$.get('pages/projects.html', {}, function (data) {
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);
        });

    }
});
