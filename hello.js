/* eslint-disable */
console.log('Loading a web page');
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36';
console.log(new Date());
page.open('https://ppuslugi.mf.gov.pl', function (status) {
    waitFor(function () {
        return page.evaluate(function () {
            return $(".SidebarLink.SidebarLinkChVAT").is(":visible");
        });
    }, function () {
        page.evaluate(function () {
            $(".SidebarLink.SidebarLinkChVAT").click();
        });
        waitFor(function () {
            return page.evaluate(function () {
                return $("input#b-7").is(":visible");
            });
        }, function () {
            page.evaluate(function () {
                $("#b-7").val('9290100096');//9222367183 6981568162
                $("#b-8").click();
            });
            waitFor(function () {
                return page.evaluate(function () {
                    return $("#b-3").is(":visible");
                });
            }, function () {
                var res = page.evaluate(function () {
                    return {text: $("[data-name='b-3']").text(), vatPayer: $("img#b-a").is(":visible")};
                });
                console.log(JSON.stringify(res));
                if (status === "success") {
                    page.render('example.png');
                }
                console.log(new Date());
                phantom.exit();
            });
        });

    });
});

function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 10000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function () {
            if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
                // If not time-out yet and condition not yet fulfilled
                condition = ( typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if (!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    page.render('error.png');
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval);
                }
            }
        }, 100);
}
