/*
 * @filename    typesetting.js
 * @author      Robert Lemon
 * @version     1.1
 * @modified    2012/03/07
 * @url         http://rlemon.github.com/typesetting.js/
 * @email       rob.lemon@gmail.com
 * 
 * */
var typesetting = (function() {

    function injector(t, splitter, klass, after, runner, reset) {
        var a = (t.innerText || t.textContent),
            inject = '',
            runner = runner || false, 
            reset = reset || false,
            i = 1,
            run_up = true;
        a = a.split(splitter);
        if (a.length) {
            a.forEach(function(item) {
                inject += '<span class="' + klass + i + '">' + item + '</span>' + after;
                if( !!runner && !reset ) {
                    if( run_up && i < runner ) {
                        i++;
                    } else if( run_up && i >= runner ) {
                        run_up = false;
                        i--;
                    } else if( !run_up && i > 1 ) {
                        i--;
                    } else {
                        run_up = true;
                        i++;
                    }
                } else if( !!reset && !runner ) {
                    i = i < reset ? i+1 : 1;
                } else if( !reset && !runner ) {
                    i++;
                } else {
                    throw('Error: Cannot set property runner and reset');
                    return;
                }
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

    function collectElements(queryString, context) { // setup for later on
        context = context || document;
        return Sizzle(queryString, context);
    }

    var typesetting = {
        letters: function(queryString, options) {
            options = options || {};
            var elements = collectElements(queryString);
            elements.forEach(function(item) {
                injector(item, '', (options.baseClass || 'char'), (options.after || ''), (options.runner || false), (options.reset || false));
            });
            return elements;
        },
        lines: function(queryString, options) {
            options = options || {};
            var elements = collectElements(queryString);
            elements.forEach(function(item) {
                var r = "eefec303079ad17405c889e092e105b0";
                replaceNodeWith(item, 'BR', r);
                injector(item, r, (options.baseClass || 'line'), (options.after || ''), (options.runner || false), (options.reset || false));
            });
            return elements;
        },
        words: function(queryString, options) {
            options = options || {};
            var elements = collectElements(queryString);
            elements.forEach(function(item) {
                injector(item, ' ', (options.baseClass || 'word'), (options.after || ''), (options.runner || false), (options.reset || false));
            });
            return elements;
        }
    };
    
    return typesetting;
    
})();

if( "undefined" !== typeof module ){
    module.exports = typesetting;
}
