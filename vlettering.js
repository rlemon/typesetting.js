/*
 * vlettering.js
 * 
 * 		@title: Vanilla lettering.js
 * 		@author: Robert Lemon
 * 		@version: 1.1
 * 
 * * Requires Sizzle selector library
 * 
 * */
var vlettering = (function() {

    function injector(t, splitter, klass, after) {
        var a = (t.innerText || t.textContent),
            inject = '';
        a = a.split(splitter);
        if (a.length) {
            a.forEach(function(item, i) {
                inject += '<span class="' + klass + (i + 1) + '">' + item + '</span>' + after;
            });
            t.innerHTML = inject; 
        }
    }

    function replaceNodeWith(element, search, replace) {
        var elements = element.childNodes;
        for (var i = 0, l = elements.length; i < l; i++) {
            if (elements[i].tagName === search) {
                element.replaceChild(document.createTextNode(replace), elements[i]);
            }
        }
    }

    var vlettering = {
        letters: function(queryString, context) {
            context = context || document;
            var elements = Sizzle(queryString, context);
            elements.forEach(function(item) {
                injector(item, '', 'char', '');
            });
            return elements;
        },
        lines: function(queryString, context) {
            context = context || document;
            var elements = Sizzle(queryString, context);
            elements.forEach(function(item) {
                var r = "eefec303079ad17405c889e092e105b0";
                replaceNodeWith(item, 'BR', r);
                injector(item, r, 'line', '');
            });
            return elements;
        },
        words: function(queryString, context) {
            context = context || document;
            var elements = Sizzle(queryString, context);
            elements.forEach(function(item) {
                injector(item, ' ', 'word', '');
            });
            return elements;
        }
    };
    return vlettering;
})();

​
