$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;

    // Code for Services page
    if (page.name === 'parseTest') {

        myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
        }, 2000);

        var TestObject = Parse.Object.extend("TestObject");
        var testObject = new TestObject();
        testObject.save({foo: "bar"}).then(function(object) {

            jsonContext = {
                message: 'yay! it worked'
            };

        $$.get('pages/parseTest.html', {}, function (data) {
            var compiledTemplate = Template7.compile(data);
            var htmlContent = compiledTemplate(jsonContext);
            $$(page.container).html(htmlContent);
        });



        });



    }
});
