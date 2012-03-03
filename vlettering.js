/*
 * Requires Sizzle selector library
 * 
 * */
var vlettering = (function() {

    function injector(t, splitter, klass, after) {
        console.log(t);
        var a = (t.innerText || t.textContent),
            inject = '';
        a = a.split(splitter);
        if (a.length) {
            a.forEach(function(item, i) {
                inject += '<span class="' + klass + (i + 1) + '">' + item + '</span>' + after;
            });
            t.innerHTML = inject; // I can do better than this!
        }
    }

    function replaceNodeWith(element, search, replace) {
        element.children.forEach(function(item) {
            if (item.nodeType === search) {
                item.parentNode.replaceChild(replace, item)
            }
        });
    }

    var lettering = {
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
                // Because it's hard to split a <br/> tag consistently across browsers,
                // (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
                // (of the word "split").  If you're trying to use this plugin on that 
                // md5 hash string, it will fail because you're being ridiculous.
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
    return lettering;
})();
