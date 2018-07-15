/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var AvatarCropper, atWho,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(document).on('ready page:load', function(event) {
    var result;
    result = [];
    new AvatarCropper();
    $.ajax({
      type: 'GET',
      url: '/all_users',
      dataType: 'json',
      success: function(d) {
        atWho(d.response);
      },
      error: function(e) {
        return result = 'error';
      }
    });
    $(document).on('click', '.retweet_link', function() {
      return $("#modal_" + this.id).modal('toggle');
    });
    $(document).on('click', '.comment_link', function() {
      return $("#modal_" + this.id).modal('toggle');
    });
    $('.slider').bxSlider({
      ticker: true,
      speed: 45000,
      minSlides: 1,
      maxSlides: 20,
      slideWidth: 250,
      slideMargin: 0,
      tickerHover: true,
      responsive: false
    });
    $('.slider_knowledge_stream').bxSlider({
      ticker: true,
      speed: 35000,
      minSlides: 1,
      maxSlides: 20,
      slideWidth: 100,
      slideMargin: 0,
      tickerHover: true,
      responsive: false
    });
    return $('.slider_funding_stream').bxSlider({
      ticker: true,
      speed: 85000,
      minSlides: 1,
      maxSlides: 10,
      slideWidth: 250,
      slideMargin: 0,
      tickerHover: true,
      responsive: false
    });
  });

  AvatarCropper = (function() {
    function AvatarCropper() {
      this.updatePreview = bind(this.updatePreview, this);
      this.update = bind(this.update, this);
      $('#cropbox').Jcrop({
        aspectRatio: 1,
        setSelect: [0, 0, 600, 600],
        onSelect: this.update,
        onChange: this.update,
        keySupport: false
      });
    }

    AvatarCropper.prototype.update = function(coords) {
      $('#user_crop_x').val(coords.x);
      $('#user_crop_y').val(coords.y);
      $('#user_crop_w').val(coords.w);
      $('#user_crop_h').val(coords.h);
      return this.updatePreview(coords);
    };

    AvatarCropper.prototype.updatePreview = function(coords) {
      return $('#preview').css({
        width: Math.round(100 / coords.w * $('#cropbox').width()) + 'px',
        height: Math.round(100 / coords.h * $('#cropbox').height()) + 'px',
        marginLeft: '-' + Math.round(100 / coords.w * coords.x) + 'px',
        marginTop: '-' + Math.round(100 / coords.h * coords.y) + 'px'
      });
    };

    return AvatarCropper;

  })();

  atWho = function(val) {
    return $('.retweet, #post_content, .home_page_search').atwho({
      at: '$',
      data: ['BTC', 'ETH', 'EOS', 'BCH', 'TRX', 'LTC', 'XRP', 'ETC', 'CTXC', 'DASH', 'ADA', 'ONT', 'IOT', 'NEO', 'XLM', 'QTUM', 'BNB', 'HT', 'XMR', 'ZEC', 'DGB']
    }).atwho({
      at: '@',
      data: val
    });
  };

}).call(this);
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], function ($) {
      return (root.returnExportsGlobal = factory($));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
}(this, function ($) {

//@ sourceMappingURL=jquery.caret.map
/*
  Implement Github like autocomplete mentions
  http://ichord.github.com/At.js

  Copyright (c) 2013 chord.luo@gmail.com
  Licensed under the MIT license.
*/

/*
本插件操作 textarea 或者 input 内的插入符
只实现了获得插入符在文本框中的位置，我设置
插入符的位置.
*/

"use strict";
var EditableCaret, InputCaret, Mirror, Utils, discoveryIframeOf, methods, oDocument, oFrame, oWindow, pluginName, setContextBy;

pluginName = 'caret';

EditableCaret = (function() {
  function EditableCaret($inputor) {
    this.$inputor = $inputor;
    this.domInputor = this.$inputor[0];
  }

  EditableCaret.prototype.setPos = function(pos) {
    var fn, found, offset, sel;
    if (sel = oWindow.getSelection()) {
      offset = 0;
      found = false;
      (fn = function(pos, parent) {
        var node, range, _i, _len, _ref, _results;
        _ref = parent.childNodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          if (found) {
            break;
          }
          if (node.nodeType === 3) {
            if (offset + node.length >= pos) {
              found = true;
              range = oDocument.createRange();
              range.setStart(node, pos - offset);
              sel.removeAllRanges();
              sel.addRange(range);
              break;
            } else {
              _results.push(offset += node.length);
            }
          } else {
            _results.push(fn(pos, node));
          }
        }
        return _results;
      })(pos, this.domInputor);
    }
    return this.domInputor;
  };

  EditableCaret.prototype.getIEPosition = function() {
    return this.getPosition();
  };

  EditableCaret.prototype.getPosition = function() {
    var inputor_offset, offset;
    offset = this.getOffset();
    inputor_offset = this.$inputor.offset();
    offset.left -= inputor_offset.left;
    offset.top -= inputor_offset.top;
    return offset;
  };

  EditableCaret.prototype.getOldIEPos = function() {
    var preCaretTextRange, textRange;
    textRange = oDocument.selection.createRange();
    preCaretTextRange = oDocument.body.createTextRange();
    preCaretTextRange.moveToElementText(this.domInputor);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    return preCaretTextRange.text.length;
  };

  EditableCaret.prototype.getPos = function() {
    var clonedRange, pos, range;
    if (range = this.range()) {
      clonedRange = range.cloneRange();
      clonedRange.selectNodeContents(this.domInputor);
      clonedRange.setEnd(range.endContainer, range.endOffset);
      pos = clonedRange.toString().length;
      clonedRange.detach();
      return pos;
    } else if (oDocument.selection) {
      return this.getOldIEPos();
    }
  };

  EditableCaret.prototype.getOldIEOffset = function() {
    var range, rect;
    range = oDocument.selection.createRange().duplicate();
    range.moveStart("character", -1);
    rect = range.getBoundingClientRect();
    return {
      height: rect.bottom - rect.top,
      left: rect.left,
      top: rect.top
    };
  };

  EditableCaret.prototype.getOffset = function(pos) {
    var clonedRange, offset, range, rect, shadowCaret;
    if (oWindow.getSelection && (range = this.range())) {
      if (range.endOffset - 1 > 0 && range.endContainer !== this.domInputor) {
        clonedRange = range.cloneRange();
        clonedRange.setStart(range.endContainer, range.endOffset - 1);
        clonedRange.setEnd(range.endContainer, range.endOffset);
        rect = clonedRange.getBoundingClientRect();
        offset = {
          height: rect.height,
          left: rect.left + rect.width,
          top: rect.top
        };
        clonedRange.detach();
      }
      if (!offset || (offset != null ? offset.height : void 0) === 0) {
        clonedRange = range.cloneRange();
        shadowCaret = $(oDocument.createTextNode("|"));
        clonedRange.insertNode(shadowCaret[0]);
        clonedRange.selectNode(shadowCaret[0]);
        rect = clonedRange.getBoundingClientRect();
        offset = {
          height: rect.height,
          left: rect.left,
          top: rect.top
        };
        shadowCaret.remove();
        clonedRange.detach();
      }
    } else if (oDocument.selection) {
      offset = this.getOldIEOffset();
    }
    if (offset) {
      offset.top += $(oWindow).scrollTop();
      offset.left += $(oWindow).scrollLeft();
    }
    return offset;
  };

  EditableCaret.prototype.range = function() {
    var sel;
    if (!oWindow.getSelection) {
      return;
    }
    sel = oWindow.getSelection();
    if (sel.rangeCount > 0) {
      return sel.getRangeAt(0);
    } else {
      return null;
    }
  };

  return EditableCaret;

})();

InputCaret = (function() {
  function InputCaret($inputor) {
    this.$inputor = $inputor;
    this.domInputor = this.$inputor[0];
  }

  InputCaret.prototype.getIEPos = function() {
    var endRange, inputor, len, normalizedValue, pos, range, textInputRange;
    inputor = this.domInputor;
    range = oDocument.selection.createRange();
    pos = 0;
    if (range && range.parentElement() === inputor) {
      normalizedValue = inputor.value.replace(/\r\n/g, "\n");
      len = normalizedValue.length;
      textInputRange = inputor.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());
      endRange = inputor.createTextRange();
      endRange.collapse(false);
      if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
        pos = len;
      } else {
        pos = -textInputRange.moveStart("character", -len);
      }
    }
    return pos;
  };

  InputCaret.prototype.getPos = function() {
    if (oDocument.selection) {
      return this.getIEPos();
    } else {
      return this.domInputor.selectionStart;
    }
  };

  InputCaret.prototype.setPos = function(pos) {
    var inputor, range;
    inputor = this.domInputor;
    if (oDocument.selection) {
      range = inputor.createTextRange();
      range.move("character", pos);
      range.select();
    } else if (inputor.setSelectionRange) {
      inputor.setSelectionRange(pos, pos);
    }
    return inputor;
  };

  InputCaret.prototype.getIEOffset = function(pos) {
    var h, textRange, x, y;
    textRange = this.domInputor.createTextRange();
    pos || (pos = this.getPos());
    textRange.move('character', pos);
    x = textRange.boundingLeft;
    y = textRange.boundingTop;
    h = textRange.boundingHeight;
    return {
      left: x,
      top: y,
      height: h
    };
  };

  InputCaret.prototype.getOffset = function(pos) {
    var $inputor, offset, position;
    $inputor = this.$inputor;
    if (oDocument.selection) {
      offset = this.getIEOffset(pos);
      offset.top += $(oWindow).scrollTop() + $inputor.scrollTop();
      offset.left += $(oWindow).scrollLeft() + $inputor.scrollLeft();
      return offset;
    } else {
      offset = $inputor.offset();
      position = this.getPosition(pos);
      return offset = {
        left: offset.left + position.left - $inputor.scrollLeft(),
        top: offset.top + position.top - $inputor.scrollTop(),
        height: position.height
      };
    }
  };

  InputCaret.prototype.getPosition = function(pos) {
    var $inputor, at_rect, end_range, format, html, mirror, start_range;
    $inputor = this.$inputor;
    format = function(value) {
      value = value.replace(/<|>|`|"|&/g, '?').replace(/\r\n|\r|\n/g, "<br/>");
      if (/firefox/i.test(navigator.userAgent)) {
        value = value.replace(/\s/g, '&nbsp;');
      }
      return value;
    };
    if (pos === void 0) {
      pos = this.getPos();
    }
    start_range = $inputor.val().slice(0, pos);
    end_range = $inputor.val().slice(pos);
    html = "<span style='position: relative; display: inline;'>" + format(start_range) + "</span>";
    html += "<span id='caret' style='position: relative; display: inline;'>|</span>";
    html += "<span style='position: relative; display: inline;'>" + format(end_range) + "</span>";
    mirror = new Mirror($inputor);
    return at_rect = mirror.create(html).rect();
  };

  InputCaret.prototype.getIEPosition = function(pos) {
    var h, inputorOffset, offset, x, y;
    offset = this.getIEOffset(pos);
    inputorOffset = this.$inputor.offset();
    x = offset.left - inputorOffset.left;
    y = offset.top - inputorOffset.top;
    h = offset.height;
    return {
      left: x,
      top: y,
      height: h
    };
  };

  return InputCaret;

})();

Mirror = (function() {
  Mirror.prototype.css_attr = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontWeight", "height", "letterSpacing", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "outlineWidth", "overflow", "overflowX", "overflowY", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "textAlign", "textOverflow", "textTransform", "whiteSpace", "wordBreak", "wordWrap"];

  function Mirror($inputor) {
    this.$inputor = $inputor;
  }

  Mirror.prototype.mirrorCss = function() {
    var css,
      _this = this;
    css = {
      position: 'absolute',
      left: -9999,
      top: 0,
      zIndex: -20000
    };
    if (this.$inputor.prop('tagName') === 'TEXTAREA') {
      this.css_attr.push('width');
    }
    $.each(this.css_attr, function(i, p) {
      return css[p] = _this.$inputor.css(p);
    });
    return css;
  };

  Mirror.prototype.create = function(html) {
    this.$mirror = $('<div></div>');
    this.$mirror.css(this.mirrorCss());
    this.$mirror.html(html);
    this.$inputor.after(this.$mirror);
    return this;
  };

  Mirror.prototype.rect = function() {
    var $flag, pos, rect;
    $flag = this.$mirror.find("#caret");
    pos = $flag.position();
    rect = {
      left: pos.left,
      top: pos.top,
      height: $flag.height()
    };
    this.$mirror.remove();
    return rect;
  };

  return Mirror;

})();

Utils = {
  contentEditable: function($inputor) {
    return !!($inputor[0].contentEditable && $inputor[0].contentEditable === 'true');
  }
};

methods = {
  pos: function(pos) {
    if (pos || pos === 0) {
      return this.setPos(pos);
    } else {
      return this.getPos();
    }
  },
  position: function(pos) {
    if (oDocument.selection) {
      return this.getIEPosition(pos);
    } else {
      return this.getPosition(pos);
    }
  },
  offset: function(pos) {
    var offset;
    offset = this.getOffset(pos);
    return offset;
  }
};

oDocument = null;

oWindow = null;

oFrame = null;

setContextBy = function(settings) {
  var iframe;
  if (iframe = settings != null ? settings.iframe : void 0) {
    oFrame = iframe;
    oWindow = iframe.contentWindow;
    return oDocument = iframe.contentDocument || oWindow.document;
  } else {
    oFrame = void 0;
    oWindow = window;
    return oDocument = document;
  }
};

discoveryIframeOf = function($dom) {
  var error;
  oDocument = $dom[0].ownerDocument;
  oWindow = oDocument.defaultView || oDocument.parentWindow;
  try {
    return oFrame = oWindow.frameElement;
  } catch (_error) {
    error = _error;
  }
};

$.fn.caret = function(method, value, settings) {
  var caret;
  if (methods[method]) {
    if ($.isPlainObject(value)) {
      setContextBy(value);
      value = void 0;
    } else {
      setContextBy(settings);
    }
    caret = Utils.contentEditable(this) ? new EditableCaret(this) : new InputCaret(this);
    return methods[method].apply(caret, [value]);
  } else {
    return $.error("Method " + method + " does not exist on jQuery.caret");
  }
};

$.fn.caret.EditableCaret = EditableCaret;

$.fn.caret.InputCaret = InputCaret;

$.fn.caret.Utils = Utils;

$.fn.caret.apis = methods;


}));
/**
 * at.js - 1.5.0
 * Copyright (c) 2016 chord.luo <chord.luo@gmail.com>;
 * Homepage: http://ichord.github.com/At.js
 * License: MIT
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
}(this, function ($) {
var DEFAULT_CALLBACKS, KEY_CODE;

KEY_CODE = {
  DOWN: 40,
  UP: 38,
  ESC: 27,
  TAB: 9,
  ENTER: 13,
  CTRL: 17,
  A: 65,
  P: 80,
  N: 78,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  BACKSPACE: 8,
  SPACE: 32
};

DEFAULT_CALLBACKS = {
  beforeSave: function(data) {
    return Controller.arrayToDefaultHash(data);
  },
  matcher: function(flag, subtext, should_startWithSpace, acceptSpaceBar) {
    var _a, _y, match, regexp, space;
    flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    if (should_startWithSpace) {
      flag = '(?:^|\\s)' + flag;
    }
    _a = decodeURI("%C3%80");
    _y = decodeURI("%C3%BF");
    space = acceptSpaceBar ? "\ " : "";
    regexp = new RegExp(flag + "([A-Za-z" + _a + "-" + _y + "0-9_" + space + "\'\.\+\-]*)$|" + flag + "([^\\x00-\\xff]*)$", 'gi');
    match = regexp.exec(subtext);
    if (match) {
      return match[2] || match[1];
    } else {
      return null;
    }
  },
  filter: function(query, data, searchKey) {
    var _results, i, item, len;
    _results = [];
    for (i = 0, len = data.length; i < len; i++) {
      item = data[i];
      if (~new String(item[searchKey]).toLowerCase().indexOf(query.toLowerCase())) {
        _results.push(item);
      }
    }
    return _results;
  },
  remoteFilter: null,
  sorter: function(query, items, searchKey) {
    var _results, i, item, len;
    if (!query) {
      return items;
    }
    _results = [];
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      item.atwho_order = new String(item[searchKey]).toLowerCase().indexOf(query.toLowerCase());
      if (item.atwho_order > -1) {
        _results.push(item);
      }
    }
    return _results.sort(function(a, b) {
      return a.atwho_order - b.atwho_order;
    });
  },
  tplEval: function(tpl, map) {
    var error, error1, template;
    template = tpl;
    try {
      if (typeof tpl !== 'string') {
        template = tpl(map);
      }
      return template.replace(/\$\{([^\}]*)\}/g, function(tag, key, pos) {
        return map[key];
      });
    } catch (error1) {
      error = error1;
      return "";
    }
  },
  highlighter: function(li, query) {
    var regexp;
    if (!query) {
      return li;
    }
    regexp = new RegExp(">\\s*(\\w*?)(" + query.replace("+", "\\+") + ")(\\w*)\\s*<", 'ig');
    return li.replace(regexp, function(str, $1, $2, $3) {
      return '> ' + $1 + '<strong>' + $2 + '</strong>' + $3 + ' <';
    });
  },
  beforeInsert: function(value, $li) {
    return value;
  },
  beforeReposition: function(offset) {
    return offset;
  },
  afterMatchFailed: function(at, el) {}
};

var App;

App = (function() {
  function App(inputor) {
    this.currentFlag = null;
    this.controllers = {};
    this.aliasMaps = {};
    this.$inputor = $(inputor);
    this.setupRootElement();
    this.listen();
  }

  App.prototype.createContainer = function(doc) {
    var ref;
    if ((ref = this.$el) != null) {
      ref.remove();
    }
    return $(doc.body).append(this.$el = $("<div class='atwho-container'></div>"));
  };

  App.prototype.setupRootElement = function(iframe, asRoot) {
    var error, error1;
    if (asRoot == null) {
      asRoot = false;
    }
    if (iframe) {
      this.window = iframe.contentWindow;
      this.document = iframe.contentDocument || this.window.document;
      this.iframe = iframe;
    } else {
      this.document = this.$inputor[0].ownerDocument;
      this.window = this.document.defaultView || this.document.parentWindow;
      try {
        this.iframe = this.window.frameElement;
      } catch (error1) {
        error = error1;
        this.iframe = null;
        if ($.fn.atwho.debug) {
          throw new Error("iframe auto-discovery is failed.\nPlease use `setIframe` to set the target iframe manually.\n" + error);
        }
      }
    }
    return this.createContainer((this.iframeAsRoot = asRoot) ? this.document : document);
  };

  App.prototype.controller = function(at) {
    var c, current, currentFlag, ref;
    if (this.aliasMaps[at]) {
      current = this.controllers[this.aliasMaps[at]];
    } else {
      ref = this.controllers;
      for (currentFlag in ref) {
        c = ref[currentFlag];
        if (currentFlag === at) {
          current = c;
          break;
        }
      }
    }
    if (current) {
      return current;
    } else {
      return this.controllers[this.currentFlag];
    }
  };

  App.prototype.setContextFor = function(at) {
    this.currentFlag = at;
    return this;
  };

  App.prototype.reg = function(flag, setting) {
    var base, controller;
    controller = (base = this.controllers)[flag] || (base[flag] = this.$inputor.is('[contentEditable]') ? new EditableController(this, flag) : new TextareaController(this, flag));
    if (setting.alias) {
      this.aliasMaps[setting.alias] = flag;
    }
    controller.init(setting);
    return this;
  };

  App.prototype.listen = function() {
    return this.$inputor.on('compositionstart', (function(_this) {
      return function(e) {
        var ref;
        if ((ref = _this.controller()) != null) {
          ref.view.hide();
        }
        _this.isComposing = true;
        return null;
      };
    })(this)).on('compositionend', (function(_this) {
      return function(e) {
        _this.isComposing = false;
        return null;
      };
    })(this)).on('keyup.atwhoInner', (function(_this) {
      return function(e) {
        return _this.onKeyup(e);
      };
    })(this)).on('keydown.atwhoInner', (function(_this) {
      return function(e) {
        return _this.onKeydown(e);
      };
    })(this)).on('blur.atwhoInner', (function(_this) {
      return function(e) {
        var c;
        if (c = _this.controller()) {
          c.expectedQueryCBId = null;
          return c.view.hide(e, c.getOpt("displayTimeout"));
        }
      };
    })(this)).on('click.atwhoInner', (function(_this) {
      return function(e) {
        return _this.dispatch(e);
      };
    })(this)).on('scroll.atwhoInner', (function(_this) {
      return function() {
        var lastScrollTop;
        lastScrollTop = _this.$inputor.scrollTop();
        return function(e) {
          var currentScrollTop, ref;
          currentScrollTop = e.target.scrollTop;
          if (lastScrollTop !== currentScrollTop) {
            if ((ref = _this.controller()) != null) {
              ref.view.hide(e);
            }
          }
          lastScrollTop = currentScrollTop;
          return true;
        };
      };
    })(this)());
  };

  App.prototype.shutdown = function() {
    var _, c, ref;
    ref = this.controllers;
    for (_ in ref) {
      c = ref[_];
      c.destroy();
      delete this.controllers[_];
    }
    this.$inputor.off('.atwhoInner');
    return this.$el.remove();
  };

  App.prototype.dispatch = function(e) {
    var _, c, ref, results;
    ref = this.controllers;
    results = [];
    for (_ in ref) {
      c = ref[_];
      results.push(c.lookUp(e));
    }
    return results;
  };

  App.prototype.onKeyup = function(e) {
    var ref;
    switch (e.keyCode) {
      case KEY_CODE.ESC:
        e.preventDefault();
        if ((ref = this.controller()) != null) {
          ref.view.hide();
        }
        break;
      case KEY_CODE.DOWN:
      case KEY_CODE.UP:
      case KEY_CODE.CTRL:
      case KEY_CODE.ENTER:
        $.noop();
        break;
      case KEY_CODE.P:
      case KEY_CODE.N:
        if (!e.ctrlKey) {
          this.dispatch(e);
        }
        break;
      default:
        this.dispatch(e);
    }
  };

  App.prototype.onKeydown = function(e) {
    var ref, view;
    view = (ref = this.controller()) != null ? ref.view : void 0;
    if (!(view && view.visible())) {
      return;
    }
    switch (e.keyCode) {
      case KEY_CODE.ESC:
        e.preventDefault();
        view.hide(e);
        break;
      case KEY_CODE.UP:
        e.preventDefault();
        view.prev();
        break;
      case KEY_CODE.DOWN:
        e.preventDefault();
        view.next();
        break;
      case KEY_CODE.P:
        if (!e.ctrlKey) {
          return;
        }
        e.preventDefault();
        view.prev();
        break;
      case KEY_CODE.N:
        if (!e.ctrlKey) {
          return;
        }
        e.preventDefault();
        view.next();
        break;
      case KEY_CODE.TAB:
      case KEY_CODE.ENTER:
      case KEY_CODE.SPACE:
        if (!view.visible()) {
          return;
        }
        if (!this.controller().getOpt('spaceSelectsMatch') && e.keyCode === KEY_CODE.SPACE) {
          return;
        }
        if (!this.controller().getOpt('tabSelectsMatch') && e.keyCode === KEY_CODE.TAB) {
          return;
        }
        if (view.highlighted()) {
          e.preventDefault();
          view.choose(e);
        } else {
          view.hide(e);
        }
        break;
      default:
        $.noop();
    }
  };

  return App;

})();

var Controller,
  slice = [].slice;

Controller = (function() {
  Controller.prototype.uid = function() {
    return (Math.random().toString(16) + "000000000").substr(2, 8) + (new Date().getTime());
  };

  function Controller(app, at1) {
    this.app = app;
    this.at = at1;
    this.$inputor = this.app.$inputor;
    this.id = this.$inputor[0].id || this.uid();
    this.expectedQueryCBId = null;
    this.setting = null;
    this.query = null;
    this.pos = 0;
    this.range = null;
    if ((this.$el = $("#atwho-ground-" + this.id, this.app.$el)).length === 0) {
      this.app.$el.append(this.$el = $("<div id='atwho-ground-" + this.id + "'></div>"));
    }
    this.model = new Model(this);
    this.view = new View(this);
  }

  Controller.prototype.init = function(setting) {
    this.setting = $.extend({}, this.setting || $.fn.atwho["default"], setting);
    this.view.init();
    return this.model.reload(this.setting.data);
  };

  Controller.prototype.destroy = function() {
    this.trigger('beforeDestroy');
    this.model.destroy();
    this.view.destroy();
    return this.$el.remove();
  };

  Controller.prototype.callDefault = function() {
    var args, error, error1, funcName;
    funcName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    try {
      return DEFAULT_CALLBACKS[funcName].apply(this, args);
    } catch (error1) {
      error = error1;
      return $.error(error + " Or maybe At.js doesn't have function " + funcName);
    }
  };

  Controller.prototype.trigger = function(name, data) {
    var alias, eventName;
    if (data == null) {
      data = [];
    }
    data.push(this);
    alias = this.getOpt('alias');
    eventName = alias ? name + "-" + alias + ".atwho" : name + ".atwho";
    return this.$inputor.trigger(eventName, data);
  };

  Controller.prototype.callbacks = function(funcName) {
    return this.getOpt("callbacks")[funcName] || DEFAULT_CALLBACKS[funcName];
  };

  Controller.prototype.getOpt = function(at, default_value) {
    var e, error1;
    try {
      return this.setting[at];
    } catch (error1) {
      e = error1;
      return null;
    }
  };

  Controller.prototype.insertContentFor = function($li) {
    var data, tpl;
    tpl = this.getOpt('insertTpl');
    data = $.extend({}, $li.data('item-data'), {
      'atwho-at': this.at
    });
    return this.callbacks("tplEval").call(this, tpl, data, "onInsert");
  };

  Controller.prototype.renderView = function(data) {
    var searchKey;
    searchKey = this.getOpt("searchKey");
    data = this.callbacks("sorter").call(this, this.query.text, data.slice(0, 1001), searchKey);
    return this.view.render(data.slice(0, this.getOpt('limit')));
  };

  Controller.arrayToDefaultHash = function(data) {
    var i, item, len, results;
    if (!$.isArray(data)) {
      return data;
    }
    results = [];
    for (i = 0, len = data.length; i < len; i++) {
      item = data[i];
      if ($.isPlainObject(item)) {
        results.push(item);
      } else {
        results.push({
          name: item
        });
      }
    }
    return results;
  };

  Controller.prototype.lookUp = function(e) {
    var query, wait;
    if (e && e.type === 'click' && !this.getOpt('lookUpOnClick')) {
      return;
    }
    if (this.getOpt('suspendOnComposing') && this.app.isComposing) {
      return;
    }
    query = this.catchQuery(e);
    if (!query) {
      this.expectedQueryCBId = null;
      return query;
    }
    this.app.setContextFor(this.at);
    if (wait = this.getOpt('delay')) {
      this._delayLookUp(query, wait);
    } else {
      this._lookUp(query);
    }
    return query;
  };

  Controller.prototype._delayLookUp = function(query, wait) {
    var now, remaining;
    now = Date.now ? Date.now() : new Date().getTime();
    this.previousCallTime || (this.previousCallTime = now);
    remaining = wait - (now - this.previousCallTime);
    if ((0 < remaining && remaining < wait)) {
      this.previousCallTime = now;
      this._stopDelayedCall();
      return this.delayedCallTimeout = setTimeout((function(_this) {
        return function() {
          _this.previousCallTime = 0;
          _this.delayedCallTimeout = null;
          return _this._lookUp(query);
        };
      })(this), wait);
    } else {
      this._stopDelayedCall();
      if (this.previousCallTime !== now) {
        this.previousCallTime = 0;
      }
      return this._lookUp(query);
    }
  };

  Controller.prototype._stopDelayedCall = function() {
    if (this.delayedCallTimeout) {
      clearTimeout(this.delayedCallTimeout);
      return this.delayedCallTimeout = null;
    }
  };

  Controller.prototype._generateQueryCBId = function() {
    return {};
  };

  Controller.prototype._lookUp = function(query) {
    var _callback;
    _callback = function(queryCBId, data) {
      if (queryCBId !== this.expectedQueryCBId) {
        return;
      }
      if (data && data.length > 0) {
        return this.renderView(this.constructor.arrayToDefaultHash(data));
      } else {
        return this.view.hide();
      }
    };
    this.expectedQueryCBId = this._generateQueryCBId();
    return this.model.query(query.text, $.proxy(_callback, this, this.expectedQueryCBId));
  };

  return Controller;

})();

var TextareaController,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextareaController = (function(superClass) {
  extend(TextareaController, superClass);

  function TextareaController() {
    return TextareaController.__super__.constructor.apply(this, arguments);
  }

  TextareaController.prototype.catchQuery = function() {
    var caretPos, content, end, isString, query, start, subtext;
    content = this.$inputor.val();
    caretPos = this.$inputor.caret('pos', {
      iframe: this.app.iframe
    });
    subtext = content.slice(0, caretPos);
    query = this.callbacks("matcher").call(this, this.at, subtext, this.getOpt('startWithSpace'));
    isString = typeof query === 'string';
    if (isString && query.length < this.getOpt('minLen', 0)) {
      return;
    }
    if (isString && query.length <= this.getOpt('maxLen', 20)) {
      start = caretPos - query.length;
      end = start + query.length;
      this.pos = start;
      query = {
        'text': query,
        'headPos': start,
        'endPos': end
      };
      this.trigger("matched", [this.at, query.text]);
    } else {
      query = null;
      this.view.hide();
    }
    return this.query = query;
  };

  TextareaController.prototype.rect = function() {
    var c, iframeOffset, scaleBottom;
    if (!(c = this.$inputor.caret('offset', this.pos - 1, {
      iframe: this.app.iframe
    }))) {
      return;
    }
    if (this.app.iframe && !this.app.iframeAsRoot) {
      iframeOffset = $(this.app.iframe).offset();
      c.left += iframeOffset.left;
      c.top += iframeOffset.top;
    }
    scaleBottom = this.app.document.selection ? 0 : 2;
    return {
      left: c.left,
      top: c.top,
      bottom: c.top + c.height + scaleBottom
    };
  };

  TextareaController.prototype.insert = function(content, $li) {
    var $inputor, source, startStr, suffix, text;
    $inputor = this.$inputor;
    source = $inputor.val();
    startStr = source.slice(0, Math.max(this.query.headPos - this.at.length, 0));
    suffix = (suffix = this.getOpt('suffix')) === "" ? suffix : suffix || " ";
    content += suffix;
    text = "" + startStr + content + (source.slice(this.query['endPos'] || 0));
    $inputor.val(text);
    $inputor.caret('pos', startStr.length + content.length, {
      iframe: this.app.iframe
    });
    if (!$inputor.is(':focus')) {
      $inputor.focus();
    }
    return $inputor.change();
  };

  return TextareaController;

})(Controller);

var EditableController,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EditableController = (function(superClass) {
  extend(EditableController, superClass);

  function EditableController() {
    return EditableController.__super__.constructor.apply(this, arguments);
  }

  EditableController.prototype._getRange = function() {
    var sel;
    sel = this.app.window.getSelection();
    if (sel.rangeCount > 0) {
      return sel.getRangeAt(0);
    }
  };

  EditableController.prototype._setRange = function(position, node, range) {
    if (range == null) {
      range = this._getRange();
    }
    if (!range) {
      return;
    }
    node = $(node)[0];
    if (position === 'after') {
      range.setEndAfter(node);
      range.setStartAfter(node);
    } else {
      range.setEndBefore(node);
      range.setStartBefore(node);
    }
    range.collapse(false);
    return this._clearRange(range);
  };

  EditableController.prototype._clearRange = function(range) {
    var sel;
    if (range == null) {
      range = this._getRange();
    }
    sel = this.app.window.getSelection();
    if (this.ctrl_a_pressed == null) {
      sel.removeAllRanges();
      return sel.addRange(range);
    }
  };

  EditableController.prototype._movingEvent = function(e) {
    var ref;
    return e.type === 'click' || ((ref = e.which) === KEY_CODE.RIGHT || ref === KEY_CODE.LEFT || ref === KEY_CODE.UP || ref === KEY_CODE.DOWN);
  };

  EditableController.prototype._unwrap = function(node) {
    var next;
    node = $(node).unwrap().get(0);
    if ((next = node.nextSibling) && next.nodeValue) {
      node.nodeValue += next.nodeValue;
      $(next).remove();
    }
    return node;
  };

  EditableController.prototype.catchQuery = function(e) {
    var $inserted, $query, _range, index, inserted, isString, lastNode, matched, offset, query, query_content, range;
    if (!(range = this._getRange())) {
      return;
    }
    if (!range.collapsed) {
      return;
    }
    if (e.which === KEY_CODE.ENTER) {
      ($query = $(range.startContainer).closest('.atwho-query')).contents().unwrap();
      if ($query.is(':empty')) {
        $query.remove();
      }
      ($query = $(".atwho-query", this.app.document)).text($query.text()).contents().last().unwrap();
      this._clearRange();
      return;
    }
    if (/firefox/i.test(navigator.userAgent)) {
      if ($(range.startContainer).is(this.$inputor)) {
        this._clearRange();
        return;
      }
      if (e.which === KEY_CODE.BACKSPACE && range.startContainer.nodeType === document.ELEMENT_NODE && (offset = range.startOffset - 1) >= 0) {
        _range = range.cloneRange();
        _range.setStart(range.startContainer, offset);
        if ($(_range.cloneContents()).contents().last().is('.atwho-inserted')) {
          inserted = $(range.startContainer).contents().get(offset);
          this._setRange('after', $(inserted).contents().last());
        }
      } else if (e.which === KEY_CODE.LEFT && range.startContainer.nodeType === document.TEXT_NODE) {
        $inserted = $(range.startContainer.previousSibling);
        if ($inserted.is('.atwho-inserted') && range.startOffset === 0) {
          this._setRange('after', $inserted.contents().last());
        }
      }
    }
    $(range.startContainer).closest('.atwho-inserted').addClass('atwho-query').siblings().removeClass('atwho-query');
    if (($query = $(".atwho-query", this.app.document)).length > 0 && $query.is(':empty') && $query.text().length === 0) {
      $query.remove();
    }
    if (!this._movingEvent(e)) {
      $query.removeClass('atwho-inserted');
    }
    if ($query.length > 0) {
      switch (e.which) {
        case KEY_CODE.LEFT:
          this._setRange('before', $query.get(0), range);
          $query.removeClass('atwho-query');
          return;
        case KEY_CODE.RIGHT:
          this._setRange('after', $query.get(0).nextSibling, range);
          $query.removeClass('atwho-query');
          return;
      }
    }
    if ($query.length > 0 && (query_content = $query.attr('data-atwho-at-query'))) {
      $query.empty().html(query_content).attr('data-atwho-at-query', null);
      this._setRange('after', $query.get(0), range);
    }
    _range = range.cloneRange();
    _range.setStart(range.startContainer, 0);
    matched = this.callbacks("matcher").call(this, this.at, _range.toString(), this.getOpt('startWithSpace'));
    isString = typeof matched === 'string';
    if ($query.length === 0 && isString && (index = range.startOffset - this.at.length - matched.length) >= 0) {
      range.setStart(range.startContainer, index);
      $query = $('<span/>', this.app.document).attr(this.getOpt("editableAtwhoQueryAttrs")).addClass('atwho-query');
      range.surroundContents($query.get(0));
      lastNode = $query.contents().last().get(0);
      if (/firefox/i.test(navigator.userAgent)) {
        range.setStart(lastNode, lastNode.length);
        range.setEnd(lastNode, lastNode.length);
        this._clearRange(range);
      } else {
        this._setRange('after', lastNode, range);
      }
    }
    if (isString && matched.length < this.getOpt('minLen', 0)) {
      return;
    }
    if (isString && matched.length <= this.getOpt('maxLen', 20)) {
      query = {
        text: matched,
        el: $query
      };
      this.trigger("matched", [this.at, query.text]);
      return this.query = query;
    } else {
      this.view.hide();
      this.query = {
        el: $query
      };
      if ($query.text().indexOf(this.at) >= 0) {
        if (this._movingEvent(e) && $query.hasClass('atwho-inserted')) {
          $query.removeClass('atwho-query');
        } else if (false !== this.callbacks('afterMatchFailed').call(this, this.at, $query)) {
          this._setRange("after", this._unwrap($query.text($query.text()).contents().first()));
        }
      }
      return null;
    }
  };

  EditableController.prototype.rect = function() {
    var $iframe, iframeOffset, rect;
    rect = this.query.el.offset();
    if (this.app.iframe && !this.app.iframeAsRoot) {
      iframeOffset = ($iframe = $(this.app.iframe)).offset();
      rect.left += iframeOffset.left - this.$inputor.scrollLeft();
      rect.top += iframeOffset.top - this.$inputor.scrollTop();
    }
    rect.bottom = rect.top + this.query.el.height();
    return rect;
  };

  EditableController.prototype.insert = function(content, $li) {
    var data, range, suffix, suffixNode;
    if (!this.$inputor.is(':focus')) {
      this.$inputor.focus();
    }
    suffix = (suffix = this.getOpt('suffix')) === "" ? suffix : suffix || "\u00A0";
    data = $li.data('item-data');
    this.query.el.removeClass('atwho-query').addClass('atwho-inserted').html(content).attr('data-atwho-at-query', "" + data['atwho-at'] + this.query.text);
    if (range = this._getRange()) {
      range.setEndAfter(this.query.el[0]);
      range.collapse(false);
      range.insertNode(suffixNode = this.app.document.createTextNode("\u200D" + suffix));
      this._setRange('after', suffixNode, range);
    }
    if (!this.$inputor.is(':focus')) {
      this.$inputor.focus();
    }
    return this.$inputor.change();
  };

  return EditableController;

})(Controller);

var Model;

Model = (function() {
  function Model(context) {
    this.context = context;
    this.at = this.context.at;
    this.storage = this.context.$inputor;
  }

  Model.prototype.destroy = function() {
    return this.storage.data(this.at, null);
  };

  Model.prototype.saved = function() {
    return this.fetch() > 0;
  };

  Model.prototype.query = function(query, callback) {
    var _remoteFilter, data, searchKey;
    data = this.fetch();
    searchKey = this.context.getOpt("searchKey");
    data = this.context.callbacks('filter').call(this.context, query, data, searchKey) || [];
    _remoteFilter = this.context.callbacks('remoteFilter');
    if (data.length > 0 || (!_remoteFilter && data.length === 0)) {
      return callback(data);
    } else {
      return _remoteFilter.call(this.context, query, callback);
    }
  };

  Model.prototype.fetch = function() {
    return this.storage.data(this.at) || [];
  };

  Model.prototype.save = function(data) {
    return this.storage.data(this.at, this.context.callbacks("beforeSave").call(this.context, data || []));
  };

  Model.prototype.load = function(data) {
    if (!(this.saved() || !data)) {
      return this._load(data);
    }
  };

  Model.prototype.reload = function(data) {
    return this._load(data);
  };

  Model.prototype._load = function(data) {
    if (typeof data === "string") {
      return $.ajax(data, {
        dataType: "json"
      }).done((function(_this) {
        return function(data) {
          return _this.save(data);
        };
      })(this));
    } else {
      return this.save(data);
    }
  };

  return Model;

})();

var View;

View = (function() {
  function View(context) {
    this.context = context;
    this.$el = $("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>");
    this.$elUl = this.$el.children();
    this.timeoutID = null;
    this.context.$el.append(this.$el);
    this.bindEvent();
  }

  View.prototype.init = function() {
    var header_tpl, id;
    id = this.context.getOpt("alias") || this.context.at.charCodeAt(0);
    header_tpl = this.context.getOpt("headerTpl");
    if (header_tpl && this.$el.children().length === 1) {
      this.$el.prepend(header_tpl);
    }
    return this.$el.attr({
      'id': "at-view-" + id
    });
  };

  View.prototype.destroy = function() {
    return this.$el.remove();
  };

  View.prototype.bindEvent = function() {
    var $menu, lastCoordX, lastCoordY;
    $menu = this.$el.find('ul');
    lastCoordX = 0;
    lastCoordY = 0;
    return $menu.on('mousemove.atwho-view', 'li', (function(_this) {
      return function(e) {
        var $cur;
        if (lastCoordX === e.clientX && lastCoordY === e.clientY) {
          return;
        }
        lastCoordX = e.clientX;
        lastCoordY = e.clientY;
        $cur = $(e.currentTarget);
        if ($cur.hasClass('cur')) {
          return;
        }
        $menu.find('.cur').removeClass('cur');
        return $cur.addClass('cur');
      };
    })(this)).on('click.atwho-view', 'li', (function(_this) {
      return function(e) {
        $menu.find('.cur').removeClass('cur');
        $(e.currentTarget).addClass('cur');
        _this.choose(e);
        return e.preventDefault();
      };
    })(this));
  };

  View.prototype.visible = function() {
    return this.$el.is(":visible");
  };

  View.prototype.highlighted = function() {
    return this.$el.find(".cur").length > 0;
  };

  View.prototype.choose = function(e) {
    var $li, content;
    if (($li = this.$el.find(".cur")).length) {
      content = this.context.insertContentFor($li);
      this.context._stopDelayedCall();
      this.context.insert(this.context.callbacks("beforeInsert").call(this.context, content, $li), $li);
      this.context.trigger("inserted", [$li, e]);
      this.hide(e);
    }
    if (this.context.getOpt("hideWithoutSuffix")) {
      return this.stopShowing = true;
    }
  };

  View.prototype.reposition = function(rect) {
    var _window, offset, overflowOffset, ref;
    _window = this.context.app.iframeAsRoot ? this.context.app.window : window;
    if (rect.bottom + this.$el.height() - $(_window).scrollTop() > $(_window).height()) {
      rect.bottom = rect.top - this.$el.height();
    }
    if (rect.left > (overflowOffset = $(_window).width() - this.$el.width() - 5)) {
      rect.left = overflowOffset;
    }
    offset = {
      left: rect.left,
      top: rect.bottom
    };
    if ((ref = this.context.callbacks("beforeReposition")) != null) {
      ref.call(this.context, offset);
    }
    this.$el.offset(offset);
    return this.context.trigger("reposition", [offset]);
  };

  View.prototype.next = function() {
    var cur, next, nextEl, offset;
    cur = this.$el.find('.cur').removeClass('cur');
    next = cur.next();
    if (!next.length) {
      next = this.$el.find('li:first');
    }
    next.addClass('cur');
    nextEl = next[0];
    offset = nextEl.offsetTop + nextEl.offsetHeight + (nextEl.nextSibling ? nextEl.nextSibling.offsetHeight : 0);
    return this.scrollTop(Math.max(0, offset - this.$el.height()));
  };

  View.prototype.prev = function() {
    var cur, offset, prev, prevEl;
    cur = this.$el.find('.cur').removeClass('cur');
    prev = cur.prev();
    if (!prev.length) {
      prev = this.$el.find('li:last');
    }
    prev.addClass('cur');
    prevEl = prev[0];
    offset = prevEl.offsetTop + prevEl.offsetHeight + (prevEl.nextSibling ? prevEl.nextSibling.offsetHeight : 0);
    return this.scrollTop(Math.max(0, offset - this.$el.height()));
  };

  View.prototype.scrollTop = function(scrollTop) {
    var scrollDuration;
    scrollDuration = this.context.getOpt('scrollDuration');
    if (scrollDuration) {
      return this.$elUl.animate({
        scrollTop: scrollTop
      }, scrollDuration);
    } else {
      return this.$elUl.scrollTop(scrollTop);
    }
  };

  View.prototype.show = function() {
    var rect;
    if (this.stopShowing) {
      this.stopShowing = false;
      return;
    }
    if (!this.visible()) {
      this.$el.show();
      this.$el.scrollTop(0);
      this.context.trigger('shown');
    }
    if (rect = this.context.rect()) {
      return this.reposition(rect);
    }
  };

  View.prototype.hide = function(e, time) {
    var callback;
    if (!this.visible()) {
      return;
    }
    if (isNaN(time)) {
      this.$el.hide();
      return this.context.trigger('hidden', [e]);
    } else {
      callback = (function(_this) {
        return function() {
          return _this.hide();
        };
      })(this);
      clearTimeout(this.timeoutID);
      return this.timeoutID = setTimeout(callback, time);
    }
  };

  View.prototype.render = function(list) {
    var $li, $ul, i, item, len, li, tpl;
    if (!($.isArray(list) && list.length > 0)) {
      this.hide();
      return;
    }
    this.$el.find('ul').empty();
    $ul = this.$el.find('ul');
    tpl = this.context.getOpt('displayTpl');
    for (i = 0, len = list.length; i < len; i++) {
      item = list[i];
      item = $.extend({}, item, {
        'atwho-at': this.context.at
      });
      li = this.context.callbacks("tplEval").call(this.context, tpl, item, "onDisplay");
      $li = $(this.context.callbacks("highlighter").call(this.context, li, this.context.query.text));
      $li.data("item-data", item);
      $ul.append($li);
    }
    this.show();
    if (this.context.getOpt('highlightFirst')) {
      return $ul.find("li:first").addClass("cur");
    }
  };

  return View;

})();

var Api;

Api = {
  load: function(at, data) {
    var c;
    if (c = this.controller(at)) {
      return c.model.load(data);
    }
  },
  isSelecting: function() {
    var ref;
    return !!((ref = this.controller()) != null ? ref.view.visible() : void 0);
  },
  hide: function() {
    var ref;
    return (ref = this.controller()) != null ? ref.view.hide() : void 0;
  },
  reposition: function() {
    var c;
    if (c = this.controller()) {
      return c.view.reposition(c.rect());
    }
  },
  setIframe: function(iframe, asRoot) {
    this.setupRootElement(iframe, asRoot);
    return null;
  },
  run: function() {
    return this.dispatch();
  },
  destroy: function() {
    this.shutdown();
    return this.$inputor.data('atwho', null);
  }
};

$.fn.atwho = function(method) {
  var _args, result;
  _args = arguments;
  result = null;
  this.filter('textarea, input, [contenteditable=""], [contenteditable=true]').each(function() {
    var $this, app;
    if (!(app = ($this = $(this)).data("atwho"))) {
      $this.data('atwho', (app = new App(this)));
    }
    if (typeof method === 'object' || !method) {
      return app.reg(method.at, method);
    } else if (Api[method] && app) {
      return result = Api[method].apply(app, Array.prototype.slice.call(_args, 1));
    } else {
      return $.error("Method " + method + " does not exist on jQuery.atwho");
    }
  });
  if (result != null) {
    return result;
  } else {
    return this;
  }
};

$.fn.atwho["default"] = {
  at: void 0,
  alias: void 0,
  data: null,
  displayTpl: "<li>${name}</li>",
  insertTpl: "${atwho-at}${name}",
  headerTpl: null,
  callbacks: DEFAULT_CALLBACKS,
  searchKey: "name",
  suffix: void 0,
  hideWithoutSuffix: false,
  startWithSpace: true,
  highlightFirst: true,
  limit: 5,
  maxLen: 20,
  minLen: 0,
  displayTimeout: 300,
  delay: null,
  spaceSelectsMatch: false,
  tabSelectsMatch: true,
  editableAtwhoQueryAttrs: {},
  scrollDuration: 150,
  suspendOnComposing: true,
  lookUpOnClick: true
};

$.fn.atwho.debug = false;

}));
/*
 Highstock JS v6.1.0 (2018-04-13)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(V,L){"object"===typeof module&&module.exports?module.exports=V.document?L(V):L:V.Highcharts=L(V)})("undefined"!==typeof window?window:this,function(V){var L=function(){var a="undefined"===typeof V?window:V,B=a.document,C=a.navigator&&a.navigator.userAgent||"",G=B&&B.createElementNS&&!!B.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,p=/(edge|msie|trident)/i.test(C)&&!a.opera,m=-1!==C.indexOf("Firefox"),g=-1!==C.indexOf("Chrome"),v=m&&4>parseInt(C.split("Firefox/")[1],
10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highstock",version:"6.1.0",deg2rad:2*Math.PI/360,doc:B,hasBidiBug:v,hasTouch:B&&void 0!==B.documentElement.ontouchstart,isMS:p,isWebKit:-1!==C.indexOf("AppleWebKit"),isFirefox:m,isChrome:g,isSafari:!g&&-1!==C.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(C),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:G,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},
charts:[]}}();(function(a){a.timers=[];var B=a.charts,C=a.doc,G=a.win;a.error=function(p,m){p=a.isNumber(p)?"Highcharts error #"+p+": www.highcharts.com/errors/"+p:p;if(m)throw Error(p);G.console&&console.log(p)};a.Fx=function(a,m,g){this.options=m;this.elem=a;this.prop=g};a.Fx.prototype={dSetter:function(){var a=this.paths[0],m=this.paths[1],g=[],v=this.now,z=a.length,u;if(1===v)g=this.toD;else if(z===m.length&&1>v)for(;z--;)u=parseFloat(a[z]),g[z]=isNaN(u)?m[z]:v*parseFloat(m[z]-u)+u;else g=m;this.elem.attr("d",
g,null,!0)},update:function(){var a=this.elem,m=this.prop,g=this.now,v=this.options.step;if(this[m+"Setter"])this[m+"Setter"]();else a.attr?a.element&&a.attr(m,g,null,!0):a.style[m]=g+this.unit;v&&v.call(a,g,this)},run:function(p,m,g){var v=this,z=v.options,u=function(a){return u.stopped?!1:v.step(a)},y=G.requestAnimationFrame||function(a){setTimeout(a,13)},l=function(){for(var b=0;b<a.timers.length;b++)a.timers[b]()||a.timers.splice(b--,1);a.timers.length&&y(l)};p!==m||this.elem["forceAnimate:"+
this.prop]?(this.startTime=+new Date,this.start=p,this.end=m,this.unit=g,this.now=this.start,this.pos=0,u.elem=this.elem,u.prop=this.prop,u()&&1===a.timers.push(u)&&y(l)):(delete z.curAnim[this.prop],z.complete&&0===a.keys(z.curAnim).length&&z.complete.call(this.elem))},step:function(p){var m=+new Date,g,v=this.options,z=this.elem,u=v.complete,y=v.duration,l=v.curAnim;z.attr&&!z.element?p=!1:p||m>=y+this.startTime?(this.now=this.end,this.pos=1,this.update(),g=l[this.prop]=!0,a.objectEach(l,function(a){!0!==
a&&(g=!1)}),g&&u&&u.call(z),p=!1):(this.pos=v.easing((m-this.startTime)/y),this.now=this.start+(this.end-this.start)*this.pos,this.update(),p=!0);return p},initPath:function(p,m,g){function v(a){var b,f;for(c=a.length;c--;)b="M"===a[c]||"L"===a[c],f=/[a-zA-Z]/.test(a[c+3]),b&&f&&a.splice(c+1,0,a[c+1],a[c+2],a[c+1],a[c+2])}function z(a,b){for(;a.length<n;){a[0]=b[n-a.length];var f=a.slice(0,t);[].splice.apply(a,[0,0].concat(f));h&&(f=a.slice(a.length-t),[].splice.apply(a,[a.length,0].concat(f)),c--)}a[0]=
"M"}function u(a,b){for(var c=(n-a.length)/t;0<c&&c--;)f=a.slice().splice(a.length/w-t,t*w),f[0]=b[n-t-c*t],e&&(f[t-6]=f[t-2],f[t-5]=f[t-1]),[].splice.apply(a,[a.length/w,0].concat(f)),h&&c--}m=m||"";var y,l=p.startX,b=p.endX,e=-1<m.indexOf("C"),t=e?7:3,n,f,c;m=m.split(" ");g=g.slice();var h=p.isArea,w=h?2:1,D;e&&(v(m),v(g));if(l&&b){for(c=0;c<l.length;c++)if(l[c]===b[0]){y=c;break}else if(l[0]===b[b.length-l.length+c]){y=c;D=!0;break}void 0===y&&(m=[])}m.length&&a.isNumber(y)&&(n=g.length+y*w*t,
D?(z(m,g),u(g,m)):(z(g,m),u(m,g)));return[m,g]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)};a.merge=function(){var p,m=arguments,g,v={},z=function(g,y){"object"!==typeof g&&(g={});a.objectEach(y,function(l,b){!a.isObject(l,!0)||a.isClass(l)||a.isDOMElement(l)?g[b]=y[b]:g[b]=z(g[b]||{},l)});return g};!0===m[0]&&(v=m[1],m=Array.prototype.slice.call(m,2));g=m.length;for(p=0;p<g;p++)v=z(v,
m[p]);return v};a.pInt=function(a,m){return parseInt(a,m||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(p,m){return!!p&&"object"===typeof p&&(!m||!a.isArray(p))};a.isDOMElement=function(p){return a.isObject(p)&&"number"===typeof p.nodeType};a.isClass=function(p){var m=p&&p.constructor;return!(!a.isObject(p,!0)||a.isDOMElement(p)||!m||!m.name||"Object"===
m.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a};a.erase=function(a,m){for(var g=a.length;g--;)if(a[g]===m){a.splice(g,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(p,m,g){var v;a.isString(m)?a.defined(g)?p.setAttribute(m,g):p&&p.getAttribute&&((v=p.getAttribute(m))||"class"!==m||(v=p.getAttribute(m+"Name"))):a.defined(m)&&a.isObject(m)&&a.objectEach(m,function(a,g){p.setAttribute(g,a)});return v};a.splat=function(p){return a.isArray(p)?
p:[p]};a.syncTimeout=function(a,m,g){if(m)return setTimeout(a,m,g);a.call(0,g)};a.clearTimeout=function(p){a.defined(p)&&clearTimeout(p)};a.extend=function(a,m){var g;a||(a={});for(g in m)a[g]=m[g];return a};a.pick=function(){var a=arguments,m,g,v=a.length;for(m=0;m<v;m++)if(g=a[m],void 0!==g&&null!==g)return g};a.css=function(p,m){a.isMS&&!a.svg&&m&&void 0!==m.opacity&&(m.filter="alpha(opacity\x3d"+100*m.opacity+")");a.extend(p.style,m)};a.createElement=function(p,m,g,v,z){p=C.createElement(p);var u=
a.css;m&&a.extend(p,m);z&&u(p,{padding:0,border:"none",margin:0});g&&u(p,g);v&&v.appendChild(p);return p};a.extendClass=function(p,m){var g=function(){};g.prototype=new p;a.extend(g.prototype,m);return g};a.pad=function(a,m,g){return Array((m||2)+1-String(a).replace("-","").length).join(g||0)+a};a.relativeLength=function(a,m,g){return/%$/.test(a)?m*parseFloat(a)/100+(g||0):parseFloat(a)};a.wrap=function(a,m,g){var v=a[m];a[m]=function(){var a=Array.prototype.slice.call(arguments),u=arguments,y=this;
y.proceed=function(){v.apply(y,arguments.length?arguments:u)};a.unshift(v);a=g.apply(this,a);y.proceed=null;return a}};a.formatSingle=function(p,m,g){var v=/\.([0-9])/,z=a.defaultOptions.lang;/f$/.test(p)?(g=(g=p.match(v))?g[1]:-1,null!==m&&(m=a.numberFormat(m,g,z.decimalPoint,-1<p.indexOf(",")?z.thousandsSep:""))):m=(g||a.time).dateFormat(p,m);return m};a.format=function(p,m,g){for(var v="{",z=!1,u,y,l,b,e=[],t;p;){v=p.indexOf(v);if(-1===v)break;u=p.slice(0,v);if(z){u=u.split(":");y=u.shift().split(".");
b=y.length;t=m;for(l=0;l<b;l++)t&&(t=t[y[l]]);u.length&&(t=a.formatSingle(u.join(":"),t,g));e.push(t)}else e.push(u);p=p.slice(v+1);v=(z=!z)?"}":"{"}e.push(p);return e.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(p,m,g,v,z){var u,y=p;g=a.pick(g,1);u=p/g;m||(m=z?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===v&&(1===g?m=a.grep(m,function(a){return 0===a%1}):.1>=g&&(m=[1/g])));for(v=0;v<m.length&&!(y=m[v],z&&y*g>=p||
!z&&u<=(m[v]+(m[v+1]||m[v]))/2);v++);return y=a.correctFloat(y*g,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,m){var g=a.length,v,z;for(z=0;z<g;z++)a[z].safeI=z;a.sort(function(a,g){v=m(a,g);return 0===v?a.safeI-g.safeI:v});for(z=0;z<g;z++)delete a[z].safeI};a.arrayMin=function(a){for(var m=a.length,g=a[0];m--;)a[m]<g&&(g=a[m]);return g};a.arrayMax=function(a){for(var m=a.length,g=a[0];m--;)a[m]>g&&(g=a[m]);return g};a.destroyObjectProperties=function(p,m){a.objectEach(p,function(a,
v){a&&a!==m&&a.destroy&&a.destroy();delete p[v]})};a.discardElement=function(p){var m=a.garbageBin;m||(m=a.createElement("div"));p&&m.appendChild(p);m.innerHTML=""};a.correctFloat=function(a,m){return parseFloat(a.toPrecision(m||14))};a.setAnimation=function(p,m){m.renderer.globalAnimation=a.pick(p,m.options.chart.animation,!0)};a.animObject=function(p){return a.isObject(p)?a.merge(p):{duration:p?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,
year:314496E5};a.numberFormat=function(p,m,g,v){p=+p||0;m=+m;var z=a.defaultOptions.lang,u=(p.toString().split(".")[1]||"").split("e")[0].length,y,l,b=p.toString().split("e");-1===m?m=Math.min(u,20):a.isNumber(m)?m&&b[1]&&0>b[1]&&(y=m+ +b[1],0<=y?(b[0]=(+b[0]).toExponential(y).split("e")[0],m=y):(b[0]=b[0].split(".")[0]||0,p=20>m?(b[0]*Math.pow(10,b[1])).toFixed(m):0,b[1]=0)):m=2;l=(Math.abs(b[1]?b[0]:p)+Math.pow(10,-Math.max(m,u)-1)).toFixed(m);u=String(a.pInt(l));y=3<u.length?u.length%3:0;g=a.pick(g,
z.decimalPoint);v=a.pick(v,z.thousandsSep);p=(0>p?"-":"")+(y?u.substr(0,y)+v:"");p+=u.substr(y).replace(/(\d{3})(?=\d)/g,"$1"+v);m&&(p+=g+l.slice(-m));b[1]&&0!==+p&&(p+="e"+b[1]);return p};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(p,m,g){if("width"===m)return Math.min(p.offsetWidth,p.scrollWidth)-a.getStyle(p,"padding-left")-a.getStyle(p,"padding-right");if("height"===m)return Math.min(p.offsetHeight,p.scrollHeight)-a.getStyle(p,"padding-top")-a.getStyle(p,
"padding-bottom");G.getComputedStyle||a.error(27,!0);if(p=G.getComputedStyle(p,void 0))p=p.getPropertyValue(m),a.pick(g,"opacity"!==m)&&(p=a.pInt(p));return p};a.inArray=function(p,m,g){return(a.indexOfPolyfill||Array.prototype.indexOf).call(m,p,g)};a.grep=function(p,m){return(a.filterPolyfill||Array.prototype.filter).call(p,m)};a.find=Array.prototype.find?function(a,m){return a.find(m)}:function(a,m){var g,v=a.length;for(g=0;g<v;g++)if(m(a[g],g))return a[g]};a.some=function(p,m,g){return(a.somePolyfill||
Array.prototype.some).call(p,m,g)};a.map=function(a,m){for(var g=[],v=0,z=a.length;v<z;v++)g[v]=m.call(a[v],a[v],v,a);return g};a.keys=function(p){return(a.keysPolyfill||Object.keys).call(void 0,p)};a.reduce=function(p,m,g){return(a.reducePolyfill||Array.prototype.reduce).call(p,m,g)};a.offset=function(a){var m=C.documentElement;a=a.parentElement?a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(G.pageYOffset||m.scrollTop)-(m.clientTop||0),left:a.left+(G.pageXOffset||m.scrollLeft)-(m.clientLeft||
0)}};a.stop=function(p,m){for(var g=a.timers.length;g--;)a.timers[g].elem!==p||m&&m!==a.timers[g].prop||(a.timers[g].stopped=!0)};a.each=function(p,m,g){return(a.forEachPolyfill||Array.prototype.forEach).call(p,m,g)};a.objectEach=function(a,m,g){for(var v in a)a.hasOwnProperty(v)&&m.call(g||a[v],a[v],v,a)};a.addEvent=function(p,m,g){var v,z=p.addEventListener||a.addEventListenerPolyfill;v="function"===typeof p&&p.prototype?p.prototype.protoEvents=p.prototype.protoEvents||{}:p.hcEvents=p.hcEvents||
{};z&&z.call(p,m,g,!1);v[m]||(v[m]=[]);v[m].push(g);return function(){a.removeEvent(p,m,g)}};a.removeEvent=function(p,m,g){function v(l,b){var e=p.removeEventListener||a.removeEventListenerPolyfill;e&&e.call(p,l,b,!1)}function z(l){var b,e;p.nodeName&&(m?(b={},b[m]=!0):b=l,a.objectEach(b,function(a,b){if(l[b])for(e=l[b].length;e--;)v(b,l[b][e])}))}var u,y;a.each(["protoEvents","hcEvents"],function(l){var b=p[l];b&&(m?(u=b[m]||[],g?(y=a.inArray(g,u),-1<y&&(u.splice(y,1),b[m]=u),v(m,g)):(z(b),b[m]=
[])):(z(b),p[l]={}))})};a.fireEvent=function(p,m,g,v){var z,u,y,l,b;g=g||{};C.createEvent&&(p.dispatchEvent||p.fireEvent)?(z=C.createEvent("Events"),z.initEvent(m,!0,!0),a.extend(z,g),p.dispatchEvent?p.dispatchEvent(z):p.fireEvent(m,z)):a.each(["protoEvents","hcEvents"],function(e){if(p[e])for(u=p[e][m]||[],y=u.length,g.target||a.extend(g,{preventDefault:function(){g.defaultPrevented=!0},target:p,type:m}),l=0;l<y;l++)(b=u[l])&&!1===b.call(p,g)&&g.preventDefault()});v&&!g.defaultPrevented&&v.call(p,
g)};a.animate=function(p,m,g){var v,z="",u,y,l;a.isObject(g)||(l=arguments,g={duration:l[2],easing:l[3],complete:l[4]});a.isNumber(g.duration)||(g.duration=400);g.easing="function"===typeof g.easing?g.easing:Math[g.easing]||Math.easeInOutSine;g.curAnim=a.merge(m);a.objectEach(m,function(b,e){a.stop(p,e);y=new a.Fx(p,g,e);u=null;"d"===e?(y.paths=y.initPath(p,p.d,m.d),y.toD=m.d,v=0,u=1):p.attr?v=p.attr(e):(v=parseFloat(a.getStyle(p,e))||0,"opacity"!==e&&(z="px"));u||(u=b);u&&u.match&&u.match("px")&&
(u=u.replace(/px/g,""));y.run(v,u,z)})};a.seriesType=function(p,m,g,v,z){var u=a.getOptions(),y=a.seriesTypes;u.plotOptions[p]=a.merge(u.plotOptions[m],g);y[p]=a.extendClass(y[m]||function(){},v);y[p].prototype.type=p;z&&(y[p].prototype.pointClass=a.extendClass(a.Point,z));return y[p]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),m=0;return function(){return"highcharts-"+a+"-"+m++}}();G.jQuery&&(G.jQuery.fn.highcharts=function(){var p=[].slice.call(arguments);if(this[0])return p[0]?
(new (a[a.isString(p[0])?p.shift():"Chart"])(this[0],p[0],p[1]),this):B[a.attr(this[0],"data-highcharts-chart")]})})(L);(function(a){var B=a.each,C=a.isNumber,G=a.map,p=a.merge,m=a.pInt;a.Color=function(g){if(!(this instanceof a.Color))return new a.Color(g);this.init(g)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[m(a[1]),m(a[2]),m(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
parse:function(a){return[m(a[1]),m(a[2]),m(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(g){var m,z,u,y;if((this.input=g=this.names[g&&g.toLowerCase?g.toLowerCase():""]||g)&&g.stops)this.stops=G(g.stops,function(l){return new a.Color(l[1])});else if(g&&g.charAt&&"#"===g.charAt()&&(m=g.length,g=parseInt(g.substr(1),16),7===m?z=[(g&16711680)>>16,(g&65280)>>8,g&255,1]:4===m&&(z=[(g&3840)>>4|(g&3840)>>8,(g&240)>>4|g&240,(g&15)<<4|g&15,1])),!z)for(u=this.parsers.length;u--&&
!z;)y=this.parsers[u],(m=y.regex.exec(g))&&(z=y.parse(m));this.rgba=z||[]},get:function(a){var g=this.input,m=this.rgba,u;this.stops?(u=p(g),u.stops=[].concat(u.stops),B(this.stops,function(g,l){u.stops[l]=[u.stops[l][0],g.get(a)]})):u=m&&C(m[0])?"rgb"===a||!a&&1===m[3]?"rgb("+m[0]+","+m[1]+","+m[2]+")":"a"===a?m[3]:"rgba("+m.join(",")+")":g;return u},brighten:function(a){var g,z=this.rgba;if(this.stops)B(this.stops,function(g){g.brighten(a)});else if(C(a)&&0!==a)for(g=0;3>g;g++)z[g]+=m(255*a),0>
z[g]&&(z[g]=0),255<z[g]&&(z[g]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,m){var g=this.rgba,u=a.rgba;u.length&&g&&g.length?(a=1!==u[3]||1!==g[3],m=(a?"rgba(":"rgb(")+Math.round(u[0]+(g[0]-u[0])*(1-m))+","+Math.round(u[1]+(g[1]-u[1])*(1-m))+","+Math.round(u[2]+(g[2]-u[2])*(1-m))+(a?","+(u[3]+(g[3]-u[3])*(1-m)):"")+")"):m=a.input||"none";return m}};a.color=function(g){return new a.Color(g)}})(L);(function(a){var B,C,G=a.addEvent,p=a.animate,m=a.attr,g=a.charts,
v=a.color,z=a.css,u=a.createElement,y=a.defined,l=a.deg2rad,b=a.destroyObjectProperties,e=a.doc,t=a.each,n=a.extend,f=a.erase,c=a.grep,h=a.hasTouch,w=a.inArray,D=a.isArray,r=a.isFirefox,J=a.isMS,q=a.isObject,F=a.isString,x=a.isWebKit,K=a.merge,d=a.noop,H=a.objectEach,E=a.pick,k=a.pInt,A=a.removeEvent,P=a.stop,R=a.svg,I=a.SVG_NS,Q=a.symbolSizes,N=a.win;B=a.SVGElement=function(){return this};n(B.prototype,{opacity:1,SVG_NS:I,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
init:function(a,k){this.element="span"===k?u(k):e.createElementNS(this.SVG_NS,k);this.renderer=a},animate:function(k,d,A){d=a.animObject(E(d,this.renderer.globalAnimation,!0));0!==d.duration?(A&&(d.complete=A),p(this,k,d)):(this.attr(k,null,A),d.step&&d.step.call(this));return this},complexColor:function(k,d,A){var M=this.renderer,b,f,c,h,I,x,n,r,e,w,E,q=[],l;a.fireEvent(this.renderer,"complexColor",{args:arguments},function(){k.radialGradient?f="radialGradient":k.linearGradient&&(f="linearGradient");
f&&(c=k[f],I=M.gradients,n=k.stops,w=A.radialReference,D(c)&&(k[f]=c={x1:c[0],y1:c[1],x2:c[2],y2:c[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===f&&w&&!y(c.gradientUnits)&&(h=c,c=K(c,M.getRadialAttr(w,h),{gradientUnits:"userSpaceOnUse"})),H(c,function(a,k){"id"!==k&&q.push(k,a)}),H(n,function(a){q.push(a)}),q=q.join(","),I[q]?E=I[q].attr("id"):(c.id=E=a.uniqueKey(),I[q]=x=M.createElement(f).attr(c).add(M.defs),x.radAttr=h,x.stops=[],t(n,function(k){0===k[1].indexOf("rgba")?(b=a.color(k[1]),
r=b.get("rgb"),e=b.get("a")):(r=k[1],e=1);k=M.createElement("stop").attr({offset:k[0],"stop-color":r,"stop-opacity":e}).add(x);x.stops.push(k)})),l="url("+M.url+"#"+E+")",A.setAttribute(d,l),A.gradient=q,k.toString=function(){return l})})},applyTextOutline:function(k){var d=this.element,M,A,b,c,h;-1!==k.indexOf("contrast")&&(k=k.replace(/contrast/g,this.renderer.getContrast(d.style.fill)));k=k.split(" ");A=k[k.length-1];if((b=k[0])&&"none"!==b&&a.svg){this.fakeTS=!0;k=[].slice.call(d.getElementsByTagName("tspan"));
this.ySetter=this.xSetter;b=b.replace(/(^[\d\.]+)(.*?)$/g,function(a,k,d){return 2*k+d});for(h=k.length;h--;)M=k[h],"highcharts-text-outline"===M.getAttribute("class")&&f(k,d.removeChild(M));c=d.firstChild;t(k,function(a,k){0===k&&(a.setAttribute("x",d.getAttribute("x")),k=d.getAttribute("y"),a.setAttribute("y",k||0),null===k&&d.setAttribute("y",0));a=a.cloneNode(1);m(a,{"class":"highcharts-text-outline",fill:A,stroke:A,"stroke-width":b,"stroke-linejoin":"round"});d.insertBefore(a,c)})}},attr:function(a,
k,d,A){var M,b=this.element,f,c=this,h,I;"string"===typeof a&&void 0!==k&&(M=a,a={},a[M]=k);"string"===typeof a?c=(this[a+"Getter"]||this._defaultGetter).call(this,a,b):(H(a,function(k,d){h=!1;A||P(this,d);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(d)&&(f||(this.symbolAttr(a),f=!0),h=!0);!this.rotation||"x"!==d&&"y"!==d||(this.doTransform=!0);h||(I=this[d+"Setter"]||this._defaultSetter,I.call(this,k,d,b),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d)&&
this.updateShadows(d,k,I))},this),this.afterSetters());d&&d.call(this);return c},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,k,d){for(var M=this.shadows,A=M.length;A--;)d.call(M[A],"height"===a?Math.max(k-(M[A].cutHeight||0),0):"d"===a?this.d:k,a,M[A])},addClass:function(a,k){var d=this.attr("class")||"";-1===d.indexOf(a)&&(k||(a=(d+(d?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==
w(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var k=this;t("x y r start end width height innerR anchorX anchorY".split(" "),function(d){k[d]=E(a[d],k[d])});k.attr({d:k.renderer.symbols[k.symbolName](k.x,k.y,k.width,k.height,k)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,k){var d;k=k||a.strokeWidth||0;d=Math.round(k)%2/2;
a.x=Math.floor(a.x||this.x||0)+d;a.y=Math.floor(a.y||this.y||0)+d;a.width=Math.floor((a.width||this.width||0)-2*d);a.height=Math.floor((a.height||this.height||0)-2*d);y(a.strokeWidth)&&(a.strokeWidth=k);return a},css:function(a){var d=this.styles,A={},b=this.element,f,c="",M,h=!d,I=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);d&&H(a,function(a,k){a!==d[k]&&(A[k]=a,h=!0)});h&&(d&&(a=n(d,A)),f=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===b.nodeName.toLowerCase()&&k(a.width),
this.styles=a,f&&!R&&this.renderer.forExport&&delete a.width,b.namespaceURI===this.SVG_NS?(M=function(a,k){return"-"+k.toLowerCase()},H(a,function(a,k){-1===w(k,I)&&(c+=k.replace(/([A-Z])/g,M)+":"+a+";")}),c&&m(b,"style",c)):z(b,a),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,k){var d=this,A=d.element;h&&"click"===a?(A.ontouchstart=
function(a){d.touchEventFired=Date.now();a.preventDefault();k.call(A,a)},A.onclick=function(a){(-1===N.navigator.userAgent.indexOf("Android")||1100<Date.now()-(d.touchEventFired||0))&&k.call(A,a)}):A["on"+a]=k;return this},setRadialReference:function(a){var k=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;k&&k.radAttr&&k.animate(this.renderer.getRadialAttr(a,k.radAttr));return this},translate:function(a,k){return this.attr({translateX:a,translateY:k})},invert:function(a){this.inverted=
a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,k=this.translateY||0,d=this.scaleX,A=this.scaleY,b=this.inverted,f=this.rotation,c=this.matrix,h=this.element;b&&(a+=this.width,k+=this.height);a=["translate("+a+","+k+")"];y(c)&&a.push("matrix("+c.join(",")+")");b?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+E(this.rotationOriginX,h.getAttribute("x"),0)+" "+E(this.rotationOriginY,h.getAttribute("y")||0)+")");(y(d)||y(A))&&a.push("scale("+E(d,1)+
" "+E(A,1)+")");a.length&&h.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,k,d){var A,b,c,h,M={};b=this.renderer;c=b.alignedObjects;var I,x;if(a){if(this.alignOptions=a,this.alignByTranslate=k,!d||F(d))this.alignTo=A=d||"renderer",f(c,this),c.push(this),d=null}else a=this.alignOptions,k=this.alignByTranslate,A=this.alignTo;d=E(d,b[A],b);A=a.align;b=a.verticalAlign;c=(d.x||0)+(a.x||0);h=(d.y||0)+(a.y||0);"right"===
A?I=1:"center"===A&&(I=2);I&&(c+=(d.width-(a.width||0))/I);M[k?"translateX":"x"]=Math.round(c);"bottom"===b?x=1:"middle"===b&&(x=2);x&&(h+=(d.height-(a.height||0))/x);M[k?"translateY":"y"]=Math.round(h);this[this.placed?"animate":"attr"](M);this.placed=!0;this.alignAttr=M;return this},getBBox:function(a,k){var d,A=this.renderer,b,c=this.element,f=this.styles,h,I=this.textStr,M,x=A.cache,r=A.cacheKeys,e;k=E(k,this.rotation);b=k*l;h=f&&f.fontSize;y(I)&&(e=I.toString(),-1===e.indexOf("\x3c")&&(e=e.replace(/[0-9]/g,
"0")),e+=["",k||0,h,this.textWidth,f&&f.textOverflow].join());e&&!a&&(d=x[e]);if(!d){if(c.namespaceURI===this.SVG_NS||A.forExport){try{(M=this.fakeTS&&function(a){t(c.querySelectorAll(".highcharts-text-outline"),function(k){k.style.display=a})})&&M("none"),d=c.getBBox?n({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight},M&&M("")}catch(fa){}if(!d||0>d.width)d={width:0,height:0}}else d=this.htmlGetBBox();A.isSVG&&(a=d.width,A=d.height,f&&"11px"===f.fontSize&&17===Math.round(A)&&(d.height=A=
14),k&&(d.width=Math.abs(A*Math.sin(b))+Math.abs(a*Math.cos(b)),d.height=Math.abs(A*Math.cos(b))+Math.abs(a*Math.sin(b))));if(e&&0<d.height){for(;250<r.length;)delete x[r.shift()];x[e]||r.push(e);x[e]=d}}return d},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var k=this;k.animate({opacity:0},{duration:a||150,complete:function(){k.attr({y:-9999})}})},add:function(a){var k=this.renderer,d=this.element,
A;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&k.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)A=this.zIndexSetter();A||(a?a.element:k.box).appendChild(d);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var k=a.parentNode;k&&k.removeChild(a)},destroy:function(){var a=this,k=a.element||{},d=a.renderer.isSVG&&"SPAN"===k.nodeName&&a.parentGroup,A=k.ownerSVGElement,b=a.clipPath;k.onclick=k.onmouseout=k.onmouseover=k.onmousemove=k.point=
null;P(a);b&&A&&(t(A.querySelectorAll("[clip-path],[CLIP-PATH]"),function(a){var k=a.getAttribute("clip-path"),d=b.element.id;(-1<k.indexOf("(#"+d+")")||-1<k.indexOf('("#'+d+'")'))&&a.removeAttribute("clip-path")}),a.clipPath=b.destroy());if(a.stops){for(A=0;A<a.stops.length;A++)a.stops[A]=a.stops[A].destroy();a.stops=null}a.safeRemoveChild(k);for(a.destroyShadows();d&&d.div&&0===d.div.childNodes.length;)k=d.parentGroup,a.safeRemoveChild(d.div),delete d.div,d=k;a.alignTo&&f(a.renderer.alignedObjects,
a);H(a,function(k,d){delete a[d]});return null},shadow:function(a,k,d){var A=[],b,c,f=this.element,h,I,x,n;if(!a)this.destroyShadows();else if(!this.shadows){I=E(a.width,3);x=(a.opacity||.15)/I;n=this.parentInverted?"(-1,-1)":"("+E(a.offsetX,1)+", "+E(a.offsetY,1)+")";for(b=1;b<=I;b++)c=f.cloneNode(0),h=2*I+1-2*b,m(c,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":x*b,"stroke-width":h,transform:"translate"+n,fill:"none"}),d&&(m(c,"height",Math.max(m(c,"height")-h,0)),c.cutHeight=h),k?
k.element.appendChild(c):f.parentNode&&f.parentNode.insertBefore(c,f),A.push(c);this.shadows=A}return this},destroyShadows:function(){t(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=E(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,
k,d){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[k]!==a&&(d.setAttribute(k,a),this[k]=a)},dashstyleSetter:function(a){var d,A=this["stroke-width"];"inherit"===A&&(A=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(d=a.length;d--;)a[d]=k(a[d])*A;a=a.join(",").replace(/NaN/g,
"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.alignValue=a;this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,k,d){this[k]=a;d.setAttribute(k,a)},titleSetter:function(a){var k=this.element.getElementsByTagName("title")[0];k||(k=e.createElementNS(this.SVG_NS,"title"),this.element.appendChild(k));k.firstChild&&k.removeChild(k.firstChild);k.appendChild(e.createTextNode(String(E(a),"").replace(/<[^>]*>/g,
"").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,k,d){"string"===typeof a?d.setAttribute(k,a):a&&this.complexColor(a,k,d)},visibilitySetter:function(a,k,d){"inherit"===a?d.removeAttribute(k):this[k]!==a&&d.setAttribute(k,a);this[k]=a},zIndexSetter:function(a,d){var A=this.renderer,b=this.parentGroup,c=(b||A).element||A.box,f,h=this.element,I,x,A=c===A.box;
f=this.added;var n;y(a)&&(h.zIndex=a,a=+a,this[d]===a&&(f=!1),this[d]=a);if(f){(a=this.zIndex)&&b&&(b.handleZ=!0);d=c.childNodes;for(n=d.length-1;0<=n&&!I;n--)if(b=d[n],f=b.zIndex,x=!y(f),b!==h)if(0>a&&x&&!A&&!n)c.insertBefore(h,d[n]),I=!0;else if(k(f)<=a||x&&(!y(a)||0<=a))c.insertBefore(h,d[n+1]||null),I=!0;I||(c.insertBefore(h,d[A?3:0]||null),I=!0)}return I},_defaultSetter:function(a,k,d){d.setAttribute(k,a)}});B.prototype.yGetter=B.prototype.xGetter;B.prototype.translateXSetter=B.prototype.translateYSetter=
B.prototype.rotationSetter=B.prototype.verticalAlignSetter=B.prototype.rotationOriginXSetter=B.prototype.rotationOriginYSetter=B.prototype.scaleXSetter=B.prototype.scaleYSetter=B.prototype.matrixSetter=function(a,k){this[k]=a;this.doTransform=!0};B.prototype["stroke-widthSetter"]=B.prototype.strokeSetter=function(a,k,d){this[k]=a;this.stroke&&this["stroke-width"]?(B.prototype.fillSetter.call(this,this.stroke,"stroke",d),d.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===
k&&0===a&&this.hasStroke&&(d.removeAttribute("stroke"),this.hasStroke=!1)};C=a.SVGRenderer=function(){this.init.apply(this,arguments)};n(C.prototype,{Element:B,SVG_NS:I,init:function(a,k,d,A,b,c){var f;A=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(A));f=A.element;a.appendChild(f);m(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&m(f,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=f;this.boxWrapper=A;this.alignedObjects=[];this.url=(r||x)&&e.getElementsByTagName("base").length?
N.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(e.createTextNode("Created with Highstock 6.1.0"));this.defs=this.createElement("defs").add();this.allowHTML=c;this.forExport=b;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(k,d,!1);var h;r&&a.getBoundingClientRect&&(k=function(){z(a,{left:0,top:0});h=a.getBoundingClientRect();z(a,{left:Math.ceil(h.left)-
h.left+"px",top:Math.ceil(h.top)-h.top+"px"})},k(),this.unSubPixelFix=G(N,"resize",k))},getStyle:function(a){return this.style=n({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();b(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());
this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var k=new this.Element;k.init(this,a);return k},draw:d,getRadialAttr:function(a,k){return{cx:a[0]-a[2]/2+k.cx*a[2],cy:a[1]-a[2]/2+k.cy*a[2],r:k.r*a[2]}},getSpanWidth:function(a){return a.getBBox(!0).width},applyEllipsis:function(a,k,d,A){var b=a.rotation,c=d,f,h=0,I=d.length,x=function(a){k.removeChild(k.firstChild);a&&k.appendChild(e.createTextNode(a))},n;a.rotation=0;c=this.getSpanWidth(a,k);if(n=
c>A){for(;h<=I;)f=Math.ceil((h+I)/2),c=d.substring(0,f)+"\u2026",x(c),c=this.getSpanWidth(a,k),h===I?h=I+1:c>A?I=f-1:h=f;0===I&&x("")}a.rotation=b;return n},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot;"},buildText:function(a){var d=a.element,A=this,b=A.forExport,f=E(a.textStr,"").toString(),h=-1!==f.indexOf("\x3c"),x=d.childNodes,n,r=m(d,"x"),q=a.styles,l=a.textWidth,D=q&&q.lineHeight,F=q&&q.textOutline,P=q&&"ellipsis"===q.textOverflow,K=q&&"nowrap"===
q.whiteSpace,M=q&&q.fontSize,J,g,Q=x.length,q=l&&!a.added&&this.box,u=function(a){var b;b=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:M||A.style.fontSize||12;return D?k(D):A.fontMetrics(b,a.getAttribute("style")?a:d).h},y=function(a,k){H(A.escapes,function(d,A){k&&-1!==w(d,k)||(a=a.toString().replace(new RegExp(d,"g"),A))});return a},N=function(a,k){var d;d=a.indexOf("\x3c");a=a.substring(d,a.indexOf("\x3e")-d);d=a.indexOf(k+"\x3d");if(-1!==d&&(d=d+k.length+1,k=a.charAt(d),'"'===k||"'"===
k))return a=a.substring(d+1),a.substring(0,a.indexOf(k))};J=[f,P,K,D,F,M,l].join();if(J!==a.textCache){for(a.textCache=J;Q--;)d.removeChild(x[Q]);h||F||P||l||-1!==f.indexOf(" ")?(q&&q.appendChild(d),f=h?f.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[f],f=c(f,function(a){return""!==a}),t(f,function(k,f){var c,h=0;k=k.replace(/^\s+|\s+$/g,
"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");c=k.split("|||");t(c,function(k){if(""!==k||1===c.length){var x={},q=e.createElementNS(A.SVG_NS,"tspan"),w,E;(w=N(k,"class"))&&m(q,"class",w);if(w=N(k,"style"))w=w.replace(/(;| |^)color([ :])/,"$1fill$2"),m(q,"style",w);(E=N(k,"href"))&&!b&&(m(q,"onclick",'location.href\x3d"'+E+'"'),m(q,"class","highcharts-anchor"),z(q,{cursor:"pointer"}));k=y(k.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==k){q.appendChild(e.createTextNode(k));
h?x.dx=0:f&&null!==r&&(x.x=r);m(q,x);d.appendChild(q);!h&&g&&(!R&&b&&z(q,{display:"block"}),m(q,"dy",u(q)));if(l){x=k.replace(/([^\^])-/g,"$1- ").split(" ");E=1<c.length||f||1<x.length&&!K;var H=[],D,t=u(q),F=a.rotation;for(P&&(n=A.applyEllipsis(a,q,k,l));!P&&E&&(x.length||H.length);)a.rotation=0,D=A.getSpanWidth(a,q),k=D>l,void 0===n&&(n=k),k&&1!==x.length?(q.removeChild(q.firstChild),H.unshift(x.pop())):(x=H,H=[],x.length&&!K&&(q=e.createElementNS(I,"tspan"),m(q,{dy:t,x:r}),w&&m(q,"style",w),d.appendChild(q)),
D>l&&(l=D)),x.length&&q.appendChild(e.createTextNode(x.join(" ").replace(/- /g,"-")));a.rotation=F}h++}}});g=g||d.childNodes.length}),n&&a.attr("title",y(a.textStr,["\x26lt;","\x26gt;"])),q&&q.removeChild(d),F&&a.applyTextOutline&&a.applyTextOutline(F)):d.appendChild(e.createTextNode(y(f)))}},getContrast:function(a){a=v(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,k,d,A,b,f,c,h,x){var I=this.label(a,k,d,x,null,null,null,null,"button"),q=0;I.attr(K({padding:8,r:2},b));var r,
e,w,E;b=K({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},b);r=b.style;delete b.style;f=K(b,{fill:"#e6e6e6"},f);e=f.style;delete f.style;c=K(b,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},c);w=c.style;delete c.style;h=K(b,{style:{color:"#cccccc"}},h);E=h.style;delete h.style;G(I.element,J?"mouseover":"mouseenter",function(){3!==q&&I.setState(1)});G(I.element,J?"mouseout":"mouseleave",function(){3!==q&&I.setState(q)});I.setState=
function(a){1!==a&&(I.state=q=a);I.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);I.attr([b,f,c,h][a||0]).css([r,e,w,E][a||0])};I.attr(b).css(n({cursor:"default"},r));return I.on("click",function(a){3!==q&&A.call(I,a)})},crispLine:function(a,k){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-k%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+k%2/2);return a},path:function(a){var k={fill:"none"};D(a)?k.d=a:q(a)&&n(k,
a);return this.createElement("path").attr(k)},circle:function(a,k,d){a=q(a)?a:{x:a,y:k,r:d};k=this.createElement("circle");k.xSetter=k.ySetter=function(a,k,d){d.setAttribute("c"+k,a)};return k.attr(a)},arc:function(a,k,d,A,b,f){q(a)?(A=a,k=A.y,d=A.r,a=A.x):A={innerR:A,start:b,end:f};a=this.symbol("arc",a,k,d,d,A);a.r=d;return a},rect:function(a,k,d,A,b,f){b=q(a)?a.r:b;var c=this.createElement("rect");a=q(a)?a:void 0===a?{}:{x:a,y:k,width:Math.max(d,0),height:Math.max(A,0)};void 0!==f&&(a.strokeWidth=
f,a=c.crisp(a));a.fill="none";b&&(a.r=b);c.rSetter=function(a,k,d){m(d,{rx:a,ry:a})};return c.attr(a)},setSize:function(a,k,d){var A=this.alignedObjects,b=A.length;this.width=a;this.height=k;for(this.boxWrapper.animate({width:a,height:k},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:E(d,!0)?void 0:0});b--;)A[b].align()},g:function(a){var k=this.createElement("g");return a?k.attr({"class":"highcharts-"+a}):k},image:function(a,k,d,A,b,f){var c={preserveAspectRatio:"none"},
h,I=function(a,k){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink","href",k):a.setAttribute("hc-svg-href",k)};1<arguments.length&&n(c,{x:k,y:d,width:A,height:b});h=this.createElement("image").attr(c);f?(I(h.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),c=new N.Image,G(c,"load",function(k){I(h.element,a);f.call(h,k)}),c.src=a):I(h.element,a);return h},symbol:function(a,k,d,A,b,c){var f=this,h,I=/^url\((.*?)\)$/,x=I.test(a),q=!x&&(this.symbols[a]?
a:"circle"),r=q&&this.symbols[q],w=y(k)&&r&&r.call(this.symbols,Math.round(k),Math.round(d),A,b,c),l,H;r?(h=this.path(w),h.attr("fill","none"),n(h,{symbolName:q,x:k,y:d,width:A,height:b}),c&&n(h,c)):x&&(l=a.match(I)[1],h=this.image(l),h.imgwidth=E(Q[l]&&Q[l].width,c&&c.width),h.imgheight=E(Q[l]&&Q[l].height,c&&c.height),H=function(){h.attr({width:h.width,height:h.height})},t(["width","height"],function(a){h[a+"Setter"]=function(a,k){var d={},A=this["img"+k],b="width"===k?"translateX":"translateY";
this[k]=a;y(A)&&(this.element&&this.element.setAttribute(k,A),this.alignByTranslate||(d[b]=((this[k]||0)-A)/2,this.attr(d)))}}),y(k)&&h.attr({x:k,y:d}),h.isImg=!0,y(h.imgwidth)&&y(h.imgheight)?H():(h.attr({width:0,height:0}),u("img",{onload:function(){var a=g[f.chartIndex];0===this.width&&(z(this,{position:"absolute",top:"-999em"}),e.body.appendChild(this));Q[l]={width:this.width,height:this.height};h.imgwidth=this.width;h.imgheight=this.height;h.element&&H();this.parentNode&&this.parentNode.removeChild(this);
f.imgCount--;if(!f.imgCount&&a&&a.onload)a.onload()},src:l}),this.imgCount++));return h},symbols:{circle:function(a,k,d,A){return this.arc(a+d/2,k+A/2,d/2,A/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,k,d,A){return["M",a,k,"L",a+d,k,a+d,k+A,a,k+A,"Z"]},triangle:function(a,k,d,A){return["M",a+d/2,k,"L",a+d,k+A,a,k+A,"Z"]},"triangle-down":function(a,k,d,A){return["M",a,k,"L",a+d,k,a+d/2,k+A,"Z"]},diamond:function(a,k,d,A){return["M",a+d/2,k,"L",a+d,k+A/2,a+d/2,k+A,a,k+A/2,"Z"]},arc:function(a,
k,d,A,b){var c=b.start,f=b.r||d,h=b.r||A||d,I=b.end-.001;d=b.innerR;A=E(b.open,.001>Math.abs(b.end-b.start-2*Math.PI));var x=Math.cos(c),n=Math.sin(c),q=Math.cos(I),I=Math.sin(I);b=.001>b.end-c-Math.PI?0:1;f=["M",a+f*x,k+h*n,"A",f,h,0,b,1,a+f*q,k+h*I];y(d)&&f.push(A?"M":"L",a+d*q,k+d*I,"A",d,d,0,b,0,a+d*x,k+d*n);f.push(A?"":"Z");return f},callout:function(a,k,d,A,b){var c=Math.min(b&&b.r||0,d,A),f=c+6,h=b&&b.anchorX;b=b&&b.anchorY;var I;I=["M",a+c,k,"L",a+d-c,k,"C",a+d,k,a+d,k,a+d,k+c,"L",a+d,k+A-
c,"C",a+d,k+A,a+d,k+A,a+d-c,k+A,"L",a+c,k+A,"C",a,k+A,a,k+A,a,k+A-c,"L",a,k+c,"C",a,k,a,k,a+c,k];h&&h>d?b>k+f&&b<k+A-f?I.splice(13,3,"L",a+d,b-6,a+d+6,b,a+d,b+6,a+d,k+A-c):I.splice(13,3,"L",a+d,A/2,h,b,a+d,A/2,a+d,k+A-c):h&&0>h?b>k+f&&b<k+A-f?I.splice(33,3,"L",a,b+6,a-6,b,a,b-6,a,k+c):I.splice(33,3,"L",a,A/2,h,b,a,A/2,a,k+c):b&&b>A&&h>a+f&&h<a+d-f?I.splice(23,3,"L",h+6,k+A,h,k+A+6,h-6,k+A,a+c,k+A):b&&0>b&&h>a+f&&h<a+d-f&&I.splice(3,3,"L",h-6,k,h,k-6,h+6,k,d-c,k);return I}},clipRect:function(k,d,A,
b){var c=a.uniqueKey(),f=this.createElement("clipPath").attr({id:c}).add(this.defs);k=this.rect(k,d,A,b,0).add(f);k.id=c;k.clipPath=f;k.count=0;return k},text:function(a,k,d,A){var b={};if(A&&(this.allowHTML||!this.forExport))return this.html(a,k,d);b.x=Math.round(k||0);d&&(b.y=Math.round(d));if(a||0===a)b.text=a;a=this.createElement("text").attr(b);A||(a.xSetter=function(a,k,d){var A=d.getElementsByTagName("tspan"),b,c=d.getAttribute(k),f;for(f=0;f<A.length;f++)b=A[f],b.getAttribute(k)===c&&b.setAttribute(k,
a);d.setAttribute(k,a)});return a},fontMetrics:function(a,d){a=a||d&&d.style&&d.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?k(a):/em/.test(a)?parseFloat(a)*(d?this.fontMetrics(null,d.parentNode).f:16):12;d=24>a?a+3:Math.round(1.2*a);return{h:d,b:Math.round(.8*d),f:a}},rotCorr:function(a,k,d){var A=a;k&&d&&(A=Math.max(A*Math.cos(k*l),4));return{x:-a/3*Math.sin(k*l),y:A}},label:function(k,d,b,c,f,h,I,x,q){var r=this,e=r.g("button"!==q&&"label"),w=e.text=r.text("",0,0,I).attr({zIndex:1}),
E,l,H=0,D=3,F=0,R,P,J,g,Q,m={},u,N,v=/^url\((.*?)\)$/.test(c),z=v,M,p,S,O;q&&e.addClass("highcharts-"+q);z=v;M=function(){return(u||0)%2/2};p=function(){var a=w.element.style,k={};l=(void 0===R||void 0===P||Q)&&y(w.textStr)&&w.getBBox();e.width=(R||l.width||0)+2*D+F;e.height=(P||l.height||0)+2*D;N=D+r.fontMetrics(a&&a.fontSize,w).b;z&&(E||(e.box=E=r.symbols[c]||v?r.symbol(c):r.rect(),E.addClass(("button"===q?"":"highcharts-label-box")+(q?" highcharts-"+q+"-box":"")),E.add(e),a=M(),k.x=a,k.y=(x?-N:
0)+a),k.width=Math.round(e.width),k.height=Math.round(e.height),E.attr(n(k,m)),m={})};S=function(){var a=F+D,k;k=x?0:N;y(R)&&l&&("center"===Q||"right"===Q)&&(a+={center:.5,right:1}[Q]*(R-l.width));if(a!==w.x||k!==w.y)w.attr("x",a),void 0!==k&&w.attr("y",k);w.x=a;w.y=k};O=function(a,k){E?E.attr(a,k):m[a]=k};e.onAdd=function(){w.add(e);e.attr({text:k||0===k?k:"",x:d,y:b});E&&y(f)&&e.attr({anchorX:f,anchorY:h})};e.widthSetter=function(k){R=a.isNumber(k)?k:null};e.heightSetter=function(a){P=a};e["text-alignSetter"]=
function(a){Q=a};e.paddingSetter=function(a){y(a)&&a!==D&&(D=e.padding=a,S())};e.paddingLeftSetter=function(a){y(a)&&a!==F&&(F=a,S())};e.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==H&&(H=a,l&&e.attr({x:J}))};e.textSetter=function(a){void 0!==a&&w.textSetter(a);p();S()};e["stroke-widthSetter"]=function(a,k){a&&(z=!0);u=this["stroke-width"]=a;O(k,a)};e.strokeSetter=e.fillSetter=e.rSetter=function(a,k){"r"!==k&&("fill"===k&&a&&(z=!0),e[k]=a);O(k,a)};e.anchorXSetter=function(a,k){f=e.anchorX=
a;O(k,Math.round(a)-M()-J)};e.anchorYSetter=function(a,k){h=e.anchorY=a;O(k,a-g)};e.xSetter=function(a){e.x=a;H&&(a-=H*((R||l.width)+2*D),e["forceAnimate:x"]=!0);J=Math.round(a);e.attr("translateX",J)};e.ySetter=function(a){g=e.y=Math.round(a);e.attr("translateY",g)};var ea=e.css;return n(e,{css:function(a){if(a){var k={};a=K(a);t(e.textProps,function(d){void 0!==a[d]&&(k[d]=a[d],delete a[d])});w.css(k);"width"in k&&p()}return ea.call(e,a)},getBBox:function(){return{width:l.width+2*D,height:l.height+
2*D,x:l.x-D,y:l.y-D}},shadow:function(a){a&&(p(),E&&E.shadow(a));return e},destroy:function(){A(e.element,"mouseenter");A(e.element,"mouseleave");w&&(w=w.destroy());E&&(E=E.destroy());B.prototype.destroy.call(e);e=r=p=S=O=null}})}});a.Renderer=C})(L);(function(a){var B=a.attr,C=a.createElement,G=a.css,p=a.defined,m=a.each,g=a.extend,v=a.isFirefox,z=a.isMS,u=a.isWebKit,y=a.pick,l=a.pInt,b=a.SVGRenderer,e=a.win,t=a.wrap;g(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===
b.tagName&&a.width)delete a.width,this.textWidth=b,this.htmlUpdateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=g(this.styles,a);G(this.element,a);return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,h=this.translateY||0,e=this.x||0,D=this.y||0,r=this.textAlign||
"left",t={left:0,center:.5,right:1}[r],q=this.styles,F=q&&q.whiteSpace;G(b,{marginLeft:c,marginTop:h});this.shadows&&m(this.shadows,function(a){G(a,{marginLeft:c+1,marginTop:h+1})});this.inverted&&m(b.childNodes,function(d){a.invertChild(d,b)});if("SPAN"===b.tagName){var q=this.rotation,x=this.textWidth&&l(this.textWidth),K=[q,r,b.innerHTML,this.textWidth,this.textAlign].join(),d;(d=x!==this.oldTextWidth)&&!(d=x>this.oldTextWidth)&&((d=this.textPxLength)||(G(b,{width:"",whiteSpace:F||"nowrap"}),d=
b.offsetWidth),d=d>x);d&&/[ \-]/.test(b.textContent||b.innerText)&&(G(b,{width:x+"px",display:"block",whiteSpace:F||"normal"}),this.oldTextWidth=x);K!==this.cTT&&(F=a.fontMetrics(b.style.fontSize).b,p(q)&&q!==(this.oldRotation||0)&&this.setSpanRotation(q,t,F),this.getSpanCorrection(!p(q)&&this.textPxLength||b.offsetWidth,F,t,q,r));G(b,{left:e+(this.xCorr||0)+"px",top:D+(this.yCorr||0)+"px"});this.cTT=K;this.oldRotation=q}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,c){var f={},e=this.renderer.getTransformKey();
f[e]=f.transform="rotate("+a+"deg)";f[e+(v?"Origin":"-origin")]=f.transformOrigin=100*b+"% "+c+"px";G(this.element,f)},getSpanCorrection:function(a,b,c){this.xCorr=-a*c;this.yCorr=-b}});g(b.prototype,{getTransformKey:function(){return z&&!/Edge/.test(e.navigator.userAgent)?"-ms-transform":u?"-webkit-transform":v?"MozTransform":e.opera?"-o-transform":""},html:function(a,b,c){var f=this.createElement("span"),e=f.element,n=f.renderer,r=n.isSVG,l=function(a,b){m(["opacity","visibility"],function(c){t(a,
c+"Setter",function(a,d,c,f){a.call(this,d,c,f);b[c]=d})});a.addedSetters=!0};f.textSetter=function(a){a!==e.innerHTML&&delete this.bBox;this.textStr=a;e.innerHTML=y(a,"");f.doTransform=!0};r&&l(f,f.element.style);f.xSetter=f.ySetter=f.alignSetter=f.rotationSetter=function(a,b){"align"===b&&(b="textAlign");f[b]=a;f.doTransform=!0};f.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};f.attr({text:a,x:Math.round(b),y:Math.round(c)}).css({fontFamily:this.style.fontFamily,
fontSize:this.style.fontSize,position:"absolute"});e.style.whiteSpace="nowrap";f.css=f.htmlCss;r&&(f.add=function(a){var b,c=n.box.parentNode,h=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)h.push(a),a=a.parentGroup;m(h.reverse(),function(a){function d(k,d){a[d]=k;"translateX"===d?x.left=k+"px":x.top=k+"px";a.doTransform=!0}var x,k=B(a.element,"class");k&&(k={className:k});b=a.div=a.div||C("div",k,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,
pointerEvents:a.styles&&a.styles.pointerEvents},b||c);x=b.style;g(a,{classSetter:function(a){return function(k){this.element.setAttribute("class",k);a.className=k}}(b),on:function(){h[0].div&&f.on.apply({element:h[0].div},arguments);return a},translateXSetter:d,translateYSetter:d});a.addedSetters||l(a,x)})}}else b=c;b.appendChild(e);f.added=!0;f.alignOnAdd&&f.htmlUpdateTransform();return f});return f}})})(L);(function(a){var B=a.defined,C=a.each,G=a.extend,p=a.merge,m=a.pick,g=a.timeUnits,v=a.win;
a.Time=function(a){this.update(a,!1)};a.Time.prototype={defaultOptions:{},update:function(g){var u=m(g&&g.useUTC,!0),y=this;this.options=g=p(!0,this.options||{},g);this.Date=g.Date||v.Date;this.timezoneOffset=(this.useUTC=u)&&g.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();(this.variableTimezone=!(u&&!g.getTimezoneOffset&&!g.timezone))||this.timezoneOffset?(this.get=function(a,b){var e=b.getTime(),l=e-y.getTimezoneOffset(b);b.setTime(l);a=b["getUTC"+a]();b.setTime(e);return a},
this.set=function(l,b,e){var t;if(-1!==a.inArray(l,["Milliseconds","Seconds","Minutes"]))b["set"+l](e);else t=y.getTimezoneOffset(b),t=b.getTime()-t,b.setTime(t),b["setUTC"+l](e),l=y.getTimezoneOffset(b),t=b.getTime()+l,b.setTime(t)}):u?(this.get=function(a,b){return b["getUTC"+a]()},this.set=function(a,b,e){return b["setUTC"+a](e)}):(this.get=function(a,b){return b["get"+a]()},this.set=function(a,b,e){return b["set"+a](e)})},makeTime:function(g,u,y,l,b,e){var t,n,f;this.useUTC?(t=this.Date.UTC.apply(0,
arguments),n=this.getTimezoneOffset(t),t+=n,f=this.getTimezoneOffset(t),n!==f?t+=f-n:n-36E5!==this.getTimezoneOffset(t-36E5)||a.isSafari||(t-=36E5)):t=(new this.Date(g,u,m(y,1),m(l,0),m(b,0),m(e,0))).getTime();return t},timezoneOffsetFunction:function(){var g=this,m=this.options,y=v.moment;if(!this.useUTC)return function(a){return 6E4*(new Date(a)).getTimezoneOffset()};if(m.timezone){if(y)return function(a){return 6E4*-y.tz(a,m.timezone).utcOffset()};a.error(25)}return this.useUTC&&m.getTimezoneOffset?
function(a){return 6E4*m.getTimezoneOffset(a)}:function(){return 6E4*(g.timezoneOffset||0)}},dateFormat:function(g,m,y){if(!a.defined(m)||isNaN(m))return a.defaultOptions.lang.invalidDate||"";g=a.pick(g,"%Y-%m-%d %H:%M:%S");var l=this,b=new this.Date(m),e=this.get("Hours",b),t=this.get("Day",b),n=this.get("Date",b),f=this.get("Month",b),c=this.get("FullYear",b),h=a.defaultOptions.lang,w=h.weekdays,D=h.shortWeekdays,r=a.pad,b=a.extend({a:D?D[t]:w[t].substr(0,3),A:w[t],d:r(n),e:r(n,2," "),w:t,b:h.shortMonths[f],
B:h.months[f],m:r(f+1),y:c.toString().substr(2,2),Y:c,H:r(e),k:e,I:r(e%12||12),l:e%12||12,M:r(l.get("Minutes",b)),p:12>e?"AM":"PM",P:12>e?"am":"pm",S:r(b.getSeconds()),L:r(Math.round(m%1E3),3)},a.dateFormats);a.objectEach(b,function(a,b){for(;-1!==g.indexOf("%"+b);)g=g.replace("%"+b,"function"===typeof a?a.call(l,m):a)});return y?g.substr(0,1).toUpperCase()+g.substr(1):g},getTimeTicks:function(a,u,y,l){var b=this,e=[],t={},n,f=new b.Date(u),c=a.unitRange,h=a.count||1,w;if(B(u)){b.set("Milliseconds",
f,c>=g.second?0:h*Math.floor(b.get("Milliseconds",f)/h));c>=g.second&&b.set("Seconds",f,c>=g.minute?0:h*Math.floor(b.get("Seconds",f)/h));c>=g.minute&&b.set("Minutes",f,c>=g.hour?0:h*Math.floor(b.get("Minutes",f)/h));c>=g.hour&&b.set("Hours",f,c>=g.day?0:h*Math.floor(b.get("Hours",f)/h));c>=g.day&&b.set("Date",f,c>=g.month?1:h*Math.floor(b.get("Date",f)/h));c>=g.month&&(b.set("Month",f,c>=g.year?0:h*Math.floor(b.get("Month",f)/h)),n=b.get("FullYear",f));c>=g.year&&b.set("FullYear",f,n-n%h);c===g.week&&
b.set("Date",f,b.get("Date",f)-b.get("Day",f)+m(l,1));n=b.get("FullYear",f);l=b.get("Month",f);var D=b.get("Date",f),r=b.get("Hours",f);u=f.getTime();b.variableTimezone&&(w=y-u>4*g.month||b.getTimezoneOffset(u)!==b.getTimezoneOffset(y));f=f.getTime();for(u=1;f<y;)e.push(f),f=c===g.year?b.makeTime(n+u*h,0):c===g.month?b.makeTime(n,l+u*h):!w||c!==g.day&&c!==g.week?w&&c===g.hour&&1<h?b.makeTime(n,l,D,r+u*h):f+c*h:b.makeTime(n,l,D+u*h*(c===g.day?1:7)),u++;e.push(f);c<=g.hour&&1E4>e.length&&C(e,function(a){0===
a%18E5&&"000000000"===b.dateFormat("%H%M%S%L",a)&&(t[a]="day")})}e.info=G(a,{higherRanks:t,totalRange:c*h});return e}}})(L);(function(a){var B=a.color,C=a.merge;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:a.Time.prototype.defaultOptions,chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},
title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},
itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",
minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:B("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",
fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(B){a.defaultOptions=C(!0,a.defaultOptions,B);a.time.update(C(a.defaultOptions.global,a.defaultOptions.time),!1);return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;
a.time=new a.Time(C(a.defaultOptions.global,a.defaultOptions.time));a.dateFormat=function(C,p,m){return a.time.dateFormat(C,p,m)}})(L);(function(a){var B=a.correctFloat,C=a.defined,G=a.destroyObjectProperties,p=a.fireEvent,m=a.isNumber,g=a.merge,v=a.pick,z=a.deg2rad;a.Tick=function(a,g,l,b){this.axis=a;this.pos=g;this.type=l||"";this.isNewLabel=this.isNew=!0;l||b||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,m=a.options,l=a.chart,b=a.categories,e=a.names,t=this.pos,n=m.labels,
f=a.tickPositions,c=t===f[0],h=t===f[f.length-1],e=b?v(b[t],e[t],t):t,b=this.label,f=f.info,w;a.isDatetimeAxis&&f&&(w=m.dateTimeLabelFormats[f.higherRanks[t]||f.unitName]);this.isFirst=c;this.isLast=h;m=a.labelFormatter.call({axis:a,chart:l,isFirst:c,isLast:h,dateTimeLabelFormat:w,value:a.isLog?B(a.lin2log(e)):e,pos:t});if(C(b))b&&b.attr({text:m});else{if(this.label=b=C(m)&&n.enabled?l.renderer.text(m,0,0,n.useHTML).css(g(n.style)).add(a.labelGroup):null)b.textPxLength=b.getBBox().width;this.rotation=
0}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var g=this.axis,l=g.options.labels,b=a.x,e=g.chart.chartWidth,t=g.chart.spacing,n=v(g.labelLeft,Math.min(g.pos,t[3])),t=v(g.labelRight,Math.max(g.isRadial?0:g.pos+g.len,e-t[1])),f=this.label,c=this.rotation,h={left:0,center:.5,right:1}[g.labelAlign||f.attr("align")],w=f.getBBox().width,D=g.getSlotWidth(),r=D,J=1,q,F={};if(c||!1===l.overflow)0>c&&b-h*w<n?q=Math.round(b/
Math.cos(c*z)-n):0<c&&b+h*w>t&&(q=Math.round((e-b)/Math.cos(c*z)));else if(e=b+(1-h)*w,b-h*w<n?r=a.x+r*(1-h)-n:e>t&&(r=t-a.x+r*h,J=-1),r=Math.min(D,r),r<D&&"center"===g.labelAlign&&(a.x+=J*(D-r-h*(D-Math.min(w,r)))),w>r||g.autoRotation&&(f.styles||{}).width)q=r;q&&(F.width=q,(l.style||{}).textOverflow||(F.textOverflow="ellipsis"),f.css(F))},getPosition:function(g,m,l,b){var e=this.axis,t=e.chart,n=b&&t.oldChartHeight||t.chartHeight;g={x:g?a.correctFloat(e.translate(m+l,null,null,b)+e.transB):e.left+
e.offset+(e.opposite?(b&&t.oldChartWidth||t.chartWidth)-e.right-e.left:0),y:g?n-e.bottom+e.offset-(e.opposite?e.height:0):a.correctFloat(n-e.translate(m+l,null,null,b)-e.transB)};p(this,"afterGetPosition",{pos:g});return g},getLabelPosition:function(a,g,l,b,e,t,n,f){var c=this.axis,h=c.transA,w=c.reversed,D=c.staggerLines,r=c.tickRotCorr||{x:0,y:0},J=e.y,q=b||c.reserveSpaceDefault?0:-c.labelOffset*("center"===c.labelAlign?.5:1),F={};C(J)||(J=0===c.side?l.rotation?-8:-l.getBBox().height:2===c.side?
r.y+8:Math.cos(l.rotation*z)*(r.y-l.getBBox(!1,0).height/2));a=a+e.x+q+r.x-(t&&b?t*h*(w?-1:1):0);g=g+J-(t&&!b?t*h*(w?1:-1):0);D&&(l=n/(f||1)%D,c.opposite&&(l=D-l-1),g+=c.labelOffset/D*l);F.x=a;F.y=Math.round(g);p(this,"afterGetLabelPosition",{pos:F});return F},getMarkPath:function(a,g,l,b,e,t){return t.crispLine(["M",a,g,"L",a+(e?0:-l),g+(e?l:0)],b)},renderGridLine:function(a,g,l){var b=this.axis,e=b.options,t=this.gridLine,n={},f=this.pos,c=this.type,h=b.tickmarkOffset,w=b.chart.renderer,D=c?c+"Grid":
"grid",r=e[D+"LineWidth"],J=e[D+"LineColor"],e=e[D+"LineDashStyle"];t||(n.stroke=J,n["stroke-width"]=r,e&&(n.dashstyle=e),c||(n.zIndex=1),a&&(n.opacity=0),this.gridLine=t=w.path().attr(n).addClass("highcharts-"+(c?c+"-":"")+"grid-line").add(b.gridGroup));if(!a&&t&&(a=b.getPlotLinePath(f+h,t.strokeWidth()*l,a,!0)))t[this.isNew?"attr":"animate"]({d:a,opacity:g})},renderMark:function(a,g,l){var b=this.axis,e=b.options,t=b.chart.renderer,n=this.type,f=n?n+"Tick":"tick",c=b.tickSize(f),h=this.mark,w=!h,
D=a.x;a=a.y;var r=v(e[f+"Width"],!n&&b.isXAxis?1:0),e=e[f+"Color"];c&&(b.opposite&&(c[0]=-c[0]),w&&(this.mark=h=t.path().addClass("highcharts-"+(n?n+"-":"")+"tick").add(b.axisGroup),h.attr({stroke:e,"stroke-width":r})),h[w?"attr":"animate"]({d:this.getMarkPath(D,a,c[0],h.strokeWidth()*l,b.horiz,t),opacity:g}))},renderLabel:function(a,g,l,b){var e=this.axis,t=e.horiz,n=e.options,f=this.label,c=n.labels,h=c.step,e=e.tickmarkOffset,w=!0,D=a.x;a=a.y;f&&m(D)&&(f.xy=a=this.getLabelPosition(D,a,f,t,c,e,
b,h),this.isFirst&&!this.isLast&&!v(n.showFirstLabel,1)||this.isLast&&!this.isFirst&&!v(n.showLastLabel,1)?w=!1:!t||c.step||c.rotation||g||0===l||this.handleOverflow(a),h&&b%h&&(w=!1),w&&m(a.y)?(a.opacity=l,f[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(f.attr("y",-9999),this.isNewLabel=!0))},render:function(g,m,l){var b=this.axis,e=b.horiz,t=this.getPosition(e,this.pos,b.tickmarkOffset,m),n=t.x,f=t.y,b=e&&n===b.pos+b.len||!e&&f===b.pos?-1:1;l=v(l,1);this.isActive=!0;this.renderGridLine(m,
l,b);this.renderMark(t,l,b);this.renderLabel(t,m,l,g);this.isNew=!1;a.fireEvent(this,"afterRender")},destroy:function(){G(this,this.axis)}}})(L);var da=function(a){var B=a.addEvent,C=a.animObject,G=a.arrayMax,p=a.arrayMin,m=a.color,g=a.correctFloat,v=a.defaultOptions,z=a.defined,u=a.deg2rad,y=a.destroyObjectProperties,l=a.each,b=a.extend,e=a.fireEvent,t=a.format,n=a.getMagnitude,f=a.grep,c=a.inArray,h=a.isArray,w=a.isNumber,D=a.isString,r=a.merge,J=a.normalizeTickInterval,q=a.objectEach,F=a.pick,
x=a.removeEvent,K=a.splat,d=a.syncTimeout,H=a.Tick,E=function(){this.init.apply(this,arguments)};a.extend(E.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",
tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,
-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,d){var k=d.isX,b=this;b.chart=a;b.horiz=a.inverted&&!b.isZAxis?!k:k;b.isXAxis=k;b.coll=b.coll||
(k?"xAxis":"yAxis");e(this,"init",{userOptions:d});b.opposite=d.opposite;b.side=d.side||(b.horiz?b.opposite?0:2:b.opposite?1:3);b.setOptions(d);var A=this.options,f=A.type;b.labelFormatter=A.labels.formatter||b.defaultLabelFormatter;b.userOptions=d;b.minPixelPadding=0;b.reversed=A.reversed;b.visible=!1!==A.visible;b.zoomEnabled=!1!==A.zoomEnabled;b.hasNames="category"===f||!0===A.categories;b.categories=A.categories||b.hasNames;b.names||(b.names=[],b.names.keys={});b.plotLinesAndBandsGroups={};b.isLog=
"logarithmic"===f;b.isDatetimeAxis="datetime"===f;b.positiveValuesOnly=b.isLog&&!b.allowNegativeLog;b.isLinked=z(A.linkedTo);b.ticks={};b.labelEdge=[];b.minorTicks={};b.plotLinesAndBands=[];b.alternateBands={};b.len=0;b.minRange=b.userMinRange=A.minRange||A.maxZoom;b.range=A.range;b.offset=A.offset||0;b.stacks={};b.oldStacks={};b.stacksTouched=0;b.max=null;b.min=null;b.crosshair=F(A.crosshair,K(a.options.tooltip.crosshairs)[k?0:1],!1);d=b.options.events;-1===c(b,a.axes)&&(k?a.axes.splice(a.xAxis.length,
0,b):a.axes.push(b),a[b.coll].push(b));b.series=b.series||[];a.inverted&&!b.isZAxis&&k&&void 0===b.reversed&&(b.reversed=!0);q(d,function(a,k){B(b,k,a)});b.lin2log=A.linearToLogConverter||b.lin2log;b.isLog&&(b.val2lin=b.log2lin,b.lin2val=b.lin2log);e(this,"afterInit")},setOptions:function(a){this.options=r(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],
r(v[this.coll],a));e(this,"afterSetOptions",{userOptions:a})},defaultLabelFormatter:function(){var k=this.axis,d=this.value,b=k.chart.time,c=k.categories,f=this.dateTimeLabelFormat,h=v.lang,x=h.numericSymbols,h=h.numericSymbolMagnitude||1E3,e=x&&x.length,r,n=k.options.labels.format,k=k.isLog?Math.abs(d):k.tickInterval;if(n)r=t(n,this,b);else if(c)r=d;else if(f)r=b.dateFormat(f,d);else if(e&&1E3<=k)for(;e--&&void 0===r;)b=Math.pow(h,e+1),k>=b&&0===10*d%b&&null!==x[e]&&0!==d&&(r=a.numberFormat(d/b,
-1)+x[e]);void 0===r&&(r=1E4<=Math.abs(d)?a.numberFormat(d,-1):a.numberFormat(d,-1,void 0,""));return r},getSeriesExtremes:function(){var a=this,d=a.chart;e(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();l(a.series,function(k){if(k.visible||!d.options.chart.ignoreHiddenSeries){var b=k.options,A=b.threshold,c;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=A&&(A=null);if(a.isXAxis)b=k.xData,
b.length&&(k=p(b),c=G(b),w(k)||k instanceof Date||(b=f(b,w),k=p(b),c=G(b)),b.length&&(a.dataMin=Math.min(F(a.dataMin,b[0],k),k),a.dataMax=Math.max(F(a.dataMax,b[0],c),c)));else if(k.getExtremes(),c=k.dataMax,k=k.dataMin,z(k)&&z(c)&&(a.dataMin=Math.min(F(a.dataMin,k),k),a.dataMax=Math.max(F(a.dataMax,c),c)),z(A)&&(a.threshold=A),!b.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})});e(this,"afterGetSeriesExtremes")},translate:function(a,d,b,c,f,h){var k=this.linkedParent||this,A=1,x=0,I=c?
k.oldTransA:k.transA;c=c?k.oldMin:k.min;var e=k.minPixelPadding;f=(k.isOrdinal||k.isBroken||k.isLog&&f)&&k.lin2val;I||(I=k.transA);b&&(A*=-1,x=k.len);k.reversed&&(A*=-1,x-=A*(k.sector||k.len));d?(a=(a*A+x-e)/I+c,f&&(a=k.lin2val(a))):(f&&(a=k.val2lin(a)),a=w(c)?A*(a-c)*I+x+A*e+(w(h)?I*h:0):void 0);return a},toPixels:function(a,d){return this.translate(a,!1,!this.horiz,null,!0)+(d?0:this.pos)},toValue:function(a,d){return this.translate(a-(d?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,
d,b,c,f){var k=this.chart,A=this.left,h=this.top,x,I,e=b&&k.oldChartHeight||k.chartHeight,r=b&&k.oldChartWidth||k.chartWidth,n;x=this.transB;var q=function(a,k,d){if(a<k||a>d)c?a=Math.min(Math.max(k,a),d):n=!0;return a};f=F(f,this.translate(a,null,null,b));f=Math.min(Math.max(-1E5,f),1E5);a=b=Math.round(f+x);x=I=Math.round(e-f-x);w(f)?this.horiz?(x=h,I=e-this.bottom,a=b=q(a,A,A+this.width)):(a=A,b=r-this.right,x=I=q(x,h,h+this.height)):(n=!0,c=!1);return n&&!c?null:k.renderer.crispLine(["M",a,x,"L",
b,I],d||1)},getLinearTickPositions:function(a,d,b){var k,A=g(Math.floor(d/a)*a);b=g(Math.ceil(b/a)*a);var c=[],f;g(A+a)===A&&(f=20);if(this.single)return[d];for(d=A;d<=b;){c.push(d);d=g(d+a,f);if(d===k)break;k=d}return c},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?F(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,d=a.options,b=a.tickPositions,c=a.minorTickInterval,f=[],h=a.pointRangePadding||0,x=a.min-
h,h=a.max+h,e=h-x;if(e&&e/c<a.len/3)if(a.isLog)l(this.paddedTicks,function(k,d,b){d&&f.push.apply(f,a.getLogTickPositions(c,b[d-1],b[d],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())f=f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(c),x,h,d.startOfWeek));else for(d=x+(b[0]-x)%c;d<=h&&d!==f[0];d+=c)f.push(d);0!==f.length&&a.trimTicks(f);return f},adjustForMinRange:function(){var a=this.options,d=this.min,b=this.max,c,f,h,x,e,r,n,q;this.isXAxis&&void 0===this.minRange&&!this.isLog&&
(z(a.min)||z(a.max)?this.minRange=null:(l(this.series,function(a){r=a.xData;for(x=n=a.xIncrement?1:r.length-1;0<x;x--)if(e=r[x]-r[x-1],void 0===h||e<h)h=e}),this.minRange=Math.min(5*h,this.dataMax-this.dataMin)));b-d<this.minRange&&(f=this.dataMax-this.dataMin>=this.minRange,q=this.minRange,c=(q-b+d)/2,c=[d-c,F(a.min,d-c)],f&&(c[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),d=G(c),b=[d+q,F(a.max,d+q)],f&&(b[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),b=p(b),b-d<q&&(c[0]=b-q,c[1]=
F(a.min,b-q),d=G(c)));this.min=d;this.max=b},getClosest:function(){var a;this.categories?a=1:l(this.series,function(k){var d=k.closestPointRange,b=k.visible||!k.chart.options.chart.ignoreHiddenSeries;!k.noSharedTooltip&&z(d)&&b&&(a=z(a)?Math.min(a,d):d)});return a},nameToX:function(a){var k=h(this.categories),d=k?this.categories:this.names,b=a.options.x,f;a.series.requireSorting=!1;z(b)||(b=!1===this.options.uniqueNames?a.series.autoIncrement():k?c(a.name,d):F(d.keys[a.name],-1));-1===b?k||(f=d.length):
f=b;void 0!==f&&(this.names[f]=a.name,this.names.keys[a.name]=f);return f},updateNames:function(){var k=this,d=this.names;0<d.length&&(l(a.keys(d.keys),function(a){delete d.keys[a]}),d.length=0,this.minRange=this.userMinRange,l(this.series||[],function(a){a.xIncrement=null;if(!a.points||a.isDirtyData)a.processData(),a.generatePoints();l(a.points,function(d,b){var c;d.options&&(c=k.nameToX(d),void 0!==c&&c!==d.x&&(d.x=c,a.xData[b]=c))})}))},setAxisTranslation:function(a){var k=this,d=k.max-k.min,b=
k.axisPointRange||0,c,f=0,h=0,x=k.linkedParent,r=!!k.categories,n=k.transA,q=k.isXAxis;if(q||r||b)c=k.getClosest(),x?(f=x.minPointOffset,h=x.pointRangePadding):l(k.series,function(a){var d=r?1:q?F(a.options.pointRange,c,0):k.axisPointRange||0;a=a.options.pointPlacement;b=Math.max(b,d);k.single||(f=Math.max(f,D(a)?0:d/2),h=Math.max(h,"on"===a?0:d))}),x=k.ordinalSlope&&c?k.ordinalSlope/c:1,k.minPointOffset=f*=x,k.pointRangePadding=h*=x,k.pointRange=Math.min(b,d),q&&(k.closestPointRange=c);a&&(k.oldTransA=
n);k.translationSlope=k.transA=n=k.options.staticScale||k.len/(d+h||1);k.transB=k.horiz?k.left:k.bottom;k.minPixelPadding=n*f;e(this,"afterSetAxisTranslation")},minFromRange:function(){return this.max-this.range},setTickInterval:function(k){var d=this,b=d.chart,c=d.options,f=d.isLog,h=d.isDatetimeAxis,x=d.isXAxis,r=d.isLinked,q=c.maxPadding,E=c.minPadding,D=c.tickInterval,H=c.tickPixelInterval,t=d.categories,K=w(d.threshold)?d.threshold:null,m=d.softThreshold,y,v,u,p;h||t||r||this.getTickAmount();
u=F(d.userMin,c.min);p=F(d.userMax,c.max);r?(d.linkedParent=b[d.coll][c.linkedTo],b=d.linkedParent.getExtremes(),d.min=F(b.min,b.dataMin),d.max=F(b.max,b.dataMax),c.type!==d.linkedParent.options.type&&a.error(11,1)):(!m&&z(K)&&(d.dataMin>=K?(y=K,E=0):d.dataMax<=K&&(v=K,q=0)),d.min=F(u,y,d.dataMin),d.max=F(p,v,d.dataMax));f&&(d.positiveValuesOnly&&!k&&0>=Math.min(d.min,F(d.dataMin,d.min))&&a.error(10,1),d.min=g(d.log2lin(d.min),15),d.max=g(d.log2lin(d.max),15));d.range&&z(d.max)&&(d.userMin=d.min=
u=Math.max(d.dataMin,d.minFromRange()),d.userMax=p=d.max,d.range=null);e(d,"foundExtremes");d.beforePadding&&d.beforePadding();d.adjustForMinRange();!(t||d.axisPointRange||d.usePercentage||r)&&z(d.min)&&z(d.max)&&(b=d.max-d.min)&&(!z(u)&&E&&(d.min-=b*E),!z(p)&&q&&(d.max+=b*q));w(c.softMin)&&!w(d.userMin)&&(d.min=Math.min(d.min,c.softMin));w(c.softMax)&&!w(d.userMax)&&(d.max=Math.max(d.max,c.softMax));w(c.floor)&&(d.min=Math.max(d.min,c.floor));w(c.ceiling)&&(d.max=Math.min(d.max,c.ceiling));m&&z(d.dataMin)&&
(K=K||0,!z(u)&&d.min<K&&d.dataMin>=K?d.min=K:!z(p)&&d.max>K&&d.dataMax<=K&&(d.max=K));d.tickInterval=d.min===d.max||void 0===d.min||void 0===d.max?1:r&&!D&&H===d.linkedParent.options.tickPixelInterval?D=d.linkedParent.tickInterval:F(D,this.tickAmount?(d.max-d.min)/Math.max(this.tickAmount-1,1):void 0,t?1:(d.max-d.min)*H/Math.max(d.len,H));x&&!k&&l(d.series,function(a){a.processData(d.min!==d.oldMin||d.max!==d.oldMax)});d.setAxisTranslation(!0);d.beforeSetTickPositions&&d.beforeSetTickPositions();
d.postProcessTickInterval&&(d.tickInterval=d.postProcessTickInterval(d.tickInterval));d.pointRange&&!D&&(d.tickInterval=Math.max(d.pointRange,d.tickInterval));k=F(c.minTickInterval,d.isDatetimeAxis&&d.closestPointRange);!D&&d.tickInterval<k&&(d.tickInterval=k);h||f||D||(d.tickInterval=J(d.tickInterval,null,n(d.tickInterval),F(c.allowDecimals,!(.5<d.tickInterval&&5>d.tickInterval&&1E3<d.max&&9999>d.max)),!!this.tickAmount));this.tickAmount||(d.tickInterval=d.unsquish());this.setTickPositions()},setTickPositions:function(){var a=
this.options,d,b=a.tickPositions;d=this.getMinorTickInterval();var c=a.tickPositioner,f=a.startOnTick,h=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===d&&this.tickInterval?this.tickInterval/5:d;this.single=this.min===this.max&&z(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=d=b&&b.slice();!d&&(d=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),d.length>this.len&&(d=[d[0],d.pop()],d[0]===d[1]&&(d.length=1)),this.tickPositions=d,c&&(c=c.apply(this,[this.min,this.max])))&&(this.tickPositions=d=c);this.paddedTicks=d.slice(0);this.trimTicks(d,f,h);this.isLinked||(this.single&&2>d.length&&(this.min-=.5,this.max+=.5),b||
c||this.adjustTickAmount());e(this,"afterSetTickPositions")},trimTicks:function(a,d,b){var k=a[0],c=a[a.length-1],f=this.minPointOffset||0;if(!this.isLinked){if(d&&-Infinity!==k)this.min=k;else for(;this.min-f>a[0];)a.shift();if(b)this.max=c;else for(;this.max+f<a[a.length-1];)a.pop();0===a.length&&z(k)&&!this.options.tickPositions&&a.push((c+k)/2)}},alignToOthers:function(){var a={},d,b=this.options;!1===this.chart.options.chart.alignTicks||!1===b.alignTicks||!1===b.startOnTick||!1===b.endOnTick||
this.isLog||l(this.chart[this.coll],function(k){var b=k.options,b=[k.horiz?b.left:b.top,b.width,b.height,b.pane].join();k.series.length&&(a[b]?d=!0:a[b]=1)});return d},getTickAmount:function(){var a=this.options,d=a.tickAmount,b=a.tickPixelInterval;!z(a.tickInterval)&&this.len<b&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(d=2);!d&&this.alignToOthers()&&(d=Math.ceil(this.len/b)+1);4>d&&(this.finalTickAmt=d,d=5);this.tickAmount=d},adjustTickAmount:function(){var a=this.tickInterval,d=
this.tickPositions,b=this.tickAmount,c=this.finalTickAmt,f=d&&d.length,h=F(this.threshold,this.softThreshold?0:null);if(this.hasData()){if(f<b){for(;d.length<b;)d.length%2||this.min===h?d.push(g(d[d.length-1]+a)):d.unshift(g(d[0]-a));this.transA*=(f-1)/(b-1);this.min=d[0];this.max=d[d.length-1]}else f>b&&(this.tickInterval*=2,this.setTickPositions());if(z(c)){for(a=b=d.length;a--;)(3===c&&1===a%2||2>=c&&0<a&&a<b-1)&&d.splice(a,1);this.finalTickAmt=void 0}}},setScale:function(){var a,d;this.oldMin=
this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();d=this.len!==this.oldAxisLength;l(this.series,function(d){if(d.isDirtyData||d.isDirty||d.xAxis.isDirty)a=!0});d||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=
d||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();e(this,"afterSetScale")},setExtremes:function(a,d,c,f,h){var k=this,x=k.chart;c=F(c,!0);l(k.series,function(a){delete a.kdTree});h=b(h,{min:a,max:d});e(k,"setExtremes",h,function(){k.userMin=a;k.userMax=d;k.eventArgs=h;c&&x.redraw(f)})},zoom:function(a,d){var k=this.dataMin,b=this.dataMax,c=this.options,f=Math.min(k,F(c.min,k)),c=Math.max(b,F(c.max,b));if(a!==this.min||d!==this.max)this.allowZoomOutside||(z(k)&&
(a<f&&(a=f),a>c&&(a=c)),z(b)&&(d<f&&(d=f),d>c&&(d=c))),this.displayBtn=void 0!==a||void 0!==d,this.setExtremes(a,d,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var d=this.chart,b=this.options,c=b.offsets||[0,0,0,0],f=this.horiz,h=this.width=Math.round(a.relativeLength(F(b.width,d.plotWidth-c[3]+c[1]),d.plotWidth)),x=this.height=Math.round(a.relativeLength(F(b.height,d.plotHeight-c[0]+c[2]),d.plotHeight)),e=this.top=Math.round(a.relativeLength(F(b.top,d.plotTop+c[0]),d.plotHeight,d.plotTop)),
b=this.left=Math.round(a.relativeLength(F(b.left,d.plotLeft+c[3]),d.plotWidth,d.plotLeft));this.bottom=d.chartHeight-x-e;this.right=d.chartWidth-h-b;this.len=Math.max(f?h:x,0);this.pos=f?b:e},getExtremes:function(){var a=this.isLog;return{min:a?g(this.lin2log(this.min)):this.min,max:a?g(this.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var d=this.isLog,k=d?this.lin2log(this.min):this.min,d=d?this.lin2log(this.max):
this.max;null===a||-Infinity===a?a=k:Infinity===a?a=d:k>a?a=k:d<a&&(a=d);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(F(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var d=this.options,k=d[a+"Length"],b=F(d[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(b&&k)return"inside"===d[a+"Position"]&&(k=-k),[k,b]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&
this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,d=this.horiz,b=this.tickInterval,c=b,f=this.len/(((this.categories?1:0)+this.max-this.min)/b),h,x=a.rotation,e=this.labelMetrics(),r,q=Number.MAX_VALUE,n,w=function(a){a/=f||1;a=1<a?Math.ceil(a):1;return g(a*b)};d?(n=!a.staggerLines&&!a.step&&(z(x)?[x]:f<F(a.autoRotationLimit,80)&&a.autoRotation))&&l(n,function(a){var d;if(a===x||a&&-90<=a&&90>=a)r=w(Math.abs(e.h/Math.sin(u*a))),d=
r+Math.abs(a/360),d<q&&(q=d,h=a,c=r)}):a.step||(c=w(e.h));this.autoRotation=n;this.labelRotation=F(h,x);return c},getSlotWidth:function(){var a=this.chart,d=this.horiz,b=this.options.labels,c=Math.max(this.tickPositions.length-(this.categories?0:1),1),f=a.margin[3];return d&&2>(b.step||0)&&!b.rotation&&(this.staggerLines||1)*this.len/c||!d&&(b.style&&parseInt(b.style.width,10)||f&&f-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,d=a.renderer,b=this.tickPositions,c=this.ticks,
f=this.options.labels,h=this.horiz,x=this.getSlotWidth(),e=Math.max(1,Math.round(x-2*(f.padding||5))),r={},q=this.labelMetrics(),n=f.style&&f.style.textOverflow,w,E,H=0,t;D(f.rotation)||(r.rotation=f.rotation||0);l(b,function(a){(a=c[a])&&a.label&&a.label.textPxLength>H&&(H=a.label.textPxLength)});this.maxLabelLength=H;if(this.autoRotation)H>e&&H>q.h?r.rotation=this.labelRotation:this.labelRotation=0;else if(x&&(w=e,!n))for(E="clip",e=b.length;!h&&e--;)if(t=b[e],t=c[t].label)t.styles&&"ellipsis"===
t.styles.textOverflow?t.css({textOverflow:"clip"}):t.textPxLength>x&&t.css({width:x+"px"}),t.getBBox().height>this.len/b.length-(q.h-q.f)&&(t.specificTextOverflow="ellipsis");r.rotation&&(w=H>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight,n||(E="ellipsis"));if(this.labelAlign=f.align||this.autoLabelAlign(this.labelRotation))r.align=this.labelAlign;l(b,function(a){var d=(a=c[a])&&a.label,b={};d&&(d.attr(r),!w||f.style&&f.style.width||!(w<d.textPxLength||"SPAN"===d.element.tagName)||(b.width=w,n||
(b.textOverflow=d.specificTextOverflow||E),d.css(b)),delete d.specificTextOverflow,a.rotation=r.rotation)});this.tickRotCorr=d.rotCorr(q.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||z(this.min)&&z(this.max)&&this.tickPositions&&0<this.tickPositions.length},addTitle:function(a){var d=this.chart.renderer,b=this.horiz,k=this.opposite,c=this.options.title,f;this.axisTitle||((f=c.textAlign)||(f=(b?{low:"left",middle:"center",high:"right"}:{low:k?"right":"left",
middle:"center",high:k?"left":"right"})[c.align]),this.axisTitle=d.text(c.text,0,0,c.useHTML).attr({zIndex:7,rotation:c.rotation||0,align:f}).addClass("highcharts-axis-title").css(r(c.style)).add(this.axisGroup),this.axisTitle.isNew=!0);c.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var d=this.ticks;d[a]?d[a].addLabel():d[a]=new H(this,a)},getOffset:function(){var a=this,d=a.chart,b=d.renderer,c=a.options,f=a.tickPositions,
h=a.ticks,x=a.horiz,e=a.side,r=d.inverted&&!a.isZAxis?[1,0,3,2][e]:e,n,w,E=0,D,H=0,t=c.title,K=c.labels,g=0,J=d.axisOffset,d=d.clipOffset,m=[-1,1,1,-1][e],y=c.className,v=a.axisParent,u=this.tickSize("tick");n=a.hasData();a.showAxis=w=n||F(c.showEmpty,!0);a.staggerLines=a.horiz&&K.staggerLines;a.axisGroup||(a.gridGroup=b.g("grid").attr({zIndex:c.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(y||"")).add(v),a.axisGroup=b.g("axis").attr({zIndex:c.zIndex||2}).addClass("highcharts-"+
this.coll.toLowerCase()+" "+(y||"")).add(v),a.labelGroup=b.g("axis-labels").attr({zIndex:K.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(y||"")).add(v));n||a.isLinked?(l(f,function(d,b){a.generateTick(d,b)}),a.renderUnsquish(),a.reserveSpaceDefault=0===e||2===e||{1:"left",3:"right"}[e]===a.labelAlign,F(K.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&l(f,function(a){g=Math.max(h[a].getLabelSize(),g)}),a.staggerLines&&(g*=a.staggerLines),a.labelOffset=g*
(a.opposite?-1:1)):q(h,function(a,d){a.destroy();delete h[d]});t&&t.text&&!1!==t.enabled&&(a.addTitle(w),w&&!1!==t.reserveSpace&&(a.titleOffset=E=a.axisTitle.getBBox()[x?"height":"width"],D=t.offset,H=z(D)?0:F(t.margin,x?5:10)));a.renderLine();a.offset=m*F(c.offset,J[e]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};b=0===e?-a.labelMetrics().h:2===e?a.tickRotCorr.y:0;H=Math.abs(g)+H;g&&(H=H-b+m*(x?F(K.y,a.tickRotCorr.y+8*m):K.x));a.axisTitleMargin=F(D,H);J[e]=Math.max(J[e],a.axisTitleMargin+E+m*a.offset,
H,n&&f.length&&u?u[0]+m*a.offset:0);c=c.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);d[r]=Math.max(d[r],c)},getLinePath:function(a){var d=this.chart,b=this.opposite,k=this.offset,c=this.horiz,f=this.left+(b?this.width:0)+k,k=d.chartHeight-this.bottom-(b?this.height:0)+k;b&&(a*=-1);return d.renderer.crispLine(["M",c?this.left:f,c?k:this.top,"L",c?d.chartWidth-this.right:f,c?k:d.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,d=this.left,b=this.top,c=this.len,f=this.options.title,h=a?d:b,x=this.opposite,e=this.offset,r=f.x||0,n=f.y||0,q=this.axisTitle,w=this.chart.renderer.fontMetrics(f.style&&f.style.fontSize,q),q=Math.max(q.getBBox(null,0).height-w.h-1,0),c={low:h+(a?0:c),middle:h+c/2,high:h+(a?c:0)}[f.align],d=(a?b+this.height:d)+(a?1:-1)*(x?-1:1)*this.axisTitleMargin+[-q,
q,w.f,-q][this.side];return{x:a?c+r:d+(x?this.width:0)+e+r,y:a?d+n-(x?this.height:0)+e:c+n}},renderMinorTick:function(a){var d=this.chart.hasRendered&&w(this.oldMin),b=this.minorTicks;b[a]||(b[a]=new H(this,a,"minor"));d&&b[a].isNew&&b[a].render(null,!0);b[a].render(null,!1,1)},renderTick:function(a,d){var b=this.isLinked,k=this.ticks,c=this.chart.hasRendered&&w(this.oldMin);if(!b||a>=this.min&&a<=this.max)k[a]||(k[a]=new H(this,a)),c&&k[a].isNew&&k[a].render(d,!0,.1),k[a].render(d)},render:function(){var b=
this,c=b.chart,f=b.options,h=b.isLog,x=b.isLinked,r=b.tickPositions,n=b.axisTitle,E=b.ticks,D=b.minorTicks,t=b.alternateBands,K=f.stackLabels,F=f.alternateGridColor,g=b.tickmarkOffset,J=b.axisLine,m=b.showAxis,y=C(c.renderer.globalAnimation),v,u;b.labelEdge.length=0;b.overlap=!1;l([E,D,t],function(a){q(a,function(a){a.isActive=!1})});if(b.hasData()||x)b.minorTickInterval&&!b.categories&&l(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),r.length&&(l(r,function(a,d){b.renderTick(a,d)}),
g&&(0===b.min||b.single)&&(E[-1]||(E[-1]=new H(b,-1,null,!0)),E[-1].render(-1))),F&&l(r,function(d,k){u=void 0!==r[k+1]?r[k+1]+g:b.max-g;0===k%2&&d<b.max&&u<=b.max+(c.polar?-g:g)&&(t[d]||(t[d]=new a.PlotLineOrBand(b)),v=d+g,t[d].options={from:h?b.lin2log(v):v,to:h?b.lin2log(u):u,color:F},t[d].render(),t[d].isActive=!0)}),b._addedPlotLB||(l((f.plotLines||[]).concat(f.plotBands||[]),function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);l([E,D,t],function(a){var b,k=[],f=y.duration;q(a,function(a,
d){a.isActive||(a.render(d,!1,0),a.isActive=!1,k.push(d))});d(function(){for(b=k.length;b--;)a[k[b]]&&!a[k[b]].isActive&&(a[k[b]].destroy(),delete a[k[b]])},a!==t&&c.hasRendered&&f?f:0)});J&&(J[J.isPlaced?"animate":"attr"]({d:this.getLinePath(J.strokeWidth())}),J.isPlaced=!0,J[m?"show":"hide"](!0));n&&m&&(f=b.getTitlePosition(),w(f.y)?(n[n.isNew?"attr":"animate"](f),n.isNew=!1):(n.attr("y",-9999),n.isNew=!0));K&&K.enabled&&b.renderStackTotals();b.isDirty=!1;e(this,"afterRender")},redraw:function(){this.visible&&
(this.render(),l(this.plotLinesAndBands,function(a){a.render()}));l(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var d=this,b=d.stacks,k=d.plotLinesAndBands,f;e(this,"destroy",{keepEvents:a});a||x(d);q(b,function(a,d){y(a);b[d]=null});l([d.ticks,d.minorTicks,d.alternateBands],function(a){y(a)});if(k)for(a=k.length;a--;)k[a].destroy();l("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
function(a){d[a]&&(d[a]=d[a].destroy())});for(f in d.plotLinesAndBandsGroups)d.plotLinesAndBandsGroups[f]=d.plotLinesAndBandsGroups[f].destroy();q(d,function(a,b){-1===c(b,d.keepProps)&&delete d[b]})},drawCrosshair:function(a,d){var b,c=this.crosshair,k=F(c.snap,!0),f,h=this.cross;e(this,"drawCrosshair",{e:a,point:d});a||(a=this.cross&&this.cross.e);if(this.crosshair&&!1!==(z(d)||!k)){k?z(d)&&(f=F(d.crosshairPos,this.isXAxis?d.plotX:this.len-d.plotY)):f=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+
this.pos);z(f)&&(b=this.getPlotLinePath(d&&(this.isXAxis?d.x:F(d.stackY,d.y)),null,null,null,f)||null);if(!z(b)){this.hideCrosshair();return}k=this.categories&&!this.isRadial;h||(this.cross=h=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(k?"category ":"thin ")+c.className).attr({zIndex:F(c.zIndex,2)}).add(),h.attr({stroke:c.color||(k?m("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":F(c.width,1)}).css({"pointer-events":"none"}),c.dashStyle&&h.attr({dashstyle:c.dashStyle}));
h.show().attr({d:b});k&&!c.width&&h.attr({"stroke-width":this.transA});this.cross.e=a}else this.hideCrosshair();e(this,"afterDrawCrosshair",{e:a,point:d})},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=E}(L);(function(a){var B=a.Axis,C=a.getMagnitude,G=a.normalizeTickInterval,p=a.timeUnits;B.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};B.prototype.normalizeTimeTickInterval=function(a,g){var m=g||[["millisecond",[1,
2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];g=m[m.length-1];var z=p[g[0]],u=g[1],y;for(y=0;y<m.length&&!(g=m[y],z=p[g[0]],u=g[1],m[y+1]&&a<=(z*u[u.length-1]+p[m[y+1][0]])/2);y++);z===p.year&&a<5*z&&(u=[1,2,5]);a=G(a/z,u,"year"===g[0]?Math.max(C(a/z),1):1);return{unitRange:z,count:a,unitName:g[0]}}})(L);(function(a){var B=a.Axis,C=a.getMagnitude,G=a.map,p=a.normalizeTickInterval,
m=a.pick;B.prototype.getLogTickPositions=function(a,v,z,u){var g=this.options,l=this.len,b=[];u||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),b=this.getLinearTickPositions(a,v,z);else if(.08<=a)for(var l=Math.floor(v),e,t,n,f,c,g=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];l<z+1&&!c;l++)for(t=g.length,e=0;e<t&&!c;e++)n=this.log2lin(this.lin2log(l)*g[e]),n>v&&(!u||f<=z)&&void 0!==f&&b.push(f),f>z&&(c=!0),f=n;else v=this.lin2log(v),z=this.lin2log(z),a=u?this.getMinorTickInterval():
g.tickInterval,a=m("auto"===a?null:a,this._minorAutoInterval,g.tickPixelInterval/(u?5:1)*(z-v)/((u?l/this.tickPositions.length:l)||1)),a=p(a,null,C(a)),b=G(this.getLinearTickPositions(a,v,z),this.log2lin),u||(this._minorAutoInterval=a/5);u||(this.tickInterval=a);return b};B.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};B.prototype.lin2log=function(a){return Math.pow(10,a)}})(L);(function(a,B){var C=a.arrayMax,G=a.arrayMin,p=a.defined,m=a.destroyObjectProperties,g=a.each,v=a.erase,z=
a.merge,u=a.pick;a.PlotLineOrBand=function(a,l){this.axis=a;l&&(this.options=l,this.id=l.id)};a.PlotLineOrBand.prototype={render:function(){var g=this,l=g.axis,b=l.horiz,e=g.options,t=e.label,n=g.label,f=e.to,c=e.from,h=e.value,w=p(c)&&p(f),D=p(h),r=g.svgElem,J=!r,q=[],F=e.color,x=u(e.zIndex,0),K=e.events,q={"class":"highcharts-plot-"+(w?"band ":"line ")+(e.className||"")},d={},H=l.chart.renderer,E=w?"bands":"lines";l.isLog&&(c=l.log2lin(c),f=l.log2lin(f),h=l.log2lin(h));D?(q={stroke:F,"stroke-width":e.width},
e.dashStyle&&(q.dashstyle=e.dashStyle)):w&&(F&&(q.fill=F),e.borderWidth&&(q.stroke=e.borderColor,q["stroke-width"]=e.borderWidth));d.zIndex=x;E+="-"+x;(F=l.plotLinesAndBandsGroups[E])||(l.plotLinesAndBandsGroups[E]=F=H.g("plot-"+E).attr(d).add());J&&(g.svgElem=r=H.path().attr(q).add(F));if(D)q=l.getPlotLinePath(h,r.strokeWidth());else if(w)q=l.getPlotBandPath(c,f,e);else return;J&&q&&q.length?(r.attr({d:q}),K&&a.objectEach(K,function(a,d){r.on(d,function(a){K[d].apply(g,[a])})})):r&&(q?(r.show(),
r.animate({d:q})):(r.hide(),n&&(g.label=n=n.destroy())));t&&p(t.text)&&q&&q.length&&0<l.width&&0<l.height&&!q.flat?(t=z({align:b&&w&&"center",x:b?!w&&4:10,verticalAlign:!b&&w&&"middle",y:b?w?16:10:w?6:-4,rotation:b&&!w&&90},t),this.renderLabel(t,q,w,x)):n&&n.hide();return g},renderLabel:function(a,l,b,e){var t=this.label,n=this.axis.chart.renderer;t||(t={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(b?"band":"line")+"-label "+(a.className||"")},t.zIndex=e,this.label=t=
n.text(a.text,0,0,a.useHTML).attr(t).add(),t.css(a.style));e=l.xBounds||[l[1],l[4],b?l[6]:l[1]];l=l.yBounds||[l[2],l[5],b?l[7]:l[2]];b=G(e);n=G(l);t.align(a,!1,{x:b,y:n,width:C(e)-b,height:C(l)-n});t.show()},destroy:function(){v(this.axis.plotLinesAndBands,this);delete this.axis;m(this)}};a.extend(B.prototype,{getPlotBandPath:function(a,l){var b=this.getPlotLinePath(l,null,null,!0),e=this.getPlotLinePath(a,null,null,!0),t=[],n=this.horiz,f=1,c;a=a<this.min&&l<this.min||a>this.max&&l>this.max;if(e&&
b)for(a&&(c=e.toString()===b.toString(),f=0),a=0;a<e.length;a+=6)n&&b[a+1]===e[a+1]?(b[a+1]+=f,b[a+4]+=f):n||b[a+2]!==e[a+2]||(b[a+2]+=f,b[a+5]+=f),t.push("M",e[a+1],e[a+2],"L",e[a+4],e[a+5],b[a+4],b[a+5],b[a+1],b[a+2],"z"),t.flat=c;return t},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(g,l){var b=(new a.PlotLineOrBand(this,g)).render(),e=this.userOptions;b&&(l&&(e[l]=e[l]||[],
e[l].push(g)),this.plotLinesAndBands.push(b));return b},removePlotBandOrLine:function(a){for(var l=this.plotLinesAndBands,b=this.options,e=this.userOptions,t=l.length;t--;)l[t].id===a&&l[t].destroy();g([b.plotLines||[],e.plotLines||[],b.plotBands||[],e.plotBands||[]],function(b){for(t=b.length;t--;)b[t].id===a&&v(b,b[t])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(L,da);(function(a){var B=a.each,C=a.extend,G=a.format,p=a.isNumber,
m=a.map,g=a.merge,v=a.pick,z=a.splat,u=a.syncTimeout,y=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,b){this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=b.split&&!a.inverted;this.shared=b.shared||this.split},cleanSplit:function(a){B(this.chart.series,function(b){var e=b&&b.tt;e&&(!e.isActive||a?b.tt=e.destroy():e.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,b=this.options;this.label||
(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,b.shape||"callout",null,null,b.useHTML,null,"tooltip").attr({padding:b.padding,r:b.borderRadius}),this.label.attr({fill:b.backgroundColor,"stroke-width":b.borderWidth}).css(b.style).shadow(b.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();g(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,g(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());
this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());a.clearTimeout(this.hideTimer);a.clearTimeout(this.tooltipTimeout)},move:function(l,b,e,t){var n=this,f=n.now,c=!1!==n.options.animation&&!n.isHidden&&(1<Math.abs(l-f.x)||1<Math.abs(b-f.y)),h=n.followPointer||1<n.len;C(f,{x:c?(2*f.x+l)/3:l,y:c?(f.y+b)/2:b,anchorX:h?void 0:c?(2*f.anchorX+e)/3:e,anchorY:h?void 0:c?(f.anchorY+t)/2:t});n.getLabel().attr(f);c&&(a.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){n&&
n.move(l,b,e,t)},32))},hide:function(l){var b=this;a.clearTimeout(this.hideTimer);l=v(l,this.options.hideDelay,500);this.isHidden||(this.hideTimer=u(function(){b.getLabel()[l?"fadeOut":"hide"]();b.isHidden=!0},l))},getAnchor:function(a,b){var e,l=this.chart,n=l.inverted,f=l.plotTop,c=l.plotLeft,h=0,w=0,D,r;a=z(a);e=a[0].tooltipPos;this.followPointer&&b&&(void 0===b.chartX&&(b=l.pointer.normalize(b)),e=[b.chartX-l.plotLeft,b.chartY-f]);e||(B(a,function(a){D=a.series.yAxis;r=a.series.xAxis;h+=a.plotX+
(!n&&r?r.left-c:0);w+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!n&&D?D.top-f:0)}),h/=a.length,w/=a.length,e=[n?l.plotWidth-w:h,this.shared&&!n&&1<a.length&&b?b.chartY-f:n?l.plotHeight-h:w]);return m(e,Math.round)},getPosition:function(a,b,e){var l=this.chart,n=this.distance,f={},c=l.inverted&&e.h||0,h,w=["y",l.chartHeight,b,e.plotY+l.plotTop,l.plotTop,l.plotTop+l.plotHeight],D=["x",l.chartWidth,a,e.plotX+l.plotLeft,l.plotLeft,l.plotLeft+l.plotWidth],r=!this.followPointer&&v(e.ttBelow,!l.inverted===
!!e.negative),g=function(a,d,b,h,k,x){var e=b<h-n,q=h+n+b<d,w=h-n-b;h+=n;if(r&&q)f[a]=h;else if(!r&&e)f[a]=w;else if(e)f[a]=Math.min(x-b,0>w-c?w:w-c);else if(q)f[a]=Math.max(k,h+c+b>d?h:h+c);else return!1},q=function(a,d,b,c){var k;c<n||c>d-n?k=!1:f[a]=c<b/2?1:c>d-b/2?d-b-2:c-b/2;return k},F=function(a){var d=w;w=D;D=d;h=a},x=function(){!1!==g.apply(0,w)?!1!==q.apply(0,D)||h||(F(!0),x()):h?f.x=f.y=0:(F(!0),x())};(l.inverted||1<this.len)&&F();x();return f},defaultFormatter:function(a){var b=this.points||
z(this),e;e=[a.tooltipFooterHeaderFormatter(b[0])];e=e.concat(a.bodyFormatter(b));e.push(a.tooltipFooterHeaderFormatter(b[0],!0));return e},refresh:function(l,b){var e,t=this.options,n,f=l,c,h={},w=[];e=t.formatter||this.defaultFormatter;var h=this.shared,D;t.enabled&&(a.clearTimeout(this.hideTimer),this.followPointer=z(f)[0].series.tooltipOptions.followPointer,c=this.getAnchor(f,b),b=c[0],n=c[1],!h||f.series&&f.series.noSharedTooltip?h=f.getLabelConfig():(B(f,function(a){a.setState("hover");w.push(a.getLabelConfig())}),
h={x:f[0].category,y:f[0].y},h.points=w,f=f[0]),this.len=w.length,h=e.call(h,this),D=f.series,this.distance=v(D.tooltipOptions.distance,16),!1===h?this.hide():(e=this.getLabel(),this.isHidden&&e.attr({opacity:1}).show(),this.split?this.renderSplit(h,z(l)):(t.style.width||e.css({width:this.chart.spacingBox.width}),e.attr({text:h&&h.join?h.join(""):h}),e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+v(f.colorIndex,D.colorIndex)),e.attr({stroke:t.borderColor||f.color||D.color||
"#666666"}),this.updatePosition({plotX:b,plotY:n,negative:f.negative,ttBelow:f.ttBelow,h:c[2]||0})),this.isHidden=!1))},renderSplit:function(l,b){var e=this,t=[],n=this.chart,f=n.renderer,c=!0,h=this.options,w=0,D=this.getLabel();a.isString(l)&&(l=[!1,l]);B(l.slice(0,b.length+1),function(a,l){if(!1!==a){l=b[l-1]||{isHeader:!0,plotX:b[0].plotX};var r=l.series||e,F=r.tt,x=l.series||{},K="highcharts-color-"+v(l.colorIndex,x.colorIndex,"none");F||(r.tt=F=f.label(null,null,null,"callout",null,null,h.useHTML).addClass("highcharts-tooltip-box "+
K).attr({padding:h.padding,r:h.borderRadius,fill:h.backgroundColor,stroke:h.borderColor||l.color||x.color||"#333333","stroke-width":h.borderWidth}).add(D));F.isActive=!0;F.attr({text:a});F.css(h.style).shadow(h.shadow);a=F.getBBox();x=a.width+F.strokeWidth();l.isHeader?(w=a.height,x=Math.max(0,Math.min(l.plotX+n.plotLeft-x/2,n.chartWidth-x))):x=l.plotX+n.plotLeft-v(h.distance,16)-x;0>x&&(c=!1);a=(l.series&&l.series.yAxis&&l.series.yAxis.pos)+(l.plotY||0);a-=n.plotTop;t.push({target:l.isHeader?n.plotHeight+
w:a,rank:l.isHeader?1:0,size:r.tt.getBBox().height+1,point:l,x:x,tt:F})}});this.cleanSplit();a.distribute(t,n.plotHeight+w);B(t,function(a){var b=a.point,f=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:c||b.isHeader?a.x:b.plotX+n.plotLeft+v(h.distance,16),y:a.pos+n.plotTop,anchorX:b.isHeader?b.plotX+n.plotLeft:b.plotX+f.xAxis.pos,anchorY:b.isHeader?a.pos+n.plotTop-15:b.plotY+f.yAxis.pos})})},updatePosition:function(a){var b=this.chart,e=this.getLabel(),e=(this.options.positioner||
this.getPosition).call(this,e.width,e.height,a);this.move(Math.round(e.x),Math.round(e.y||0),a.plotX+b.plotLeft,a.plotY+b.plotTop)},getDateFormat:function(a,b,e,t){var n=this.chart.time,f=n.dateFormat("%m-%d %H:%M:%S.%L",b),c,h,w={millisecond:15,second:12,minute:9,hour:6,day:3},l="millisecond";for(h in y){if(a===y.week&&+n.dateFormat("%w",b)===e&&"00:00:00.000"===f.substr(6)){h="week";break}if(y[h]>a){h=l;break}if(w[h]&&f.substr(w[h])!=="01-01 00:00:00.000".substr(w[h]))break;"week"!==h&&(l=h)}h&&
(c=t[h]);return c},getXDateFormat:function(a,b,e){b=b.dateTimeLabelFormats;var l=e&&e.closestPointRange;return(l?this.getDateFormat(l,a.x,e.options.startOfWeek,b):b.day)||b.year},tooltipFooterHeaderFormatter:function(a,b){b=b?"footer":"header";var e=a.series,l=e.tooltipOptions,n=l.xDateFormat,f=e.xAxis,c=f&&"datetime"===f.options.type&&p(a.key),h=l[b+"Format"];c&&!n&&(n=this.getXDateFormat(a,l,f));c&&n&&B(a.point&&a.point.tooltipDateKeys||["key"],function(a){h=h.replace("{point."+a+"}","{point."+
a+":"+n+"}")});return G(h,{point:a,series:e},this.chart.time)},bodyFormatter:function(a){return m(a,function(a){var b=a.series.tooltipOptions;return(b[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,b[(a.point.formatPrefix||"point")+"Format"])})}}})(L);(function(a){var B=a.addEvent,C=a.attr,G=a.charts,p=a.color,m=a.css,g=a.defined,v=a.each,z=a.extend,u=a.find,y=a.fireEvent,l=a.isNumber,b=a.isObject,e=a.offset,t=a.pick,n=a.splat,f=a.Tooltip;a.Pointer=function(a,
b){this.init(a,b)};a.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};f&&(a.tooltip=new f(a,b.tooltip),this.followTouchMove=t(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,f=c.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(f=t(c.pinchType,f));this.zoomX=a=/x/.test(f);this.zoomY=f=/y/.test(f);this.zoomHor=a&&!b||f&&b;this.zoomVert=
f&&!b||a&&b;this.hasZoom=a||f},normalize:function(a,b){var c;c=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=e(this.chart.container));return z(a,{chartX:Math.round(c.pageX-b.left),chartY:Math.round(c.pageY-b.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};v(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,f,e){var c;v(a,function(a){var h=
!(a.noSharedTooltip&&f)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(e,h);if((h=b(a,!0))&&!(h=!b(c,!0)))var h=c.distX-a.distX,n=c.dist-a.dist,r=(a.series.group&&a.series.group.zIndex)-(c.series.group&&c.series.group.zIndex),h=0<(0!==h&&f?h:0!==n?n:0!==r?r:c.series.index>a.series.index?-1:1);h&&(c=a)});return c},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var c=a.series,f=c.xAxis,c=c.yAxis,h=
t(a.clientX,a.plotX),e=a.shapeArgs;if(f&&c)return b?{chartX:f.len+f.pos-h,chartY:c.len+c.pos-a.plotY}:{chartX:h+f.pos,chartY:a.plotY+c.pos};if(e&&e.x&&e.y)return{chartX:e.x,chartY:e.y}},getHoverData:function(c,f,e,n,r,l,q){var h,x=[],w=q&&q.isBoosting;n=!(!n||!c);q=f&&!f.stickyTracking?[f]:a.grep(e,function(a){return a.visible&&!(!r&&a.directTouch)&&t(a.options.enableMouseTracking,!0)&&a.stickyTracking});f=(h=n?c:this.findNearestKDPoint(q,r,l))&&h.series;h&&(r&&!f.noSharedTooltip?(q=a.grep(e,function(a){return a.visible&&
!(!r&&a.directTouch)&&t(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),v(q,function(a){var d=u(a.points,function(a){return a.x===h.x&&!a.isNull});b(d)&&(w&&(d=a.getPoint(d)),x.push(d))})):x.push(h));return{hoverPoint:h,hoverSeries:f,hoverPoints:x}},runPointActions:function(b,f){var c=this.chart,h=c.tooltip&&c.tooltip.options.enabled?c.tooltip:void 0,e=h?h.shared:!1,n=f||c.hoverPoint,q=n&&n.series||c.hoverSeries,q=this.getHoverData(n,q,c.series,!!f||q&&q.directTouch&&this.isDirectTouch,e,
b,{isBoosting:c.isBoosting}),l,n=q.hoverPoint;l=q.hoverPoints;f=(q=q.hoverSeries)&&q.tooltipOptions.followPointer;e=e&&q&&!q.noSharedTooltip;if(n&&(n!==c.hoverPoint||h&&h.isHidden)){v(c.hoverPoints||[],function(b){-1===a.inArray(b,l)&&b.setState()});v(l||[],function(a){a.setState("hover")});if(c.hoverSeries!==q)q.onMouseOver();c.hoverPoint&&c.hoverPoint.firePointEvent("mouseOut");if(!n.series)return;n.firePointEvent("mouseOver");c.hoverPoints=l;c.hoverPoint=n;h&&h.refresh(e?l:n,b)}else f&&h&&!h.isHidden&&
(n=h.getAnchor([{}],b),h.updatePosition({plotX:n[0],plotY:n[1]}));this.unDocMouseMove||(this.unDocMouseMove=B(c.container.ownerDocument,"mousemove",function(b){var c=G[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}));v(c.axes,function(c){var f=t(c.crosshair.snap,!0),d=f?a.find(l,function(a){return a.series[c.coll]===c}):void 0;d||!f?c.drawCrosshair(b,d):c.hideCrosshair()})},reset:function(a,b){var c=this.chart,f=c.hoverSeries,h=c.hoverPoint,e=c.hoverPoints,q=c.tooltip,l=q&&q.shared?e:h;
a&&l&&v(n(l),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)q&&l&&(q.refresh(l),h&&(h.setState(h.state,!0),v(c.axes,function(a){a.crosshair&&a.drawCrosshair(null,h)})));else{if(h)h.onMouseOut();e&&v(e,function(a){a.setState()});if(f)f.onMouseOut();q&&q.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());v(c.axes,function(a){a.hideCrosshair()});this.hoverX=c.hoverPoints=c.hoverPoint=null}},scaleGroups:function(a,b){var c=this.chart,f;v(c.series,function(h){f=
a||h.getPlotBox();h.xAxis&&h.xAxis.zoomEnabled&&h.group&&(h.group.attr(f),h.markerGroup&&(h.markerGroup.attr(f),h.markerGroup.clip(b?c.clipRect:null)),h.dataLabelsGroup&&h.dataLabelsGroup.attr(f))});c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,f=a.chartX,e=a.chartY,n=this.zoomHor,q=this.zoomVert,l=b.plotLeft,
x=b.plotTop,t=b.plotWidth,d=b.plotHeight,H,E=this.selectionMarker,k=this.mouseDownX,A=this.mouseDownY,g=c.panKey&&a[c.panKey+"Key"];E&&E.touch||(f<l?f=l:f>l+t&&(f=l+t),e<x?e=x:e>x+d&&(e=x+d),this.hasDragged=Math.sqrt(Math.pow(k-f,2)+Math.pow(A-e,2)),10<this.hasDragged&&(H=b.isInsidePlot(k-l,A-x),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&H&&!g&&!E&&(this.selectionMarker=E=b.renderer.rect(l,x,n?1:t,q?1:d,0).attr({fill:c.selectionMarkerFill||p("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",
zIndex:7}).add()),E&&n&&(f-=k,E.attr({width:Math.abs(f),x:(0<f?0:f)+k})),E&&q&&(f=e-A,E.attr({height:Math.abs(f),y:(0<f?0:f)+A})),H&&!E&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=this,c=this.chart,f=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},n=this.selectionMarker,q=n.attr?n.attr("x"):n.x,t=n.attr?n.attr("y"):n.y,x=n.attr?n.attr("width"):n.width,K=n.attr?n.attr("height"):n.height,d;if(this.hasDragged||f)v(c.axes,function(c){if(c.zoomEnabled&&g(c.min)&&
(f||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var h=c.horiz,k="touchend"===a.type?c.minPixelPadding:0,n=c.toValue((h?q:t)+k),h=c.toValue((h?q+x:t+K)-k);e[c.coll].push({axis:c,min:Math.min(n,h),max:Math.max(n,h)});d=!0}}),d&&y(c,"selection",e,function(a){c.zoom(z(a,f?{animation:!1}:null))});l(c.index)&&(this.selectionMarker=this.selectionMarker.destroy());f&&this.scaleGroups()}c&&l(c.index)&&(m(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=
!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a))},onDocumentMouseUp:function(b){G[a.hoverChartIndex]&&G[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=
G[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;g(a.hoverChartIndex)&&G[a.hoverChartIndex]&&G[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var c;a;){if(c=
C(a,"class")){if(-1!==c.indexOf(b))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,f=b.hoverPoint,c=b.plotLeft,e=b.plotTop;a=this.normalize(a);b.cancelClick||
(f&&this.inClass(a.target,"highcharts-tracker")?(y(f.series,"click",z(a,{point:f})),b.hoverPoint&&f.firePointEvent("click",a)):(z(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-c,a.chartY-e)&&y(b,"click",a)))},setDOMEvents:function(){var b=this,f=b.chart.container,e=f.ownerDocument;f.onmousedown=function(a){b.onContainerMouseDown(a)};f.onmousemove=function(a){b.onContainerMouseMove(a)};f.onclick=function(a){b.onContainerClick(a)};this.unbindContainerMouseLeave=B(f,"mouseleave",b.onContainerMouseLeave);
a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=B(e,"mouseup",b.onDocumentMouseUp));a.hasTouch&&(f.ontouchstart=function(a){b.onContainerTouchStart(a)},f.ontouchmove=function(a){b.onContainerTouchMove(a)},a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=B(e,"touchend",b.onDocumentTouchEnd)))},destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();this.unbindContainerMouseLeave();a.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&
(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,f){b[f]=null})}}})(L);(function(a){var B=a.charts,C=a.each,G=a.extend,p=a.map,m=a.noop,g=a.pick;G(a.Pointer.prototype,{pinchTranslate:function(a,g,m,p,l,b){this.zoomHor&&this.pinchTranslateDirection(!0,a,g,m,p,l,b);this.zoomVert&&this.pinchTranslateDirection(!1,a,g,m,p,l,b)},pinchTranslateDirection:function(a,g,m,p,l,b,e,t){var n=this.chart,f=a?"x":"y",c=a?"X":"Y",h="chart"+c,w=a?"width":
"height",D=n["plot"+(a?"Left":"Top")],r,J,q=t||1,F=n.inverted,x=n.bounds[a?"h":"v"],K=1===g.length,d=g[0][h],H=m[0][h],E=!K&&g[1][h],k=!K&&m[1][h],A;m=function(){!K&&20<Math.abs(d-E)&&(q=t||Math.abs(H-k)/Math.abs(d-E));J=(D-H)/q+d;r=n["plot"+(a?"Width":"Height")]/q};m();g=J;g<x.min?(g=x.min,A=!0):g+r>x.max&&(g=x.max-r,A=!0);A?(H-=.8*(H-e[f][0]),K||(k-=.8*(k-e[f][1])),m()):e[f]=[H,k];F||(b[f]=J-D,b[w]=r);b=F?1/q:q;l[w]=r;l[f]=g;p[F?a?"scaleY":"scaleX":"scale"+c]=q;p["translate"+c]=b*D+(H-b*d)},pinch:function(a){var v=
this,u=v.chart,y=v.pinchDown,l=a.touches,b=l.length,e=v.lastValidTouch,t=v.hasZoom,n=v.selectionMarker,f={},c=1===b&&(v.inClass(a.target,"highcharts-tracker")&&u.runTrackerClick||v.runChartClick),h={};1<b&&(v.initiated=!0);t&&v.initiated&&!c&&a.preventDefault();p(l,function(a){return v.normalize(a)});"touchstart"===a.type?(C(l,function(a,b){y[b]={chartX:a.chartX,chartY:a.chartY}}),e.x=[y[0].chartX,y[1]&&y[1].chartX],e.y=[y[0].chartY,y[1]&&y[1].chartY],C(u.axes,function(a){if(a.zoomEnabled){var b=
u.bounds[a.horiz?"h":"v"],f=a.minPixelPadding,c=a.toPixels(g(a.options.min,a.dataMin)),h=a.toPixels(g(a.options.max,a.dataMax)),e=Math.max(c,h);b.min=Math.min(a.pos,Math.min(c,h)-f);b.max=Math.max(a.pos+a.len,e+f)}}),v.res=!0):v.followTouchMove&&1===b?this.runPointActions(v.normalize(a)):y.length&&(n||(v.selectionMarker=n=G({destroy:m,touch:!0},u.plotBox)),v.pinchTranslate(y,l,f,n,h,e),v.hasPinched=t,v.scaleGroups(f,h),v.res&&(v.res=!1,this.reset(!1,0)))},touch:function(m,p){var u=this.chart,v,l;
if(u.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=u.index;1===m.touches.length?(m=this.normalize(m),(l=u.isInsidePlot(m.chartX-u.plotLeft,m.chartY-u.plotTop))&&!u.openMenu?(p&&this.runPointActions(m),"touchmove"===m.type&&(p=this.pinchDown,v=p[0]?4<=Math.sqrt(Math.pow(p[0].chartX-m.chartX,2)+Math.pow(p[0].chartY-m.chartY,2)):!1),g(v,!0)&&this.pinch(m)):p&&this.reset()):2===m.touches.length&&this.pinch(m)},onContainerTouchStart:function(a){this.zoomOption(a);
this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(g){B[a.hoverChartIndex]&&B[a.hoverChartIndex].pointer.drop(g)}})})(L);(function(a){var B=a.addEvent,C=a.charts,G=a.css,p=a.doc,m=a.extend,g=a.noop,v=a.Pointer,z=a.removeEvent,u=a.win,y=a.wrap;if(!a.hasTouch&&(u.PointerEvent||u.MSPointerEvent)){var l={},b=!!u.PointerEvent,e=function(){var b=[];b.item=function(a){return this[a]};a.objectEach(l,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});
return b},t=function(b,f,c,h){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!C[a.hoverChartIndex]||(h(b),h=C[a.hoverChartIndex].pointer,h[f]({type:c,target:b.currentTarget,preventDefault:g,touches:e()}))};m(v.prototype,{onContainerPointerDown:function(a){t(a,"onContainerTouchStart","touchstart",function(a){l[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){t(a,"onContainerTouchMove","touchmove",function(a){l[a.pointerId]={pageX:a.pageX,
pageY:a.pageY};l[a.pointerId].target||(l[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){t(a,"onDocumentTouchEnd","touchend",function(a){delete l[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,b?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,b?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(p,b?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});y(v.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&
G(b.container,{"-ms-touch-action":"none","touch-action":"none"})});y(v.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(B)});y(v.prototype,"destroy",function(a){this.batchMSEvents(z);a.call(this)})}})(L);(function(a){var B=a.addEvent,C=a.css,G=a.discardElement,p=a.defined,m=a.each,g=a.fireEvent,v=a.isFirefox,z=a.marginNames,u=a.merge,y=a.pick,l=a.setAnimation,b=a.stableSort,e=a.win,t=a.wrap;a.Legend=function(a,b){this.init(a,b)};a.Legend.prototype=
{init:function(a,b){this.chart=a;this.setOptions(b);b.enabled&&(this.render(),B(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var b=y(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=u(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.symbolWidth=y(a.symbolWidth,16);this.pages=[]},update:function(a,b){var f=this.chart;this.setOptions(u(!0,this.options,a));this.destroy();
f.isDirtyLegend=f.isDirtyBox=!0;y(b,!0)&&f.redraw();g(this,"afterUpdate")},colorizeItem:function(a,b){a.legendGroup[b?"removeClass":"addClass"]("highcharts-legend-item-hidden");var f=this.options,h=a.legendItem,e=a.legendLine,n=a.legendSymbol,l=this.itemHiddenStyle.color,f=b?f.itemStyle.color:l,t=b?a.color||l:l,q=a.options&&a.options.marker,F={fill:t};h&&h.css({fill:f,color:f});e&&e.attr({stroke:t});n&&(q&&n.isMarker&&(F=a.pointAttribs(),b||(F.stroke=F.fill=l)),n.attr(F));g(this,"afterColorizeItem",
{item:a,visible:b})},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,h=a._legendItemPos,e=h[0],h=h[1],n=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?e:this.legendWidth-e-2*c-4,h);n&&(n.x=e,n.y=h)},destroyItem:function(a){var b=a.checkbox;m(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&G(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}m(this.getAllItems(),function(b){m(["legendItem",
"legendGroup"],a,b)});m("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,b,c=this.clipHeight||this.legendHeight,h=this.titleHeight;a&&(b=a.translateY,m(this.allItems,function(f){var e=f.checkbox,n;e&&(n=b+h+e.y+(this.scrollOffset||0)+3,C(e,{left:a.translateX+f.checkboxOffset+e.x-20+"px",top:n+"px",display:n>b-6&&n<b+c-6?"":"none"}))},this))},renderTitle:function(){var a=this.options,b=this.padding,
c=a.title,h=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,b-3,b-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(c.style).add(this.group)),a=this.title.getBBox(),h=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:h}));this.titleHeight=h},setText:function(b){var f=this.options;b.legendItem.attr({text:f.labelFormat?a.format(f.labelFormat,b,this.chart.time):f.labelFormatter.call(b)})},renderItem:function(a){var b=this.chart,c=b.renderer,h=
this.options,e=this.symbolWidth,l=h.symbolPadding,n=this.itemStyle,t=this.itemHiddenStyle,q="horizontal"===h.layout?y(h.itemDistance,20):0,g=!h.rtl,x=a.legendItem,K=!a.series,d=!K&&a.series.drawLegendSymbol?a.series:a,H=d.options,H=this.createCheckboxForItem&&H&&H.showCheckbox,q=e+l+q+(H?20:0),E=h.useHTML,k=a.options.className;x||(a.legendGroup=c.g("legend-item").addClass("highcharts-"+d.type+"-series highcharts-color-"+a.colorIndex+(k?" "+k:"")+(K?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),
a.legendItem=x=c.text("",g?e+l:-l,this.baseline||0,E).css(u(a.visible?n:t)).attr({align:g?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(e=n.fontSize,this.fontMetrics=c.fontMetrics(e,x),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,x.attr("y",this.baseline)),this.symbolHeight=h.symbolHeight||this.fontMetrics.f,d.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,x,E),H&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);n.width||x.css({width:(h.itemWidth||
h.width||b.spacingBox.width)-q});this.setText(a);b=x.getBBox();a.itemWidth=a.checkboxOffset=h.itemWidth||a.legendItemWidth||b.width+q;this.maxItemWidth=Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||b.height||this.symbolHeight)},layoutItem:function(a){var b=this.options,c=this.padding,h="horizontal"===b.layout,e=a.itemHeight,l=b.itemMarginBottom||0,n=this.itemMarginTop,t=h?y(b.itemDistance,20):0,q=b.width,g=q||this.chart.spacingBox.width-
2*c-b.x,b=b.alignColumns&&this.totalItemWidth>g?this.maxItemWidth:a.itemWidth;h&&this.itemX-c+b>g&&(this.itemX=c,this.itemY+=n+this.lastLineHeight+l,this.lastLineHeight=0);this.lastItemY=n+this.itemY+l;this.lastLineHeight=Math.max(e,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];h?this.itemX+=b:(this.itemY+=n+e+l,this.lastLineHeight=e);this.offsetWidth=q||Math.max((h?this.itemX-c-(a.checkbox?0:t):b)+c,this.offsetWidth)},getAllItems:function(){var a=[];m(this.chart.series,function(b){var c=
b&&b.options;b&&y(c.showInLegend,p(c.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===c.legendType?b.data:b)))});g(this,"afterGetAllItems",{allItems:a});return a},getAlignment:function(){var a=this.options;return a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,b){var c=this.chart,f=this.options,e=this.getAlignment();e&&m([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(h,l){h.test(e)&&!p(a[l])&&(c[z[l]]=Math.max(c[z[l]],
c.legend[(l+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][l]*f[l%2?"x":"y"]+y(f.margin,12)+b[l]+(0===l&&void 0!==c.options.title.margin?c.titleOffset+c.options.title.margin:0)))})},render:function(){var a=this.chart,f=a.renderer,c=this.group,e,l,t,r,g=this.box,q=this.options,F=this.padding;this.itemX=F;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;c||(this.group=c=f.g("legend").attr({zIndex:7}).add(),this.contentGroup=f.g().attr({zIndex:1}).add(c),this.scrollGroup=f.g().add(this.contentGroup));
this.renderTitle();e=this.getAllItems();b(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});q.reversed&&e.reverse();this.allItems=e;this.display=l=!!e.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;m(e,this.renderItem,this);m(e,this.layoutItem,this);t=(q.width||this.offsetWidth)+F;r=this.lastItemY+this.lastLineHeight+this.titleHeight;r=this.handleOverflow(r);r+=F;g||(this.box=g=f.rect().addClass("highcharts-legend-box").attr({r:q.borderRadius}).add(c),
g.isNew=!0);g.attr({stroke:q.borderColor,"stroke-width":q.borderWidth||0,fill:q.backgroundColor||"none"}).shadow(q.shadow);0<t&&0<r&&(g[g.isNew?"attr":"animate"](g.crisp.call({},{x:0,y:0,width:t,height:r},g.strokeWidth())),g.isNew=!1);g[l?"show":"hide"]();this.legendWidth=t;this.legendHeight=r;m(e,this.positionItem,this);l&&(f=a.spacingBox,/(lth|ct|rth)/.test(this.getAlignment())&&(f=u(f,{y:f.y+a.titleOffset+a.options.title.margin})),c.align(u(q,{width:t,height:r}),!0,f));a.isResizing||this.positionCheckboxes()},
handleOverflow:function(a){var b=this,c=this.chart,e=c.renderer,l=this.options,n=l.y,r=this.padding,c=c.spacingBox.height+("top"===l.verticalAlign?-n:n)-r,n=l.maxHeight,t,q=this.clipRect,g=l.navigation,x=y(g.animation,!0),K=g.arrowSize||12,d=this.nav,H=this.pages,E,k=this.allItems,A=function(a){"number"===typeof a?q.attr({height:a}):q&&(b.clipRect=q.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+r+"px,9999px,"+(r+a)+"px,0)":"auto")};"horizontal"!==l.layout||
"middle"===l.verticalAlign||l.floating||(c/=2);n&&(c=Math.min(c,n));H.length=0;a>c&&!1!==g.enabled?(this.clipHeight=t=Math.max(c-20-this.titleHeight-r,0),this.currentPage=y(this.currentPage,1),this.fullHeight=a,m(k,function(a,b){var d=a._legendItemPos[1],c=Math.round(a.legendItem.getBBox().height),f=H.length;if(!f||d-H[f-1]>t&&(E||d)!==H[f-1])H.push(E||d),f++;a.pageIx=f-1;E&&(k[b-1].pageIx=f-1);b===k.length-1&&d+c-H[f-1]>t&&(H.push(d),a.pageIx=f);d!==E&&(E=d)}),q||(q=b.clipRect=e.clipRect(0,r,9999,
0),b.contentGroup.clip(q)),A(t),d||(this.nav=d=e.g().attr({zIndex:1}).add(this.group),this.up=e.symbol("triangle",0,0,K,K).on("click",function(){b.scroll(-1,x)}).add(d),this.pager=e.text("",15,10).addClass("highcharts-legend-navigation").css(g.style).add(d),this.down=e.symbol("triangle-down",0,0,K,K).on("click",function(){b.scroll(1,x)}).add(d)),b.scroll(0),a=c):d&&(A(),this.nav=d.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,b){var c=this.pages,f=
c.length;a=this.currentPage+a;var e=this.clipHeight,n=this.options.navigation,r=this.pager,t=this.padding;a>f&&(a=f);0<a&&(void 0!==b&&l(b,this.chart),this.nav.attr({translateX:t,translateY:e+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),r.attr({text:a+"/"+f}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===f?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===
a?n.inactiveColor:n.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===f?n.inactiveColor:n.activeColor}).css({cursor:a===f?"default":"pointer"}),this.scrollOffset=-c[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=a,this.positionCheckboxes())}};a.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.symbolHeight,f=a.options.squareSymbol;b.legendSymbol=this.chart.renderer.rect(f?(a.symbolWidth-c)/2:0,a.baseline-c+1,f?c:a.symbolWidth,
c,y(a.options.symbolRadius,c/2)).addClass("highcharts-point").attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options,c=b.marker,e=a.symbolWidth,l=a.symbolHeight,n=l/2,r=this.chart.renderer,t=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var q;q={"stroke-width":b.lineWidth||0};b.dashStyle&&(q.dashstyle=b.dashStyle);this.legendLine=r.path(["M",0,a,"L",e,a]).addClass("highcharts-graph").attr(q).add(t);c&&!1!==c.enabled&&(b=Math.min(y(c.radius,n),n),0===this.symbol.indexOf("url")&&
(c=u(c,{width:l,height:l}),b=0),this.legendSymbol=c=r.symbol(this.symbol,e/2-b,a-b,2*b,2*b,c).addClass("highcharts-point").add(t),c.isMarker=!0)}};(/Trident\/7\.0/.test(e.navigator.userAgent)||v)&&t(a.Legend.prototype,"positionItem",function(a,b){var c=this,f=function(){b._legendItemPos&&a.call(c,b)};f();setTimeout(f)})})(L);(function(a){var B=a.addEvent,C=a.animate,G=a.animObject,p=a.attr,m=a.doc,g=a.Axis,v=a.createElement,z=a.defaultOptions,u=a.discardElement,y=a.charts,l=a.css,b=a.defined,e=a.each,
t=a.extend,n=a.find,f=a.fireEvent,c=a.grep,h=a.isNumber,w=a.isObject,D=a.isString,r=a.Legend,J=a.marginNames,q=a.merge,F=a.objectEach,x=a.Pointer,K=a.pick,d=a.pInt,H=a.removeEvent,E=a.seriesTypes,k=a.splat,A=a.syncTimeout,P=a.win,R=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,d){return new R(a,b,d)};t(R.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(D(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,d){var k,
c,e=b.series,h=b.plotOptions||{};f(this,"init",{args:arguments},function(){b.series=null;k=q(z,b);for(c in k.plotOptions)k.plotOptions[c].tooltip=h[c]&&q(h[c].tooltip)||void 0;k.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;k.series=b.series=e;this.userOptions=b;var x=k.chart,l=x.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=d;this.isResizing=0;this.options=k;this.axes=[];this.series=[];this.time=b.time&&a.keys(b.time).length?
new a.Time(b.time):a.time;this.hasCartesianSeries=x.showAxes;var E=this;E.index=y.length;y.push(E);a.chartCount++;l&&F(l,function(a,b){B(E,b,a)});E.xAxis=[];E.yAxis=[];E.pointCount=E.colorCounter=E.symbolCounter=0;f(E,"afterInit");E.firstRender()})},initSeries:function(b){var d=this.options.chart;(d=E[b.type||d.type||d.defaultSeriesType])||a.error(17,!0);d=new d;d.init(this,b);return d},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName())},
isInsidePlot:function(a,b,d){var k=d?b:a;a=d?a:b;return 0<=k&&k<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){f(this,"beforeRedraw");var d=this.axes,k=this.series,c=this.pointer,h=this.legend,x=this.isDirtyLegend,l,q,E=this.hasCartesianSeries,r=this.isDirtyBox,n,H=this.renderer,g=H.isHidden(),A=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);g&&this.temporaryDisplay();this.layOutTitles();for(b=k.length;b--;)if(n=k[b],n.options.stacking&&(l=!0,n.isDirty)){q=!0;
break}if(q)for(b=k.length;b--;)n=k[b],n.options.stacking&&(n.isDirty=!0);e(k,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),x=!0);a.isDirtyData&&f(a,"updatedData")});x&&h.options.enabled&&(h.render(),this.isDirtyLegend=!1);l&&this.getStacks();E&&e(d,function(a){a.updateNames();a.setScale()});this.getMargins();E&&(e(d,function(a){a.isDirty&&(r=!0)}),e(d,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,A.push(function(){f(a,"afterSetExtremes",t(a.eventArgs,
a.getExtremes()));delete a.eventArgs}));(r||l)&&a.redraw()}));r&&this.drawChartBox();f(this,"predraw");e(k,function(a){(r||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});c&&c.reset(!0);H.draw();f(this,"redraw");f(this,"render");g&&this.temporaryDisplay(!0);e(A,function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var d,k=this.series,c;d=n(this.axes,b)||n(this.series,b);for(c=0;!d&&c<k.length;c++)d=n(k[c].points||[],b);return d},getAxes:function(){var a=
this,b=this.options,d=b.xAxis=k(b.xAxis||{}),b=b.yAxis=k(b.yAxis||{});f(this,"getAxes");e(d,function(a,b){a.index=b;a.isX=!0});e(b,function(a,b){a.index=b});d=d.concat(b);e(d,function(b){new g(a,b)});f(this,"afterGetAxes")},getSelectedPoints:function(){var a=[];e(this.series,function(b){a=a.concat(c(b.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return c(this.series,function(a){return a.selected})},setTitle:function(a,b,d){var k=this,c=k.options,f;f=c.title=q({style:{color:"#333333",
fontSize:c.isStock?"16px":"18px"}},c.title,a);c=c.subtitle=q({style:{color:"#666666"}},c.subtitle,b);e([["title",a,f],["subtitle",b,c]],function(a,b){var d=a[0],c=k[d],f=a[1];a=a[2];c&&f&&(k[d]=c=c.destroy());a&&!c&&(k[d]=k.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+d,zIndex:a.zIndex||4}).add(),k[d].update=function(a){k.setTitle(!b&&a,b&&a)},k[d].css(a.style))});k.layOutTitles(d)},layOutTitles:function(a){var b=0,d,k=this.renderer,c=this.spacingBox;e(["title","subtitle"],
function(a){var d=this[a],f=this.options[a];a="title"===a?-3:f.verticalAlign?0:b+2;var e;d&&(e=f.style.fontSize,e=k.fontMetrics(e,d).b,d.css({width:(f.width||c.width+f.widthAdjust)+"px"}).align(t({y:a+e},f),!1,"spacingBox"),f.floating||f.verticalAlign||(b=Math.ceil(b+d.getBBox(f.useHTML).height)))},this);d=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&d&&(this.isDirtyBox=this.isDirtyLegend=d,this.hasRendered&&K(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var d=this.options.chart,
k=d.width,d=d.height,c=this.renderTo;b(k)||(this.containerWidth=a.getStyle(c,"width"));b(d)||(this.containerHeight=a.getStyle(c,"height"));this.chartWidth=Math.max(0,k||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(d,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(b){var d=this.renderTo;if(b)for(;d&&d.style;)d.hcOrigStyle&&(a.css(d,d.hcOrigStyle),delete d.hcOrigStyle),d.hcOrigDetached&&(m.body.removeChild(d),d.hcOrigDetached=
!1),d=d.parentNode;else for(;d&&d.style;){m.body.contains(d)||d.parentNode||(d.hcOrigDetached=!0,m.body.appendChild(d));if("none"===a.getStyle(d,"display",!1)||d.hcOricDetached)d.hcOrigStyle={display:d.style.display,height:d.style.height,overflow:d.style.overflow},b={display:"block",overflow:"hidden"},d!==this.renderTo&&(b.height=0),a.css(d,b),d.offsetWidth||d.style.setProperty("display","block","important");d=d.parentNode;if(d===m.body)break}},setClassName:function(a){this.container.className="highcharts-container "+
(a||"")},getContainer:function(){var b,k=this.options,c=k.chart,e,x;b=this.renderTo;var l=a.uniqueKey(),q;b||(this.renderTo=b=c.renderTo);D(b)&&(this.renderTo=b=m.getElementById(b));b||a.error(13,!0);e=d(p(b,"data-highcharts-chart"));h(e)&&y[e]&&y[e].hasRendered&&y[e].destroy();p(b,"data-highcharts-chart",this.index);b.innerHTML="";c.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();e=this.chartWidth;x=this.chartHeight;q=t({position:"relative",overflow:"hidden",width:e+"px",height:x+
"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},c.style);this.container=b=v("div",{id:l},q,b);this._cursor=b.style.cursor;this.renderer=new (a[c.renderer]||a.Renderer)(b,e,x,null,c.forExport,k.exporting&&k.exporting.allowHTML);this.setClassName(c.className);this.renderer.setStyle(c.style);this.renderer.chartIndex=this.index;f(this,"afterGetContainer")},getMargins:function(a){var d=this.spacing,k=this.margin,c=this.titleOffset;this.resetMargins();c&&
!b(k[0])&&(this.plotTop=Math.max(this.plotTop,c+this.options.title.margin+d[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(k,d);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.adjustPlotArea&&this.adjustPlotArea();a||this.getAxisMargins()},getAxisMargins:function(){var a=this,d=a.axisOffset=[0,0,0,0],k=a.margin;a.hasCartesianSeries&&e(a.axes,function(a){a.visible&&a.getOffset()});e(J,function(c,f){b(k[f])||(a[c]+=d[f])});
a.setChartSize()},reflow:function(d){var k=this,c=k.options.chart,f=k.renderTo,e=b(c.width)&&b(c.height),h=c.width||a.getStyle(f,"width"),c=c.height||a.getStyle(f,"height"),f=d?d.target:P;if(!e&&!k.isPrinting&&h&&c&&(f===P||f===m)){if(h!==k.containerWidth||c!==k.containerHeight)a.clearTimeout(k.reflowTimeout),k.reflowTimeout=A(function(){k.container&&k.setSize(void 0,void 0,!1)},d?100:0);k.containerWidth=h;k.containerHeight=c}},setReflow:function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&
(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=B(P,"resize",function(a){b.reflow(a)}),B(this,"destroy",this.unbindReflow))},setSize:function(b,d,k){var c=this,h=c.renderer;c.isResizing+=1;a.setAnimation(k,c);c.oldChartHeight=c.chartHeight;c.oldChartWidth=c.chartWidth;void 0!==b&&(c.options.chart.width=b);void 0!==d&&(c.options.chart.height=d);c.getChartSize();b=h.globalAnimation;(b?C:l)(c.container,{width:c.chartWidth+"px",height:c.chartHeight+"px"},b);c.setChartSize(!0);h.setSize(c.chartWidth,
c.chartHeight,k);e(c.axes,function(a){a.isDirty=!0;a.setScale()});c.isDirtyLegend=!0;c.isDirtyBox=!0;c.layOutTitles();c.getMargins();c.redraw(k);c.oldChartHeight=null;f(c,"resize");A(function(){c&&f(c,"endResize",null,function(){--c.isResizing})},G(b).duration)},setChartSize:function(a){var b=this.inverted,d=this.renderer,c=this.chartWidth,k=this.chartHeight,h=this.options.chart,x=this.spacing,l=this.clipOffset,q,E,r,n;this.plotLeft=q=Math.round(this.plotLeft);this.plotTop=E=Math.round(this.plotTop);
this.plotWidth=r=Math.max(0,Math.round(c-q-this.marginRight));this.plotHeight=n=Math.max(0,Math.round(k-E-this.marginBottom));this.plotSizeX=b?n:r;this.plotSizeY=b?r:n;this.plotBorderWidth=h.plotBorderWidth||0;this.spacingBox=d.spacingBox={x:x[3],y:x[0],width:c-x[3]-x[1],height:k-x[0]-x[2]};this.plotBox=d.plotBox={x:q,y:E,width:r,height:n};c=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(c,l[3])/2);d=Math.ceil(Math.max(c,l[0])/2);this.clipBox={x:b,y:d,width:Math.floor(this.plotSizeX-Math.max(c,
l[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(c,l[2])/2-d))};a||e(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()});f(this,"afterSetChartSize",{skipAxes:a})},resetMargins:function(){var a=this,b=a.options.chart;e(["margin","spacing"],function(d){var c=b[d],k=w(c)?c:[c,c,c,c];e(["Top","Right","Bottom","Left"],function(c,f){a[d][f]=K(b[d+c],k[f])})});e(J,function(b,d){a[b]=K(a.margin[d],a.spacing[d])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=
this.options.chart,b=this.renderer,d=this.chartWidth,c=this.chartHeight,k=this.chartBackground,e=this.plotBackground,h=this.plotBorder,x,l=this.plotBGImage,q=a.backgroundColor,E=a.plotBackgroundColor,r=a.plotBackgroundImage,n,t=this.plotLeft,H=this.plotTop,g=this.plotWidth,A=this.plotHeight,K=this.plotBox,w=this.clipRect,F=this.clipBox,m="animate";k||(this.chartBackground=k=b.rect().addClass("highcharts-background").add(),m="attr");x=a.borderWidth||0;n=x+(a.shadow?8:0);q={fill:q||"none"};if(x||k["stroke-width"])q.stroke=
a.borderColor,q["stroke-width"]=x;k.attr(q).shadow(a.shadow);k[m]({x:n/2,y:n/2,width:d-n-x%2,height:c-n-x%2,r:a.borderRadius});m="animate";e||(m="attr",this.plotBackground=e=b.rect().addClass("highcharts-plot-background").add());e[m](K);e.attr({fill:E||"none"}).shadow(a.plotShadow);r&&(l?l.animate(K):this.plotBGImage=b.image(r,t,H,g,A).add());w?w.animate({width:F.width,height:F.height}):this.clipRect=b.clipRect(F);m="animate";h||(m="attr",this.plotBorder=h=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());
h.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});h[m](h.crisp({x:t,y:H,width:g,height:A},-h.strokeWidth()));this.isDirtyBox=!1;f(this,"afterDrawChartBox")},propFromSeries:function(){var a=this,b=a.options.chart,d,c=a.options.series,k,f;e(["inverted","angular","polar"],function(e){d=E[b.type||b.defaultSeriesType];f=b[e]||d&&d.prototype[e];for(k=c&&c.length;!f&&k--;)(d=E[c[k].type])&&d.prototype[e]&&(f=!0);a[e]=f})},linkSeries:function(){var a=this,b=a.series;e(b,function(a){a.linkedSeries.length=
0});e(b,function(b){var d=b.options.linkedTo;D(d)&&(d=":previous"===d?a.series[b.index-1]:a.get(d))&&d.linkedParent!==b&&(d.linkedSeries.push(b),b.linkedParent=d,b.visible=K(b.options.visible,d.options.visible,b.visible))});f(this,"afterLinkSeries")},renderSeries:function(){e(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&e(b.items,function(c){var k=t(b.style,c.style),f=d(k.left)+a.plotLeft,e=d(k.top)+a.plotTop+12;delete k.left;delete k.top;
a.renderer.text(c.html,f,e).attr({zIndex:2}).css(k).add()})},render:function(){var a=this.axes,b=this.renderer,d=this.options,c,k,f;this.setTitle();this.legend=new r(this,d.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();d=this.plotWidth;c=this.plotHeight=Math.max(this.plotHeight-21,0);e(a,function(a){a.setScale()});this.getAxisMargins();k=1.1<d/this.plotWidth;f=1.05<c/this.plotHeight;if(k||f)e(a,function(a){(a.horiz&&k||!a.horiz&&f)&&a.setTickInterval(!0)}),this.getMargins();
this.drawChartBox();this.hasCartesianSeries&&e(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=q(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&
(P.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,d=b.axes,c=b.series,k=b.container,h,x=k&&k.parentNode;f(b,"destroy");b.renderer.forExport?a.erase(y,b):y[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");H(b);for(h=d.length;h--;)d[h]=d[h].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();
for(h=c.length;h--;)c[h]=c[h].destroy();e("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var d=b[a];d&&d.destroy&&(b[a]=d.destroy())});k&&(k.innerHTML="",H(k),x&&u(k));F(b,function(a,d){delete b[d]})},firstRender:function(){var a=this,b=a.options;if(!a.isReadyToRender||a.isReadyToRender()){a.getContainer();a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();
e(b.series||[],function(b){a.initSeries(b)});a.linkSeries();f(a,"beforeRender");x&&(a.pointer=new x(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){e([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);f(this,"load");f(this,"render");b(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null}})})(L);(function(a){var B=a.addEvent,C=a.Chart,G=a.each;B(C,"afterSetChartSize",function(p){var m=
this.options.chart.scrollablePlotArea;if(m=m&&m.minWidth)if(this.scrollablePixels=m=Math.max(0,m-this.chartWidth))this.plotWidth+=m,this.clipBox.width+=m,p.skipAxes||G(this.axes,function(g){1===g.side?g.getPlotLinePath=function(){var m=this.right,p;this.right=m-g.chart.scrollablePixels;p=a.Axis.prototype.getPlotLinePath.apply(this,arguments);this.right=m;return p}:(g.setAxisSize(),g.setAxisTranslation())})});B(C,"render",function(){this.scrollablePixels?(this.setUpScrolling&&this.setUpScrolling(),
this.applyFixed()):this.fixedDiv&&this.applyFixed()});C.prototype.setUpScrolling=function(){this.scrollingContainer=a.createElement("div",{className:"highcharts-scrolling"},{overflowX:"auto",WebkitOverflowScrolling:"touch"},this.renderTo);this.innerContainer=a.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};C.prototype.applyFixed=function(){var p=this.container,m,g;this.fixedDiv||(this.fixedDiv=
a.createElement("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.fixedRenderer=m=new a.Renderer(this.fixedDiv,0,0),this.scrollableMask=m.path().attr({fill:a.color(this.options.chart.backgroundColor||"#fff").setOpacity(.85).get(),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),a.each([this.inverted?".highcharts-xaxis":".highcharts-yaxis",this.inverted?
".highcharts-xaxis-labels":".highcharts-yaxis-labels",".highcharts-contextbutton",".highcharts-credits",".highcharts-legend",".highcharts-subtitle",".highcharts-title"],function(g){a.each(p.querySelectorAll(g),function(a){m.box.appendChild(a);a.style.pointerEvents="auto"})}));this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);g=this.chartWidth+this.scrollablePixels;this.container.style.width=g+"px";this.renderer.boxWrapper.attr({width:g,height:this.chartHeight,viewBox:[0,0,g,this.chartHeight].join(" ")});
g=this.options.chart.scrollablePlotArea;g.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixels*g.scrollPositionX);var v=this.axisOffset;g=this.plotTop-v[0]-1;var v=this.plotTop+this.plotHeight+v[2],z=this.plotLeft+this.plotWidth-this.scrollablePixels;this.scrollableMask.attr({d:this.scrollablePixels?["M",0,g,"L",this.plotLeft-1,g,"L",this.plotLeft-1,v,"L",0,v,"Z","M",z,g,"L",this.chartWidth,g,"L",this.chartWidth,v,"L",z,v,"Z"]:["M",0,0]})}})(L);(function(a){var B,C=a.each,G=
a.extend,p=a.erase,m=a.fireEvent,g=a.format,v=a.isArray,z=a.isNumber,u=a.pick,y=a.removeEvent;a.Point=B=function(){};a.Point.prototype={init:function(a,b,e){this.series=a;this.color=a.color;this.applyOptions(b,e);a.options.colorByPoint?(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter],b=b.length,e=a.colorCounter,a.colorCounter++,a.colorCounter===b&&(a.colorCounter=0)):e=a.colorIndex;this.colorIndex=u(this.colorIndex,e);a.chart.pointCount++;m(this,"afterInit");return this},
applyOptions:function(a,b){var e=this.series,l=e.options.pointValKey||e.pointValKey;a=B.prototype.optionsToObject.call(this,a);G(this,a);this.options=this.options?G(this.options,a):a;a.group&&delete this.group;l&&(this.y=this[l]);this.isNull=u(this.isValid&&!this.isValid(),null===this.x||!z(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===b&&e.xAxis&&e.xAxis.hasNames&&(this.x=e.xAxis.nameToX(this));void 0===this.x&&e&&(this.x=void 0===b?e.autoIncrement(this):b);return this},
setNestedProperty:function(l,b,e){e=e.split(".");a.reduce(e,function(e,l,f,c){e[l]=c.length-1===f?b:a.isObject(e[l],!0)?e[l]:{};return e[l]},l);return l},optionsToObject:function(l){var b={},e=this.series,t=e.options.keys,n=t||e.pointArrayMap||["y"],f=n.length,c=0,h=0;if(z(l)||null===l)b[n[0]]=l;else if(v(l))for(!t&&l.length>f&&(e=typeof l[0],"string"===e?b.name=l[0]:"number"===e&&(b.x=l[0]),c++);h<f;)t&&void 0===l[c]||(0<n[h].indexOf(".")?a.Point.prototype.setNestedProperty(b,l[c],n[h]):b[n[h]]=
l[c]),c++,h++;else"object"===typeof l&&(b=l,l.dataLabels&&(e._hasPointLabels=!0),l.marker&&(e._hasPointMarkers=!0));return b},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",
""):"")},getZone:function(){var a=this.series,b=a.zones,a=a.zoneAxis||"y",e=0,t;for(t=b[e];this[a]>=t.value;)t=b[++e];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=t&&t.color&&!this.options.color?t.color:this.nonZonedColor;return t},destroy:function(){var a=this.series.chart,b=a.hoverPoints,e;a.pointCount--;b&&(this.setState(),p(b,this),b.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)y(this),this.destroyElements();this.legendItem&&
a.legend.destroyItem(this);for(e in this)this[e]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],b,e=6;e--;)b=a[e],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,e=b.tooltipOptions,
l=u(e.valueDecimals,""),n=e.valuePrefix||"",f=e.valueSuffix||"";C(b.pointArrayMap||["y"],function(b){b="{point."+b;if(n||f)a=a.replace(RegExp(b+"}","g"),n+b+"}"+f);a=a.replace(RegExp(b+"}","g"),b+":,."+l+"f}")});return g(a,{point:this,series:this.series},b.chart.time)},firePointEvent:function(a,b,e){var l=this,n=this.series.options;(n.point.events[a]||l.options&&l.options.events&&l.options.events[a])&&this.importEvents();"click"===a&&n.allowPointSelect&&(e=function(a){l.select&&l.select(null,a.ctrlKey||
a.metaKey||a.shiftKey)});m(this,a,b,e)},visible:!0}})(L);(function(a){var B=a.addEvent,C=a.animObject,G=a.arrayMax,p=a.arrayMin,m=a.correctFloat,g=a.defaultOptions,v=a.defaultPlotOptions,z=a.defined,u=a.each,y=a.erase,l=a.extend,b=a.fireEvent,e=a.grep,t=a.isArray,n=a.isNumber,f=a.isString,c=a.merge,h=a.objectEach,w=a.pick,D=a.removeEvent,r=a.splat,J=a.SVGElement,q=a.syncTimeout,F=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},
marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,
softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,c){var d=this,f,e=a.series,k;d.chart=a;d.options=c=d.setOptions(c);d.linkedSeries=[];d.bindAxes();l(d,{name:c.name,
state:"",visible:!1!==c.visible,selected:!0===c.selected});f=c.events;h(f,function(a,b){B(d,b,a)});if(f&&f.click||c.point&&c.point.events&&c.point.events.click||c.allowPointSelect)a.runTrackerClick=!0;d.getColor();d.getSymbol();u(d.parallelArrays,function(a){d[a+"Data"]=[]});d.setData(c.data,!1);d.isCartesian&&(a.hasCartesianSeries=!0);e.length&&(k=e[e.length-1]);d._i=w(k&&k._i,-1)+1;a.orderSeries(this.insert(e));b(this,"afterInit")},insert:function(a){var b=this.options.index,d;if(n(b)){for(d=a.length;d--;)if(b>=
w(a[d].options.index,a[d]._i)){a.splice(d+1,0,this);break}-1===d&&a.unshift(this);d+=1}else a.push(this);return w(d,a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,f;u(b.axisTypes||[],function(e){u(d[e],function(a){f=a.options;if(c[e]===f.index||void 0!==c[e]&&c[e]===f.id||void 0===c[e]&&0===f.index)b.insert(a.series),b[e]=a,a.isDirty=!0});b[e]||b.optionalAxis===e||a.error(18,!0)})},updateParallelArrays:function(a,b){var d=a.series,c=arguments,f=n(b)?function(c){var k="y"===c&&d.toYData?
d.toYData(a):a[c];d[c+"Data"][b]=k}:function(a){Array.prototype[b].apply(d[a+"Data"],Array.prototype.slice.call(c,2))};u(d.parallelArrays,f)},autoIncrement:function(){var a=this.options,b=this.xIncrement,d,c=a.pointIntervalUnit,f=this.chart.time,b=w(b,a.pointStart,0);this.pointInterval=d=w(this.pointInterval,a.pointInterval,1);c&&(a=new f.Date(b),"day"===c?f.set("Date",a,f.get("Date",a)+d):"month"===c?f.set("Month",a,f.get("Month",a)+d):"year"===c&&f.set("FullYear",a,f.get("FullYear",a)+d),d=a.getTime()-
b);this.xIncrement=b+d;return b},setOptions:function(a){var f=this.chart,d=f.options,e=d.plotOptions,h=(f.userOptions||{}).plotOptions||{},k=e[this.type];this.userOptions=a;f=c(k,e.series,a);this.tooltipOptions=c(g.tooltip,g.plotOptions.series&&g.plotOptions.series.tooltip,g.plotOptions[this.type].tooltip,d.tooltip.userOptions,e.series&&e.series.tooltip,e[this.type].tooltip,a.tooltip);this.stickyTracking=w(a.stickyTracking,h[this.type]&&h[this.type].stickyTracking,h.series&&h.series.stickyTracking,
this.tooltipOptions.shared&&!this.noSharedTooltip?!0:f.stickyTracking);null===k.marker&&delete f.marker;this.zoneAxis=f.zoneAxis;a=this.zones=(f.zones||[]).slice();!f.negativeColor&&!f.negativeFillColor||f.zones||a.push({value:f[this.zoneAxis+"Threshold"]||f.threshold||0,className:"highcharts-negative",color:f.negativeColor,fillColor:f.negativeFillColor});a.length&&z(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});b(this,"afterSetOptions",{options:f});return f},getName:function(){return this.name||
"Series "+(this.index+1)},getCyclic:function(a,b,d){var c,f=this.chart,k=this.userOptions,e=a+"Index",h=a+"Counter",x=d?d.length:w(f.options.chart[a+"Count"],f[a+"Count"]);b||(c=w(k[e],k["_"+e]),z(c)||(f.series.length||(f[h]=0),k["_"+e]=c=f[h]%x,f[h]+=1),d&&(b=d[c]));void 0!==c&&(this[e]=c);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||v[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",
this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,updateData:function(b){var c=this.options,d=this.points,f=[],e,k,h,x=this.requireSorting;u(b,function(b){var k;k=a.defined(b)&&this.pointClass.prototype.optionsToObject.call({series:this},b).x;n(k)&&(k=a.inArray(k,this.xData,h),-1===k?f.push(b):b!==c.data[k]?(d[k].update(b,!1,null,!1),d[k].touched=!0,x&&(h=k)):d[k]&&(d[k].touched=!0),e=!0)},this);if(e)for(b=d.length;b--;)k=d[b],k.touched||k.remove(!1),
k.touched=!1;else if(b.length===d.length)u(b,function(a,b){d[b].update&&a!==c.data[b]&&d[b].update(a,!1,null,!1)});else return!1;u(f,function(a){this.addPoint(a,!1)},this);return!0},setData:function(b,c,d,e){var h=this,k=h.points,x=k&&k.length||0,q,l=h.options,r=h.chart,g=null,H=h.xAxis,F=l.turboThreshold,m=this.xData,D=this.yData,K=(q=h.pointArrayMap)&&q.length,J;b=b||[];q=b.length;c=w(c,!0);!1!==e&&q&&x&&!h.cropped&&!h.hasGroupedData&&h.visible&&(J=this.updateData(b));if(!J){h.xIncrement=null;h.colorCounter=
0;u(this.parallelArrays,function(a){h[a+"Data"].length=0});if(F&&q>F){for(d=0;null===g&&d<q;)g=b[d],d++;if(n(g))for(d=0;d<q;d++)m[d]=this.autoIncrement(),D[d]=b[d];else if(t(g))if(K)for(d=0;d<q;d++)g=b[d],m[d]=g[0],D[d]=g.slice(1,K+1);else for(d=0;d<q;d++)g=b[d],m[d]=g[0],D[d]=g[1];else a.error(12)}else for(d=0;d<q;d++)void 0!==b[d]&&(g={series:h},h.pointClass.prototype.applyOptions.apply(g,[b[d]]),h.updateParallelArrays(g,d));D&&f(D[0])&&a.error(14,!0);h.data=[];h.options.data=h.userOptions.data=
b;for(d=x;d--;)k[d]&&k[d].destroy&&k[d].destroy();H&&(H.minRange=H.userMinRange);h.isDirty=r.isDirtyBox=!0;h.isDirtyData=!!k;d=!1}"point"===l.legendType&&(this.processData(),this.generatePoints());c&&r.redraw(d)},processData:function(b){var c=this.xData,d=this.yData,f=c.length,e;e=0;var k,h,x=this.xAxis,q,l=this.options;q=l.cropThreshold;var r=this.getExtremesFromAll||l.getExtremesFromAll,n=this.isCartesian,l=x&&x.val2lin,g=x&&x.isLog,t=this.requireSorting,w,F;if(n&&!this.isDirty&&!x.isDirty&&!this.yAxis.isDirty&&
!b)return!1;x&&(b=x.getExtremes(),w=b.min,F=b.max);if(n&&this.sorted&&!r&&(!q||f>q||this.forceCrop))if(c[f-1]<w||c[0]>F)c=[],d=[];else if(c[0]<w||c[f-1]>F)e=this.cropData(this.xData,this.yData,w,F),c=e.xData,d=e.yData,e=e.start,k=!0;for(q=c.length||1;--q;)f=g?l(c[q])-l(c[q-1]):c[q]-c[q-1],0<f&&(void 0===h||f<h)?h=f:0>f&&t&&(a.error(15),t=!1);this.cropped=k;this.cropStart=e;this.processedXData=c;this.processedYData=d;this.closestPointRange=h},cropData:function(a,b,d,c,f){var k=a.length,e=0,h=k,x;f=
w(f,this.cropShoulder,1);for(x=0;x<k;x++)if(a[x]>=d){e=Math.max(0,x-f);break}for(d=x;d<k;d++)if(a[d]>c){h=d+f;break}return{xData:a.slice(e,h),yData:b.slice(e,h),start:e,end:h}},generatePoints:function(){var a=this.options,b=a.data,d=this.data,c,f=this.processedXData,k=this.processedYData,e=this.pointClass,h=f.length,q=this.cropStart||0,l,n=this.hasGroupedData,a=a.keys,g,t=[],w;d||n||(d=[],d.length=b.length,d=this.data=d);a&&n&&(this.options.keys=!1);for(w=0;w<h;w++)l=q+w,n?(g=(new e).init(this,[f[w]].concat(r(k[w]))),
g.dataGroup=this.groupMap[w]):(g=d[l])||void 0===b[l]||(d[l]=g=(new e).init(this,b[l],f[w])),g&&(g.index=l,t[w]=g);this.options.keys=a;if(d&&(h!==(c=d.length)||n))for(w=0;w<c;w++)w!==q||n||(w+=h),d[w]&&(d[w].destroyElements(),d[w].plotX=void 0);this.data=d;this.points=t},getExtremes:function(a){var b=this.yAxis,d=this.processedXData,c,f=[],k=0;c=this.xAxis.getExtremes();var e=c.min,h=c.max,q,x,l=this.requireSorting?1:0,r,g;a=a||this.stackedYData||this.processedYData||[];c=a.length;for(g=0;g<c;g++)if(x=
d[g],r=a[g],q=(n(r,!0)||t(r))&&(!b.positiveValuesOnly||r.length||0<r),x=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(d[g+l]||x)>=e&&(d[g-l]||x)<=h,q&&x)if(q=r.length)for(;q--;)"number"===typeof r[q]&&(f[k++]=r[q]);else f[k++]=r;this.dataMin=p(f);this.dataMax=G(f)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,c=a.stacking,d=this.xAxis,f=d.categories,e=this.yAxis,k=this.points,h=k.length,q=!!this.modifyValue,l=a.pointPlacement,
r="between"===l||n(l),g=a.threshold,t=a.startFromThreshold?g:0,F,D,J,u,v=Number.MAX_VALUE;"between"===l&&(l=.5);n(l)&&(l*=w(a.pointRange||d.pointRange));for(a=0;a<h;a++){var p=k[a],y=p.x,C=p.y;D=p.low;var B=c&&e.stacks[(this.negStacks&&C<(t?0:g)?"-":"")+this.stackKey],G;e.positiveValuesOnly&&null!==C&&0>=C&&(p.isNull=!0);p.plotX=F=m(Math.min(Math.max(-1E5,d.translate(y,0,0,0,1,l,"flags"===this.type)),1E5));c&&this.visible&&!p.isNull&&B&&B[y]&&(u=this.getStackIndicator(u,y,this.index),G=B[y],C=G.points[u.key],
D=C[0],C=C[1],D===t&&u.key===B[y].base&&(D=w(n(g)&&g,e.min)),e.positiveValuesOnly&&0>=D&&(D=null),p.total=p.stackTotal=G.total,p.percentage=G.total&&p.y/G.total*100,p.stackY=C,G.setOffset(this.pointXOffset||0,this.barW||0));p.yBottom=z(D)?Math.min(Math.max(-1E5,e.translate(D,0,1,0,1)),1E5):null;q&&(C=this.modifyValue(C,p));p.plotY=D="number"===typeof C&&Infinity!==C?Math.min(Math.max(-1E5,e.translate(C,0,1,0,1)),1E5):void 0;p.isInside=void 0!==D&&0<=D&&D<=e.len&&0<=F&&F<=d.len;p.clientX=r?m(d.translate(y,
0,0,0,1,l)):F;p.negative=p.y<(g||0);p.category=f&&void 0!==f[p.x]?f[p.x]:p.x;p.isNull||(void 0!==J&&(v=Math.min(v,Math.abs(F-J))),J=F);p.zone=this.zones.length&&p.getZone()}this.closestPointRangePx=v;b(this,"afterTranslate")},getValidPoints:function(a,b){var d=this.chart;return e(a||this.points||[],function(a){return b&&!d.isInsidePlot(a.plotX,a.plotY,d.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,d=this.options,c=b.renderer,f=b.inverted,k=this.clipBox,e=k||b.clipBox,h=this.sharedClipKey||
["_sharedClip",a&&a.duration,a&&a.easing,e.height,d.xAxis,d.yAxis].join(),q=b[h],l=b[h+"m"];q||(a&&(e.width=0,f&&(e.x=b.plotSizeX),b[h+"m"]=l=c.clipRect(f?b.plotSizeX+99:-99,f?-b.plotLeft:-b.plotTop,99,f?b.chartWidth:b.chartHeight)),b[h]=q=c.clipRect(e),q.count={length:0});a&&!q.count[this.index]&&(q.count[this.index]=!0,q.count.length+=1);!1!==d.clip&&(this.group.clip(a||k?q:b.clipRect),this.markerGroup.clip(l),this.sharedClipKey=h);a||(q.count[this.index]&&(delete q.count[this.index],--q.count.length),
0===q.count.length&&h&&b[h]&&(k||(b[h]=b[h].destroy()),b[h+"m"]&&(b[h+"m"]=b[h+"m"].destroy())))},animate:function(a){var b=this.chart,d=C(this.options.animation),c;a?this.setClip(d):(c=this.sharedClipKey,(a=b[c])&&a.animate({width:b.plotSizeX,x:0},d),b[c+"m"]&&b[c+"m"].animate({width:b.plotSizeX+99,x:0},d),this.animate=null)},afterAnimate:function(){this.setClip();b(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,d,c,f,k,e=this.options.marker,
h,q,l,r=this[this.specialGroup]||this.markerGroup,g,n=w(e.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=e.enabledThreshold*e.radius);if(!1!==e.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++)c=a[d],k=c.graphic,h=c.marker||{},q=!!c.marker,f=n&&void 0===h.enabled||h.enabled,l=c.isInside,f&&!c.isNull?(f=w(h.symbol,this.symbol),g=this.markerAttribs(c,c.selected&&"select"),k?k[l?"show":"hide"](!0).animate(g):l&&(0<g.width||c.hasImage)&&(c.graphic=k=b.renderer.symbol(f,g.x,g.y,g.width,
g.height,q?h:e).add(r)),k&&k.attr(this.pointAttribs(c,c.selected&&"select")),k&&k.addClass(c.getClassName(),!0)):k&&(c.graphic=k.destroy())},markerAttribs:function(a,b){var d=this.options.marker,c=a.marker||{},f=c.symbol||d.symbol,k=w(c.radius,d.radius);b&&(d=d.states[b],b=c.states&&c.states[b],k=w(b&&b.radius,d&&d.radius,k+(d&&d.radiusPlus||0)));a.hasImage=f&&0===f.indexOf("url");a.hasImage&&(k=0);a={x:Math.floor(a.plotX)-k,y:a.plotY-k};k&&(a.width=a.height=2*k);return a},pointAttribs:function(a,
b){var d=this.options.marker,c=a&&a.options,f=c&&c.marker||{},k=this.color,e=c&&c.color,h=a&&a.color,c=w(f.lineWidth,d.lineWidth);a=a&&a.zone&&a.zone.color;k=e||a||h||k;a=f.fillColor||d.fillColor||k;k=f.lineColor||d.lineColor||k;b&&(d=d.states[b],b=f.states&&f.states[b]||{},c=w(b.lineWidth,d.lineWidth,c+w(b.lineWidthPlus,d.lineWidthPlus,0)),a=b.fillColor||d.fillColor||a,k=b.lineColor||d.lineColor||k);return{stroke:k,"stroke-width":c,fill:a}},destroy:function(){var c=this,f=c.chart,d=/AppleWebKit\/533/.test(F.navigator.userAgent),
e,q,k=c.data||[],l,r;b(c,"destroy");D(c);u(c.axisTypes||[],function(a){(r=c[a])&&r.series&&(y(r.series,c),r.isDirty=r.forceRedraw=!0)});c.legendItem&&c.chart.legend.destroyItem(c);for(q=k.length;q--;)(l=k[q])&&l.destroy&&l.destroy();c.points=null;a.clearTimeout(c.animationTimeout);h(c,function(a,b){a instanceof J&&!a.survive&&(e=d&&"group"===b?"hide":"destroy",a[e]())});f.hoverSeries===c&&(f.hoverSeries=null);y(f.series,c);f.orderSeries();h(c,function(a,b){delete c[b]})},getGraphPath:function(a,b,
d){var c=this,f=c.options,k=f.step,e,h=[],q=[],l;a=a||c.points;(e=a.reversed)&&a.reverse();(k={right:1,center:2}[k]||k&&3)&&e&&(k=4-k);!f.connectNulls||b||d||(a=this.getValidPoints(a));u(a,function(e,r){var x=e.plotX,g=e.plotY,n=a[r-1];(e.leftCliff||n&&n.rightCliff)&&!d&&(l=!0);e.isNull&&!z(b)&&0<r?l=!f.connectNulls:e.isNull&&!b?l=!0:(0===r||l?r=["M",e.plotX,e.plotY]:c.getPointSpline?r=c.getPointSpline(a,e,r):k?(r=1===k?["L",n.plotX,g]:2===k?["L",(n.plotX+x)/2,n.plotY,"L",(n.plotX+x)/2,g]:["L",x,
n.plotY],r.push("L",x,g)):r=["L",x,g],q.push(e.x),k&&(q.push(e.x),2===k&&q.push(e.x)),h.push.apply(h,r),l=!1)});h.xMap=q;return c.graphPath=h},drawGraph:function(){var a=this,b=this.options,d=(this.gappedPath||this.getGraphPath).call(this),c=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]],c=a.getZonesGraphs(c);u(c,function(c,f){var k=c[0],e=a[k];e?(e.endX=a.preventGraphAnimation?null:d.xMap,e.animate({d:d})):d.length&&(a[k]=a.chart.renderer.path(d).addClass(c[1]).attr({zIndex:1}).add(a.group),
e={stroke:c[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},c[3]?e.dashstyle=c[3]:"square"!==b.linecap&&(e["stroke-linecap"]=e["stroke-linejoin"]="round"),e=a[k].attr(e).shadow(2>f&&b.shadow));e&&(e.startX=d.xMap,e.isArea=d.isArea)})},getZonesGraphs:function(a){u(this.zones,function(b,d){a.push(["zone-graph-"+d,"highcharts-graph highcharts-zone-graph-"+d+" "+(b.className||""),b.color||this.color,b.dashStyle||this.options.dashStyle])},this);return a},applyZones:function(){var a=this,
b=this.chart,d=b.renderer,c=this.zones,f,k,e=this.clips||[],h,q=this.graph,l=this.area,r=Math.max(b.chartWidth,b.chartHeight),g=this[(this.zoneAxis||"y")+"Axis"],n,t,F=b.inverted,D,m,J,p,v=!1;c.length&&(q||l)&&g&&void 0!==g.min&&(t=g.reversed,D=g.horiz,q&&!this.showLine&&q.hide(),l&&l.hide(),n=g.getExtremes(),u(c,function(c,x){f=t?D?b.plotWidth:0:D?0:g.toPixels(n.min);f=Math.min(Math.max(w(k,f),0),r);k=Math.min(Math.max(Math.round(g.toPixels(w(c.value,n.max),!0)),0),r);v&&(f=k=g.toPixels(n.max));
m=Math.abs(f-k);J=Math.min(f,k);p=Math.max(f,k);g.isXAxis?(h={x:F?p:J,y:0,width:m,height:r},D||(h.x=b.plotHeight-h.x)):(h={x:0,y:F?p:J,width:r,height:m},D&&(h.y=b.plotWidth-h.y));F&&d.isVML&&(h=g.isXAxis?{x:0,y:t?J:p,height:h.width,width:b.chartWidth}:{x:h.y-b.plotLeft-b.spacingBox.x,y:0,width:h.height,height:b.chartHeight});e[x]?e[x].animate(h):(e[x]=d.clipRect(h),q&&a["zone-graph-"+x].clip(e[x]),l&&a["zone-area-"+x].clip(e[x]));v=c.value>n.max;a.resetZones&&0===k&&(k=void 0)}),this.clips=e)},invertGroups:function(a){function b(){u(["group",
"markerGroup"],function(b){d[b]&&(c.renderer.isVML&&d[b].attr({width:d.yAxis.len,height:d.xAxis.len}),d[b].width=d.yAxis.len,d[b].height=d.xAxis.len,d[b].invert(a))})}var d=this,c=d.chart,f;d.xAxis&&(f=B(c,"resize",b),B(d,"destroy",f),b(a),d.invertGroups=b)},plotGroup:function(a,b,d,c,f){var k=this[a],e=!k;e&&(this[a]=k=this.chart.renderer.g().attr({zIndex:c||.1}).add(f));k.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(z(this.colorIndex)?"highcharts-color-"+
this.colorIndex+" ":"")+(this.options.className||"")+(k.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);k.attr({visibility:d})[e?"attr":"animate"](this.getPlotBox());return k},getPlotBox:function(){var a=this.chart,b=this.xAxis,d=this.yAxis;a.inverted&&(b=d,d=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:d?d.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,c=a.chart,d,f=a.options,e=!!a.animate&&c.renderer.isSVG&&C(f.animation).duration,k=a.visible?"inherit":
"hidden",h=f.zIndex,l=a.hasRendered,r=c.seriesGroup,g=c.inverted;d=a.plotGroup("group","series",k,h,r);a.markerGroup=a.plotGroup("markerGroup","markers",k,h,r);e&&a.animate(!0);d.inverted=a.isCartesian?g:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(g);!1===f.clip||a.sharedClipKey||l||d.clip(c.clipRect);e&&a.animate();l||(a.animationTimeout=q(function(){a.afterAnimate()},
e));a.isDirty=!1;a.hasRendered=!0;b(a,"afterRender")},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,d=this.group,c=this.xAxis,f=this.yAxis;d&&(a.inverted&&d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:w(c&&c.left,a.plotLeft),translateY:w(f&&f.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var d=this.xAxis,c=this.yAxis,f=this.chart.inverted;return this.searchKDTree({clientX:f?
d.len-a.chartY+d.pos:a.chartX-d.pos,plotY:f?c.len-a.chartX+c.pos:a.chartY-c.pos},b)},buildKDTree:function(){function a(d,c,f){var k,e;if(e=d&&d.length)return k=b.kdAxisArray[c%f],d.sort(function(a,b){return a[k]-b[k]}),e=Math.floor(e/2),{point:d[e],left:a(d.slice(0,e),c+1,f),right:a(d.slice(e+1),c+1,f)}}this.buildingKdTree=!0;var b=this,d=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;q(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),d,d);b.buildingKdTree=!1},b.options.kdNow?
0:1)},searchKDTree:function(a,b){function d(a,b,h,q){var l=b.point,r=c.kdAxisArray[h%q],g,n,t=l;n=z(a[f])&&z(l[f])?Math.pow(a[f]-l[f],2):null;g=z(a[k])&&z(l[k])?Math.pow(a[k]-l[k],2):null;g=(n||0)+(g||0);l.dist=z(g)?Math.sqrt(g):Number.MAX_VALUE;l.distX=z(n)?Math.sqrt(n):Number.MAX_VALUE;r=a[r]-l[r];g=0>r?"left":"right";n=0>r?"right":"left";b[g]&&(g=d(a,b[g],h+1,q),t=g[e]<t[e]?g:l);b[n]&&Math.sqrt(r*r)<t[e]&&(a=d(a,b[n],h+1,q),t=a[e]<t[e]?a:t);return t}var c=this,f=this.kdAxisArray[0],k=this.kdAxisArray[1],
e=b?"distX":"dist";b=-1<c.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return d(a,this.kdTree,b,b)}})})(L);(function(a){var B=a.Axis,C=a.Chart,G=a.correctFloat,p=a.defined,m=a.destroyObjectProperties,g=a.each,v=a.format,z=a.objectEach,u=a.pick,y=a.Series;a.StackItem=function(a,b,e,g,n){var f=a.chart.inverted;this.axis=a;this.isNegative=e;this.options=b;this.x=g;this.total=null;this.points={};this.stack=n;this.rightCliff=this.leftCliff=
0;this.alignOptions={align:b.align||(f?e?"left":"right":"center"),verticalAlign:b.verticalAlign||(f?"middle":e?"bottom":"top"),y:u(b.y,f?4:e?14:-6),x:u(b.x,f?e?-6:6:0)};this.textAlign=b.textAlign||(f?e?"right":"left":"center")};a.StackItem.prototype={destroy:function(){m(this,this.axis)},render:function(a){var b=this.axis.chart,e=this.options,l=e.format,l=l?v(l,this,b.time):e.formatter.call(this);this.label?this.label.attr({text:l,visibility:"hidden"}):this.label=b.renderer.text(l,null,null,e.useHTML).css(e.style).attr({align:this.textAlign,
rotation:e.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,b){var e=this.axis,l=e.chart,g=e.translate(e.usePercentage?100:this.total,0,0,0,1),f=e.translate(0),f=Math.abs(g-f);a=l.xAxis[0].translate(this.x)+a;e=this.getStackBox(l,this,a,g,b,f,e);if(b=this.label)b.align(this.alignOptions,null,e),e=b.alignAttr,b[!1===this.options.crop||l.isInsidePlot(e.x,e.y)?"show":"hide"](!0)},getStackBox:function(a,b,e,g,n,f,c){var h=b.axis.reversed,l=a.inverted;a=c.height+c.pos-a.plotTop;b=b.isNegative&&
!h||!b.isNegative&&h;return{x:l?b?g:g-f:e,y:l?a-e-n:b?a-g-f:a-g,width:l?f:n,height:l?n:f}}};C.prototype.getStacks=function(){var a=this;g(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});g(a.series,function(b){!b.options.stacking||!0!==b.visible&&!1!==a.options.chart.ignoreHiddenSeries||(b.stackKey=b.type+u(b.options.stack,""))})};B.prototype.buildStacks=function(){var a=this.series,b=u(this.options.reversedStacks,!0),e=a.length,g;if(!this.isXAxis){this.usePercentage=!1;
for(g=e;g--;)a[b?g:e-g-1].setStackedPoints();for(g=0;g<e;g++)a[g].modifyStacks()}};B.prototype.renderStackTotals=function(){var a=this.chart,b=a.renderer,e=this.stacks,g=this.stackTotalGroup;g||(this.stackTotalGroup=g=b.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());g.translate(a.plotLeft,a.plotTop);z(e,function(a){z(a,function(a){a.render(g)})})};B.prototype.resetStacks=function(){var a=this,b=a.stacks;a.isXAxis||z(b,function(b){z(b,function(e,l){e.touched<a.stacksTouched?(e.destroy(),
delete b[l]):(e.total=null,e.cumulative=null)})})};B.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),z(a,function(a){z(a,function(a){a.cumulative=a.total})}))};y.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var l=this.processedXData,b=this.processedYData,e=[],g=b.length,n=this.options,f=n.threshold,c=u(n.startFromThreshold&&f,0),h=n.stack,n=n.stacking,w=this.stackKey,
D="-"+w,r=this.negStacks,m=this.yAxis,q=m.stacks,F=m.oldStacks,x,v,d,H,E,k,A;m.stacksTouched+=1;for(E=0;E<g;E++)k=l[E],A=b[E],x=this.getStackIndicator(x,k,this.index),H=x.key,d=(v=r&&A<(c?0:f))?D:w,q[d]||(q[d]={}),q[d][k]||(F[d]&&F[d][k]?(q[d][k]=F[d][k],q[d][k].total=null):q[d][k]=new a.StackItem(m,m.options.stackLabels,v,k,h)),d=q[d][k],null!==A?(d.points[H]=d.points[this.index]=[u(d.cumulative,c)],p(d.cumulative)||(d.base=H),d.touched=m.stacksTouched,0<x.index&&!1===this.singleStacks&&(d.points[H][0]=
d.points[this.index+","+k+",0"][0])):d.points[H]=d.points[this.index]=null,"percent"===n?(v=v?w:D,r&&q[v]&&q[v][k]?(v=q[v][k],d.total=v.total=Math.max(v.total,d.total)+Math.abs(A)||0):d.total=G(d.total+(Math.abs(A)||0))):d.total=G(d.total+(A||0)),d.cumulative=u(d.cumulative,c)+(A||0),null!==A&&(d.points[H].push(d.cumulative),e[E]=d.cumulative);"percent"===n&&(m.usePercentage=!0);this.stackedYData=e;m.oldStacks={}}};y.prototype.modifyStacks=function(){var a=this,b=a.stackKey,e=a.yAxis.stacks,t=a.processedXData,
n,f=a.options.stacking;a[f+"Stacker"]&&g([b,"-"+b],function(b){for(var c=t.length,l,g;c--;)if(l=t[c],n=a.getStackIndicator(n,l,a.index,b),g=(l=e[b]&&e[b][l])&&l.points[n.key])a[f+"Stacker"](g,l,c)})};y.prototype.percentStacker=function(a,b,e){b=b.total?100/b.total:0;a[0]=G(a[0]*b);a[1]=G(a[1]*b);this.stackedYData[e]=a[1]};y.prototype.getStackIndicator=function(a,b,e,g){!p(a)||a.x!==b||g&&a.key!==g?a={x:b,index:0,key:g}:a.index++;a.key=[e,b,a.index].join();return a}})(L);(function(a){var B=a.addEvent,
C=a.animate,G=a.Axis,p=a.createElement,m=a.css,g=a.defined,v=a.each,z=a.erase,u=a.extend,y=a.fireEvent,l=a.inArray,b=a.isNumber,e=a.isObject,t=a.isArray,n=a.merge,f=a.objectEach,c=a.pick,h=a.Point,w=a.Series,D=a.seriesTypes,r=a.setAnimation,J=a.splat;u(a.Chart.prototype,{addSeries:function(a,b,f){var e,d=this;a&&(b=c(b,!0),y(d,"addSeries",{options:a},function(){e=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();y(d,"afterAddSeries");b&&d.redraw(f)}));return e},addAxis:function(a,b,f,e){var d=b?"xAxis":
"yAxis",h=this.options;a=n(a,{index:this[d].length,isX:b});b=new G(this,a);h[d]=J(h[d]||{});h[d].push(a);c(f,!0)&&this.redraw(e);return b},showLoading:function(a){var b=this,c=b.options,f=b.loadingDiv,d=c.loading,e=function(){f&&m(f,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};f||(b.loadingDiv=f=p("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=p("span",{className:"highcharts-loading-inner"},null,f),B(b,
"redraw",e));f.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;m(f,u(d.style,{zIndex:10}));m(b.loadingSpan,d.labelStyle);b.loadingShown||(m(f,{opacity:0,display:""}),C(f,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));b.loadingShown=!0;e()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",C(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){m(b,{display:"none"})}}));
this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),update:function(a,e,h,r){var d=this,q={credits:"addCredits",
title:"setTitle",subtitle:"setSubtitle"},x=a.chart,k,t,w=[];y(d,"update",{options:a});if(x){n(!0,d.options.chart,x);"className"in x&&d.setClassName(x.className);"reflow"in x&&d.setReflow(x.reflow);if("inverted"in x||"polar"in x)d.propFromSeries(),k=!0;"alignTicks"in x&&(k=!0);f(x,function(a,b){-1!==l("chart."+b,d.propsRequireUpdateSeries)&&(t=!0);-1!==l(b,d.propsRequireDirtyBox)&&(d.isDirtyBox=!0)});"style"in x&&d.renderer.setStyle(x.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&
n(!0,this.options.plotOptions,a.plotOptions);f(a,function(a,b){if(d[b]&&"function"===typeof d[b].update)d[b].update(a,!1);else if("function"===typeof d[q[b]])d[q[b]](a);"chart"!==b&&-1!==l(b,d.propsRequireUpdateSeries)&&(t=!0)});v("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){a[b]&&(v(J(a[b]),function(a,c){(c=g(a.id)&&d.get(a.id)||d[b][c])&&c.coll===b&&(c.update(a,!1),h&&(c.touched=!0));if(!c&&h)if("series"===b)d.addSeries(a,!1).touched=!0;else if("xAxis"===b||"yAxis"===b)d.addAxis(a,
"xAxis"===b,!1).touched=!0}),h&&v(d[b],function(a){a.touched?delete a.touched:w.push(a)}))});v(w,function(a){a.remove(!1)});k&&v(d.axes,function(a){a.update({},!1)});t&&v(d.series,function(a){a.update({},!1)});a.loading&&n(!0,d.options.loading,a.loading);k=x&&x.width;x=x&&x.height;b(k)&&k!==d.chartWidth||b(x)&&x!==d.chartHeight?d.setSize(k,x,r):c(e,!0)&&d.redraw(r)},setSubtitle:function(a){this.setTitle(void 0,a)}});u(h.prototype,{update:function(a,b,f,h){function d(){q.applyOptions(a);null===q.y&&
k&&(q.graphic=k.destroy());e(a,!0)&&(k&&k.element&&a&&a.marker&&void 0!==a.marker.symbol&&(q.graphic=k.destroy()),a&&a.dataLabels&&q.dataLabel&&(q.dataLabel=q.dataLabel.destroy()),q.connector&&(q.connector=q.connector.destroy()));g=q.index;l.updateParallelArrays(q,g);n.data[g]=e(n.data[g],!0)||e(a,!0)?q.options:c(a,n.data[g]);l.isDirty=l.isDirtyData=!0;!l.fixedBox&&l.hasCartesianSeries&&(r.isDirtyBox=!0);"point"===n.legendType&&(r.isDirtyLegend=!0);b&&r.redraw(f)}var q=this,l=q.series,k=q.graphic,
g,r=l.chart,n=l.options;b=c(b,!0);!1===h?d():q.firePointEvent("update",{options:a},d)},remove:function(a,b){this.series.removePoint(l(this,this.series.data),a,b)}});u(w.prototype,{addPoint:function(a,b,f,e){var d=this.options,h=this.data,q=this.chart,k=this.xAxis,k=k&&k.hasNames&&k.names,l=d.data,g,r,n=this.xData,x,t;b=c(b,!0);g={series:this};this.pointClass.prototype.applyOptions.apply(g,[a]);t=g.x;x=n.length;if(this.requireSorting&&t<n[x-1])for(r=!0;x&&n[x-1]>t;)x--;this.updateParallelArrays(g,
"splice",x,0,0);this.updateParallelArrays(g,x);k&&g.name&&(k[t]=g.name);l.splice(x,0,a);r&&(this.data.splice(x,0,null),this.processData());"point"===d.legendType&&this.generatePoints();f&&(h[0]&&h[0].remove?h[0].remove(!1):(h.shift(),this.updateParallelArrays(g,"shift"),l.shift()));this.isDirtyData=this.isDirty=!0;b&&q.redraw(e)},removePoint:function(a,b,f){var e=this,d=e.data,h=d[a],q=e.points,k=e.chart,l=function(){q&&q.length===d.length&&q.splice(a,1);d.splice(a,1);e.options.data.splice(a,1);e.updateParallelArrays(h||
{series:e},"splice",a,1);h&&h.destroy();e.isDirty=!0;e.isDirtyData=!0;b&&k.redraw()};r(f,k);b=c(b,!0);h?h.firePointEvent("remove",null,l):l()},remove:function(a,b,f){function e(){d.destroy();h.isDirtyLegend=h.isDirtyBox=!0;h.linkSeries();c(a,!0)&&h.redraw(b)}var d=this,h=d.chart;!1!==f?y(d,"remove",null,e):e()},update:function(b,f){var e=this,h=e.chart,d=e.userOptions,q=e.oldType||e.type,g=b.type||d.type||h.options.chart.type,k=D[q].prototype,r,t=["group","markerGroup","dataLabelsGroup"],w=["navigatorSeries",
"baseSeries"],m=e.finishedAnimating&&{animation:!1},F=["data","name","turboThreshold"],J=a.keys(b),p=0<J.length;v(J,function(a){-1===l(a,F)&&(p=!1)});if(p)b.data&&this.setData(b.data,!1),b.name&&this.setName(b.name,!1);else{w=t.concat(w);v(w,function(a){w[a]=e[a];delete e[a]});b=n(d,m,{index:e.index,pointStart:c(d.pointStart,e.xData[0])},{data:e.options.data},b);e.remove(!1,null,!1);for(r in k)e[r]=void 0;D[g||q]?u(e,D[g||q].prototype):a.error(17,!0);v(w,function(a){e[a]=w[a]});e.init(h,b);b.zIndex!==
d.zIndex&&v(t,function(a){e[a]&&e[a].attr({zIndex:b.zIndex})});e.oldType=q;h.linkSeries()}y(this,"afterUpdate");c(f,!0)&&h.redraw(!1)},setName:function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0}});u(G.prototype,{update:function(a,b){var f=this.chart;a=n(this.userOptions,a);f.options[this.coll].indexOf&&(f.options[this.coll][f.options[this.coll].indexOf(this.userOptions)]=a);this.destroy(!0);this.init(f,u(a,{events:void 0}));f.isDirtyBox=!0;c(b,!0)&&f.redraw()},
remove:function(a){for(var b=this.chart,f=this.coll,e=this.series,d=e.length;d--;)e[d]&&e[d].remove(!1);z(b.axes,this);z(b[f],this);t(b.options[f])?b.options[f].splice(this.options.index,1):delete b.options[f];v(b[f],function(a,b){a.options.index=a.userOptions.index=b});this.destroy();b.isDirtyBox=!0;c(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(L);(function(a){var B=a.color,C=a.each,G=a.map,p=a.pick,m=a.Series,
g=a.seriesType;g("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(g){var m=[],u=[],v=this.xAxis,l=this.yAxis,b=l.stacks[this.stackKey],e={},t=this.index,n=l.series,f=n.length,c,h=p(l.options.reversedStacks,!0)?1:-1,w;g=g||this.points;if(this.options.stacking){for(w=0;w<g.length;w++)g[w].leftNull=g[w].rightNull=null,e[g[w].x]=g[w];a.objectEach(b,function(a,b){null!==a.total&&u.push(b)});u.sort(function(a,b){return a-b});c=G(n,function(){return this.visible});C(u,
function(a,g){var r=0,q,n;if(e[a]&&!e[a].isNull)m.push(e[a]),C([-1,1],function(l){var r=1===l?"rightNull":"leftNull",d=0,x=b[u[g+l]];if(x)for(w=t;0<=w&&w<f;)q=x.points[w],q||(w===t?e[a][r]=!0:c[w]&&(n=b[a].points[w])&&(d-=n[1]-n[0])),w+=h;e[a][1===l?"rightCliff":"leftCliff"]=d});else{for(w=t;0<=w&&w<f;){if(q=b[a].points[w]){r=q[1];break}w+=h}r=l.translate(r,0,1,0,1);m.push({isNull:!0,plotX:v.translate(a,0,0,0,1),x:a,plotY:r,yBottom:r})}})}return m},getGraphPath:function(a){var g=m.prototype.getGraphPath,
u=this.options,v=u.stacking,l=this.yAxis,b,e,t=[],n=[],f=this.index,c,h=l.stacks[this.stackKey],w=u.threshold,D=l.getThreshold(u.threshold),r,u=u.connectNulls||"percent"===v,J=function(b,e,g){var q=a[b];b=v&&h[q.x].points[f];var d=q[g+"Null"]||0;g=q[g+"Cliff"]||0;var r,x,q=!0;g||d?(r=(d?b[0]:b[1])+g,x=b[0]+g,q=!!d):!v&&a[e]&&a[e].isNull&&(r=x=w);void 0!==r&&(n.push({plotX:c,plotY:null===r?D:l.getThreshold(r),isNull:q,isCliff:!0}),t.push({plotX:c,plotY:null===x?D:l.getThreshold(x),doCurve:!1}))};a=
a||this.points;v&&(a=this.getStackPoints(a));for(b=0;b<a.length;b++)if(e=a[b].isNull,c=p(a[b].rectPlotX,a[b].plotX),r=p(a[b].yBottom,D),!e||u)u||J(b,b-1,"left"),e&&!v&&u||(n.push(a[b]),t.push({x:b,plotX:c,plotY:r})),u||J(b,b+1,"right");b=g.call(this,n,!0,!0);t.reversed=!0;e=g.call(this,t,!0,!0);e.length&&(e[0]="L");e=b.concat(e);g=g.call(this,n,!1,u);e.xMap=b.xMap;this.areaPath=e;return g},drawGraph:function(){this.areaPath=[];m.prototype.drawGraph.apply(this);var a=this,g=this.areaPath,u=this.options,
y=[["area","highcharts-area",this.color,u.fillColor]];C(this.zones,function(g,b){y.push(["zone-area-"+b,"highcharts-area highcharts-zone-area-"+b+" "+g.className,g.color||a.color,g.fillColor||u.fillColor])});C(y,function(l){var b=l[0],e=a[b];e?(e.endX=a.preventGraphAnimation?null:g.xMap,e.animate({d:g})):(e=a[b]=a.chart.renderer.path(g).addClass(l[1]).attr({fill:p(l[3],B(l[2]).setOpacity(p(u.fillOpacity,.75)).get()),zIndex:0}).add(a.group),e.isArea=!0);e.startX=g.xMap;e.shiftUnit=u.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);
(function(a){var B=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,G,p){var m=G.plotX,g=G.plotY,v=a[p-1];p=a[p+1];var z,u,y,l;if(v&&!v.isNull&&!1!==v.doCurve&&!G.isCliff&&p&&!p.isNull&&!1!==p.doCurve&&!G.isCliff){a=v.plotY;y=p.plotX;p=p.plotY;var b=0;z=(1.5*m+v.plotX)/2.5;u=(1.5*g+a)/2.5;y=(1.5*m+y)/2.5;l=(1.5*g+p)/2.5;y!==z&&(b=(l-u)*(y-m)/(y-z)+g-l);u+=b;l+=b;u>a&&u>g?(u=Math.max(a,g),l=2*g-u):u<a&&u<g&&(u=Math.min(a,g),l=2*g-u);l>p&&l>g?(l=Math.max(p,g),u=2*g-l):l<p&&l<g&&
(l=Math.min(p,g),u=2*g-l);G.rightContX=y;G.rightContY=l}G=["C",B(v.rightContX,v.plotX),B(v.rightContY,v.plotY),B(z,m),B(u,g),m,g];v.rightContX=v.rightContY=null;return G}})})(L);(function(a){var B=a.seriesTypes.area.prototype,C=a.seriesType;C("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:B.getStackPoints,getGraphPath:B.getGraphPath,drawGraph:B.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var B=a.animObject,C=a.color,G=a.each,p=a.extend,m=a.isNumber,
g=a.merge,v=a.pick,z=a.Series,u=a.seriesType,y=a.svg;u("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],
negStacks:!0,init:function(){z.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&G(b.series,function(b){b.type===a.type&&(b.isDirty=!0)})},getColumnMetrics:function(){var a=this,b=a.options,e=a.xAxis,g=a.yAxis,n=e.reversed,f,c={},h=0;!1===b.grouping?h=1:G(a.chart.series,function(b){var e=b.options,l=b.yAxis,r;b.type!==a.type||!b.visible&&a.chart.options.chart.ignoreHiddenSeries||g.len!==l.len||g.pos!==l.pos||(e.stacking?(f=b.stackKey,void 0===c[f]&&(c[f]=h++),r=c[f]):!1!==e.grouping&&
(r=h++),b.columnIndex=r)});var w=Math.min(Math.abs(e.transA)*(e.ordinalSlope||b.pointRange||e.closestPointRange||e.tickInterval||1),e.len),m=w*b.groupPadding,r=(w-2*m)/(h||1),b=Math.min(b.maxPointWidth||e.len,v(b.pointWidth,r*(1-2*b.pointPadding)));a.columnMetrics={width:b,offset:(r-b)/2+(m+((a.columnIndex||0)+(n?1:0))*r-w/2)*(n?-1:1)};return a.columnMetrics},crispCol:function(a,b,e,g){var l=this.chart,f=this.borderWidth,c=-(f%2?.5:0),f=f%2?.5:1;l.inverted&&l.renderer.isVML&&(f+=1);this.options.crisp&&
(e=Math.round(a+e)+c,a=Math.round(a)+c,e-=a);g=Math.round(b+g)+f;c=.5>=Math.abs(b)&&.5<g;b=Math.round(b)+f;g-=b;c&&g&&(--b,g+=1);return{x:a,y:b,width:e,height:g}},translate:function(){var a=this,b=a.chart,e=a.options,g=a.dense=2>a.closestPointRange*a.xAxis.transA,g=a.borderWidth=v(e.borderWidth,g?0:1),n=a.yAxis,f=e.threshold,c=a.translatedThreshold=n.getThreshold(f),h=v(e.minPointLength,5),w=a.getColumnMetrics(),m=w.width,r=a.barW=Math.max(m,1+2*g),J=a.pointXOffset=w.offset;b.inverted&&(c-=.5);e.pointPadding&&
(r=Math.ceil(r));z.prototype.translate.apply(a);G(a.points,function(e){var g=v(e.yBottom,c),q=999+Math.abs(g),q=Math.min(Math.max(-q,e.plotY),n.len+q),l=e.plotX+J,d=r,t=Math.min(q,g),w,k=Math.max(q,g)-t;h&&Math.abs(k)<h&&(k=h,w=!n.reversed&&!e.negative||n.reversed&&e.negative,e.y===f&&a.dataMax<=f&&n.min<f&&(w=!w),t=Math.abs(t-c)>h?g-h:c-(w?h:0));e.barX=l;e.pointWidth=m;e.tooltipPos=b.inverted?[n.len+n.pos-b.plotLeft-q,a.xAxis.len-l-d/2,k]:[l+d/2,q+n.pos-b.plotTop,k];e.shapeType="rect";e.shapeArgs=
a.crispCol.apply(a,e.isNull?[l,c,d,0]:[l,t,d,k])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,b){var e=this.options,l,n=this.pointAttrToOptions||{};l=n.stroke||"borderColor";var f=n["stroke-width"]||"borderWidth",c=a&&a.color||this.color,h=a&&a[l]||e[l]||this.color||c,w=a&&a[f]||e[f]||this[f]||0,n=e.dashStyle;a&&this.zones.length&&(c=a.getZone(),c=a.options.color||
c&&c.color||this.color);b&&(a=g(e.states[b],a.options.states&&a.options.states[b]||{}),b=a.brightness,c=a.color||void 0!==b&&C(c).brighten(a.brightness).get()||c,h=a[l]||h,w=a[f]||w,n=a.dashStyle||n);l={fill:c,stroke:h,"stroke-width":w};n&&(l.dashstyle=n);return l},drawPoints:function(){var a=this,b=this.chart,e=a.options,t=b.renderer,n=e.animationLimit||250,f;G(a.points,function(c){var h=c.graphic,l=h&&b.pointCount<n?"animate":"attr";if(m(c.plotY)&&null!==c.y){f=c.shapeArgs;if(h)h[l](g(f));else c.graphic=
h=t[c.shapeType](f).add(c.group||a.group);e.borderRadius&&h.attr({r:e.borderRadius});h[l](a.pointAttribs(c,c.selected&&"select")).shadow(e.shadow,null,e.stacking&&!e.borderRadius);h.addClass(c.getClassName(),!0)}else h&&(c.graphic=h.destroy())})},animate:function(a){var b=this,e=this.yAxis,g=b.options,l=this.chart.inverted,f={},c=l?"translateX":"translateY",h;y&&(a?(f.scaleY=.001,a=Math.min(e.pos+e.len,Math.max(e.pos,e.toPixels(g.threshold))),l?f.translateX=a-e.len:f.translateY=a,b.group.attr(f)):
(h=b.group.attr(c),b.group.animate({scaleY:1},p(B(b.options.animation),{step:function(a,g){f[c]=h+g.pos*(e.pos-h);b.group.attr(f)}})),b.animate=null))},remove:function(){var a=this,b=a.chart;b.hasRendered&&G(b.series,function(b){b.type===a.type&&(b.isDirty=!0)});z.prototype.remove.apply(a,arguments)}})})(L);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(L);(function(a){var B=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&B.prototype.drawGraph.call(this)}})})(L);(function(a){var B=a.deg2rad,C=a.isNumber,G=a.pick,p=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,g=this.chart,v=2*(a.slicedOffset||0),z=g.plotWidth-2*v,
g=g.plotHeight-2*v,u=a.center,u=[G(u[0],"50%"),G(u[1],"50%"),a.size||"100%",a.innerSize||0],y=Math.min(z,g),l,b;for(l=0;4>l;++l)b=u[l],a=2>l||2===l&&/%$/.test(b),u[l]=p(b,[z,g,y,u[2]][l])+(a?v:0);u[3]>u[2]&&(u[3]=u[2]);return u},getStartAndEndRadians:function(a,g){a=C(a)?a:0;g=C(g)&&g>a&&360>g-a?g:a+360;return{start:B*(a+-90),end:B*(g+-90)}}}})(L);(function(a){var B=a.addEvent,C=a.CenteredSeriesMixin,G=a.defined,p=a.each,m=a.extend,g=C.getStartAndEndRadians,v=a.inArray,z=a.noop,u=a.pick,y=a.Point,
l=a.Series,b=a.seriesType,e=a.setAnimation;b("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group",
"dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var b=this,f=b.points,c=b.startAngleRad;a||(p(f,function(a){var f=a.graphic,e=a.shapeArgs;f&&(f.attr({r:a.startR||b.center[3]/2,start:c,end:c}),f.animate({r:e.r,start:e.start,end:e.end},b.options.animation))}),b.animate=null)},updateTotals:function(){var a,b=0,f=this.points,c=f.length,e,g=this.options.ignoreHiddenPoint;for(a=0;a<c;a++)e=f[a],b+=g&&!e.visible?0:e.isNull?0:e.y;this.total=b;for(a=
0;a<c;a++)e=f[a],e.percentage=0<b&&(e.visible||!g)?e.y/b*100:0,e.total=b},generatePoints:function(){l.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var b=0,f=this.options,c=f.slicedOffset,e=c+(f.borderWidth||0),l,m,r,t=g(f.startAngle,f.endAngle),q=this.startAngleRad=t.start,t=(this.endAngleRad=t.end)-q,F=this.points,x,p=f.dataLabels.distance,f=f.ignoreHiddenPoint,d,H=F.length,E;a||(this.center=a=this.getCenter());this.getX=function(b,d,c){r=Math.asin(Math.min((b-
a[1])/(a[2]/2+c.labelDistance),1));return a[0]+(d?-1:1)*Math.cos(r)*(a[2]/2+c.labelDistance)};for(d=0;d<H;d++){E=F[d];E.labelDistance=u(E.options.dataLabels&&E.options.dataLabels.distance,p);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,E.labelDistance);l=q+b*t;if(!f||E.visible)b+=E.percentage/100;m=q+b*t;E.shapeType="arc";E.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*l)/1E3,end:Math.round(1E3*m)/1E3};r=(m+l)/2;r>1.5*Math.PI?r-=2*Math.PI:r<-Math.PI/2&&(r+=2*Math.PI);
E.slicedTranslation={translateX:Math.round(Math.cos(r)*c),translateY:Math.round(Math.sin(r)*c)};m=Math.cos(r)*a[2]/2;x=Math.sin(r)*a[2]/2;E.tooltipPos=[a[0]+.7*m,a[1]+.7*x];E.half=r<-Math.PI/2||r>Math.PI/2?1:0;E.angle=r;l=Math.min(e,E.labelDistance/5);E.labelPos=[a[0]+m+Math.cos(r)*E.labelDistance,a[1]+x+Math.sin(r)*E.labelDistance,a[0]+m+Math.cos(r)*l,a[1]+x+Math.sin(r)*l,a[0]+m,a[1]+x,0>E.labelDistance?"center":E.half?"right":"left",r]}},drawGraph:null,drawPoints:function(){var a=this,b=a.chart.renderer,
f,c,e,g,l=a.options.shadow;l&&!a.shadowGroup&&(a.shadowGroup=b.g("shadow").add(a.group));p(a.points,function(h){c=h.graphic;if(h.isNull)c&&(h.graphic=c.destroy());else{g=h.shapeArgs;f=h.getTranslate();var r=h.shadowGroup;l&&!r&&(r=h.shadowGroup=b.g("shadow").add(a.shadowGroup));r&&r.attr(f);e=a.pointAttribs(h,h.selected&&"select");c?c.setRadialReference(a.center).attr(e).animate(m(g,f)):(h.graphic=c=b[h.shapeType](g).setRadialReference(a.center).attr(f).add(a.group),h.visible||c.attr({visibility:"hidden"}),
c.attr(e).attr({"stroke-linejoin":"round"}).shadow(l,r));c.addClass(h.getClassName())}})},searchPoint:z,sortByAngle:function(a,b){a.sort(function(a,c){return void 0!==a.angle&&(c.angle-a.angle)*b})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:C.getCenter,getSymbol:z},{init:function(){y.prototype.init.apply(this,arguments);var a=this,b;a.name=u(a.name,"Slice");b=function(b){a.slice("select"===b.type)};B(a,"select",b);B(a,"unselect",b);return a},isValid:function(){return a.isNumber(this.y,
!0)&&0<=this.y},setVisible:function(a,b){var f=this,c=f.series,e=c.chart,g=c.options.ignoreHiddenPoint;b=u(b,g);a!==f.visible&&(f.visible=f.options.visible=a=void 0===a?!f.visible:a,c.options.data[v(f,c.data)]=f.options,p(["graphic","dataLabel","connector","shadowGroup"],function(b){if(f[b])f[b][a?"show":"hide"](!0)}),f.legendItem&&e.legend.colorizeItem(f,a),a||"hover"!==f.state||f.setState(""),g&&(c.isDirty=!0),b&&e.redraw())},slice:function(a,b,f){var c=this.series;e(f,c.chart);u(b,!0);this.sliced=
this.options.sliced=G(a)?a:!this.sliced;c.options.data[v(this,c.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var b=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(b.x,b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r-1,start:b.start,end:b.end})}})})(L);(function(a){var B=
a.addEvent,C=a.arrayMax,G=a.defined,p=a.each,m=a.extend,g=a.format,v=a.map,z=a.merge,u=a.noop,y=a.pick,l=a.relativeLength,b=a.Series,e=a.seriesTypes,t=a.some,n=a.stableSort;a.distribute=function(b,c,e){function f(a,b){return a.target-b.target}var h,g=!0,l=b,q=[],m;m=0;var x=l.reducedLen||c;for(h=b.length;h--;)m+=b[h].size;if(m>x){n(b,function(a,b){return(b.rank||0)-(a.rank||0)});for(m=h=0;m<=x;)m+=b[h].size,h++;q=b.splice(h-1,b.length)}n(b,f);for(b=v(b,function(a){return{size:a.size,targets:[a.target],
align:y(a.align,.5)}});g;){for(h=b.length;h--;)g=b[h],m=(Math.min.apply(0,g.targets)+Math.max.apply(0,g.targets))/2,g.pos=Math.min(Math.max(0,m-g.size*g.align),c-g.size);h=b.length;for(g=!1;h--;)0<h&&b[h-1].pos+b[h-1].size>b[h].pos&&(b[h-1].size+=b[h].size,b[h-1].targets=b[h-1].targets.concat(b[h].targets),b[h-1].align=.5,b[h-1].pos+b[h-1].size>c&&(b[h-1].pos=c-b[h-1].size),b.splice(h,1),g=!0)}l.push.apply(l,q);h=0;t(b,function(b){var d=0;if(t(b.targets,function(){l[h].pos=b.pos+d;if(Math.abs(l[h].pos-
l[h].target)>e)return p(l.slice(0,h+1),function(a){delete a.pos}),l.reducedLen=(l.reducedLen||c)-.1*c,l.reducedLen>.1*c&&a.distribute(l,c,e),!0;d+=l[h].size;h++}))return!0});n(l,f)};b.prototype.drawDataLabels=function(){function b(a,b){var d=b.filter;return d?(b=d.operator,a=a[d.property],d=d.value,"\x3e"===b&&a>d||"\x3c"===b&&a<d||"\x3e\x3d"===b&&a>=d||"\x3c\x3d"===b&&a<=d||"\x3d\x3d"===b&&a==d||"\x3d\x3d\x3d"===b&&a===d?!0:!1):!0}var c=this,e=c.chart,l=c.options,n=l.dataLabels,r=c.points,m,q,t=
c.hasRendered||0,x,u,d=y(n.defer,!!l.animation),H=e.renderer;if(n.enabled||c._hasPointLabels)c.dlProcessOptions&&c.dlProcessOptions(n),u=c.plotGroup("dataLabelsGroup","data-labels",d&&!t?"hidden":"visible",n.zIndex||6),d&&(u.attr({opacity:+t}),t||B(c,"afterAnimate",function(){c.visible&&u.show(!0);u[l.animation?"animate":"attr"]({opacity:1},{duration:200})})),q=n,p(r,function(d){var f,h=d.dataLabel,r,w,t=d.connector,F=!h,E;m=d.dlOptions||d.options&&d.options.dataLabels;(f=y(m&&m.enabled,q.enabled)&&
!d.isNull)&&(f=!0===b(d,m||n));f&&(n=z(q,m),r=d.getLabelConfig(),E=n[d.formatPrefix+"Format"]||n.format,x=G(E)?g(E,r,e.time):(n[d.formatPrefix+"Formatter"]||n.formatter).call(r,n),E=n.style,r=n.rotation,E.color=y(n.color,E.color,c.color,"#000000"),"contrast"===E.color&&(d.contrastColor=H.getContrast(d.color||c.color),E.color=n.inside||0>y(d.labelDistance,n.distance)||l.stacking?d.contrastColor:"#000000"),l.cursor&&(E.cursor=l.cursor),w={fill:n.backgroundColor,stroke:n.borderColor,"stroke-width":n.borderWidth,
r:n.borderRadius||0,rotation:r,padding:n.padding,zIndex:1},a.objectEach(w,function(a,b){void 0===a&&delete w[b]}));!h||f&&G(x)?f&&G(x)&&(h?w.text=x:(h=d.dataLabel=r?H.text(x,0,-9999).addClass("highcharts-data-label"):H.label(x,0,-9999,n.shape,null,null,n.useHTML,null,"data-label"),h.addClass(" highcharts-data-label-color-"+d.colorIndex+" "+(n.className||"")+(n.useHTML?"highcharts-tracker":""))),h.attr(w),h.css(E).shadow(n.shadow),h.added||h.add(u),c.alignDataLabel(d,h,n,null,F)):(d.dataLabel=h=h.destroy(),
t&&(d.connector=t.destroy()))});a.fireEvent(this,"afterDrawDataLabels")};b.prototype.alignDataLabel=function(a,b,e,g,l){var c=this.chart,f=c.inverted,h=y(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),n=y(a.plotY,-9999),x=b.getBBox(),w,d=e.rotation,t=e.align,E=this.visible&&(a.series.forceDL||c.isInsidePlot(h,Math.round(n),f)||g&&c.isInsidePlot(h,f?g.x+1:g.y+g.height-1,f)),k="justify"===y(e.overflow,"justify");if(E&&(w=e.style.fontSize,w=c.renderer.fontMetrics(w,b).b,g=m({x:f?this.yAxis.len-n:h,y:Math.round(f?
this.xAxis.len-h:n),width:0,height:0},g),m(e,{width:x.width,height:x.height}),d?(k=!1,h=c.renderer.rotCorr(w,d),h={x:g.x+e.x+g.width/2+h.x,y:g.y+e.y+{top:0,middle:.5,bottom:1}[e.verticalAlign]*g.height},b[l?"attr":"animate"](h).attr({align:t}),n=(d+720)%360,n=180<n&&360>n,"left"===t?h.y-=n?x.height:0:"center"===t?(h.x-=x.width/2,h.y-=x.height/2):"right"===t&&(h.x-=x.width,h.y-=n?0:x.height),b.placed=!0,b.alignAttr=h):(b.align(e,null,g),h=b.alignAttr),k?a.isLabelJustified=this.justifyDataLabel(b,e,
h,x,g,l):y(e.crop,!0)&&(E=c.isInsidePlot(h.x,h.y)&&c.isInsidePlot(h.x+x.width,h.y+x.height)),e.shape&&!d))b[l?"attr":"animate"]({anchorX:f?c.plotWidth-a.plotY:a.plotX,anchorY:f?c.plotHeight-a.plotX:a.plotY});E||(b.attr({y:-9999}),b.placed=!1)};b.prototype.justifyDataLabel=function(a,b,e,g,l,r){var c=this.chart,f=b.align,h=b.verticalAlign,n,m,d=a.box?0:a.padding||0;n=e.x+d;0>n&&("right"===f?b.align="left":b.x=-n,m=!0);n=e.x+g.width-d;n>c.plotWidth&&("left"===f?b.align="right":b.x=c.plotWidth-n,m=!0);
n=e.y+d;0>n&&("bottom"===h?b.verticalAlign="top":b.y=-n,m=!0);n=e.y+g.height-d;n>c.plotHeight&&("top"===h?b.verticalAlign="bottom":b.y=c.plotHeight-n,m=!0);m&&(a.placed=!r,a.align(b,null,l));return m};e.pie&&(e.pie.prototype.drawDataLabels=function(){var f=this,c=f.data,e,g=f.chart,l=f.options.dataLabels,r=y(l.connectorPadding,10),n=y(l.connectorWidth,1),q=g.plotWidth,m=g.plotHeight,x=Math.round(g.chartWidth/3),t,d=f.center,H=d[2]/2,E=d[1],k,A,u,v,z=[[],[]],B,N,M,S,O=[0,0,0,0];f.visible&&(l.enabled||
f._hasPointLabels)&&(p(c,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),b.prototype.drawDataLabels.apply(f),p(c,function(a){a.dataLabel&&a.visible&&(z[a.half].push(a),a.dataLabel._pos=null,!G(l.style.width)&&!G(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>x&&(a.dataLabel.css({width:.7*x}),a.dataLabel.shortened=!0))}),
p(z,function(b,c){var h,n,x=b.length,t=[],w;if(x)for(f.sortByAngle(b,c-.5),0<f.maxLabelDistance&&(h=Math.max(0,E-H-f.maxLabelDistance),n=Math.min(E+H+f.maxLabelDistance,g.plotHeight),p(b,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,E-H-a.labelDistance),a.bottom=Math.min(E+H+a.labelDistance,g.plotHeight),w=a.dataLabel.getBBox().height||21,a.positionsIndex=t.push({target:a.labelPos[1]-a.top+w/2,size:w,rank:a.y})-1)}),h=n+w-h,a.distribute(t,h,h/5)),S=0;S<x;S++)e=b[S],n=e.positionsIndex,
u=e.labelPos,k=e.dataLabel,M=!1===e.visible?"hidden":"inherit",N=h=u[1],t&&G(t[n])&&(void 0===t[n].pos?M="hidden":(v=t[n].size,N=e.top+t[n].pos)),delete e.positionIndex,B=l.justify?d[0]+(c?-1:1)*(H+e.labelDistance):f.getX(N<e.top+2||N>e.bottom-2?h:N,c,e),k._attr={visibility:M,align:u[6]},k._pos={x:B+l.x+({left:r,right:-r}[u[6]]||0),y:N+l.y-10},u.x=B,u.y=N,y(l.crop,!0)&&(A=k.getBBox().width,h=null,B-A<r&&1===c?(h=Math.round(A-B+r),O[3]=Math.max(h,O[3])):B+A>q-r&&0===c&&(h=Math.round(B+A-q+r),O[1]=
Math.max(h,O[1])),0>N-v/2?O[0]=Math.max(Math.round(-N+v/2),O[0]):N+v/2>m&&(O[2]=Math.max(Math.round(N+v/2-m),O[2])),k.sideOverflow=h)}),0===C(O)||this.verifyDataLabelOverflow(O))&&(this.placeDataLabels(),n&&p(this.points,function(a){var b;t=a.connector;if((k=a.dataLabel)&&k._pos&&a.visible&&0<a.labelDistance){M=k._attr.visibility;if(b=!t)a.connector=t=g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex+(a.className?" "+a.className:"")).add(f.dataLabelsGroup),
t.attr({"stroke-width":n,stroke:l.connectorColor||a.color||"#666666"});t[b?"attr":"animate"]({d:f.connectorPath(a.labelPos)});t.attr("visibility",M)}else t&&(a.connector=t.destroy())}))},e.pie.prototype.connectorPath=function(a){var b=a.x,f=a.y;return y(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),f,"C",b,f,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),f,"L",a[2],a[3],"L",a[4],a[5]]},e.pie.prototype.placeDataLabels=function(){p(this.points,function(a){var b=
a.dataLabel;b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:this.options.dataLabels.style.textOverflow||"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},e.pie.prototype.alignDataLabel=u,e.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,e=this.options,f=e.center,g=e.minSize||80,r,n=null!==e.size;n||(null!==f[0]?r=Math.max(b[2]-
Math.max(a[1],a[3]),g):(r=Math.max(b[2]-a[1]-a[3],g),b[0]+=(a[3]-a[1])/2),null!==f[1]?r=Math.max(Math.min(r,b[2]-Math.max(a[0],a[2])),g):(r=Math.max(Math.min(r,b[2]-a[0]-a[2]),g),b[1]+=(a[0]-a[2])/2),r<b[2]?(b[2]=r,b[3]=Math.min(l(e.innerSize||0,r),r),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):n=!0);return n});e.column&&(e.column.prototype.alignDataLabel=function(a,c,e,g,l){var f=this.chart.inverted,h=a.series,q=a.dlBox||a.shapeArgs,n=y(a.below,a.plotY>y(this.translatedThreshold,
h.yAxis.len)),m=y(e.inside,!!this.options.stacking);q&&(g=z(q),0>g.y&&(g.height+=g.y,g.y=0),q=g.y+g.height-h.yAxis.len,0<q&&(g.height-=q),f&&(g={x:h.yAxis.len-g.y-g.height,y:h.xAxis.len-g.x-g.width,width:g.height,height:g.width}),m||(f?(g.x+=n?0:g.width,g.width=0):(g.y+=n?g.height:0,g.height=0)));e.align=y(e.align,!f||m?"center":n?"right":"left");e.verticalAlign=y(e.verticalAlign,f||m?"middle":n?"top":"bottom");b.prototype.alignDataLabel.call(this,a,c,e,g,l);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(L);
(function(a){var B=a.Chart,C=a.each,G=a.objectEach,p=a.pick;a=a.addEvent;a(B,"render",function(){var a=[];C(this.labelCollectors||[],function(g){a=a.concat(g())});C(this.yAxis||[],function(g){g.options.stackLabels&&!g.options.stackLabels.allowOverlap&&G(g.stacks,function(g){G(g,function(g){a.push(g.label)})})});C(this.series||[],function(g){var m=g.options.dataLabels,z=g.dataLabelCollections||["dataLabel"];(m.enabled||g._hasPointLabels)&&!m.allowOverlap&&g.visible&&C(z,function(m){C(g.points,function(g){g[m]&&
(g[m].labelrank=p(g.labelrank,g.shapeArgs&&g.shapeArgs.height),a.push(g[m]))})})});this.hideOverlappingLabels(a)});B.prototype.hideOverlappingLabels=function(a){var g=a.length,m,p,u,y,l,b,e,t,n,f=function(a,b,e,f,g,l,q,n){return!(g>a+e||g+q<a||l>b+f||l+n<b)};for(p=0;p<g;p++)if(m=a[p])m.oldOpacity=m.opacity,m.newOpacity=1,m.width||(u=m.getBBox(),m.width=u.width,m.height=u.height);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(p=0;p<g;p++)for(u=a[p],m=p+1;m<g;++m)if(y=a[m],u&&y&&
u!==y&&u.placed&&y.placed&&0!==u.newOpacity&&0!==y.newOpacity&&(l=u.alignAttr,b=y.alignAttr,e=u.parentGroup,t=y.parentGroup,n=2*(u.box?0:u.padding||0),l=f(l.x+e.translateX,l.y+e.translateY,u.width-n,u.height-n,b.x+t.translateX,b.y+t.translateY,y.width-n,y.height-n)))(u.labelrank<y.labelrank?u:y).newOpacity=0;C(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(L);
(function(a){var B=a.addEvent,C=a.Chart,G=a.createElement,p=a.css,m=a.defaultOptions,g=a.defaultPlotOptions,v=a.each,z=a.extend,u=a.fireEvent,y=a.hasTouch,l=a.inArray,b=a.isObject,e=a.Legend,t=a.merge,n=a.pick,f=a.Point,c=a.Series,h=a.seriesTypes,w=a.svg,D;D=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};v(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&
(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(v(a.trackerGroups,function(e){if(a[e]){a[e].addClass("highcharts-tracker").on("mouseover",c).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(y)a[e].on("touchstart",c);a.options.cursor&&a[e].css(p).css({cursor:a.options.cursor})}}),a._hasTracking=!0);u(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,e=[].concat(c?a.areaPath:a.graphPath),f=e.length,h=a.chart,d=
h.pointer,g=h.renderer,l=h.options.tooltip.snap,k=a.tracker,n,m=function(){if(h.hoverSeries!==a)a.onMouseOver()},t="rgba(192,192,192,"+(w?.0001:.002)+")";if(f&&!c)for(n=f+1;n--;)"M"===e[n]&&e.splice(n+1,0,e[n+1]-l,e[n+2],"L"),(n&&"M"===e[n]||n===f)&&e.splice(n,0,"L",e[n-2]+l,e[n-1]);k?k.attr({d:e}):a.graph&&(a.tracker=g.path(e).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:t,fill:c?t:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*l),zIndex:2}).add(a.group),v([a.tracker,
a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",m).on("mouseout",function(a){d.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(y)a.on("touchstart",m)}));u(this,"afterDrawTracker")}};h.column&&(h.column.prototype.drawTracker=D.drawTrackerPoint);h.pie&&(h.pie.prototype.drawTracker=D.drawTrackerPoint);h.scatter&&(h.scatter.prototype.drawTracker=D.drawTrackerPoint);z(e.prototype,{setItemEvents:function(a,b,c){var e=this,h=e.chart.renderer.boxWrapper,g="highcharts-legend-"+
(a instanceof f?"point":"series")+"-active";(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");h.addClass(g);b.css(e.options.itemHoverStyle)}).on("mouseout",function(){b.css(t(a.visible?e.itemStyle:e.itemHiddenStyle));h.removeClass(g);a.setState()}).on("click",function(b){var d=function(){a.setVisible&&a.setVisible()};h.removeClass(g);b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,d):u(a,"legendItemClick",b,d)})},createCheckboxForItem:function(a){a.checkbox=
G("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);B(a.checkbox,"click",function(b){u(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});m.legend.itemStyle.cursor="pointer";z(C.prototype,{showResetZoom:function(){function a(){b.zoomOut()}var b=this,c=m.lang,e=b.options.chart.resetZoomButton,f=e.theme,h=f.states,d="chart"===e.relativeTo?null:"plotBox";u(this,"beforeShowResetZoom",null,
function(){b.resetZoomButton=b.renderer.button(c.resetZoom,null,null,a,f,h&&h.hover).attr({align:e.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(e.position,!1,d)})},zoomOut:function(){u(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(a){var c,e=this.pointer,f=!1,h;!a||a.resetSelection?(v(this.axes,function(a){c=a.zoom()}),e.initiated=!1):v(a.xAxis.concat(a.yAxis),function(a){var b=a.axis;e[b.isXAxis?"zoomX":"zoomY"]&&(c=b.zoom(a.min,a.max),b.displayBtn&&
(f=!0))});h=this.resetZoomButton;f&&!h?this.showResetZoom():!f&&b(h)&&(this.resetZoomButton=h.destroy());c&&this.redraw(n(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,e=c.hoverPoints,f;e&&v(e,function(a){a.setState()});v("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,e=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",h=c[d],k=(b.pointRange||0)/2,g=b.reversed&&!c.inverted||!b.reversed&&c.inverted?-1:1,l=b.getExtremes(),
n=b.toValue(h-e,!0)+k*g,g=b.toValue(h+b.len-e,!0)-k*g,q=g<n,h=q?g:n,n=q?n:g,g=Math.min(l.dataMin,k?l.min:b.toValue(b.toPixels(l.min)-b.minPixelPadding)),k=Math.max(l.dataMax,k?l.max:b.toValue(b.toPixels(l.max)+b.minPixelPadding)),q=g-h;0<q&&(n+=q,h=g);q=n-k;0<q&&(n=k,h-=q);b.series.length&&h!==l.min&&n!==l.max&&(b.setExtremes(h,n,!1,!1,{trigger:"pan"}),f=!0);c[d]=e});f&&c.redraw(!1);p(c.container,{cursor:"move"})}});z(f.prototype,{select:function(a,b){var c=this,e=c.series,f=e.chart;a=n(a,!c.selected);
c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;e.options.data[l(c,e.data)]=c.options;c.setState(a&&"select");b||v(f.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,e.options.data[l(a,e.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=
this.series.chart;this.firePointEvent("mouseOut");v(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,c=t(b.series.options.point,b.options).events;b.events=c;a.objectEach(c,function(a,c){B(b,c,a)});this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),e=this.plotY,f=this.series,h=f.options.states[a||"normal"]||{},d=g[f.type].marker&&f.options.marker,l=d&&!1===d.enabled,r=d&&d.states&&
d.states[a||"normal"]||{},k=!1===r.enabled,m=f.stateMarkerGraphic,t=this.marker||{},w=f.chart,p=f.halo,D,v=d&&f.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===h.enabled||a&&(k||l&&!1===r.enabled)||a&&t.states&&t.states[a]&&!1===t.states[a].enabled)){v&&(D=f.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(f.pointAttribs(this,a),n(w.options.chart.animation,
h.animation)),D&&this.graphic.animate(D,n(w.options.chart.animation,r.animation,d.animation)),m&&m.hide();else{if(a&&r){d=t.symbol||f.symbol;m&&m.currentSymbol!==d&&(m=m.destroy());if(m)m[b?"animate":"attr"]({x:D.x,y:D.y});else d&&(f.stateMarkerGraphic=m=w.renderer.symbol(d,D.x,D.y,D.width,D.height).add(f.markerGroup),m.currentSymbol=d);m&&m.attr(f.pointAttribs(this,a))}m&&(m[a&&w.isInsidePlot(c,e,w.inverted)?"show":"hide"](),m.element.point=this)}(c=h.halo)&&c.size?(p||(f.halo=p=w.renderer.path().add((this.graphic||
m).parentGroup)),p.show()[b?"animate":"attr"]({d:this.haloPath(c.size)}),p.attr({"class":"highcharts-halo highcharts-color-"+n(this.colorIndex,f.colorIndex)+(this.className?" "+this.className:"")}),p.point=this,p.attr(z({fill:this.color||f.color,"fill-opacity":c.opacity,zIndex:-1},c.attributes))):p&&p.point&&p.point.haloPath&&p.animate({d:p.point.haloPath(0)},null,p.hide);this.state=a;u(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-
a,this.plotY-a,2*a,2*a)}});z(c.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&u(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,e=b.hoverPoint;b.hoverSeries=null;if(e)e.onMouseOut();this&&a.events.mouseOut&&u(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,
c=b.options,e=b.graph,f=c.states,h=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(v([b.group,b.markerGroup,b.dataLabelsGroup],function(d){d&&(b.state&&d.removeClass("highcharts-series-"+b.state),a&&d.addClass("highcharts-series-"+a))}),b.state=a,!f[a]||!1!==f[a].enabled)&&(a&&(h=f[a].lineWidth||h+(f[a].lineWidthPlus||0)),e&&!e.dashstyle))for(h={"stroke-width":h},e.animate(h,n(f[a||"normal"]&&f[a||"normal"].animation,b.chart.options.chart.animation));b["zone-graph-"+c];)b["zone-graph-"+c].attr(h),c+=1},
setVisible:function(a,b){var c=this,e=c.chart,f=c.legendItem,h,d=e.options.chart.ignoreHiddenSeries,g=c.visible;h=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!g:a)?"show":"hide";v(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][h]()});if(e.hoverSeries===c||(e.hoverPoint&&e.hoverPoint.series)===c)c.onMouseOut();f&&e.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&v(e.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});v(c.linkedSeries,
function(b){b.setVisible(a,!1)});d&&(e.isDirtyBox=!0);!1!==b&&e.redraw();u(c,h)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);u(this,a?"select":"unselect")},drawTracker:D.drawTrackerGraph})})(L);(function(a){var B=a.Chart,C=a.each,G=a.inArray,p=a.isArray,m=a.isObject,g=a.pick,v=a.splat;B.prototype.setResponsive=function(g){var m=this.options.responsive,p=[],l=this.currentResponsive;
m&&m.rules&&C(m.rules,function(b){void 0===b._id&&(b._id=a.uniqueKey());this.matchResponsiveRule(b,p,g)},this);var b=a.merge.apply(0,a.map(p,function(b){return a.find(m.rules,function(a){return a._id===b}).chartOptions})),p=p.toString()||void 0;p!==(l&&l.ruleIds)&&(l&&this.update(l.undoOptions,g),p?(this.currentResponsive={ruleIds:p,mergedOptions:b,undoOptions:this.currentOptions(b)},this.update(b,g)):this.currentResponsive=void 0)};B.prototype.matchResponsiveRule=function(a,m){var p=a.condition;
(p.callback||function(){return this.chartWidth<=g(p.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=g(p.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=g(p.minWidth,0)&&this.chartHeight>=g(p.minHeight,0)}).call(this)&&m.push(a._id)};B.prototype.currentOptions=function(g){function u(g,b,e,t){var l;a.objectEach(g,function(a,c){if(!t&&-1<G(c,["series","xAxis","yAxis"]))for(a=v(a),e[c]=[],l=0;l<a.length;l++)b[c][l]&&(e[c][l]={},u(a[l],b[c][l],e[c][l],t+1));else m(a)?(e[c]=p(a)?[]:{},u(a,b[c]||{},e[c],t+1)):
e[c]=b[c]||null})}var y={};u(g,this.options,y,0);return y}})(L);(function(a){var B=a.addEvent,C=a.Axis,G=a.Chart,p=a.css,m=a.defined,g=a.each,v=a.extend,z=a.noop,u=a.pick,y=a.timeUnits,l=a.wrap;l(a.Series.prototype,"init",function(a){var b;a.apply(this,Array.prototype.slice.call(arguments,1));(b=this.xAxis)&&b.options.ordinal&&B(this,"updatedData",function(){delete b.ordinalIndex})});l(C.prototype,"getTimeTicks",function(a,e,g,l,f,c,h,w){var b=0,n,t,q={},p,x,u,d=[],H=-Number.MAX_VALUE,E=this.options.tickPixelInterval,
k=this.chart.time;if(!this.options.ordinal&&!this.options.breaks||!c||3>c.length||void 0===g)return a.call(this,e,g,l,f);x=c.length;for(n=0;n<x;n++){u=n&&c[n-1]>l;c[n]<g&&(b=n);if(n===x-1||c[n+1]-c[n]>5*h||u){if(c[n]>H){for(t=a.call(this,e,c[b],c[n],f);t.length&&t[0]<=H;)t.shift();t.length&&(H=t[t.length-1]);d=d.concat(t)}b=n+1}if(u)break}a=t.info;if(w&&a.unitRange<=y.hour){n=d.length-1;for(b=1;b<n;b++)k.dateFormat("%d",d[b])!==k.dateFormat("%d",d[b-1])&&(q[d[b]]="day",p=!0);p&&(q[d[0]]="day");a.higherRanks=
q}d.info=a;if(w&&m(E)){w=k=d.length;n=[];var A;for(p=[];w--;)b=this.translate(d[w]),A&&(p[w]=A-b),n[w]=A=b;p.sort();p=p[Math.floor(p.length/2)];p<.6*E&&(p=null);w=d[k-1]>l?k-1:k;for(A=void 0;w--;)b=n[w],l=Math.abs(A-b),A&&l<.8*E&&(null===p||l<.8*p)?(q[d[w]]&&!q[d[w+1]]?(l=w+1,A=b):l=w,d.splice(l,1)):A=b}return d});v(C.prototype,{beforeSetTickPositions:function(){var a,e=[],l=!1,n,f=this.getExtremes(),c=f.min,h=f.max,w,p=this.isXAxis&&!!this.options.breaks,f=this.options.ordinal,r=Number.MAX_VALUE,
v=this.chart.options.chart.ignoreHiddenSeries;n="highcharts-navigator-xaxis"===this.options.className;!this.options.overscroll||this.max!==this.dataMax||this.chart.mouseIsDown&&!n||this.eventArgs&&(!this.eventArgs||"navigator"===this.eventArgs.trigger)||(this.max+=this.options.overscroll,!n&&m(this.userMin)&&(this.min+=this.options.overscroll));if(f||p){g(this.series,function(b,c){if(!(v&&!1===b.visible||!1===b.takeOrdinalPosition&&!p)&&(e=e.concat(b.processedXData),a=e.length,e.sort(function(a,b){return a-
b}),r=Math.min(r,u(b.closestPointRange,r)),a))for(c=a-1;c--;)e[c]===e[c+1]&&e.splice(c,1)});a=e.length;if(2<a){n=e[1]-e[0];for(w=a-1;w--&&!l;)e[w+1]-e[w]!==n&&(l=!0);!this.options.keepOrdinalPadding&&(e[0]-c>n||h-e[e.length-1]>n)&&(l=!0)}else this.options.overscroll&&(2===a?r=e[1]-e[0]:1===a?(r=this.options.overscroll,e=[e[0],e[0]+r]):r=this.overscrollPointsRange);l?(this.options.overscroll&&(this.overscrollPointsRange=r,e=e.concat(this.getOverscrollPositions())),this.ordinalPositions=e,n=this.ordinal2lin(Math.max(c,
e[0]),!0),w=Math.max(this.ordinal2lin(Math.min(h,e[e.length-1]),!0),1),this.ordinalSlope=h=(h-c)/(w-n),this.ordinalOffset=c-n*h):(this.overscrollPointsRange=u(this.closestPointRange,this.overscrollPointsRange),this.ordinalPositions=this.ordinalSlope=this.ordinalOffset=void 0)}this.isOrdinal=f&&l;this.groupIntervalFactor=null},val2lin:function(a,e){var b=this.ordinalPositions;if(b){var g=b.length,f,c;for(f=g;f--;)if(b[f]===a){c=f;break}for(f=g-1;f--;)if(a>b[f]||0===f){a=(a-b[f])/(b[f+1]-b[f]);c=f+
a;break}e=e?c:this.ordinalSlope*(c||0)+this.ordinalOffset}else e=a;return e},lin2val:function(a,e){var b=this.ordinalPositions;if(b){var g=this.ordinalSlope,f=this.ordinalOffset,c=b.length-1,h;if(e)0>a?a=b[0]:a>c?a=b[c]:(c=Math.floor(a),h=a-c);else for(;c--;)if(e=g*c+f,a>=e){g=g*(c+1)+f;h=(a-e)/(g-e);break}return void 0!==h&&void 0!==b[c]?b[c]+(h?h*(b[c+1]-b[c]):0):a}return a},getExtendedPositions:function(){var a=this,e=a.chart,l=a.series[0].currentDataGrouping,n=a.ordinalIndex,f=l?l.count+l.unitName:
"raw",c=a.options.overscroll,h=a.getExtremes(),m,p;n||(n=a.ordinalIndex={});n[f]||(m={series:[],chart:e,getExtremes:function(){return{min:h.dataMin,max:h.dataMax+c}},options:{ordinal:!0},val2lin:C.prototype.val2lin,ordinal2lin:C.prototype.ordinal2lin},g(a.series,function(b){p={xAxis:m,xData:b.xData.slice(),chart:e,destroyGroupedData:z};p.xData=p.xData.concat(a.getOverscrollPositions());p.options={dataGrouping:l?{enabled:!0,forced:!0,approximation:"open",units:[[l.unitName,[l.count]]]}:{enabled:!1}};
b.processData.apply(p);m.series.push(p)}),a.beforeSetTickPositions.apply(m),n[f]=m.ordinalPositions);return n[f]},getOverscrollPositions:function(){var b=this.options.overscroll,e=this.overscrollPointsRange,g=[],l=this.dataMax;if(a.defined(e))for(g.push(l);l<=this.dataMax+b;)l+=e,g.push(l);return g},getGroupIntervalFactor:function(a,e,g){var b;g=g.processedXData;var f=g.length,c=[];b=this.groupIntervalFactor;if(!b){for(b=0;b<f-1;b++)c[b]=g[b+1]-g[b];c.sort(function(a,b){return a-b});c=c[Math.floor(f/
2)];a=Math.max(a,g[0]);e=Math.min(e,g[f-1]);this.groupIntervalFactor=b=f*c/(e-a)}return b},postProcessTickInterval:function(a){var b=this.ordinalSlope;return b?this.options.breaks?this.closestPointRange||a:a/(b/this.closestPointRange):a}});C.prototype.ordinal2lin=C.prototype.val2lin;l(G.prototype,"pan",function(a,e){var b=this.xAxis[0],l=b.options.overscroll,f=e.chartX,c=!1;if(b.options.ordinal&&b.series.length){var h=this.mouseDownX,m=b.getExtremes(),u=m.dataMax,r=m.min,v=m.max,q=this.hoverPoints,
F=b.closestPointRange||b.overscrollPointsRange,h=(h-f)/(b.translationSlope*(b.ordinalSlope||F)),x={ordinalPositions:b.getExtendedPositions()},F=b.lin2val,y=b.val2lin,d;x.ordinalPositions?1<Math.abs(h)&&(q&&g(q,function(a){a.setState()}),0>h?(q=x,d=b.ordinalPositions?b:x):(q=b.ordinalPositions?b:x,d=x),x=d.ordinalPositions,u>x[x.length-1]&&x.push(u),this.fixedRange=v-r,h=b.toFixedRange(null,null,F.apply(q,[y.apply(q,[r,!0])+h,!0]),F.apply(d,[y.apply(d,[v,!0])+h,!0])),h.min>=Math.min(m.dataMin,r)&&
h.max<=Math.max(u,v)+l&&b.setExtremes(h.min,h.max,!0,!1,{trigger:"pan"}),this.mouseDownX=f,p(this.container,{cursor:"move"})):c=!0}else c=!0;c&&(l&&(b.max=b.dataMax+l),a.apply(this,Array.prototype.slice.call(arguments,1)))})})(L);(function(a){function B(){return Array.prototype.slice.call(arguments,1)}function C(a){a.apply(this);this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,p(this.pointArrayMap,["y"]))}var G=a.addEvent,p=a.pick,m=a.wrap,g=a.each,v=a.extend,z=a.isArray,u=a.fireEvent,
y=a.Axis,l=a.Series;v(y.prototype,{isInBreak:function(a,e){var b=a.repeat||Infinity,g=a.from,f=a.to-a.from;e=e>=g?(e-g)%b:b-(g-e)%b;return a.inclusive?e<=f:e<f&&0!==e},isInAnyBreak:function(a,e){var b=this.options.breaks,g=b&&b.length,f,c,h;if(g){for(;g--;)this.isInBreak(b[g],a)&&(f=!0,c||(c=p(b[g].showPoints,this.isXAxis?!1:!0)));h=f&&e?f&&!c:f}return h}});G(y,"afterSetTickPositions",function(){if(this.options.breaks){var a=this.tickPositions,e=this.tickPositions.info,g=[],l;for(l=0;l<a.length;l++)this.isInAnyBreak(a[l])||
g.push(a[l]);this.tickPositions=g;this.tickPositions.info=e}});G(y,"afterSetOptions",function(){this.options.breaks&&this.options.breaks.length&&(this.options.ordinal=!1)});G(y,"afterInit",function(){var a=this,e;e=this.options.breaks;a.isBroken=z(e)&&!!e.length;a.isBroken&&(a.val2lin=function(b){var e=b,f,c;for(c=0;c<a.breakArray.length;c++)if(f=a.breakArray[c],f.to<=b)e-=f.len;else if(f.from>=b)break;else if(a.isInBreak(f,b)){e-=b-f.from;break}return e},a.lin2val=function(b){var e,f;for(f=0;f<a.breakArray.length&&
!(e=a.breakArray[f],e.from>=b);f++)e.to<b?b+=e.len:a.isInBreak(e,b)&&(b+=e.len);return b},a.setExtremes=function(a,b,e,c,h){for(;this.isInAnyBreak(a);)a-=this.closestPointRange;for(;this.isInAnyBreak(b);)b-=this.closestPointRange;y.prototype.setExtremes.call(this,a,b,e,c,h)},a.setAxisTranslation=function(b){y.prototype.setAxisTranslation.call(this,b);b=a.options.breaks;var e=[],f=[],c=0,h,l,m=a.userMin||a.min,r=a.userMax||a.max,t=p(a.pointRangePadding,0),q,v;g(b,function(b){l=b.repeat||Infinity;a.isInBreak(b,
m)&&(m+=b.to%l-m%l);a.isInBreak(b,r)&&(r-=r%l-b.from%l)});g(b,function(a){q=a.from;for(l=a.repeat||Infinity;q-l>m;)q-=l;for(;q<m;)q+=l;for(v=q;v<r;v+=l)e.push({value:v,move:"in"}),e.push({value:v+(a.to-a.from),move:"out",size:a.breakSize})});e.sort(function(a,b){return a.value===b.value?("in"===a.move?0:1)-("in"===b.move?0:1):a.value-b.value});h=0;q=m;g(e,function(a){h+="in"===a.move?1:-1;1===h&&"in"===a.move&&(q=a.value);0===h&&(f.push({from:q,to:a.value,len:a.value-q-(a.size||0)}),c+=a.value-q-
(a.size||0))});a.breakArray=f;a.unitLength=r-m-c+t;u(a,"afterBreaks");a.options.staticScale?a.transA=a.options.staticScale:a.unitLength&&(a.transA*=(r-a.min+t)/a.unitLength);t&&(a.minPixelPadding=a.transA*a.minPointOffset);a.min=m;a.max=r})});m(l.prototype,"generatePoints",function(a){a.apply(this,B(arguments));var b=this.xAxis,g=this.yAxis,l=this.points,f,c=l.length,h=this.options.connectNulls,m;if(b&&g&&(b.options.breaks||g.options.breaks))for(;c--;)f=l[c],m=null===f.y&&!1===h,m||!b.isInAnyBreak(f.x,
!0)&&!g.isInAnyBreak(f.y,!0)||(l.splice(c,1),this.data[c]&&this.data[c].destroyElements())});a.Series.prototype.drawBreaks=function(a,e){var b=this,l=b.points,f,c,h,m;a&&g(e,function(e){f=a.breakArray||[];c=a.isXAxis?a.min:p(b.options.threshold,a.min);g(l,function(b){m=p(b["stack"+e.toUpperCase()],b[e]);g(f,function(e){h=!1;if(c<e.from&&m>e.to||c>e.from&&m<e.from)h="pointBreak";else if(c<e.from&&m>e.from&&m<e.to||c>e.from&&m>e.to&&m<e.from)h="pointInBreak";h&&u(a,h,{point:b,brk:e})})})})};a.Series.prototype.gappedPath=
function(){var b=this.currentDataGrouping,e=b&&b.totalRange,b=this.options.gapSize,g=this.points.slice(),l=g.length-1,f=this.yAxis;if(b&&0<l)for("value"!==this.options.gapUnit&&(b*=this.closestPointRange),e&&e>b&&(b=e);l--;)g[l+1].x-g[l].x>b&&(e=(g[l].x+g[l+1].x)/2,g.splice(l+1,0,{isNull:!0,x:e}),this.options.stacking&&(e=f.stacks[this.stackKey][e]=new a.StackItem(f,f.options.stackLabels,!1,e,this.stack),e.total=0));return this.getGraphPath(g)};m(a.seriesTypes.column.prototype,"drawPoints",C);m(a.Series.prototype,
"drawPoints",C)})(L);(function(a){var B=a.addEvent,C=a.arrayMax,G=a.arrayMin,p=a.Axis,m=a.defaultPlotOptions,g=a.defined,v=a.each,z=a.extend,u=a.format,y=a.isNumber,l=a.merge,b=a.pick,e=a.Point,t=a.Series,n=a.Tooltip,f=a.wrap,c=t.prototype,h=c.processData,w=c.generatePoints,D={approximation:"average",groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M",
"%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},r={line:{},spline:{},area:{},areaspline:{},column:{approximation:"sum",groupPixelWidth:10},arearange:{approximation:"range"},areasplinerange:{approximation:"range"},columnrange:{approximation:"range",groupPixelWidth:10},candlestick:{approximation:"ohlc",
groupPixelWidth:10},ohlc:{approximation:"ohlc",groupPixelWidth:5}},J=a.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]],q=a.approximations={sum:function(a){var b=a.length,c;if(!b&&a.hasNulls)c=null;else if(b)for(c=0;b--;)c+=a[b];return c},average:function(a){var b=a.length;a=q.sum(a);y(a)&&b&&(a/=b);return a},averages:function(){var a=
[];v(arguments,function(b){a.push(q.average(b))});return void 0===a[0]?void 0:a},open:function(a){return a.length?a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?C(a):a.hasNulls?null:void 0},low:function(a){return a.length?G(a):a.hasNulls?null:void 0},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,b,c,d){a=q.open(a);b=q.high(b);c=q.low(c);d=q.close(d);if(y(a)||y(b)||y(c)||y(d))return[a,b,c,d]},range:function(a,b){a=q.low(a);b=q.high(b);if(y(a)||
y(b))return[a,b];if(null===a&&null===b)return null}};c.groupData=function(a,b,c,d){var e=this.data,f=this.options.data,k=[],h=[],g=[],l=a.length,m,n,p=!!b,w=[];d="function"===typeof d?d:q[d]||r[this.type]&&q[r[this.type].approximation]||q[D.approximation];var x=this.pointArrayMap,t=x&&x.length,u=0;n=0;var F,z;t?v(x,function(){w.push([])}):w.push([]);F=t||1;for(z=0;z<=l&&!(a[z]>=c[0]);z++);for(z;z<=l;z++){for(;void 0!==c[u+1]&&a[z]>=c[u+1]||z===l;){m=c[u];this.dataGroupInfo={start:n,length:w[0].length};
n=d.apply(this,w);void 0!==n&&(k.push(m),h.push(n),g.push(this.dataGroupInfo));n=z;for(m=0;m<F;m++)w[m].length=0,w[m].hasNulls=!1;u+=1;if(z===l)break}if(z===l)break;if(x){m=this.cropStart+z;var J=e&&e[m]||this.pointClass.prototype.applyOptions.apply({series:this},[f[m]]),B;for(m=0;m<t;m++)B=J[x[m]],y(B)?w[m].push(B):null===B&&(w[m].hasNulls=!0)}else m=p?b[z]:null,y(m)?w[0].push(m):null===m&&(w[0].hasNulls=!0)}return[k,h,g]};c.processData=function(){var a=this.chart,e=this.options.dataGrouping,f=!1!==
this.allowDG&&e&&b(e.enabled,a.options.isStock),d=this.visible||!a.options.chart.ignoreHiddenSeries,l,m=this.currentDataGrouping,k;this.forceCrop=f;this.groupPixelWidth=null;this.hasProcessed=!0;if(!1!==h.apply(this,arguments)&&f){this.destroyGroupedData();var n,q=e.groupAll?this.xData:this.processedXData,r=e.groupAll?this.yData:this.processedYData,p=a.plotSizeX,a=this.xAxis,w=a.options.ordinal,t=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(t){this.isDirty=l=!0;this.points=
null;f=a.getExtremes();k=f.min;f=f.max;w=w&&a.getGroupIntervalFactor(k,f,this)||1;t=t*(f-k)/p*w;p=a.getTimeTicks(a.normalizeTimeTickInterval(t,e.units||J),Math.min(k,q[0]),Math.max(f,q[q.length-1]),a.options.startOfWeek,q,this.closestPointRange);r=c.groupData.apply(this,[q,r,p,e.approximation]);q=r[0];w=r[1];if(e.smoothed&&q.length){n=q.length-1;for(q[n]=Math.min(q[n],f);n--&&0<n;)q[n]+=t/2;q[0]=Math.max(q[0],k)}k=p.info;this.closestPointRange=p.info.totalRange;this.groupMap=r[2];g(q[0])&&q[0]<a.dataMin&&
d&&(a.min<=a.dataMin&&(a.min=q[0]),a.dataMin=q[0]);e.groupAll&&(e=this.cropData(q,w,a.min,a.max,1),q=e.xData,w=e.yData);this.processedXData=q;this.processedYData=w}else this.groupMap=null;this.hasGroupedData=l;this.currentDataGrouping=k;this.preventGraphAnimation=(m&&m.totalRange)!==(k&&k.totalRange)}};c.destroyGroupedData=function(){var a=this.groupedData;v(a||[],function(b,c){b&&(a[c]=b.destroy?b.destroy():null)});this.groupedData=null};c.generatePoints=function(){w.apply(this);this.destroyGroupedData();
this.groupedData=this.hasGroupedData?this.points:null};B(e,"update",function(){if(this.dataGroup)return a.error(24),!1});f(n.prototype,"tooltipFooterHeaderFormatter",function(a,b,c){var d=this.chart.time,e=b.series,f=e.tooltipOptions,k=e.options.dataGrouping,h=f.xDateFormat,g,l=e.xAxis;return l&&"datetime"===l.options.type&&k&&y(b.key)?(a=e.currentDataGrouping,k=k.dateTimeLabelFormats,a?(l=k[a.unitName],1===a.count?h=l[0]:(h=l[1],g=l[2])):!h&&k&&(h=this.getXDateFormat(b,f,l)),h=d.dateFormat(h,b.key),
g&&(h+=d.dateFormat(g,b.key+a.totalRange-1)),u(f[(c?"footer":"header")+"Format"],{point:z(b.point,{key:h}),series:e},d)):a.call(this,b,c)});B(t,"destroy",c.destroyGroupedData);B(t,"afterSetOptions",function(a){a=a.options;var b=this.type,c=this.chart.options.plotOptions,d=m[b].dataGrouping,e=this.useCommonDataGrouping&&D;if(r[b]||e)d||(d=l(D,r[b])),a.dataGrouping=l(e,d,c.series&&c.series.dataGrouping,c[b].dataGrouping,this.userOptions.dataGrouping);this.chart.options.isStock&&(this.requireSorting=
!0)});B(p,"afterSetScale",function(){v(this.series,function(a){a.hasProcessed=!1})});p.prototype.getGroupPixelWidth=function(){var a=this.series,b=a.length,c,d=0,e=!1,f;for(c=b;c--;)(f=a[c].options.dataGrouping)&&(d=Math.max(d,f.groupPixelWidth));for(c=b;c--;)(f=a[c].options.dataGrouping)&&a[c].hasProcessed&&(b=(a[c].processedXData||a[c].data).length,a[c].groupPixelWidth||b>this.chart.plotSizeX/d||b&&f.forced)&&(e=!0);return e?d:0};p.prototype.setDataGrouping=function(a,c){var e;c=b(c,!0);a||(a={forced:!1,
units:null});if(this instanceof p)for(e=this.series.length;e--;)this.series[e].update({dataGrouping:a},!1);else v(this.chart.options.series,function(b){b.dataGrouping=a},!1);this.ordinalSlope=null;c&&this.chart.redraw()}})(L);(function(a){var B=a.each,C=a.Point,G=a.seriesType,p=a.seriesTypes;G("ohlc","column",{lineWidth:1,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'},
threshold:null,states:{hover:{lineWidth:3}},stickyTracking:!0},{directTouch:!1,pointArrayMap:["open","high","low","close"],toYData:function(a){return[a.open,a.high,a.low,a.close]},pointValKey:"close",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,g){g=p.column.prototype.pointAttribs.call(this,a,g);var m=this.options;delete g.fill;!a.options.color&&m.upColor&&a.open<a.close&&(g.stroke=m.upColor);return g},translate:function(){var a=this,g=a.yAxis,v=!!a.modifyValue,
z=["plotOpen","plotHigh","plotLow","plotClose","yBottom"];p.column.prototype.translate.apply(a);B(a.points,function(m){B([m.open,m.high,m.low,m.close,m.low],function(p,l){null!==p&&(v&&(p=a.modifyValue(p)),m[z[l]]=g.toPixels(p,!0))});m.tooltipPos[1]=m.plotHigh+g.pos-a.chart.plotTop})},drawPoints:function(){var a=this,g=a.chart;B(a.points,function(m){var p,u,v,l,b=m.graphic,e,t=!b;void 0!==m.plotY&&(b||(m.graphic=b=g.renderer.path().add(a.group)),b.attr(a.pointAttribs(m,m.selected&&"select")),u=b.strokeWidth()%
2/2,e=Math.round(m.plotX)-u,v=Math.round(m.shapeArgs.width/2),l=["M",e,Math.round(m.yBottom),"L",e,Math.round(m.plotHigh)],null!==m.open&&(p=Math.round(m.plotOpen)+u,l.push("M",e,p,"L",e-v,p)),null!==m.close&&(p=Math.round(m.plotClose)+u,l.push("M",e,p,"L",e+v,p)),b[t?"attr":"animate"]({d:l}).addClass(m.getClassName(),!0))})},animate:null},{getClassName:function(){return C.prototype.getClassName.call(this)+(this.open<this.close?" highcharts-point-up":" highcharts-point-down")}})})(L);(function(a){var B=
a.defaultPlotOptions,C=a.each,G=a.merge,p=a.seriesType,m=a.seriesTypes;p("candlestick","ohlc",G(B.column,{states:{hover:{lineWidth:2}},tooltip:B.ohlc.tooltip,threshold:null,lineColor:"#000000",lineWidth:1,upColor:"#ffffff",stickyTracking:!0}),{pointAttribs:function(a,p){var g=m.column.prototype.pointAttribs.call(this,a,p),u=this.options,v=a.open<a.close,l=u.lineColor||this.color;g["stroke-width"]=u.lineWidth;g.fill=a.options.color||(v?u.upColor||this.color:this.color);g.stroke=a.lineColor||(v?u.upLineColor||
l:l);p&&(a=u.states[p],g.fill=a.color||g.fill,g.stroke=a.lineColor||g.stroke,g["stroke-width"]=a.lineWidth||g["stroke-width"]);return g},drawPoints:function(){var a=this,m=a.chart;C(a.points,function(g){var p=g.graphic,v,l,b,e,t,n,f,c=!p;void 0!==g.plotY&&(p||(g.graphic=p=m.renderer.path().add(a.group)),p.attr(a.pointAttribs(g,g.selected&&"select")).shadow(a.options.shadow),t=p.strokeWidth()%2/2,n=Math.round(g.plotX)-t,v=g.plotOpen,l=g.plotClose,b=Math.min(v,l),v=Math.max(v,l),f=Math.round(g.shapeArgs.width/
2),l=Math.round(b)!==Math.round(g.plotHigh),e=v!==g.yBottom,b=Math.round(b)+t,v=Math.round(v)+t,t=[],t.push("M",n-f,v,"L",n-f,b,"L",n+f,b,"L",n+f,v,"Z","M",n,b,"L",n,l?Math.round(g.plotHigh):b,"M",n,v,"L",n,e?Math.round(g.yBottom):v),p[c?"attr":"animate"]({d:t}).addClass(g.getClassName(),!0))})}})})(L);da=function(a){var B=a.each,C=a.defined,G=a.seriesTypes,p=a.stableSort;return{getPlotBox:function(){return a.Series.prototype.getPlotBox.call(this.options.onSeries&&this.chart.get(this.options.onSeries)||
this)},translate:function(){G.column.prototype.translate.apply(this);var a=this.options,g=this.chart,v=this.points,z=v.length-1,u,y,l=a.onSeries,l=l&&g.get(l),a=a.onKey||"y",b=l&&l.options.step,e=l&&l.points,t=e&&e.length,n=g.inverted,f=this.xAxis,c=this.yAxis,h=0,w,D,r,J;if(l&&l.visible&&t)for(h=(l.pointXOffset||0)+(l.barW||0)/2,u=l.currentDataGrouping,D=e[t-1].x+(u?u.totalRange:0),p(v,function(a,b){return a.x-b.x}),a="plot"+a[0].toUpperCase()+a.substr(1);t--&&v[z]&&!(w=e[t],u=v[z],u.y=w.y,w.x<=
u.x&&void 0!==w[a]&&(u.x<=D&&(u.plotY=w[a],w.x<u.x&&!b&&(r=e[t+1])&&void 0!==r[a]&&(J=(u.x-w.x)/(r.x-w.x),u.plotY+=J*(r[a]-w[a]),u.y+=J*(r.y-w.y))),z--,t++,0>z)););B(v,function(a,b){var e;a.plotX+=h;if(void 0===a.plotY||n)0<=a.plotX&&a.plotX<=f.len?n?(a.plotY=f.translate(a.x,0,1,0,1),a.plotX=C(a.y)?c.translate(a.y,0,0,0,1):0):a.plotY=g.chartHeight-f.bottom-(f.opposite?f.height:0)+f.offset-c.top:a.shapeArgs={};(y=v[b-1])&&y.plotX===a.plotX&&(void 0===y.stackIndex&&(y.stackIndex=0),e=y.stackIndex+1);
a.stackIndex=e});this.onSeries=l}}}(L);(function(a,B){function C(a){l[a+"pin"]=function(b,g,m,f,c){var e=c&&c.anchorX;c=c&&c.anchorY;"circle"===a&&f>m&&(b-=Math.round((f-m)/2),m=f);b=l[a](b,g,m,f);e&&c&&(b.push("M","circle"===a?b[1]-b[4]:b[1]+b[4]/2,g>c?g:g+f,"L",e,c),b=b.concat(l.circle(e-1,c-1,2,2)));return b}}var G=a.addEvent,p=a.each,m=a.merge,g=a.noop,v=a.Renderer,z=a.seriesType,u=a.TrackerMixin,y=a.VMLRenderer,l=a.SVGRenderer.prototype.symbols;z("flags","column",{pointRange:0,allowOverlapX:!1,
shape:"flag",stackDistance:12,textAlign:"center",tooltip:{pointFormat:"{point.text}\x3cbr/\x3e"},threshold:null,y:-30,fillColor:"#ffffff",lineWidth:1,states:{hover:{lineColor:"#000000",fillColor:"#ccd6eb"}},style:{fontSize:"11px",fontWeight:"bold"}},{sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:a.Series.prototype.init,pointAttribs:function(a,e){var b=this.options,g=a&&a.color||this.color,f=b.lineColor,c=a&&a.lineWidth;a=a&&a.fillColor||
b.fillColor;e&&(a=b.states[e].fillColor,f=b.states[e].lineColor,c=b.states[e].lineWidth);return{fill:a||g,stroke:f||g,"stroke-width":c||b.lineWidth||0}},translate:B.translate,getPlotBox:B.getPlotBox,drawPoints:function(){var b=this.points,e=this.chart,g=e.renderer,l,f,c=e.inverted,h=this.options,w=h.y,u,r,v,q,y,x,z=this.yAxis,d={},H=[];for(r=b.length;r--;)v=b[r],x=(c?v.plotY:v.plotX)>this.xAxis.len,l=v.plotX,q=v.stackIndex,u=v.options.shape||h.shape,f=v.plotY,void 0!==f&&(f=v.plotY+w-(void 0!==q&&
q*h.stackDistance)),v.anchorX=q?void 0:v.plotX,y=q?void 0:v.plotY,q=v.graphic,void 0!==f&&0<=l&&!x?(q||(q=v.graphic=g.label("",null,null,u,null,null,h.useHTML).attr(this.pointAttribs(v)).css(m(h.style,v.style)).attr({align:"flag"===u?"left":"center",width:h.width,height:h.height,"text-align":h.textAlign}).addClass("highcharts-point").add(this.markerGroup),v.graphic.div&&(v.graphic.div.point=v),q.shadow(h.shadow),q.isNew=!0),0<l&&(l-=q.strokeWidth()%2),u={y:f,anchorY:y},h.allowOverlapX&&(u.x=l,u.anchorX=
v.anchorX),q.attr({text:v.options.title||h.title||"A"})[q.isNew?"attr":"animate"](u),h.allowOverlapX||(d[v.plotX]?d[v.plotX].size=Math.max(d[v.plotX].size,q.width):d[v.plotX]={align:0,size:q.width,target:l,anchorX:l}),v.tooltipPos=[l,f+z.pos-e.plotTop]):q&&(v.graphic=q.destroy());h.allowOverlapX||(a.objectEach(d,function(a){a.plotX=a.anchorX;H.push(a)}),a.distribute(H,c?z.len:this.xAxis.len,100),p(b,function(a){var b=a.graphic&&d[a.plotX];b&&(a.graphic[a.graphic.isNew?"attr":"animate"]({x:b.pos,anchorX:a.anchorX}),
a.graphic.isNew=!1)}));h.useHTML&&a.wrap(this.markerGroup,"on",function(b){return a.SVGElement.prototype.on.apply(b.apply(this,[].slice.call(arguments,1)),[].slice.call(arguments,1))})},drawTracker:function(){var a=this.points;u.drawTrackerPoint.apply(this);p(a,function(b){var e=b.graphic;e&&G(e.element,"mouseover",function(){0<b.stackIndex&&!b.raised&&(b._y=e.y,e.attr({y:b._y-8}),b.raised=!0);p(a,function(a){a!==b&&a.raised&&a.graphic&&(a.graphic.attr({y:a._y}),a.raised=!1)})})})},animate:g,buildKDTree:g,
setClip:g,invertGroups:g});l.flag=function(a,e,g,m,f){var b=f&&f.anchorX||a;f=f&&f.anchorY||e;return l.circle(b-1,f-1,2,2).concat(["M",b,f,"L",a,e+m,a,e,a+g,e,a+g,e+m,a,e+m,"Z"])};C("circle");C("square");v===y&&p(["flag","circlepin","squarepin"],function(a){y.prototype.symbols[a]=l[a]})})(L,da);(function(a){function B(a,b,c){this.init(a,b,c)}var C=a.addEvent,G=a.Axis,p=a.correctFloat,m=a.defaultOptions,g=a.defined,v=a.destroyObjectProperties,z=a.each,u=a.fireEvent,y=a.hasTouch,l=a.isTouchDevice,b=
a.merge,e=a.pick,t=a.removeEvent,n=a.wrap,f,c={height:l?20:14,barBorderRadius:0,buttonBorderRadius:0,liveRedraw:a.svg&&!l,margin:10,minWidth:6,step:.2,zIndex:3,barBackgroundColor:"#cccccc",barBorderWidth:1,barBorderColor:"#cccccc",buttonArrowColor:"#333333",buttonBackgroundColor:"#e6e6e6",buttonBorderColor:"#cccccc",buttonBorderWidth:1,rifleColor:"#333333",trackBackgroundColor:"#f2f2f2",trackBorderColor:"#f2f2f2",trackBorderWidth:1};m.scrollbar=b(!0,c,m.scrollbar);a.swapXY=f=function(a,b){var c=a.length,
e;if(b)for(b=0;b<c;b+=3)e=a[b+1],a[b+1]=a[b+2],a[b+2]=e;return a};B.prototype={init:function(a,f,g){this.scrollbarButtons=[];this.renderer=a;this.userOptions=f;this.options=b(c,f);this.chart=g;this.size=e(this.options.size,this.options.height);f.enabled&&(this.render(),this.initEvents(),this.addEvents())},render:function(){var a=this.renderer,b=this.options,c=this.size,e;this.group=e=a.g("scrollbar").attr({zIndex:b.zIndex,translateY:-99999}).add();this.track=a.rect().addClass("highcharts-scrollbar-track").attr({x:0,
r:b.trackBorderRadius||0,height:c,width:c}).add(e);this.track.attr({fill:b.trackBackgroundColor,stroke:b.trackBorderColor,"stroke-width":b.trackBorderWidth});this.trackBorderWidth=this.track.strokeWidth();this.track.attr({y:-this.trackBorderWidth%2/2});this.scrollbarGroup=a.g().add(e);this.scrollbar=a.rect().addClass("highcharts-scrollbar-thumb").attr({height:c,width:c,r:b.barBorderRadius||0}).add(this.scrollbarGroup);this.scrollbarRifles=a.path(f(["M",-3,c/4,"L",-3,2*c/3,"M",0,c/4,"L",0,2*c/3,"M",
3,c/4,"L",3,2*c/3],b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);this.scrollbar.attr({fill:b.barBackgroundColor,stroke:b.barBorderColor,"stroke-width":b.barBorderWidth});this.scrollbarRifles.attr({stroke:b.rifleColor,"stroke-width":1});this.scrollbarStrokeWidth=this.scrollbar.strokeWidth();this.scrollbarGroup.translate(-this.scrollbarStrokeWidth%2/2,-this.scrollbarStrokeWidth%2/2);this.drawScrollbarButton(0);this.drawScrollbarButton(1)},position:function(a,b,c,e){var f=
this.options.vertical,h=0,g=this.rendered?"animate":"attr";this.x=a;this.y=b+this.trackBorderWidth;this.width=c;this.xOffset=this.height=e;this.yOffset=h;f?(this.width=this.yOffset=c=h=this.size,this.xOffset=b=0,this.barWidth=e-2*c,this.x=a+=this.options.margin):(this.height=this.xOffset=e=b=this.size,this.barWidth=c-2*e,this.y+=this.options.margin);this.group[g]({translateX:a,translateY:this.y});this.track[g]({width:c,height:e});this.scrollbarButtons[1][g]({translateX:f?0:c-b,translateY:f?e-h:0})},
drawScrollbarButton:function(a){var b=this.renderer,c=this.scrollbarButtons,e=this.options,h=this.size,g;g=b.g().add(this.group);c.push(g);g=b.rect().addClass("highcharts-scrollbar-button").add(g);g.attr({stroke:e.buttonBorderColor,"stroke-width":e.buttonBorderWidth,fill:e.buttonBackgroundColor});g.attr(g.crisp({x:-.5,y:-.5,width:h+1,height:h+1,r:e.buttonBorderRadius},g.strokeWidth()));g=b.path(f(["M",h/2+(a?-1:1),h/2-3,"L",h/2+(a?-1:1),h/2+3,"L",h/2+(a?2:-2),h/2],e.vertical)).addClass("highcharts-scrollbar-arrow").add(c[a]);
g.attr({fill:e.buttonArrowColor})},setRange:function(a,b){var c=this.options,e=c.vertical,f=c.minWidth,h=this.barWidth,l,m,n=this.rendered&&!this.hasDragged?"animate":"attr";g(h)&&(a=Math.max(a,0),l=Math.ceil(h*a),this.calculatedWidth=m=p(h*Math.min(b,1)-l),m<f&&(l=(h-f+m)*a,m=f),f=Math.floor(l+this.xOffset+this.yOffset),h=m/2-.5,this.from=a,this.to=b,e?(this.scrollbarGroup[n]({translateY:f}),this.scrollbar[n]({height:m}),this.scrollbarRifles[n]({translateY:h}),this.scrollbarTop=f,this.scrollbarLeft=
0):(this.scrollbarGroup[n]({translateX:f}),this.scrollbar[n]({width:m}),this.scrollbarRifles[n]({translateX:h}),this.scrollbarLeft=f,this.scrollbarTop=0),12>=m?this.scrollbarRifles.hide():this.scrollbarRifles.show(!0),!1===c.showFull&&(0>=a&&1<=b?this.group.hide():this.group.show()),this.rendered=!0)},initEvents:function(){var a=this;a.mouseMoveHandler=function(b){var c=a.chart.pointer.normalize(b),e=a.options.vertical?"chartY":"chartX",f=a.initPositions;!a.grabbedCenter||b.touches&&0===b.touches[0][e]||
(c=a.cursorToScrollbarPosition(c)[e],e=a[e],e=c-e,a.hasDragged=!0,a.updatePosition(f[0]+e,f[1]+e),a.hasDragged&&u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b}))};a.mouseUpHandler=function(b){a.hasDragged&&u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b});a.grabbedCenter=a.hasDragged=a.chartX=a.chartY=null};a.mouseDownHandler=function(b){b=a.chart.pointer.normalize(b);b=a.cursorToScrollbarPosition(b);a.chartX=b.chartX;a.chartY=b.chartY;
a.initPositions=[a.from,a.to];a.grabbedCenter=!0};a.buttonToMinClick=function(b){var c=p(a.to-a.from)*a.options.step;a.updatePosition(p(a.from-c),p(a.to-c));u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.buttonToMaxClick=function(b){var c=(a.to-a.from)*a.options.step;a.updatePosition(a.from+c,a.to+c);u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.trackClick=function(b){var c=a.chart.pointer.normalize(b),e=a.to-a.from,f=a.y+a.scrollbarTop,g=a.x+a.scrollbarLeft;
a.options.vertical&&c.chartY>f||!a.options.vertical&&c.chartX>g?a.updatePosition(a.from+e,a.to+e):a.updatePosition(a.from-e,a.to-e);u(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})}},cursorToScrollbarPosition:function(a){var b=this.options,b=b.minWidth>this.calculatedWidth?b.minWidth:0;return{chartX:(a.chartX-this.x-this.xOffset)/(this.barWidth-b),chartY:(a.chartY-this.y-this.yOffset)/(this.barWidth-b)}},updatePosition:function(a,b){1<b&&(a=p(1-p(b-a)),b=1);0>a&&(b=p(b-a),a=0);
this.from=a;this.to=b},update:function(a){this.destroy();this.init(this.chart.renderer,b(!0,this.options,a),this.chart)},addEvents:function(){var a=this.options.inverted?[1,0]:[0,1],b=this.scrollbarButtons,c=this.scrollbarGroup.element,e=this.mouseDownHandler,f=this.mouseMoveHandler,g=this.mouseUpHandler,a=[[b[a[0]].element,"click",this.buttonToMinClick],[b[a[1]].element,"click",this.buttonToMaxClick],[this.track.element,"click",this.trackClick],[c,"mousedown",e],[c.ownerDocument,"mousemove",f],[c.ownerDocument,
"mouseup",g]];y&&a.push([c,"touchstart",e],[c.ownerDocument,"touchmove",f],[c.ownerDocument,"touchend",g]);z(a,function(a){C.apply(null,a)});this._events=a},removeEvents:function(){z(this._events,function(a){t.apply(null,a)});this._events.length=0},destroy:function(){var a=this.chart.scroller;this.removeEvents();z(["track","scrollbarRifles","scrollbar","scrollbarGroup","group"],function(a){this[a]&&this[a].destroy&&(this[a]=this[a].destroy())},this);a&&this===a.scrollbar&&(a.scrollbar=null,v(a.scrollbarButtons))}};
n(G.prototype,"init",function(a){var b=this;a.apply(b,Array.prototype.slice.call(arguments,1));b.options.scrollbar&&b.options.scrollbar.enabled&&(b.options.scrollbar.vertical=!b.horiz,b.options.startOnTick=b.options.endOnTick=!1,b.scrollbar=new B(b.chart.renderer,b.options.scrollbar,b.chart),C(b.scrollbar,"changed",function(a){var c=Math.min(e(b.options.min,b.min),b.min,b.dataMin),f=Math.max(e(b.options.max,b.max),b.max,b.dataMax)-c,g;b.horiz&&!b.reversed||!b.horiz&&b.reversed?(g=c+f*this.to,c+=f*
this.from):(g=c+f*(1-this.from),c+=f*(1-this.to));b.setExtremes(c,g,!0,!1,a)}))});n(G.prototype,"render",function(a){var b=Math.min(e(this.options.min,this.min),this.min,e(this.dataMin,this.min)),c=Math.max(e(this.options.max,this.max),this.max,e(this.dataMax,this.max)),f=this.scrollbar,h=this.titleOffset||0;a.apply(this,Array.prototype.slice.call(arguments,1));if(f){this.horiz?(f.position(this.left,this.top+this.height+2+this.chart.scrollbarsOffsets[1]+(this.opposite?0:h+this.axisTitleMargin+this.offset),
this.width,this.height),h=1):(f.position(this.left+this.width+2+this.chart.scrollbarsOffsets[0]+(this.opposite?h+this.axisTitleMargin+this.offset:0),this.top,this.width,this.height),h=0);if(!this.opposite&&!this.horiz||this.opposite&&this.horiz)this.chart.scrollbarsOffsets[h]+=this.scrollbar.size+this.scrollbar.options.margin;isNaN(b)||isNaN(c)||!g(this.min)||!g(this.max)?f.setRange(0,0):(h=(this.min-b)/(c-b),b=(this.max-b)/(c-b),this.horiz&&!this.reversed||!this.horiz&&this.reversed?f.setRange(h,
b):f.setRange(1-b,1-h))}});n(G.prototype,"getOffset",function(a){var b=this.horiz?2:1,c=this.scrollbar;a.apply(this,Array.prototype.slice.call(arguments,1));c&&(this.chart.scrollbarsOffsets=[0,0],this.chart.axisOffset[b]+=c.size+c.options.margin)});n(G.prototype,"destroy",function(a){this.scrollbar&&(this.scrollbar=this.scrollbar.destroy());a.apply(this,Array.prototype.slice.call(arguments,1))});a.Scrollbar=B})(L);(function(a){function B(a){this.init(a)}var C=a.addEvent,G=a.Axis,p=a.Chart,m=a.color,
g=a.defaultOptions,v=a.defined,z=a.destroyObjectProperties,u=a.each,y=a.erase,l=a.error,b=a.extend,e=a.grep,t=a.hasTouch,n=a.isArray,f=a.isNumber,c=a.isObject,h=a.merge,w=a.pick,D=a.removeEvent,r=a.Scrollbar,J=a.Series,q=a.seriesTypes,F=a.wrap,x=[].concat(a.defaultDataGroupingUnits),K=function(a){var b=e(arguments,f);if(b.length)return Math[a].apply(0,b)};x[4]=["day",[1,2,3,4]];x[5]=["week",[1,2,3]];q=void 0===q.areaspline?"line":"areaspline";b(g,{navigator:{height:40,margin:25,maskInside:!0,handles:{width:7,
height:15,symbols:["navigator-handle","navigator-handle"],enabled:!0,lineWidth:1,backgroundColor:"#f2f2f2",borderColor:"#999999"},maskFill:m("#6685c2").setOpacity(.3).get(),outlineColor:"#cccccc",outlineWidth:1,series:{type:q,fillOpacity:.05,lineWidth:1,compare:null,dataGrouping:{approximation:"average",enabled:!0,groupPixelWidth:2,smoothed:!0,units:x},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",className:"highcharts-navigator-series",lineColor:null,marker:{enabled:!1},pointRange:0,
threshold:null},xAxis:{overscroll:0,className:"highcharts-navigator-xaxis",tickLength:0,lineWidth:0,gridLineColor:"#e6e6e6",gridLineWidth:1,tickPixelInterval:200,labels:{align:"left",style:{color:"#999999"},x:3,y:-4},crosshair:!1},yAxis:{className:"highcharts-navigator-yaxis",gridLineWidth:0,startOnTick:!1,endOnTick:!1,minPadding:.1,maxPadding:.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickLength:0,tickWidth:0}}});a.Renderer.prototype.symbols["navigator-handle"]=function(a,b,c,e,f){a=f.width/
2;b=Math.round(a/3)+.5;f=f.height;return["M",-a-1,.5,"L",a,.5,"L",a,f+.5,"L",-a-1,f+.5,"L",-a-1,.5,"M",-b,4,"L",-b,f-3,"M",b-1,4,"L",b-1,f-3]};B.prototype={drawHandle:function(a,b,c,e){var d=this.navigatorOptions.handles.height;this.handles[b][e](c?{translateX:Math.round(this.left+this.height/2),translateY:Math.round(this.top+parseInt(a,10)+.5-d)}:{translateX:Math.round(this.left+parseInt(a,10)),translateY:Math.round(this.top+this.height/2-d/2-1)})},drawOutline:function(a,b,c,e){var d=this.navigatorOptions.maskInside,
f=this.outline.strokeWidth(),k=f/2,f=f%2/2,g=this.outlineHeight,h=this.scrollbarHeight,l=this.size,m=this.left-h,n=this.top;c?(m-=k,c=n+b+f,b=n+a+f,a=["M",m+g,n-h-f,"L",m+g,c,"L",m,c,"L",m,b,"L",m+g,b,"L",m+g,n+l+h].concat(d?["M",m+g,c-k,"L",m+g,b+k]:[])):(a+=m+h-f,b+=m+h-f,n+=k,a=["M",m,n,"L",a,n,"L",a,n+g,"L",b,n+g,"L",b,n,"L",m+l+2*h,n].concat(d?["M",a-k,n,"L",b+k,n]:[]));this.outline[e]({d:a})},drawMasks:function(a,b,c,e){var d=this.left,f=this.top,k=this.height,g,h,l,m;c?(l=[d,d,d],m=[f,f+a,
f+b],h=[k,k,k],g=[a,b-a,this.size-b]):(l=[d,d+a,d+b],m=[f,f,f],h=[a,b-a,this.size-b],g=[k,k,k]);u(this.shades,function(a,b){a[e]({x:l[b],y:m[b],width:h[b],height:g[b]})})},renderElements:function(){var a=this,b=a.navigatorOptions,c=b.maskInside,e=a.chart,f=e.inverted,g=e.renderer,h;a.navigatorGroup=h=g.g("navigator").attr({zIndex:8,visibility:"hidden"}).add();var l={cursor:f?"ns-resize":"ew-resize"};u([!c,c,!c],function(d,c){a.shades[c]=g.rect().addClass("highcharts-navigator-mask"+(1===c?"-inside":
"-outside")).attr({fill:d?b.maskFill:"rgba(0,0,0,0)"}).css(1===c&&l).add(h)});a.outline=g.path().addClass("highcharts-navigator-outline").attr({"stroke-width":b.outlineWidth,stroke:b.outlineColor}).add(h);b.handles.enabled&&u([0,1],function(d){b.handles.inverted=e.inverted;a.handles[d]=g.symbol(b.handles.symbols[d],-b.handles.width/2-1,0,b.handles.width,b.handles.height,b.handles);a.handles[d].attr({zIndex:7-d}).addClass("highcharts-navigator-handle highcharts-navigator-handle-"+["left","right"][d]).add(h);
var c=b.handles;a.handles[d].attr({fill:c.backgroundColor,stroke:c.borderColor,"stroke-width":c.lineWidth}).css(l)})},update:function(a){u(this.series||[],function(a){a.baseSeries&&delete a.baseSeries.navigatorSeries});this.destroy();h(!0,this.chart.options.navigator,this.options,a);this.init(this.chart)},render:function(b,c,e,k){var d=this.chart,g,h,l=this.scrollbarHeight,m,n=this.xAxis;g=n.fake?d.xAxis[0]:n;var q=this.navigatorEnabled,p,r=this.rendered;h=d.inverted;var t,x=d.xAxis[0].minRange,u=
d.xAxis[0].options.maxRange;if(!this.hasDragged||v(e)){if(!f(b)||!f(c))if(r)e=0,k=w(n.width,g.width);else return;this.left=w(n.left,d.plotLeft+l+(h?d.plotWidth:0));this.size=p=m=w(n.len,(h?d.plotHeight:d.plotWidth)-2*l);d=h?l:m+2*l;e=w(e,n.toPixels(b,!0));k=w(k,n.toPixels(c,!0));f(e)&&Infinity!==Math.abs(e)||(e=0,k=d);b=n.toValue(e,!0);c=n.toValue(k,!0);t=Math.abs(a.correctFloat(c-b));t<x?this.grabbedLeft?e=n.toPixels(c-x,!0):this.grabbedRight&&(k=n.toPixels(b+x,!0)):v(u)&&t>u&&(this.grabbedLeft?
e=n.toPixels(c-u,!0):this.grabbedRight&&(k=n.toPixels(b+u,!0)));this.zoomedMax=Math.min(Math.max(e,k,0),p);this.zoomedMin=Math.min(Math.max(this.fixedWidth?this.zoomedMax-this.fixedWidth:Math.min(e,k),0),p);this.range=this.zoomedMax-this.zoomedMin;p=Math.round(this.zoomedMax);e=Math.round(this.zoomedMin);q&&(this.navigatorGroup.attr({visibility:"visible"}),r=r&&!this.hasDragged?"animate":"attr",this.drawMasks(e,p,h,r),this.drawOutline(e,p,h,r),this.navigatorOptions.handles.enabled&&(this.drawHandle(e,
0,h,r),this.drawHandle(p,1,h,r)));this.scrollbar&&(h?(h=this.top-l,g=this.left-l+(q||!g.opposite?0:(g.titleOffset||0)+g.axisTitleMargin),l=m+2*l):(h=this.top+(q?this.height:-l),g=this.left-l),this.scrollbar.position(g,h,d,l),this.scrollbar.setRange(this.zoomedMin/m,this.zoomedMax/m));this.rendered=!0}},addMouseEvents:function(){var a=this,b=a.chart,c=b.container,e=[],f,g;a.mouseMoveHandler=f=function(b){a.onMouseMove(b)};a.mouseUpHandler=g=function(b){a.onMouseUp(b)};e=a.getPartsEvents("mousedown");
e.push(C(c,"mousemove",f),C(c.ownerDocument,"mouseup",g));t&&(e.push(C(c,"touchmove",f),C(c.ownerDocument,"touchend",g)),e.concat(a.getPartsEvents("touchstart")));a.eventsToUnbind=e;a.series&&a.series[0]&&e.push(C(a.series[0].xAxis,"foundExtremes",function(){b.navigator.modifyNavigatorAxisExtremes()}))},getPartsEvents:function(a){var b=this,d=[];u(["shades","handles"],function(c){u(b[c],function(e,f){d.push(C(e.element,a,function(a){b[c+"Mousedown"](a,f)}))})});return d},shadesMousedown:function(a,
b){a=this.chart.pointer.normalize(a);var d=this.chart,c=this.xAxis,e=this.zoomedMin,f=this.left,g=this.size,h=this.range,l=a.chartX,m,n;d.inverted&&(l=a.chartY,f=this.top);1===b?(this.grabbedCenter=l,this.fixedWidth=h,this.dragOffset=l-e):(a=l-f-h/2,0===b?a=Math.max(0,a):2===b&&a+h>=g&&(a=g-h,c.reversed?(a-=h,n=this.getUnionExtremes().dataMin):m=this.getUnionExtremes().dataMax),a!==e&&(this.fixedWidth=h,b=c.toFixedRange(a,a+h,n,m),v(b.min)&&d.xAxis[0].setExtremes(Math.min(b.min,b.max),Math.max(b.min,
b.max),!0,null,{trigger:"navigator"})))},handlesMousedown:function(a,b){this.chart.pointer.normalize(a);a=this.chart;var d=a.xAxis[0],c=a.inverted&&!d.reversed||!a.inverted&&d.reversed;0===b?(this.grabbedLeft=!0,this.otherHandlePos=this.zoomedMax,this.fixedExtreme=c?d.min:d.max):(this.grabbedRight=!0,this.otherHandlePos=this.zoomedMin,this.fixedExtreme=c?d.max:d.min);a.fixedRange=null},onMouseMove:function(a){var b=this,d=b.chart,c=b.left,e=b.navigatorSize,f=b.range,g=b.dragOffset,h=d.inverted;a.touches&&
0===a.touches[0].pageX||(a=d.pointer.normalize(a),d=a.chartX,h&&(c=b.top,d=a.chartY),b.grabbedLeft?(b.hasDragged=!0,b.render(0,0,d-c,b.otherHandlePos)):b.grabbedRight?(b.hasDragged=!0,b.render(0,0,b.otherHandlePos,d-c)):b.grabbedCenter&&(b.hasDragged=!0,d<g?d=g:d>e+g-f&&(d=e+g-f),b.render(0,0,d-g,d-g+f)),b.hasDragged&&b.scrollbar&&b.scrollbar.options.liveRedraw&&(a.DOMType=a.type,setTimeout(function(){b.onMouseUp(a)},0)))},onMouseUp:function(a){var b=this.chart,d=this.xAxis,c=d&&d.reversed,e=this.scrollbar,
f,g,h=a.DOMEvent||a;(!this.hasDragged||e&&e.hasDragged)&&"scrollbar"!==a.trigger||(e=this.getUnionExtremes(),this.zoomedMin===this.otherHandlePos?f=this.fixedExtreme:this.zoomedMax===this.otherHandlePos&&(g=this.fixedExtreme),this.zoomedMax===this.size&&(g=c?e.dataMin:e.dataMax),0===this.zoomedMin&&(f=c?e.dataMax:e.dataMin),d=d.toFixedRange(this.zoomedMin,this.zoomedMax,f,g),v(d.min)&&b.xAxis[0].setExtremes(Math.min(d.min,d.max),Math.max(d.min,d.max),!0,this.hasDragged?!1:null,{trigger:"navigator",
triggerOp:"navigator-drag",DOMEvent:h}));"mousemove"!==a.DOMType&&(this.grabbedLeft=this.grabbedRight=this.grabbedCenter=this.fixedWidth=this.fixedExtreme=this.otherHandlePos=this.hasDragged=this.dragOffset=null)},removeEvents:function(){this.eventsToUnbind&&(u(this.eventsToUnbind,function(a){a()}),this.eventsToUnbind=void 0);this.removeBaseSeriesEvents()},removeBaseSeriesEvents:function(){var a=this.baseSeries||[];this.navigatorEnabled&&a[0]&&(!1!==this.navigatorOptions.adaptToUpdatedData&&u(a,function(a){D(a,
"updatedData",this.updatedDataHandler)},this),a[0].xAxis&&D(a[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes))},init:function(a){var b=a.options,d=b.navigator,c=d.enabled,e=b.scrollbar,f=e.enabled,b=c?d.height:0,g=f?e.height:0;this.handles=[];this.shades=[];this.chart=a;this.setBaseSeries();this.height=b;this.scrollbarHeight=g;this.scrollbarEnabled=f;this.navigatorEnabled=c;this.navigatorOptions=d;this.scrollbarOptions=e;this.outlineHeight=b+g;this.opposite=w(d.opposite,!c&&a.inverted);var l=
this,e=l.baseSeries,f=a.xAxis.length,m=a.yAxis.length,n=e&&e[0]&&e[0].xAxis||a.xAxis[0]||{options:{}};a.extraMargin={type:l.opposite?"plotTop":"marginBottom",value:(c||!a.inverted?l.outlineHeight:0)+d.margin};a.inverted&&(a.extraMargin.type=l.opposite?"marginRight":"plotLeft");a.isDirtyBox=!0;l.navigatorEnabled?(l.xAxis=new G(a,h({breaks:n.options.breaks,ordinal:n.options.ordinal},d.xAxis,{id:"navigator-x-axis",yAxis:"navigator-y-axis",isX:!0,type:"datetime",index:f,offset:0,keepOrdinalPadding:!0,
startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1},a.inverted?{offsets:[g,0,-g,0],width:b}:{offsets:[0,-g,0,g],height:b})),l.yAxis=new G(a,h(d.yAxis,{id:"navigator-y-axis",alignTicks:!1,offset:0,index:m,zoomEnabled:!1},a.inverted?{width:b}:{height:b})),e||d.series.data?l.updateNavigatorSeries(!1):0===a.series.length&&(l.unbindRedraw=C(a,"beforeRedraw",function(){0<a.series.length&&!l.series&&(l.setBaseSeries(),l.unbindRedraw())})),l.renderElements(),l.addMouseEvents()):l.xAxis=
{translate:function(b,d){var c=a.xAxis[0],e=c.getExtremes(),f=c.len-2*g,k=K("min",c.options.min,e.dataMin),c=K("max",c.options.max,e.dataMax)-k;return d?b*c/f+k:f*(b-k)/c},toPixels:function(a){return this.translate(a)},toValue:function(a){return this.translate(a,!0)},toFixedRange:G.prototype.toFixedRange,fake:!0};a.options.scrollbar.enabled&&(a.scrollbar=l.scrollbar=new r(a.renderer,h(a.options.scrollbar,{margin:l.navigatorEnabled?0:10,vertical:a.inverted}),a),C(l.scrollbar,"changed",function(b){var d=
l.size,c=d*this.to,d=d*this.from;l.hasDragged=l.scrollbar.hasDragged;l.render(0,0,d,c);(a.options.scrollbar.liveRedraw||"mousemove"!==b.DOMType&&"touchmove"!==b.DOMType)&&setTimeout(function(){l.onMouseUp(b)})}));l.addBaseSeriesEvents();l.addChartEvents()},getUnionExtremes:function(a){var b=this.chart.xAxis[0],d=this.xAxis,c=d.options,e=b.options,f;a&&null===b.dataMin||(f={dataMin:w(c&&c.min,K("min",e.min,b.dataMin,d.dataMin,d.min)),dataMax:w(c&&c.max,K("max",e.max,b.dataMax,d.dataMax,d.max))});return f},
setBaseSeries:function(a,b){var d=this.chart,c=this.baseSeries=[];a=a||d.options&&d.options.navigator.baseSeries||0;u(d.series||[],function(b,d){b.options.isInternal||!b.options.showInNavigator&&(d!==a&&b.options.id!==a||!1===b.options.showInNavigator)||c.push(b)});this.xAxis&&!this.xAxis.fake&&this.updateNavigatorSeries(!0,b)},updateNavigatorSeries:function(d,c){var e=this,f=e.chart,l=e.baseSeries,m,q,p=e.navigatorOptions.series,r,t={enableMouseTracking:!1,index:null,linkedTo:null,group:"nav",padXAxis:!1,
xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",showInLegend:!1,stacking:!1,isInternal:!0,visible:!0},x=e.series=a.grep(e.series||[],function(b){var d=b.baseSeries;return 0>a.inArray(d,l)?(d&&(D(d,"updatedData",e.updatedDataHandler),delete d.navigatorSeries),b.destroy(),!1):!0});l&&l.length&&u(l,function(a){var d=a.navigatorSeries,k=b({color:a.color},n(p)?g.navigator.series:p);d&&!1===e.navigatorOptions.adaptToUpdatedData||(t.name="Navigator "+l.length,m=a.options||{},r=m.navigatorOptions||{},q=
h(m,t,k,r),k=r.data||k.data,e.hasNavigatorData=e.hasNavigatorData||!!k,q.data=k||m.data&&m.data.slice(0),d&&d.options?d.update(q,c):(a.navigatorSeries=f.initSeries(q),a.navigatorSeries.baseSeries=a,x.push(a.navigatorSeries)))});if(p.data&&(!l||!l.length)||n(p))e.hasNavigatorData=!1,p=a.splat(p),u(p,function(a,b){t.name="Navigator "+(x.length+1);q=h(g.navigator.series,{color:f.series[b]&&!f.series[b].options.isInternal&&f.series[b].color||f.options.colors[b]||f.options.colors[0]},t,a);q.data=a.data;
q.data&&(e.hasNavigatorData=!0,x.push(f.initSeries(q)))});d&&this.addBaseSeriesEvents()},addBaseSeriesEvents:function(){var a=this,b=a.baseSeries||[];b[0]&&b[0].xAxis&&C(b[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes);u(b,function(b){C(b,"show",function(){this.navigatorSeries&&this.navigatorSeries.setVisible(!0,!1)});C(b,"hide",function(){this.navigatorSeries&&this.navigatorSeries.setVisible(!1,!1)});!1!==this.navigatorOptions.adaptToUpdatedData&&b.xAxis&&C(b,"updatedData",this.updatedDataHandler);
C(b,"remove",function(){this.navigatorSeries&&(y(a.series,this.navigatorSeries),v(this.navigatorSeries.options)&&this.navigatorSeries.remove(!1),delete this.navigatorSeries)})},this)},modifyNavigatorAxisExtremes:function(){var a=this.xAxis,b;a.getExtremes&&(!(b=this.getUnionExtremes(!0))||b.dataMin===a.min&&b.dataMax===a.max||(a.min=b.dataMin,a.max=b.dataMax))},modifyBaseAxisExtremes:function(){var a=this.chart.navigator,b=this.getExtremes(),c=b.dataMin,e=b.dataMax,b=b.max-b.min,g=a.stickToMin,h=
a.stickToMax,l=w(this.options.overscroll,0),m,n,q=a.series&&a.series[0],p=!!this.setExtremes;this.eventArgs&&"rangeSelectorButton"===this.eventArgs.trigger||(g&&(n=c,m=n+b),h&&(m=e+l,g||(n=Math.max(m-b,q&&q.xData?q.xData[0]:-Number.MAX_VALUE))),p&&(g||h)&&f(n)&&(this.min=this.userMin=n,this.max=this.userMax=m));a.stickToMin=a.stickToMax=null},updatedDataHandler:function(){var a=this.chart.navigator,b=this.navigatorSeries;a.stickToMax=a.xAxis.reversed?0===Math.round(a.zoomedMin):Math.round(a.zoomedMax)>=
Math.round(a.size);a.stickToMin=f(this.xAxis.min)&&this.xAxis.min<=this.xData[0]&&(!this.chart.fixedRange||!a.stickToMax);b&&!a.hasNavigatorData&&(b.options.pointStart=this.xData[0],b.setData(this.options.data,!1,null,!1))},addChartEvents:function(){C(this.chart,"redraw",function(){var a=this.navigator,b=a&&(a.baseSeries&&a.baseSeries[0]&&a.baseSeries[0].xAxis||a.scrollbar&&this.xAxis[0]);b&&a.render(b.min,b.max)})},destroy:function(){this.removeEvents();this.xAxis&&(y(this.chart.xAxis,this.xAxis),
y(this.chart.axes,this.xAxis));this.yAxis&&(y(this.chart.yAxis,this.yAxis),y(this.chart.axes,this.yAxis));u(this.series||[],function(a){a.destroy&&a.destroy()});u("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "),function(a){this[a]&&this[a].destroy&&this[a].destroy();this[a]=null},this);u([this.handles],function(a){z(a)},this)}};a.Navigator=B;F(G.prototype,"zoom",function(a,b,c){var d=this.chart,e=d.options,f=e.chart.zoomType,
g=e.chart.pinchType,h=e.navigator,e=e.rangeSelector,l;this.isXAxis&&(h&&h.enabled||e&&e.enabled)&&("x"===f||"x"===g?d.resetZoomButton="blocked":"y"===f?l=!1:"xy"!==f&&"xy"!==g||!this.options.range||(d=this.previousZoom,v(b)?this.previousZoom=[this.min,this.max]:d&&(b=d[0],c=d[1],delete this.previousZoom)));return void 0!==l?l:a.call(this,b,c)});C(p,"beforeRender",function(){var a=this.options;if(a.navigator.enabled||a.scrollbar.enabled)this.scroller=this.navigator=new B(this)});C(p,"afterSetChartSize",
function(){var a=this.legend,b=this.navigator,c,e,f,g;b&&(e=a&&a.options,f=b.xAxis,g=b.yAxis,c=b.scrollbarHeight,this.inverted?(b.left=b.opposite?this.chartWidth-c-b.height:this.spacing[3]+c,b.top=this.plotTop+c):(b.left=this.plotLeft+c,b.top=b.navigatorOptions.top||this.chartHeight-b.height-c-this.spacing[2]-(this.rangeSelector&&this.extraBottomMargin?this.rangeSelector.getHeight():0)-(e&&"bottom"===e.verticalAlign&&e.enabled&&!e.floating?a.legendHeight+w(e.margin,10):0)),f&&g&&(this.inverted?f.options.left=
g.options.left=b.left:f.options.top=g.options.top=b.top,f.setAxisSize(),g.setAxisSize()))});F(J.prototype,"addPoint",function(a,b,e,f,g){var d=this.options.turboThreshold;d&&this.xData.length>d&&c(b,!0)&&this.chart.navigator&&l(20,!0);a.call(this,b,e,f,g)});C(p,"afterAddSeries",function(){this.navigator&&this.navigator.setBaseSeries(null,!1)});C(J,"afterUpdate",function(){this.chart.navigator&&!this.options.isInternal&&this.chart.navigator.setBaseSeries(null,!1)});p.prototype.callbacks.push(function(a){var b=
a.navigator;b&&a.xAxis[0]&&(a=a.xAxis[0].getExtremes(),b.render(a.min,a.max))})})(L);(function(a){function B(a){this.init(a)}var C=a.addEvent,G=a.Axis,p=a.Chart,m=a.css,g=a.createElement,v=a.defaultOptions,z=a.defined,u=a.destroyObjectProperties,y=a.discardElement,l=a.each,b=a.extend,e=a.fireEvent,t=a.isNumber,n=a.merge,f=a.pick,c=a.pInt,h=a.splat,w=a.wrap;b(v,{rangeSelector:{verticalAlign:"top",buttonTheme:{"stroke-width":0,width:28,height:18,padding:2,zIndex:7},floating:!1,x:0,y:0,height:void 0,
inputPosition:{align:"right",x:0,y:0},buttonPosition:{align:"left",x:0,y:0},labelStyle:{color:"#666666"}}});v.lang=n(v.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});B.prototype={clickButton:function(a,b){var c=this,e=c.chart,g=c.buttonOptions[a],m=e.xAxis[0],n=e.scroller&&e.scroller.getUnionExtremes()||m||{},d=n.dataMin,p=n.dataMax,r,k=m&&Math.round(Math.min(m.max,f(p,m.max))),u=g.type,v,n=g._range,w,D,y,z=g.dataGrouping;if(null!==d&&null!==p){e.fixedRange=n;z&&(this.forcedDataGrouping=
!0,G.prototype.setDataGrouping.call(m||{chart:this.chart},z,!1));if("month"===u||"year"===u)m?(u={range:g,max:k,chart:e,dataMin:d,dataMax:p},r=m.minFromRange.call(u),t(u.newMax)&&(k=u.newMax)):n=g;else if(n)r=Math.max(k-n,d),k=Math.min(r+n,p);else if("ytd"===u)if(m)void 0===p&&(d=Number.MAX_VALUE,p=Number.MIN_VALUE,l(e.series,function(a){a=a.xData;d=Math.min(a[0],d);p=Math.max(a[a.length-1],p)}),b=!1),k=c.getYTDExtremes(p,d,e.time.useUTC),r=w=k.min,k=k.max;else{C(e,"beforeRender",function(){c.clickButton(a)});
return}else"all"===u&&m&&(r=d,k=p);r+=g._offsetMin;k+=g._offsetMax;c.setSelected(a);m?m.setExtremes(r,k,f(b,1),null,{trigger:"rangeSelectorButton",rangeSelectorButton:g}):(v=h(e.options.xAxis)[0],y=v.range,v.range=n,D=v.min,v.min=w,C(e,"load",function(){v.range=y;v.min=D}))}},setSelected:function(a){this.selected=this.options.selected=a},defaultButtons:[{type:"month",count:1,text:"1m"},{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},
{type:"all",text:"All"}],init:function(a){var b=this,c=a.options.rangeSelector,f=c.buttons||[].concat(b.defaultButtons),g=c.selected,h=function(){var a=b.minInput,c=b.maxInput;a&&a.blur&&e(a,"blur");c&&c.blur&&e(c,"blur")};b.chart=a;b.options=c;b.buttons=[];a.extraTopMargin=c.height;b.buttonOptions=f;this.unMouseDown=C(a.container,"mousedown",h);this.unResize=C(a,"resize",h);l(f,b.computeButtonRange);void 0!==g&&f[g]&&this.clickButton(g,!1);C(a,"load",function(){a.xAxis&&a.xAxis[0]&&C(a.xAxis[0],
"setExtremes",function(c){this.max-this.min!==a.fixedRange&&"rangeSelectorButton"!==c.trigger&&"updatedData"!==c.trigger&&b.forcedDataGrouping&&this.setDataGrouping(!1,!1)})})},updateButtonStates:function(){var a=this.chart,b=a.xAxis[0],c=Math.round(b.max-b.min),e=!b.hasVisibleSeries,f=a.scroller&&a.scroller.getUnionExtremes()||b,g=f.dataMin,h=f.dataMax,a=this.getYTDExtremes(h,g,a.time.useUTC),d=a.min,m=a.max,n=this.selected,k=t(n),p=this.options.allButtonsEnabled,u=this.buttons;l(this.buttonOptions,
function(a,f){var l=a._range,q=a.type,r=a.count||1,t=u[f],v=0;a=a._offsetMax-a._offsetMin;f=f===n;var x=l>h-g,w=l<b.minRange,A=!1,y=!1,l=l===c;("month"===q||"year"===q)&&c+36E5>=864E5*{month:28,year:365}[q]*r-a&&c-36E5<=864E5*{month:31,year:366}[q]*r+a?l=!0:"ytd"===q?(l=m-d+a===c,A=!f):"all"===q&&(l=b.max-b.min>=h-g,y=!f&&k&&l);q=!p&&(x||w||y||e);r=f&&l||l&&!k&&!A;q?v=3:r&&(k=!0,v=2);t.state!==v&&t.setState(v)})},computeButtonRange:function(a){var b=a.type,c=a.count||1,e={millisecond:1,second:1E3,
minute:6E4,hour:36E5,day:864E5,week:6048E5};if(e[b])a._range=e[b]*c;else if("month"===b||"year"===b)a._range=864E5*{month:30,year:365}[b]*c;a._offsetMin=f(a.offsetMin,0);a._offsetMax=f(a.offsetMax,0);a._range+=a._offsetMax-a._offsetMin},setInputValue:function(a,b){var c=this.chart.options.rangeSelector,e=this.chart.time,f=this[a+"Input"];z(b)&&(f.previousValue=f.HCTime,f.HCTime=b);f.value=e.dateFormat(c.inputEditDateFormat||"%Y-%m-%d",f.HCTime);this[a+"DateBox"].attr({text:e.dateFormat(c.inputDateFormat||
"%b %e, %Y",f.HCTime)})},showInput:function(a){var b=this.inputGroup,c=this[a+"DateBox"];m(this[a+"Input"],{left:b.translateX+c.x+"px",top:b.translateY+"px",width:c.width-2+"px",height:c.height-2+"px",border:"2px solid silver"})},hideInput:function(a){m(this[a+"Input"],{border:0,width:"1px",height:"1px"});this.setInputValue(a)},drawInput:function(a){function e(){var a=y.value,b=(u.inputDateParser||Date.parse)(a),d=h.xAxis[0],e=h.scroller&&h.scroller.xAxis?h.scroller.xAxis:d,g=e.dataMin,e=e.dataMax;
b!==y.previousValue&&(y.previousValue=b,t(b)||(b=a.split("-"),b=Date.UTC(c(b[0]),c(b[1])-1,c(b[2]))),t(b)&&(h.time.useUTC||(b+=6E4*(new Date).getTimezoneOffset()),w?b>f.maxInput.HCTime?b=void 0:b<g&&(b=g):b<f.minInput.HCTime?b=void 0:b>e&&(b=e),void 0!==b&&d.setExtremes(w?b:d.min,w?d.max:b,void 0,void 0,{trigger:"rangeSelectorInput"})))}var f=this,h=f.chart,l=h.renderer.style||{},p=h.renderer,u=h.options.rangeSelector,d=f.div,w="min"===a,y,k,A=this.inputGroup;this[a+"Label"]=k=p.label(v.lang[w?"rangeSelectorFrom":
"rangeSelectorTo"],this.inputGroup.offset).addClass("highcharts-range-label").attr({padding:2}).add(A);A.offset+=k.width+5;this[a+"DateBox"]=p=p.label("",A.offset).addClass("highcharts-range-input").attr({padding:2,width:u.inputBoxWidth||90,height:u.inputBoxHeight||17,stroke:u.inputBoxBorderColor||"#cccccc","stroke-width":1,"text-align":"center"}).on("click",function(){f.showInput(a);f[a+"Input"].focus()}).add(A);A.offset+=p.width+(w?10:0);this[a+"Input"]=y=g("input",{name:a,className:"highcharts-range-selector",
type:"text"},{top:h.plotTop+"px"},d);k.css(n(l,u.labelStyle));p.css(n({color:"#333333"},l,u.inputStyle));m(y,b({position:"absolute",border:0,width:"1px",height:"1px",padding:0,textAlign:"center",fontSize:l.fontSize,fontFamily:l.fontFamily,top:"-9999em"},u.inputStyle));y.onfocus=function(){f.showInput(a)};y.onblur=function(){f.hideInput(a)};y.onchange=e;y.onkeypress=function(a){13===a.keyCode&&e()}},getPosition:function(){var a=this.chart,b=a.options.rangeSelector,a="top"===b.verticalAlign?a.plotTop-
a.axisOffset[0]:0;return{buttonTop:a+b.buttonPosition.y,inputTop:a+b.inputPosition.y-10}},getYTDExtremes:function(a,b,c){var e=this.chart.time,f=new e.Date(a),g=e.get("FullYear",f);c=c?e.Date.UTC(g,0,1):+new e.Date(g,0,1);b=Math.max(b||0,c);f=f.getTime();return{max:Math.min(a||f,f),min:b}},render:function(a,b){var c=this,e=c.chart,h=e.renderer,m=e.container,n=e.options,d=n.exporting&&!1!==n.exporting.enabled&&n.navigation&&n.navigation.buttonOptions,p=v.lang,r=c.div,k=n.rangeSelector,n=k.floating,
t=c.buttons,r=c.inputGroup,u=k.buttonTheme,w=k.buttonPosition,y=k.inputPosition,z=k.inputEnabled,D=u&&u.states,B=e.plotLeft,C,G=c.buttonGroup,L;L=c.rendered;var X=c.options.verticalAlign,Z=e.legend,aa=Z&&Z.options,ba=w.y,Y=y.y,ca=L||!1,W=0,T=0,U;if(!1!==k.enabled){L||(c.group=L=h.g("range-selector-group").attr({zIndex:7}).add(),c.buttonGroup=G=h.g("range-selector-buttons").add(L),c.zoomText=h.text(p.rangeSelectorZoom,f(B+w.x,B),15).css(k.labelStyle).add(G),C=f(B+w.x,B)+c.zoomText.getBBox().width+
5,l(c.buttonOptions,function(a,b){t[b]=h.button(a.text,C,0,function(){var d=a.events&&a.events.click,e;d&&(e=d.call(a));!1!==e&&c.clickButton(b);c.isActive=!0},u,D&&D.hover,D&&D.select,D&&D.disabled).attr({"text-align":"center"}).add(G);C+=t[b].width+f(k.buttonSpacing,5)}),!1!==z&&(c.div=r=g("div",null,{position:"relative",height:0,zIndex:1}),m.parentNode.insertBefore(r,m),c.inputGroup=r=h.g("input-group").add(L),r.offset=0,c.drawInput("min"),c.drawInput("max")));B=e.plotLeft-e.spacing[3];c.updateButtonStates();
d&&this.titleCollision(e)&&"top"===X&&"right"===w.align&&w.y+G.getBBox().height-12<(d.y||0)+d.height&&(W=-40);"left"===w.align?U=w.x-e.spacing[3]:"right"===w.align&&(U=w.x+W-e.spacing[1]);G.align({y:w.y,width:G.getBBox().width,align:w.align,x:U},!0,e.spacingBox);c.group.placed=ca;c.buttonGroup.placed=ca;!1!==z&&(W=d&&this.titleCollision(e)&&"top"===X&&"right"===y.align&&y.y-r.getBBox().height-12<(d.y||0)+d.height+e.spacing[0]?-40:0,"left"===y.align?U=B:"right"===y.align&&(U=-Math.max(e.axisOffset[1],
-W)),r.align({y:y.y,width:r.getBBox().width,align:y.align,x:y.x+U-2},!0,e.spacingBox),m=r.alignAttr.translateX+r.alignOptions.x-W+r.getBBox().x+2,d=r.alignOptions.width,p=G.alignAttr.translateX+G.getBBox().x,U=G.getBBox().width+20,(y.align===w.align||p+U>m&&m+d>p&&ba<Y+r.getBBox().height)&&r.attr({translateX:r.alignAttr.translateX+(e.axisOffset[1]>=-W?0:-W),translateY:r.alignAttr.translateY+G.getBBox().height+10}),c.setInputValue("min",a),c.setInputValue("max",b),c.inputGroup.placed=ca);c.group.align({verticalAlign:X},
!0,e.spacingBox);a=c.group.getBBox().height+20;b=c.group.alignAttr.translateY;"bottom"===X&&(Z=aa&&"bottom"===aa.verticalAlign&&aa.enabled&&!aa.floating?Z.legendHeight+f(aa.margin,10):0,a=a+Z-20,T=b-a-(n?0:k.y)-10);if("top"===X)n&&(T=0),e.titleOffset&&(T=e.titleOffset+e.options.title.margin),T+=e.margin[0]-e.spacing[0]||0;else if("middle"===X)if(Y===ba)T=0>Y?b+void 0:b;else if(Y||ba)T=0>Y||0>ba?T-Math.min(Y,ba):b-a+NaN;c.group.translate(k.x,k.y+Math.floor(T));!1!==z&&(c.minInput.style.marginTop=c.group.translateY+
"px",c.maxInput.style.marginTop=c.group.translateY+"px");c.rendered=!0}},getHeight:function(){var a=this.options,b=this.group,c=a.y,e=a.buttonPosition.y,a=a.inputPosition.y,b=b?b.getBBox(!0).height+13+c:0,c=Math.min(a,e);if(0>a&&0>e||0<a&&0<e)b+=Math.abs(c);return b},titleCollision:function(a){return!(a.options.title.text||a.options.subtitle.text)},update:function(a){var b=this.chart;n(!0,b.options.rangeSelector,a);this.destroy();this.init(b);b.rangeSelector.render()},destroy:function(){var b=this,
c=b.minInput,e=b.maxInput;b.unMouseDown();b.unResize();u(b.buttons);c&&(c.onfocus=c.onblur=c.onchange=null);e&&(e.onfocus=e.onblur=e.onchange=null);a.objectEach(b,function(a,c){a&&"chart"!==c&&(a.destroy?a.destroy():a.nodeType&&y(this[c]));a!==B.prototype[c]&&(b[c]=null)},this)}};G.prototype.toFixedRange=function(a,b,c,e){var g=this.chart&&this.chart.fixedRange;a=f(c,this.translate(a,!0,!this.horiz));b=f(e,this.translate(b,!0,!this.horiz));c=g&&(b-a)/g;.7<c&&1.3>c&&(e?a=b-g:b=a+g);t(a)&&t(b)||(a=
b=void 0);return{min:a,max:b}};G.prototype.minFromRange=function(){var a=this.range,b={month:"Month",year:"FullYear"}[a.type],c,e=this.max,g,h,l=function(a,c){var d=new Date(a),e=d["get"+b]();d["set"+b](e+c);e===d["get"+b]()&&d.setDate(0);return d.getTime()-a};t(a)?(c=e-a,h=a):(c=e+l(e,-a.count),this.chart&&(this.chart.fixedRange=e-c));g=f(this.dataMin,Number.MIN_VALUE);t(c)||(c=g);c<=g&&(c=g,void 0===h&&(h=l(c,a.count)),this.newMax=Math.min(c+h,this.dataMax));t(e)||(c=void 0);return c};C(p,"afterGetContainer",
function(){this.options.rangeSelector.enabled&&(this.rangeSelector=new B(this))});w(p.prototype,"render",function(a,b,c){var e=this.axes,f=this.rangeSelector;f&&(l(e,function(a){a.updateNames();a.setScale()}),this.getAxisMargins(),f.render(),e=f.options.verticalAlign,f.options.floating||("bottom"===e?this.extraBottomMargin=!0:"middle"!==e&&(this.extraTopMargin=!0)));a.call(this,b,c)});C(p,"update",function(a){var b=a.options;a=this.rangeSelector;this.extraTopMargin=this.extraBottomMargin=!1;this.isDirtyBox=
!0;a&&(a.render(),b=b.rangeSelector&&b.rangeSelector.verticalAlign||a.options&&a.options.verticalAlign,a.options.floating||("bottom"===b?this.extraBottomMargin=!0:"middle"!==b&&(this.extraTopMargin=!0)))});w(p.prototype,"redraw",function(a,b,c){var e=this.rangeSelector;e&&!e.options.floating&&(e.render(),e=e.options.verticalAlign,"bottom"===e?this.extraBottomMargin=!0:"middle"!==e&&(this.extraTopMargin=!0));a.call(this,b,c)});p.prototype.adjustPlotArea=function(){var a=this.rangeSelector;this.rangeSelector&&
(a=a.getHeight(),this.extraTopMargin&&(this.plotTop+=a),this.extraBottomMargin&&(this.marginBottom+=a))};p.prototype.callbacks.push(function(a){function b(){c=a.xAxis[0].getExtremes();t(c.min)&&e.render(c.min,c.max)}var c,e=a.rangeSelector,f,g;e&&(g=C(a.xAxis[0],"afterSetExtremes",function(a){e.render(a.min,a.max)}),f=C(a,"redraw",b),b());C(a,"destroy",function(){e&&(f(),g())})});a.RangeSelector=B})(L);(function(a){var B=a.addEvent,C=a.arrayMax,G=a.arrayMin,p=a.Axis,m=a.Chart,g=a.defined,v=a.each,
z=a.extend,u=a.format,y=a.grep,l=a.inArray,b=a.isNumber,e=a.isString,t=a.map,n=a.merge,f=a.pick,c=a.Point,h=a.Renderer,w=a.Series,D=a.splat,r=a.SVGRenderer,J=a.VMLRenderer,q=a.wrap,F=w.prototype,x=F.init,K=F.processData,d=c.prototype.tooltipFormatter;a.StockChart=a.stockChart=function(b,c,d){var g=e(b)||b.nodeName,k=arguments[g?1:0],h=k.series,l=a.getOptions(),p,q=f(k.navigator&&k.navigator.enabled,l.navigator.enabled,!0),r=q?{startOnTick:!1,endOnTick:!1}:null,u={marker:{enabled:!1,radius:2}},v={shadow:!1,
borderWidth:0};k.xAxis=t(D(k.xAxis||{}),function(a,b){return n({minPadding:0,maxPadding:0,overscroll:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},l.xAxis,l.xAxis&&l.xAxis[b],a,{type:"datetime",categories:null},r)});k.yAxis=t(D(k.yAxis||{}),function(a,b){p=f(a.opposite,!0);return n({labels:{y:-2},opposite:p,showLastLabel:!(!a.categories&&"category"!==a.type),title:{text:null}},l.yAxis,l.yAxis&&l.yAxis[b],a)});k.series=null;k=n({chart:{panning:!0,pinchType:"x"},navigator:{enabled:q},
scrollbar:{enabled:f(l.scrollbar.enabled,!0)},rangeSelector:{enabled:f(l.rangeSelector.enabled,!0)},title:{text:null},tooltip:{split:f(l.tooltip.split,!0),crosshairs:!0},legend:{enabled:!1},plotOptions:{line:u,spline:u,area:u,areaspline:u,arearange:u,areasplinerange:u,column:v,columnrange:v,candlestick:v,ohlc:v}},k,{isStock:!0});k.series=h;return g?new m(b,k,d):new m(k,c)};q(p.prototype,"autoLabelAlign",function(a){var b=this.chart,c=this.options,b=b._labelPanes=b._labelPanes||{},d=this.options.labels;
return this.chart.options.isStock&&"yAxis"===this.coll&&(c=c.top+","+c.height,!b[c]&&d.enabled)?(15===d.x&&(d.x=0),void 0===d.align&&(d.align="right"),b[c]=this,"right"):a.apply(this,[].slice.call(arguments,1))});B(p,"destroy",function(){var a=this.chart,b=this.options&&this.options.top+","+this.options.height;b&&a._labelPanes&&a._labelPanes[b]===this&&delete a._labelPanes[b]});q(p.prototype,"getPlotLinePath",function(c,d,k,h,m,n){var p=this,q=this.isLinked&&!this.series?this.linkedParent.series:
this.series,r=p.chart,u=r.renderer,w=p.left,x=p.top,y,A,z,E,B=[],D=[],C,H;if("xAxis"!==p.coll&&"yAxis"!==p.coll)return c.apply(this,[].slice.call(arguments,1));D=function(a){var c="xAxis"===a?"yAxis":"xAxis";a=p.options[c];return b(a)?[r[c][a]]:e(a)?[r.get(a)]:t(q,function(a){return a[c]})}(p.coll);v(p.isXAxis?r.yAxis:r.xAxis,function(a){if(g(a.options.id)?-1===a.options.id.indexOf("navigator"):1){var b=a.isXAxis?"yAxis":"xAxis",b=g(a.options[b])?r[b][a.options[b]]:r[b][0];p===b&&D.push(a)}});C=D.length?
[]:[p.isXAxis?r.yAxis[0]:r.xAxis[0]];v(D,function(b){-1!==l(b,C)||a.find(C,function(a){return a.pos===b.pos&&a.len&&b.len})||C.push(b)});H=f(n,p.translate(d,null,null,h));b(H)&&(p.horiz?v(C,function(a){var b;A=a.pos;E=A+a.len;y=z=Math.round(H+p.transB);if(y<w||y>w+p.width)m?y=z=Math.min(Math.max(w,y),w+p.width):b=!0;b||B.push("M",y,A,"L",z,E)}):v(C,function(a){var b;y=a.pos;z=y+a.len;A=E=Math.round(x+p.height-H);if(A<x||A>x+p.height)m?A=E=Math.min(Math.max(x,A),p.top+p.height):b=!0;b||B.push("M",
y,A,"L",z,E)}));return 0<B.length?u.crispPolyLine(B,k||1):null});r.prototype.crispPolyLine=function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=Math.round(a[c+1])-b%2/2),a[c+2]===a[c+5]&&(a[c+2]=a[c+5]=Math.round(a[c+2])+b%2/2);return a};h===J&&(J.prototype.crispPolyLine=r.prototype.crispPolyLine);q(p.prototype,"hideCrosshair",function(a,b){a.call(this,b);this.crossLabel&&(this.crossLabel=this.crossLabel.hide())});B(p,"afterDrawCrosshair",function(a){var b,c;if(g(this.crosshair.label)&&
this.crosshair.label.enabled&&this.cross){var d=this.chart,e=this.options.crosshair.label,h=this.horiz;b=this.opposite;c=this.left;var l=this.top,m=this.crossLabel,n=e.format,p="",q="inside"===this.options.tickPosition,r=!1!==this.crosshair.snap,t=0,v=a.e||this.cross&&this.cross.e,w=a.point;a=h?"center":b?"right"===this.labelAlign?"right":"left":"left"===this.labelAlign?"left":"center";m||(m=this.crossLabel=d.renderer.label(null,null,null,e.shape||"callout").addClass("highcharts-crosshair-label"+
(this.series[0]&&" highcharts-color-"+this.series[0].colorIndex)).attr({align:e.align||a,padding:f(e.padding,8),r:f(e.borderRadius,3),zIndex:2}).add(this.labelGroup),m.attr({fill:e.backgroundColor||this.series[0]&&this.series[0].color||"#666666",stroke:e.borderColor||"","stroke-width":e.borderWidth||0}).css(z({color:"#ffffff",fontWeight:"normal",fontSize:"11px",textAlign:"center"},e.style)));h?(a=r?w.plotX+c:v.chartX,l+=b?0:this.height):(a=b?this.width+c:0,l=r?w.plotY+l:v.chartY);n||e.formatter||
(this.isDatetimeAxis&&(p="%b %d, %Y"),n="{value"+(p?":"+p:"")+"}");p=r?w[this.isXAxis?"x":"y"]:this.toValue(h?v.chartX:v.chartY);m.attr({text:n?u(n,{value:p},d.time):e.formatter.call(this,p),x:a,y:l,visibility:p<this.min||p>this.max?"hidden":"visible"});e=m.getBBox();if(h){if(q&&!b||!q&&b)l=m.y-e.height}else l=m.y-e.height/2;h?(b=c-e.x,c=c+this.width-e.x):(b="left"===this.labelAlign?c:0,c="right"===this.labelAlign?c+this.width:d.chartWidth);m.translateX<b&&(t=b-m.translateX);m.translateX+e.width>=
c&&(t=-(m.translateX+e.width-c));m.attr({x:a+t,y:l,anchorX:h?a:this.opposite?0:d.chartWidth,anchorY:h?this.opposite?d.chartHeight:0:l+e.height/2})}});F.init=function(){x.apply(this,arguments);this.setCompare(this.options.compare)};F.setCompare=function(a){this.modifyValue="value"===a||"percent"===a?function(b,c){var d=this.compareValue;if(void 0!==b&&void 0!==d)return b="value"===a?b-d:b/d*100-(100===this.options.compareBase?0:100),c&&(c.change=b),b}:null;this.userOptions.compare=a;this.chart.hasRendered&&
(this.isDirty=!0)};F.processData=function(){var a,c=-1,d,e,f=!0===this.options.compareStart?0:1,g,h;K.apply(this,arguments);if(this.xAxis&&this.processedYData)for(d=this.processedXData,e=this.processedYData,g=e.length,this.pointArrayMap&&(c=l("close",this.pointArrayMap),-1===c&&(c=l(this.pointValKey||"y",this.pointArrayMap))),a=0;a<g-f;a++)if(h=e[a]&&-1<c?e[a][c]:e[a],b(h)&&d[a+f]>=this.xAxis.min&&0!==h){this.compareValue=h;break}};q(F,"getExtremes",function(a){var b;a.apply(this,[].slice.call(arguments,
1));this.modifyValue&&(b=[this.modifyValue(this.dataMin),this.modifyValue(this.dataMax)],this.dataMin=G(b),this.dataMax=C(b))});p.prototype.setCompare=function(a,b){this.isXAxis||(v(this.series,function(b){b.setCompare(a)}),f(b,!0)&&this.chart.redraw())};c.prototype.tooltipFormatter=function(b){b=b.replace("{point.change}",(0<this.change?"+":"")+a.numberFormat(this.change,f(this.series.tooltipOptions.changeDecimals,2)));return d.apply(this,[b])};q(w.prototype,"render",function(a){this.chart.is3d&&
this.chart.is3d()||this.chart.polar||!this.xAxis||this.xAxis.isRadial||(!this.clipBox&&this.animate?(this.clipBox=n(this.chart.clipBox),this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len):this.chart[this.sharedClipKey]?this.chart[this.sharedClipKey].attr({width:this.xAxis.len,height:this.yAxis.len}):this.clipBox&&(this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len));a.call(this)});q(m.prototype,"getSelectedPoints",function(a){var b=a.call(this);v(this.series,function(a){a.hasGroupedData&&
(b=b.concat(y(a.points||[],function(a){return a.selected})))});return b});B(m,"update",function(a){a=a.options;"scrollbar"in a&&this.navigator&&(n(!0,this.options.scrollbar,a.scrollbar),this.navigator.update({},!1),delete a.scrollbar)})})(L);return L});
(function() {


}).call(this);
/*! Select2 4.0.6-rc.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return v.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o=b&&b.split("/"),p=t.map,q=p&&p["*"]||{};if(a){for(a=a.split("/"),g=a.length-1,t.nodeIdCompat&&x.test(a[g])&&(a[g]=a[g].replace(x,"")),"."===a[0].charAt(0)&&o&&(n=o.slice(0,o.length-1),a=n.concat(a)),k=0;k<a.length;k++)if("."===(m=a[k]))a.splice(k,1),k-=1;else if(".."===m){if(0===k||1===k&&".."===a[2]||".."===a[k-1])continue;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}if((o||q)&&p){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),o)for(l=o.length;l>0;l-=1)if((e=p[o.slice(0,l).join("/")])&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&q&&q[d]&&(i=q[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=w.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),o.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){r[a]=b}}function j(a){if(e(s,a)){var c=s[a];delete s[a],u[a]=!0,n.apply(b,c)}if(!e(r,a)&&!e(u,a))throw new Error("No "+a);return r[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return a?k(a):[]}function m(a){return function(){return t&&t.config&&t.config[a]||{}}}var n,o,p,q,r={},s={},t={},u={},v=Object.prototype.hasOwnProperty,w=[].slice,x=/\.js$/;p=function(a,b){var c,d=k(a),e=d[0],g=b[1];return a=d[1],e&&(e=f(e,g),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(g)):f(a,g):(a=f(a,g),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},q={require:function(a){return g(a)},exports:function(a){var b=r[a];return void 0!==b?b:r[a]={}},module:function(a){return{id:a,uri:"",exports:r[a],config:m(a)}}},n=function(a,c,d,f){var h,k,m,n,o,t,v,w=[],x=typeof d;if(f=f||a,t=l(f),"undefined"===x||"function"===x){for(c=!c.length&&d.length?["require","exports","module"]:c,o=0;o<c.length;o+=1)if(n=p(c[o],t),"require"===(k=n.f))w[o]=q.require(a);else if("exports"===k)w[o]=q.exports(a),v=!0;else if("module"===k)h=w[o]=q.module(a);else if(e(r,k)||e(s,k)||e(u,k))w[o]=j(k);else{if(!n.p)throw new Error(a+" missing "+k);n.p.load(n.n,g(f,!0),i(k),{}),w[o]=r[k]}m=d?d.apply(r[a],w):void 0,a&&(h&&h.exports!==b&&h.exports!==r[a]?r[a]=h.exports:m===b&&v||(r[a]=m))}else a&&(r[a]=d)},a=c=o=function(a,c,d,e,f){if("string"==typeof a)return q[a]?q[a](c):j(p(a,l(c)).f);if(!a.splice){if(t=a,t.deps&&o(t.deps,t.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?n(b,a,c,d):setTimeout(function(){n(b,a,c,d)},4),o},o.config=function(a){return o(a)},a._defined=r,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(r,a)||e(s,a)||(s[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){"function"==typeof b[d]&&("constructor"!==d&&c.push(d))}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){return Array.prototype.unshift.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice,c=b.call(arguments,1);this.listeners=this.listeners||{},null==c&&(c=[]),0===c.length&&c.push({}),c[0]._type=a,a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;c<d;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;c<a;c++){b+=Math.floor(36*Math.random()).toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return(e!==f||"hidden"!==f&&"visible"!==f)&&("scroll"===e||"scroll"===f||(d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth))},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c.__cache={};var e=0;return c.GetUniqueElementId=function(a){var b=a.getAttribute("data-select2-id");return null==b&&(a.id?(b=a.id,a.setAttribute("data-select2-id",b)):(a.setAttribute("data-select2-id",++e),b=e.toString())),b},c.StoreData=function(a,b,d){var e=c.GetUniqueElementId(a);c.__cache[e]||(c.__cache[e]={}),c.__cache[e][b]=d},c.GetData=function(b,d){var e=c.GetUniqueElementId(b);return d?c.__cache[e]&&null!=c.__cache[e][d]?c.__cache[e][d]:a(b).data(d):c.__cache[e]},c.RemoveData=function(a){var b=c.GetUniqueElementId(a);null!=c.__cache[b]&&delete c.__cache[b]},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){b.find(".select2-results").append(a)},c.prototype.sort=function(a){return this.options.get("sorter")(a)},c.prototype.highlightFirstItem=function(){var a=this.$results.find(".select2-results__option[aria-selected]"),b=a.filter("[aria-selected=true]");b.length>0?b.first().trigger("mouseenter"):a.first().trigger("mouseenter"),this.ensureHighlightVisible()},c.prototype.setClasses=function(){var c=this;this.data.current(function(d){var e=a.map(d,function(a){return a.id.toString()});c.$results.find(".select2-results__option[aria-selected]").each(function(){var c=a(this),d=b.GetData(this,"data"),f=""+d.id;null!=d.element&&d.element.selected||null==d.element&&a.inArray(f,e)>-1?c.attr("aria-selected","true"):c.attr("aria-selected","false")})})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(c){var d=document.createElement("li");d.className="select2-results__option";var e={role:"treeitem","aria-selected":"false"};c.disabled&&(delete e["aria-selected"],e["aria-disabled"]="true"),null==c.id&&delete e["aria-selected"],null!=c._resultId&&(d.id=c._resultId),c.title&&(d.title=c.title),c.children&&(e.role="group",e["aria-label"]=c.text,delete e["aria-selected"]);for(var f in e){var g=e[f];d.setAttribute(f,g)}if(c.children){var h=a(d),i=document.createElement("strong");i.className="select2-results__group";a(i);this.template(c,i);for(var j=[],k=0;k<c.children.length;k++){var l=c.children[k],m=this.option(l);j.push(m)}var n=a("<ul></ul>",{class:"select2-results__options select2-results__options--nested"});n.append(j),h.append(i),h.append(n)}else this.template(c,d);return b.StoreData(d,"data",c),d},c.prototype.bind=function(c,d){var e=this,f=c.id+"-results";this.$results.attr("id",f),c.on("results:all",function(a){e.clear(),e.append(a.data),c.isOpen()&&(e.setClasses(),e.highlightFirstItem())}),c.on("results:append",function(a){e.append(a.data),c.isOpen()&&e.setClasses()}),c.on("query",function(a){e.hideMessages(),e.showLoading(a)}),c.on("select",function(){c.isOpen()&&(e.setClasses(),e.highlightFirstItem())}),c.on("unselect",function(){c.isOpen()&&(e.setClasses(),e.highlightFirstItem())}),c.on("open",function(){e.$results.attr("aria-expanded","true"),e.$results.attr("aria-hidden","false"),e.setClasses(),e.ensureHighlightVisible()}),c.on("close",function(){e.$results.attr("aria-expanded","false"),e.$results.attr("aria-hidden","true"),e.$results.removeAttr("aria-activedescendant")}),c.on("results:toggle",function(){var a=e.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),c.on("results:select",function(){var a=e.getHighlightedResults();if(0!==a.length){var c=b.GetData(a[0],"data");"true"==a.attr("aria-selected")?e.trigger("close",{}):e.trigger("select",{data:c})}}),c.on("results:previous",function(){var a=e.getHighlightedResults(),b=e.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var d=c-1;0===a.length&&(d=0);var f=b.eq(d);f.trigger("mouseenter");var g=e.$results.offset().top,h=f.offset().top,i=e.$results.scrollTop()+(h-g);0===d?e.$results.scrollTop(0):h-g<0&&e.$results.scrollTop(i)}}),c.on("results:next",function(){var a=e.getHighlightedResults(),b=e.$results.find("[aria-selected]"),c=b.index(a),d=c+1;if(!(d>=b.length)){var f=b.eq(d);f.trigger("mouseenter");var g=e.$results.offset().top+e.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=e.$results.scrollTop()+h-g;0===d?e.$results.scrollTop(0):h>g&&e.$results.scrollTop(i)}}),c.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),c.on("results:message",function(a){e.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=e.$results.scrollTop(),c=e.$results.get(0).scrollHeight-b+a.deltaY,d=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=e.$results.height();d?(e.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(e.$results.scrollTop(e.$results.get(0).scrollHeight-e.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(c){var d=a(this),f=b.GetData(this,"data");if("true"===d.attr("aria-selected"))return void(e.options.get("multiple")?e.trigger("unselect",{originalEvent:c,data:f}):e.trigger("close",{}));e.trigger("select",{originalEvent:c,data:f})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(c){var d=b.GetData(this,"data");e.getHighlightedResults().removeClass("select2-results__option--highlighted"),e.trigger("results:focus",{data:d,element:a(this)})})},c.prototype.getHighlightedResults=function(){return this.$results.find(".select2-results__option--highlighted")},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),c<=2?this.$results.scrollTop(0):(g>this.$results.outerHeight()||g<0)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){return{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46}}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var c=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=b.GetData(this.$element[0],"old-tabindex")?this._tabindex=b.GetData(this.$element[0],"old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),c.attr("title",this.$element.attr("title")),c.attr("tabindex",this._tabindex),this.$selection=c,c},d.prototype.bind=function(a,b){var d=this,e=(a.id,a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(c){a(document.body).on("mousedown.select2."+c.id,function(c){var d=a(c.target),e=d.closest(".select2");a(".select2.select2-container--open").each(function(){a(this),this!=e[0]&&b.GetData(this,"element").select2("close")})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){b.find(".selection").append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d).attr("role","textbox").attr("aria-readonly","true"),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("focus",function(b){a.isOpen()||c.$selection.focus()})},e.prototype.clear=function(){var a=this.$selection.find(".select2-selection__rendered");a.empty(),a.removeAttr("title")},e.prototype.display=function(a,b){var c=this.options.get("templateSelection");return this.options.get("escapeMarkup")(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.attr("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,e){var f=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){f.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!f.options.get("disabled")){var d=a(this),e=d.parent(),g=c.GetData(e[0],"data");f.trigger("unselect",{originalEvent:b,data:g})}})},d.prototype.clear=function(){var a=this.$selection.find(".select2-selection__rendered");a.empty(),a.removeAttr("title")},d.prototype.display=function(a,b){var c=this.options.get("templateSelection");return this.options.get("escapeMarkup")(c(a,b))},d.prototype.selectionContainer=function(){return a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>')},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.attr("title",e.title||e.text),c.StoreData(f[0],"data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id;if(b.length>1||c)return a.call(this,b);this.clear();var d=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(d)},b}),b.define("select2/selection/allowClear",["jquery","../keys","../utils"],function(a,b,c){function d(){}return d.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},d.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var d=this.$selection.find(".select2-selection__clear");if(0!==d.length){b.stopPropagation();var e=c.GetData(d[0],"data"),f=this.$element.val();this.$element.val(this.placeholder.id);var g={data:e};if(this.trigger("clear",g),g.prevented)return void this.$element.val(f);for(var h=0;h<e.length;h++)if(g={data:e[h]},this.trigger("unselect",g),g.prevented)return void this.$element.val(f);this.$element.trigger("change"),this.trigger("toggle",{})}}},d.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||c.which!=b.DELETE&&c.which!=b.BACKSPACE||this._handleClear(c)},d.prototype.update=function(b,d){if(b.call(this,d),!(this.$selection.find(".select2-selection__placeholder").length>0||0===d.length)){var e=a('<span class="select2-selection__clear">&times;</span>');c.StoreData(e[0],"data",d),this.$selection.find(".select2-selection__rendered").prepend(e)}},d}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,d,e){var f=this;a.call(this,d,e),d.on("open",function(){f.$search.trigger("focus")}),d.on("close",function(){f.$search.val(""),f.$search.removeAttr("aria-activedescendant"),f.$search.trigger("focus")}),d.on("enable",function(){f.$search.prop("disabled",!1),f._transferTabIndex()}),d.on("disable",function(){f.$search.prop("disabled",!0)}),d.on("focus",function(a){f.$search.trigger("focus")}),d.on("results:focus",function(a){f.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){f.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){f._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){if(a.stopPropagation(),f.trigger("keypress",a),f._keyUpPrevented=a.isDefaultPrevented(),a.which===c.BACKSPACE&&""===f.$search.val()){var d=f.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var e=b.GetData(d[0],"data");f.searchRemoveChoice(e),a.preventDefault()}}});var g=document.documentMode,h=g&&g<=11;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){if(h)return void f.$selection.off("input.search input.searchcheck");f.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(h&&"input"===a.type)return void f.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&f.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{a=.75*(this.$search.val().length+1)+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting","clear","clearing"],g=["opening","closing","selecting","unselecting","clearing"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){return{"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"}}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),null!=c.id?d+="-"+c.id.toString():d+="-"+a.generateChars(4),d},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){var b=this;if(this.$element.prop("multiple")){if(a.selected=!1,c(a.element).is("option"))return a.element.selected=!1,void this.$element.trigger("change");this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})}},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){b.RemoveData(this)})},d.prototype.query=function(a,b){var d=[],e=this;this.$element.children().each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var d;a.children?(d=document.createElement("optgroup"),d.label=a.text):(d=document.createElement("option"),void 0!==d.textContent?d.textContent=a.text:d.innerText=a.text),void 0!==a.id&&(d.value=a.id),a.disabled&&(d.disabled=!0),a.selected&&(d.selected=!0),a.title&&(d.title=a.title);var e=c(d),f=this._normalizeItem(a);return f.element=d,b.StoreData(d,"data",f),e},d.prototype.item=function(a){var d={};if(null!=(d=b.GetData(a[0],"data")))return d;if(a.is("option"))d={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){d={text:a.prop("label"),children:[],title:a.prop("title")};for(var e=a.children("option"),f=[],g=0;g<e.length;g++){var h=c(e[g]),i=this.item(h);f.push(i)}d.children=f}return d=this._normalizeItem(d),d.element=a[0],b.StoreData(a[0],"data",d),d},d.prototype._normalizeItem=function(a){a!==Object(a)&&(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){return this.options.get("matcher")(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},j,l),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){"status"in d&&(0===d.status||"0"===d.status)||e.trigger("results:message",{message:"errorLoading"})});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&null!=a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");void 0!==f&&(this.createTag=f);var g=d.get("insertTag");if(void 0!==g&&(this.insertTag=g),b.call(this,c,d),a.isArray(e))for(var h=0;h<e.length;h++){var i=e[h],j=this._normalizeItem(i),k=this.option(j);this.$element.append(k)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0);if((i.text||"").toUpperCase()===(b.term||"").toUpperCase()||j)return!f&&(a.data=g,void c(a))}if(f)return!0;var k=e.createTag(b);if(null!=k){var l=e.option(k);l.attr("data-select2-tag",!0),e.addOptions([l]),e.insertTag(g,k)}a.results=g,c(a)}var e=this;if(this._removeOldTags(),null==b.term||null!=b.page)return void a.call(this,b,c);a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){this._lastTag;this.$element.find("option[data-select2-tag]").each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(b,c,d){function e(b){var c=g._normalizeItem(b);if(!g.$element.find("option").filter(function(){return a(this).val()===c.id}).length){var d=g.option(c);d.attr("data-select2-tag",!0),g._removeOldTags(),g.addOptions([d])}f(c)}function f(a){g.trigger("select",{data:a})}var g=this;c.term=c.term||"";var h=this.tokenizer(c,this.options,e);h.term!==c.term&&(this.$search.length&&(this.$search.val(h.term),this.$search.focus()),c.term=h.term),b.call(this,c,d)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){if(b.term=b.term||"",b.term.length<this.minimumInputLength)return void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}});a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){if(b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength)return void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}});a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;if(d.maximumSelectionLength>0&&f>=d.maximumSelectionLength)return void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}});a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val(""),e.$search.blur()}),c.on("focus",function(){c.isOpen()||e.$search.focus()}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){e.showSearch(a)?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){e.$results.offset().top+e.$results.outerHeight(!1)+50>=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1)&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){b.StoreData(this,"select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(c){var d=b.GetData(this,"select2-scroll-position");a(this).scrollTop(d.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id;this.$container.parents().filter(b.hasScroll).off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=this.$container.offset();f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom},m=this.$dropdownParent;"static"===m.css("position")&&(m=m.offsetParent());var n=m.offset();l.top-=n.top,l.left-=n.left,c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-n.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.position="relative",a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return!(a(c.data.results)<this.minimumResultsForSearch)&&b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",["../utils"],function(a){function b(){}return b.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(a){d._handleSelectOnClose(a)})},b.prototype._handleSelectOnClose=function(b,c){if(c&&null!=c.originalSelect2Event){var d=c.originalSelect2Event;if("select"===d._type||"unselect"===d._type)return}var e=this.getHighlightedResults();if(!(e.length<1)){var f=a.GetData(e[0],"data");null!=f.element&&f.element.selected||null==f.element&&f.selected||this.trigger("select",{data:f})}},b}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{originalEvent:c,originalSelect2Event:b})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){return"Please enter "+(a.minimum-a.input.length)+" or more characters"},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}return D.prototype.apply=function(l){if(l=a.extend(!0,{},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),null==l.tokenSeparators&&null==l.tokenizer||(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(a){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(a){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var O=k.loadPath(this.defaults.amdLanguageBase+"en"),P=new k(l.language);P.extend(O),l.translations=P}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){null==c(d,e.children[g])&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var h=b(e.text).toUpperCase(),i=b(d.term).toUpperCase();return h.indexOf(i)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(!0,this.defaults,f)},new D}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),d.GetData(a[0],"select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),d.StoreData(a[0],"data",d.GetData(a[0],"select2Tags")),d.StoreData(a[0],"tags",!0)),d.GetData(a[0],"ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",d.GetData(a[0],"ajaxUrl")),d.StoreData(a[0],"ajax-Url",d.GetData(a[0],"ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,d.GetData(a[0])):d.GetData(a[0]);var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,d){null!=c.GetData(a[0],"select2")&&c.GetData(a[0],"select2").destroy(),this.$element=a,this.id=this._generateId(a),d=d||{},this.options=new b(d,a),e.__super__.constructor.call(this);var f=a.attr("tabindex")||0;c.StoreData(a[0],"old-tabindex",f),a.attr("tabindex","-1");var g=this.options.get("dataAdapter");this.dataAdapter=new g(a,this.options);var h=this.render();this._placeContainer(h);var i=this.options.get("selectionAdapter");this.selection=new i(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,h);var j=this.options.get("dropdownAdapter");this.dropdown=new j(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,h);var k=this.options.get("resultsAdapter");this.results=new k(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var l=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){l.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),c.StoreData(a[0],"select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b=b.replace(/(:|\.|\[|\]|,)/g,""),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return e<=0?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;h<i;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this.$element.on("focus.select2",function(a){b.trigger("focus",a)}),this._syncA=c.bind(this._syncAttributes,this),this._syncS=c.bind(this._syncSubtree,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._syncA);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._syncA),a.each(c,b._syncS)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})):this.$element[0].addEventListener&&(this.$element[0].addEventListener("DOMAttrModified",b._syncA,!1),this.$element[0].addEventListener("DOMNodeInserted",b._syncS,!1),this.$element[0].addEventListener("DOMNodeRemoved",b._syncS,!1))},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype._syncSubtree=function(a,b){var c=!1,d=this;if(!a||!a.target||"OPTION"===a.target.nodeName||"OPTGROUP"===a.target.nodeName){if(b)if(b.addedNodes&&b.addedNodes.length>0)for(var e=0;e<b.addedNodes.length;e++){var f=b.addedNodes[e];f.selected&&(c=!0)}else b.removedNodes&&b.removedNodes.length>0&&(c=!0);else c=!0;c&&this.dataAdapter.current(function(a){d.trigger("selection:update",{data:a})})}},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting",clear:"clearing"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),null!=a&&0!==a.length||(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._syncA),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&(this.$element[0].removeEventListener("DOMAttrModified",this._syncA,!1),this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,!1),this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,!1)),this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",c.GetData(this.$element[0],"old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),c.RemoveData(this.$element[0]),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),c.StoreData(b[0],"element",this.$element),b},e}),b.define("jquery-mousewheel",["jquery"],function(a){return a}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults","./select2/utils"],function(a,b,c,d,e){if(null==a.fn.select2){var f=["open","close","destroy"];a.fn.select2=function(b){if("object"==typeof(b=b||{}))return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d,g=Array.prototype.slice.call(arguments,1);return this.each(function(){var a=e.GetData(this,"select2");null==a&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2."),d=a[b].apply(a,g)}),a.inArray(b,f)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});
(function() {
  $(document).on('ready page:load', function(event) {
    var Notifications;
    return Notifications = (function() {
      function Notifications() {}

      if ($('#nav-user')[0]) {
        $.ajax({
          url: '/notifications.json',
          dataType: 'JSON',
          method: 'GET',
          success: function(data) {
            var items;
            items = $.map(data, function(notification) {
              return notification.template;
            });
            if (items.length > 0) {
              $("[data-behavior='unread-count']").text(items.length);
              return $("[data-behavior='notification-items']").append(items);
            }
          }
        });
      }

      return Notifications;

    })();
  });

}).call(this);
/**
 * jquery.Jcrop.js v0.9.12
 * jQuery Image Cropping Plugin - released under MIT License 
 * Author: Kelly Hallman <khallman@gmail.com>
 * http://github.com/tapmodo/Jcrop
 * Copyright (c) 2008-2013 Tapmodo Interactive LLC {{{
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * }}}
 */


(function ($) {

  $.Jcrop = function (obj, opt) {
    var options = $.extend({}, $.Jcrop.defaults),
        docOffset,
        _ua = navigator.userAgent.toLowerCase(),
        is_msie = /msie/.test(_ua),
        ie6mode = /msie [1-6]\./.test(_ua);

    // Internal Methods {{{
    function px(n) {
      return Math.round(n) + 'px';
    }
    function cssClass(cl) {
      return options.baseClass + '-' + cl;
    }
    function supportsColorFade() {
      return $.fx.step.hasOwnProperty('backgroundColor');
    }
    function getPos(obj) //{{{
    {
      var pos = $(obj).offset();
      return [pos.left, pos.top];
    }
    //}}}
    function mouseAbs(e) //{{{
    {
      return [(e.pageX - docOffset[0]), (e.pageY - docOffset[1])];
    }
    //}}}
    function setOptions(opt) //{{{
    {
      if (typeof(opt) !== 'object') opt = {};
      options = $.extend(options, opt);

      $.each(['onChange','onSelect','onRelease','onDblClick'],function(i,e) {
        if (typeof(options[e]) !== 'function') options[e] = function () {};
      });
    }
    //}}}
    function startDragMode(mode, pos, touch) //{{{
    {
      docOffset = getPos($img);
      Tracker.setCursor(mode === 'move' ? mode : mode + '-resize');

      if (mode === 'move') {
        return Tracker.activateHandlers(createMover(pos), doneSelect, touch);
      }

      var fc = Coords.getFixed();
      var opp = oppLockCorner(mode);
      var opc = Coords.getCorner(oppLockCorner(opp));

      Coords.setPressed(Coords.getCorner(opp));
      Coords.setCurrent(opc);

      Tracker.activateHandlers(dragmodeHandler(mode, fc), doneSelect, touch);
    }
    //}}}
    function dragmodeHandler(mode, f) //{{{
    {
      return function (pos) {
        if (!options.aspectRatio) {
          switch (mode) {
          case 'e':
            pos[1] = f.y2;
            break;
          case 'w':
            pos[1] = f.y2;
            break;
          case 'n':
            pos[0] = f.x2;
            break;
          case 's':
            pos[0] = f.x2;
            break;
          }
        } else {
          switch (mode) {
          case 'e':
            pos[1] = f.y + 1;
            break;
          case 'w':
            pos[1] = f.y + 1;
            break;
          case 'n':
            pos[0] = f.x + 1;
            break;
          case 's':
            pos[0] = f.x + 1;
            break;
          }
        }
        Coords.setCurrent(pos);
        Selection.update();
      };
    }
    //}}}
    function createMover(pos) //{{{
    {
      var lloc = pos;
      KeyManager.watchKeys();

      return function (pos) {
        Coords.moveOffset([pos[0] - lloc[0], pos[1] - lloc[1]]);
        lloc = pos;

        Selection.update();
      };
    }
    //}}}
    function oppLockCorner(ord) //{{{
    {
      switch (ord) {
      case 'n':
        return 'sw';
      case 's':
        return 'nw';
      case 'e':
        return 'nw';
      case 'w':
        return 'ne';
      case 'ne':
        return 'sw';
      case 'nw':
        return 'se';
      case 'se':
        return 'nw';
      case 'sw':
        return 'ne';
      }
    }
    //}}}
    function createDragger(ord) //{{{
    {
      return function (e) {
        if (options.disabled) {
          return false;
        }
        if ((ord === 'move') && !options.allowMove) {
          return false;
        }
        
        // Fix position of crop area when dragged the very first time.
        // Necessary when crop image is in a hidden element when page is loaded.
        docOffset = getPos($img);

        btndown = true;
        startDragMode(ord, mouseAbs(e));
        e.stopPropagation();
        e.preventDefault();
        return false;
      };
    }
    //}}}
    function presize($obj, w, h) //{{{
    {
      var nw = $obj.width(),
          nh = $obj.height();
      if ((nw > w) && w > 0) {
        nw = w;
        nh = (w / $obj.width()) * $obj.height();
      }
      if ((nh > h) && h > 0) {
        nh = h;
        nw = (h / $obj.height()) * $obj.width();
      }
      xscale = $obj.width() / nw;
      yscale = $obj.height() / nh;
      $obj.width(nw).height(nh);
    }
    //}}}
    function unscale(c) //{{{
    {
      return {
        x: c.x * xscale,
        y: c.y * yscale,
        x2: c.x2 * xscale,
        y2: c.y2 * yscale,
        w: c.w * xscale,
        h: c.h * yscale
      };
    }
    //}}}
    function doneSelect(pos) //{{{
    {
      var c = Coords.getFixed();
      if ((c.w > options.minSelect[0]) && (c.h > options.minSelect[1])) {
        Selection.enableHandles();
        Selection.done();
      } else {
        Selection.release();
      }
      Tracker.setCursor(options.allowSelect ? 'crosshair' : 'default');
    }
    //}}}
    function newSelection(e) //{{{
    {
      if (options.disabled) {
        return false;
      }
      if (!options.allowSelect) {
        return false;
      }
      btndown = true;
      docOffset = getPos($img);
      Selection.disableHandles();
      Tracker.setCursor('crosshair');
      var pos = mouseAbs(e);
      Coords.setPressed(pos);
      Selection.update();
      Tracker.activateHandlers(selectDrag, doneSelect, e.type.substring(0,5)==='touch');
      KeyManager.watchKeys();

      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    //}}}
    function selectDrag(pos) //{{{
    {
      Coords.setCurrent(pos);
      Selection.update();
    }
    //}}}
    function newTracker() //{{{
    {
      var trk = $('<div></div>').addClass(cssClass('tracker'));
      if (is_msie) {
        trk.css({
          opacity: 0,
          backgroundColor: 'white'
        });
      }
      return trk;
    }
    //}}}

    // }}}
    // Initialization {{{
    // Sanitize some options {{{
    if (typeof(obj) !== 'object') {
      obj = $(obj)[0];
    }
    if (typeof(opt) !== 'object') {
      opt = {};
    }
    // }}}
    setOptions(opt);
    // Initialize some jQuery objects {{{
    // The values are SET on the image(s) for the interface
    // If the original image has any of these set, they will be reset
    // However, if you destroy() the Jcrop instance the original image's
    // character in the DOM will be as you left it.
    var img_css = {
      border: 'none',
      visibility: 'visible',
      margin: 0,
      padding: 0,
      position: 'absolute',
      top: 0,
      left: 0
    };

    var $origimg = $(obj),
      img_mode = true;

    if (obj.tagName == 'IMG') {
      // Fix size of crop image.
      // Necessary when crop image is within a hidden element when page is loaded.
      if ($origimg[0].width != 0 && $origimg[0].height != 0) {
        // Obtain dimensions from contained img element.
        $origimg.width($origimg[0].width);
        $origimg.height($origimg[0].height);
      } else {
        // Obtain dimensions from temporary image in case the original is not loaded yet (e.g. IE 7.0). 
        var tempImage = new Image();
        tempImage.src = $origimg[0].src;
        $origimg.width(tempImage.width);
        $origimg.height(tempImage.height);
      } 

      var $img = $origimg.clone().removeAttr('id').css(img_css).show();

      $img.width($origimg.width());
      $img.height($origimg.height());
      $origimg.after($img).hide();

    } else {
      $img = $origimg.css(img_css).show();
      img_mode = false;
      if (options.shade === null) { options.shade = true; }
    }

    presize($img, options.boxWidth, options.boxHeight);

    var boundx = $img.width(),
        boundy = $img.height(),
        
        
        $div = $('<div />').width(boundx).height(boundy).addClass(cssClass('holder')).css({
        position: 'relative',
        backgroundColor: options.bgColor
      }).insertAfter($origimg).append($img);

    if (options.addClass) {
      $div.addClass(options.addClass);
    }

    var $img2 = $('<div />'),

        $img_holder = $('<div />') 
        .width('100%').height('100%').css({
          zIndex: 310,
          position: 'absolute',
          overflow: 'hidden'
        }),

        $hdl_holder = $('<div />') 
        .width('100%').height('100%').css('zIndex', 320), 

        $sel = $('<div />') 
        .css({
          position: 'absolute',
          zIndex: 600
        }).dblclick(function(){
          var c = Coords.getFixed();
          options.onDblClick.call(api,c);
        }).insertBefore($img).append($img_holder, $hdl_holder); 

    if (img_mode) {

      $img2 = $('<img />')
          .attr('src', $img.attr('src')).css(img_css).width(boundx).height(boundy),

      $img_holder.append($img2);

    }

    if (ie6mode) {
      $sel.css({
        overflowY: 'hidden'
      });
    }

    var bound = options.boundary;
    var $trk = newTracker().width(boundx + (bound * 2)).height(boundy + (bound * 2)).css({
      position: 'absolute',
      top: px(-bound),
      left: px(-bound),
      zIndex: 290
    }).mousedown(newSelection);

    /* }}} */
    // Set more variables {{{
    var bgcolor = options.bgColor,
        bgopacity = options.bgOpacity,
        xlimit, ylimit, xmin, ymin, xscale, yscale, enabled = true,
        btndown, animating, shift_down;

    docOffset = getPos($img);
    // }}}
    // }}}
    // Internal Modules {{{
    // Touch Module {{{ 
    var Touch = (function () {
      // Touch support detection function adapted (under MIT License)
      // from code by Jeffrey Sambells - http://github.com/iamamused/
      function hasTouchSupport() {
        var support = {}, events = ['touchstart', 'touchmove', 'touchend'],
            el = document.createElement('div'), i;

        try {
          for(i=0; i<events.length; i++) {
            var eventName = events[i];
            eventName = 'on' + eventName;
            var isSupported = (eventName in el);
            if (!isSupported) {
              el.setAttribute(eventName, 'return;');
              isSupported = typeof el[eventName] == 'function';
            }
            support[events[i]] = isSupported;
          }
          return support.touchstart && support.touchend && support.touchmove;
        }
        catch(err) {
          return false;
        }
      }

      function detectSupport() {
        if ((options.touchSupport === true) || (options.touchSupport === false)) return options.touchSupport;
          else return hasTouchSupport();
      }
      return {
        createDragger: function (ord) {
          return function (e) {
            if (options.disabled) {
              return false;
            }
            if ((ord === 'move') && !options.allowMove) {
              return false;
            }
            docOffset = getPos($img);
            btndown = true;
            startDragMode(ord, mouseAbs(Touch.cfilter(e)), true);
            e.stopPropagation();
            e.preventDefault();
            return false;
          };
        },
        newSelection: function (e) {
          return newSelection(Touch.cfilter(e));
        },
        cfilter: function (e){
          e.pageX = e.originalEvent.changedTouches[0].pageX;
          e.pageY = e.originalEvent.changedTouches[0].pageY;
          return e;
        },
        isSupported: hasTouchSupport,
        support: detectSupport()
      };
    }());
    // }}}
    // Coords Module {{{
    var Coords = (function () {
      var x1 = 0,
          y1 = 0,
          x2 = 0,
          y2 = 0,
          ox, oy;

      function setPressed(pos) //{{{
      {
        pos = rebound(pos);
        x2 = x1 = pos[0];
        y2 = y1 = pos[1];
      }
      //}}}
      function setCurrent(pos) //{{{
      {
        pos = rebound(pos);
        ox = pos[0] - x2;
        oy = pos[1] - y2;
        x2 = pos[0];
        y2 = pos[1];
      }
      //}}}
      function getOffset() //{{{
      {
        return [ox, oy];
      }
      //}}}
      function moveOffset(offset) //{{{
      {
        var ox = offset[0],
            oy = offset[1];

        if (0 > x1 + ox) {
          ox -= ox + x1;
        }
        if (0 > y1 + oy) {
          oy -= oy + y1;
        }

        if (boundy < y2 + oy) {
          oy += boundy - (y2 + oy);
        }
        if (boundx < x2 + ox) {
          ox += boundx - (x2 + ox);
        }

        x1 += ox;
        x2 += ox;
        y1 += oy;
        y2 += oy;
      }
      //}}}
      function getCorner(ord) //{{{
      {
        var c = getFixed();
        switch (ord) {
        case 'ne':
          return [c.x2, c.y];
        case 'nw':
          return [c.x, c.y];
        case 'se':
          return [c.x2, c.y2];
        case 'sw':
          return [c.x, c.y2];
        }
      }
      //}}}
      function getFixed() //{{{
      {
        if (!options.aspectRatio) {
          return getRect();
        }
        // This function could use some optimization I think...
        var aspect = options.aspectRatio,
            min_x = options.minSize[0] / xscale,
            
            
            //min_y = options.minSize[1]/yscale,
            max_x = options.maxSize[0] / xscale,
            max_y = options.maxSize[1] / yscale,
            rw = x2 - x1,
            rh = y2 - y1,
            rwa = Math.abs(rw),
            rha = Math.abs(rh),
            real_ratio = rwa / rha,
            xx, yy, w, h;

        if (max_x === 0) {
          max_x = boundx * 10;
        }
        if (max_y === 0) {
          max_y = boundy * 10;
        }
        if (real_ratio < aspect) {
          yy = y2;
          w = rha * aspect;
          xx = rw < 0 ? x1 - w : w + x1;

          if (xx < 0) {
            xx = 0;
            h = Math.abs((xx - x1) / aspect);
            yy = rh < 0 ? y1 - h : h + y1;
          } else if (xx > boundx) {
            xx = boundx;
            h = Math.abs((xx - x1) / aspect);
            yy = rh < 0 ? y1 - h : h + y1;
          }
        } else {
          xx = x2;
          h = rwa / aspect;
          yy = rh < 0 ? y1 - h : y1 + h;
          if (yy < 0) {
            yy = 0;
            w = Math.abs((yy - y1) * aspect);
            xx = rw < 0 ? x1 - w : w + x1;
          } else if (yy > boundy) {
            yy = boundy;
            w = Math.abs(yy - y1) * aspect;
            xx = rw < 0 ? x1 - w : w + x1;
          }
        }

        // Magic %-)
        if (xx > x1) { // right side
          if (xx - x1 < min_x) {
            xx = x1 + min_x;
          } else if (xx - x1 > max_x) {
            xx = x1 + max_x;
          }
          if (yy > y1) {
            yy = y1 + (xx - x1) / aspect;
          } else {
            yy = y1 - (xx - x1) / aspect;
          }
        } else if (xx < x1) { // left side
          if (x1 - xx < min_x) {
            xx = x1 - min_x;
          } else if (x1 - xx > max_x) {
            xx = x1 - max_x;
          }
          if (yy > y1) {
            yy = y1 + (x1 - xx) / aspect;
          } else {
            yy = y1 - (x1 - xx) / aspect;
          }
        }

        if (xx < 0) {
          x1 -= xx;
          xx = 0;
        } else if (xx > boundx) {
          x1 -= xx - boundx;
          xx = boundx;
        }

        if (yy < 0) {
          y1 -= yy;
          yy = 0;
        } else if (yy > boundy) {
          y1 -= yy - boundy;
          yy = boundy;
        }

        return makeObj(flipCoords(x1, y1, xx, yy));
      }
      //}}}
      function rebound(p) //{{{
      {
        if (p[0] < 0) p[0] = 0;
        if (p[1] < 0) p[1] = 0;

        if (p[0] > boundx) p[0] = boundx;
        if (p[1] > boundy) p[1] = boundy;

        return [Math.round(p[0]), Math.round(p[1])];
      }
      //}}}
      function flipCoords(x1, y1, x2, y2) //{{{
      {
        var xa = x1,
            xb = x2,
            ya = y1,
            yb = y2;
        if (x2 < x1) {
          xa = x2;
          xb = x1;
        }
        if (y2 < y1) {
          ya = y2;
          yb = y1;
        }
        return [xa, ya, xb, yb];
      }
      //}}}
      function getRect() //{{{
      {
        var xsize = x2 - x1,
            ysize = y2 - y1,
            delta;

        if (xlimit && (Math.abs(xsize) > xlimit)) {
          x2 = (xsize > 0) ? (x1 + xlimit) : (x1 - xlimit);
        }
        if (ylimit && (Math.abs(ysize) > ylimit)) {
          y2 = (ysize > 0) ? (y1 + ylimit) : (y1 - ylimit);
        }

        if (ymin / yscale && (Math.abs(ysize) < ymin / yscale)) {
          y2 = (ysize > 0) ? (y1 + ymin / yscale) : (y1 - ymin / yscale);
        }
        if (xmin / xscale && (Math.abs(xsize) < xmin / xscale)) {
          x2 = (xsize > 0) ? (x1 + xmin / xscale) : (x1 - xmin / xscale);
        }

        if (x1 < 0) {
          x2 -= x1;
          x1 -= x1;
        }
        if (y1 < 0) {
          y2 -= y1;
          y1 -= y1;
        }
        if (x2 < 0) {
          x1 -= x2;
          x2 -= x2;
        }
        if (y2 < 0) {
          y1 -= y2;
          y2 -= y2;
        }
        if (x2 > boundx) {
          delta = x2 - boundx;
          x1 -= delta;
          x2 -= delta;
        }
        if (y2 > boundy) {
          delta = y2 - boundy;
          y1 -= delta;
          y2 -= delta;
        }
        if (x1 > boundx) {
          delta = x1 - boundy;
          y2 -= delta;
          y1 -= delta;
        }
        if (y1 > boundy) {
          delta = y1 - boundy;
          y2 -= delta;
          y1 -= delta;
        }

        return makeObj(flipCoords(x1, y1, x2, y2));
      }
      //}}}
      function makeObj(a) //{{{
      {
        return {
          x: a[0],
          y: a[1],
          x2: a[2],
          y2: a[3],
          w: a[2] - a[0],
          h: a[3] - a[1]
        };
      }
      //}}}

      return {
        flipCoords: flipCoords,
        setPressed: setPressed,
        setCurrent: setCurrent,
        getOffset: getOffset,
        moveOffset: moveOffset,
        getCorner: getCorner,
        getFixed: getFixed
      };
    }());

    //}}}
    // Shade Module {{{
    var Shade = (function() {
      var enabled = false,
          holder = $('<div />').css({
            position: 'absolute',
            zIndex: 240,
            opacity: 0
          }),
          shades = {
            top: createShade(),
            left: createShade().height(boundy),
            right: createShade().height(boundy),
            bottom: createShade()
          };

      function resizeShades(w,h) {
        shades.left.css({ height: px(h) });
        shades.right.css({ height: px(h) });
      }
      function updateAuto()
      {
        return updateShade(Coords.getFixed());
      }
      function updateShade(c)
      {
        shades.top.css({
          left: px(c.x),
          width: px(c.w),
          height: px(c.y)
        });
        shades.bottom.css({
          top: px(c.y2),
          left: px(c.x),
          width: px(c.w),
          height: px(boundy-c.y2)
        });
        shades.right.css({
          left: px(c.x2),
          width: px(boundx-c.x2)
        });
        shades.left.css({
          width: px(c.x)
        });
      }
      function createShade() {
        return $('<div />').css({
          position: 'absolute',
          backgroundColor: options.shadeColor||options.bgColor
        }).appendTo(holder);
      }
      function enableShade() {
        if (!enabled) {
          enabled = true;
          holder.insertBefore($img);
          updateAuto();
          Selection.setBgOpacity(1,0,1);
          $img2.hide();

          setBgColor(options.shadeColor||options.bgColor,1);
          if (Selection.isAwake())
          {
            setOpacity(options.bgOpacity,1);
          }
            else setOpacity(1,1);
        }
      }
      function setBgColor(color,now) {
        colorChangeMacro(getShades(),color,now);
      }
      function disableShade() {
        if (enabled) {
          holder.remove();
          $img2.show();
          enabled = false;
          if (Selection.isAwake()) {
            Selection.setBgOpacity(options.bgOpacity,1,1);
          } else {
            Selection.setBgOpacity(1,1,1);
            Selection.disableHandles();
          }
          colorChangeMacro($div,0,1);
        }
      }
      function setOpacity(opacity,now) {
        if (enabled) {
          if (options.bgFade && !now) {
            holder.animate({
              opacity: 1-opacity
            },{
              queue: false,
              duration: options.fadeTime
            });
          }
          else holder.css({opacity:1-opacity});
        }
      }
      function refreshAll() {
        options.shade ? enableShade() : disableShade();
        if (Selection.isAwake()) setOpacity(options.bgOpacity);
      }
      function getShades() {
        return holder.children();
      }

      return {
        update: updateAuto,
        updateRaw: updateShade,
        getShades: getShades,
        setBgColor: setBgColor,
        enable: enableShade,
        disable: disableShade,
        resize: resizeShades,
        refresh: refreshAll,
        opacity: setOpacity
      };
    }());
    // }}}
    // Selection Module {{{
    var Selection = (function () {
      var awake,
          hdep = 370,
          borders = {},
          handle = {},
          dragbar = {},
          seehandles = false;

      // Private Methods
      function insertBorder(type) //{{{
      {
        var jq = $('<div />').css({
          position: 'absolute',
          opacity: options.borderOpacity
        }).addClass(cssClass(type));
        $img_holder.append(jq);
        return jq;
      }
      //}}}
      function dragDiv(ord, zi) //{{{
      {
        var jq = $('<div />').mousedown(createDragger(ord)).css({
          cursor: ord + '-resize',
          position: 'absolute',
          zIndex: zi
        }).addClass('ord-'+ord);

        if (Touch.support) {
          jq.bind('touchstart.jcrop', Touch.createDragger(ord));
        }

        $hdl_holder.append(jq);
        return jq;
      }
      //}}}
      function insertHandle(ord) //{{{
      {
        var hs = options.handleSize,

          div = dragDiv(ord, hdep++).css({
            opacity: options.handleOpacity
          }).addClass(cssClass('handle'));

        if (hs) { div.width(hs).height(hs); }

        return div;
      }
      //}}}
      function insertDragbar(ord) //{{{
      {
        return dragDiv(ord, hdep++).addClass('jcrop-dragbar');
      }
      //}}}
      function createDragbars(li) //{{{
      {
        var i;
        for (i = 0; i < li.length; i++) {
          dragbar[li[i]] = insertDragbar(li[i]);
        }
      }
      //}}}
      function createBorders(li) //{{{
      {
        var cl,i;
        for (i = 0; i < li.length; i++) {
          switch(li[i]){
            case'n': cl='hline'; break;
            case's': cl='hline bottom'; break;
            case'e': cl='vline right'; break;
            case'w': cl='vline'; break;
          }
          borders[li[i]] = insertBorder(cl);
        }
      }
      //}}}
      function createHandles(li) //{{{
      {
        var i;
        for (i = 0; i < li.length; i++) {
          handle[li[i]] = insertHandle(li[i]);
        }
      }
      //}}}
      function moveto(x, y) //{{{
      {
        if (!options.shade) {
          $img2.css({
            top: px(-y),
            left: px(-x)
          });
        }
        $sel.css({
          top: px(y),
          left: px(x)
        });
      }
      //}}}
      function resize(w, h) //{{{
      {
        $sel.width(Math.round(w)).height(Math.round(h));
      }
      //}}}
      function refresh() //{{{
      {
        var c = Coords.getFixed();

        Coords.setPressed([c.x, c.y]);
        Coords.setCurrent([c.x2, c.y2]);

        updateVisible();
      }
      //}}}

      // Internal Methods
      function updateVisible(select) //{{{
      {
        if (awake) {
          return update(select);
        }
      }
      //}}}
      function update(select) //{{{
      {
        var c = Coords.getFixed();

        resize(c.w, c.h);
        moveto(c.x, c.y);
        if (options.shade) Shade.updateRaw(c);

        awake || show();

        if (select) {
          options.onSelect.call(api, unscale(c));
        } else {
          options.onChange.call(api, unscale(c));
        }
      }
      //}}}
      function setBgOpacity(opacity,force,now) //{{{
      {
        if (!awake && !force) return;
        if (options.bgFade && !now) {
          $img.animate({
            opacity: opacity
          },{
            queue: false,
            duration: options.fadeTime
          });
        } else {
          $img.css('opacity', opacity);
        }
      }
      //}}}
      function show() //{{{
      {
        $sel.show();

        if (options.shade) Shade.opacity(bgopacity);
          else setBgOpacity(bgopacity,true);

        awake = true;
      }
      //}}}
      function release() //{{{
      {
        disableHandles();
        $sel.hide();

        if (options.shade) Shade.opacity(1);
          else setBgOpacity(1);

        awake = false;
        options.onRelease.call(api);
      }
      //}}}
      function showHandles() //{{{
      {
        if (seehandles) {
          $hdl_holder.show();
        }
      }
      //}}}
      function enableHandles() //{{{
      {
        seehandles = true;
        if (options.allowResize) {
          $hdl_holder.show();
          return true;
        }
      }
      //}}}
      function disableHandles() //{{{
      {
        seehandles = false;
        $hdl_holder.hide();
      } 
      //}}}
      function animMode(v) //{{{
      {
        if (v) {
          animating = true;
          disableHandles();
        } else {
          animating = false;
          enableHandles();
        }
      } 
      //}}}
      function done() //{{{
      {
        animMode(false);
        refresh();
      } 
      //}}}
      // Insert draggable elements {{{
      // Insert border divs for outline

      if (options.dragEdges && $.isArray(options.createDragbars))
        createDragbars(options.createDragbars);

      if ($.isArray(options.createHandles))
        createHandles(options.createHandles);

      if (options.drawBorders && $.isArray(options.createBorders))
        createBorders(options.createBorders);

      //}}}

      // This is a hack for iOS5 to support drag/move touch functionality
      $(document).bind('touchstart.jcrop-ios',function(e) {
        if ($(e.currentTarget).hasClass('jcrop-tracker')) e.stopPropagation();
      });

      var $track = newTracker().mousedown(createDragger('move')).css({
        cursor: 'move',
        position: 'absolute',
        zIndex: 360
      });

      if (Touch.support) {
        $track.bind('touchstart.jcrop', Touch.createDragger('move'));
      }

      $img_holder.append($track);
      disableHandles();

      return {
        updateVisible: updateVisible,
        update: update,
        release: release,
        refresh: refresh,
        isAwake: function () {
          return awake;
        },
        setCursor: function (cursor) {
          $track.css('cursor', cursor);
        },
        enableHandles: enableHandles,
        enableOnly: function () {
          seehandles = true;
        },
        showHandles: showHandles,
        disableHandles: disableHandles,
        animMode: animMode,
        setBgOpacity: setBgOpacity,
        done: done
      };
    }());
    
    //}}}
    // Tracker Module {{{
    var Tracker = (function () {
      var onMove = function () {},
          onDone = function () {},
          trackDoc = options.trackDocument;

      function toFront(touch) //{{{
      {
        $trk.css({
          zIndex: 450
        });

        if (touch)
          $(document)
            .bind('touchmove.jcrop', trackTouchMove)
            .bind('touchend.jcrop', trackTouchEnd);

        else if (trackDoc)
          $(document)
            .bind('mousemove.jcrop',trackMove)
            .bind('mouseup.jcrop',trackUp);
      } 
      //}}}
      function toBack() //{{{
      {
        $trk.css({
          zIndex: 290
        });
        $(document).unbind('.jcrop');
      } 
      //}}}
      function trackMove(e) //{{{
      {
        onMove(mouseAbs(e));
        return false;
      } 
      //}}}
      function trackUp(e) //{{{
      {
        e.preventDefault();
        e.stopPropagation();

        if (btndown) {
          btndown = false;

          onDone(mouseAbs(e));

          if (Selection.isAwake()) {
            options.onSelect.call(api, unscale(Coords.getFixed()));
          }

          toBack();
          onMove = function () {};
          onDone = function () {};
        }

        return false;
      }
      //}}}
      function activateHandlers(move, done, touch) //{{{
      {
        btndown = true;
        onMove = move;
        onDone = done;
        toFront(touch);
        return false;
      }
      //}}}
      function trackTouchMove(e) //{{{
      {
        onMove(mouseAbs(Touch.cfilter(e)));
        return false;
      }
      //}}}
      function trackTouchEnd(e) //{{{
      {
        return trackUp(Touch.cfilter(e));
      }
      //}}}
      function setCursor(t) //{{{
      {
        $trk.css('cursor', t);
      }
      //}}}

      if (!trackDoc) {
        $trk.mousemove(trackMove).mouseup(trackUp).mouseout(trackUp);
      }

      $img.before($trk);
      return {
        activateHandlers: activateHandlers,
        setCursor: setCursor
      };
    }());
    //}}}
    // KeyManager Module {{{
    var KeyManager = (function () {
      var $keymgr = $('<input type="radio" />').css({
        position: 'fixed',
        left: '-120px',
        width: '12px'
      }).addClass('jcrop-keymgr'),

        $keywrap = $('<div />').css({
          position: 'absolute',
          overflow: 'hidden'
        }).append($keymgr);

      function watchKeys() //{{{
      {
        if (options.keySupport) {
          $keymgr.show();
          $keymgr.focus();
        }
      }
      //}}}
      function onBlur(e) //{{{
      {
        $keymgr.hide();
      }
      //}}}
      function doNudge(e, x, y) //{{{
      {
        if (options.allowMove) {
          Coords.moveOffset([x, y]);
          Selection.updateVisible(true);
        }
        e.preventDefault();
        e.stopPropagation();
      }
      //}}}
      function parseKey(e) //{{{
      {
        if (e.ctrlKey || e.metaKey) {
          return true;
        }
        shift_down = e.shiftKey ? true : false;
        var nudge = shift_down ? 10 : 1;

        switch (e.keyCode) {
        case 37:
          doNudge(e, -nudge, 0);
          break;
        case 39:
          doNudge(e, nudge, 0);
          break;
        case 38:
          doNudge(e, 0, -nudge);
          break;
        case 40:
          doNudge(e, 0, nudge);
          break;
        case 27:
          if (options.allowSelect) Selection.release();
          break;
        case 9:
          return true;
        }

        return false;
      }
      //}}}

      if (options.keySupport) {
        $keymgr.keydown(parseKey).blur(onBlur);
        if (ie6mode || !options.fixedSupport) {
          $keymgr.css({
            position: 'absolute',
            left: '-20px'
          });
          $keywrap.append($keymgr).insertBefore($img);
        } else {
          $keymgr.insertBefore($img);
        }
      }


      return {
        watchKeys: watchKeys
      };
    }());
    //}}}
    // }}}
    // API methods {{{
    function setClass(cname) //{{{
    {
      $div.removeClass().addClass(cssClass('holder')).addClass(cname);
    }
    //}}}
    function animateTo(a, callback) //{{{
    {
      var x1 = a[0] / xscale,
          y1 = a[1] / yscale,
          x2 = a[2] / xscale,
          y2 = a[3] / yscale;

      if (animating) {
        return;
      }

      var animto = Coords.flipCoords(x1, y1, x2, y2),
          c = Coords.getFixed(),
          initcr = [c.x, c.y, c.x2, c.y2],
          animat = initcr,
          interv = options.animationDelay,
          ix1 = animto[0] - initcr[0],
          iy1 = animto[1] - initcr[1],
          ix2 = animto[2] - initcr[2],
          iy2 = animto[3] - initcr[3],
          pcent = 0,
          velocity = options.swingSpeed;

      x1 = animat[0];
      y1 = animat[1];
      x2 = animat[2];
      y2 = animat[3];

      Selection.animMode(true);
      var anim_timer;

      function queueAnimator() {
        window.setTimeout(animator, interv);
      }
      var animator = (function () {
        return function () {
          pcent += (100 - pcent) / velocity;

          animat[0] = Math.round(x1 + ((pcent / 100) * ix1));
          animat[1] = Math.round(y1 + ((pcent / 100) * iy1));
          animat[2] = Math.round(x2 + ((pcent / 100) * ix2));
          animat[3] = Math.round(y2 + ((pcent / 100) * iy2));

          if (pcent >= 99.8) {
            pcent = 100;
          }
          if (pcent < 100) {
            setSelectRaw(animat);
            queueAnimator();
          } else {
            Selection.done();
            Selection.animMode(false);
            if (typeof(callback) === 'function') {
              callback.call(api);
            }
          }
        };
      }());
      queueAnimator();
    }
    //}}}
    function setSelect(rect) //{{{
    {
      setSelectRaw([rect[0] / xscale, rect[1] / yscale, rect[2] / xscale, rect[3] / yscale]);
      options.onSelect.call(api, unscale(Coords.getFixed()));
      Selection.enableHandles();
    }
    //}}}
    function setSelectRaw(l) //{{{
    {
      Coords.setPressed([l[0], l[1]]);
      Coords.setCurrent([l[2], l[3]]);
      Selection.update();
    }
    //}}}
    function tellSelect() //{{{
    {
      return unscale(Coords.getFixed());
    }
    //}}}
    function tellScaled() //{{{
    {
      return Coords.getFixed();
    }
    //}}}
    function setOptionsNew(opt) //{{{
    {
      setOptions(opt);
      interfaceUpdate();
    }
    //}}}
    function disableCrop() //{{{
    {
      options.disabled = true;
      Selection.disableHandles();
      Selection.setCursor('default');
      Tracker.setCursor('default');
    }
    //}}}
    function enableCrop() //{{{
    {
      options.disabled = false;
      interfaceUpdate();
    }
    //}}}
    function cancelCrop() //{{{
    {
      Selection.done();
      Tracker.activateHandlers(null, null);
    }
    //}}}
    function destroy() //{{{
    {
      $div.remove();
      $origimg.show();
      $origimg.css('visibility','visible');
      $(obj).removeData('Jcrop');
    }
    //}}}
    function setImage(src, callback) //{{{
    {
      Selection.release();
      disableCrop();
      var img = new Image();
      img.onload = function () {
        var iw = img.width;
        var ih = img.height;
        var bw = options.boxWidth;
        var bh = options.boxHeight;
        $img.width(iw).height(ih);
        $img.attr('src', src);
        $img2.attr('src', src);
        presize($img, bw, bh);
        boundx = $img.width();
        boundy = $img.height();
        $img2.width(boundx).height(boundy);
        $trk.width(boundx + (bound * 2)).height(boundy + (bound * 2));
        $div.width(boundx).height(boundy);
        Shade.resize(boundx,boundy);
        enableCrop();

        if (typeof(callback) === 'function') {
          callback.call(api);
        }
      };
      img.src = src;
    }
    //}}}
    function colorChangeMacro($obj,color,now) {
      var mycolor = color || options.bgColor;
      if (options.bgFade && supportsColorFade() && options.fadeTime && !now) {
        $obj.animate({
          backgroundColor: mycolor
        }, {
          queue: false,
          duration: options.fadeTime
        });
      } else {
        $obj.css('backgroundColor', mycolor);
      }
    }
    function interfaceUpdate(alt) //{{{
    // This method tweaks the interface based on options object.
    // Called when options are changed and at end of initialization.
    {
      if (options.allowResize) {
        if (alt) {
          Selection.enableOnly();
        } else {
          Selection.enableHandles();
        }
      } else {
        Selection.disableHandles();
      }

      Tracker.setCursor(options.allowSelect ? 'crosshair' : 'default');
      Selection.setCursor(options.allowMove ? 'move' : 'default');

      if (options.hasOwnProperty('trueSize')) {
        xscale = options.trueSize[0] / boundx;
        yscale = options.trueSize[1] / boundy;
      }

      if (options.hasOwnProperty('setSelect')) {
        setSelect(options.setSelect);
        Selection.done();
        delete(options.setSelect);
      }

      Shade.refresh();

      if (options.bgColor != bgcolor) {
        colorChangeMacro(
          options.shade? Shade.getShades(): $div,
          options.shade?
            (options.shadeColor || options.bgColor):
            options.bgColor
        );
        bgcolor = options.bgColor;
      }

      if (bgopacity != options.bgOpacity) {
        bgopacity = options.bgOpacity;
        if (options.shade) Shade.refresh();
          else Selection.setBgOpacity(bgopacity);
      }

      xlimit = options.maxSize[0] || 0;
      ylimit = options.maxSize[1] || 0;
      xmin = options.minSize[0] || 0;
      ymin = options.minSize[1] || 0;

      if (options.hasOwnProperty('outerImage')) {
        $img.attr('src', options.outerImage);
        delete(options.outerImage);
      }

      Selection.refresh();
    }
    //}}}
    //}}}

    if (Touch.support) $trk.bind('touchstart.jcrop', Touch.newSelection);

    $hdl_holder.hide();
    interfaceUpdate(true);

    var api = {
      setImage: setImage,
      animateTo: animateTo,
      setSelect: setSelect,
      setOptions: setOptionsNew,
      tellSelect: tellSelect,
      tellScaled: tellScaled,
      setClass: setClass,

      disable: disableCrop,
      enable: enableCrop,
      cancel: cancelCrop,
      release: Selection.release,
      destroy: destroy,

      focus: KeyManager.watchKeys,

      getBounds: function () {
        return [boundx * xscale, boundy * yscale];
      },
      getWidgetSize: function () {
        return [boundx, boundy];
      },
      getScaleFactor: function () {
        return [xscale, yscale];
      },
      getOptions: function() {
        // careful: internal values are returned
        return options;
      },

      ui: {
        holder: $div,
        selection: $sel
      }
    };

    if (is_msie) $div.bind('selectstart', function () { return false; });

    $origimg.data('Jcrop', api);
    return api;
  };
  $.fn.Jcrop = function (options, callback) //{{{
  {
    var api;
    // Iterate over each object, attach Jcrop
    this.each(function () {
      // If we've already attached to this object
      if ($(this).data('Jcrop')) {
        // The API can be requested this way (undocumented)
        if (options === 'api') return $(this).data('Jcrop');
        // Otherwise, we just reset the options...
        else $(this).data('Jcrop').setOptions(options);
      }
      // If we haven't been attached, preload and attach
      else {
        if (this.tagName == 'IMG')
          $.Jcrop.Loader(this,function(){
            $(this).css({display:'block',visibility:'hidden'});
            api = $.Jcrop(this, options);
            if ($.isFunction(callback)) callback.call(api);
          });
        else {
          $(this).css({display:'block',visibility:'hidden'});
          api = $.Jcrop(this, options);
          if ($.isFunction(callback)) callback.call(api);
        }
      }
    });

    // Return "this" so the object is chainable (jQuery-style)
    return this;
  };
  //}}}
  // $.Jcrop.Loader - basic image loader {{{

  $.Jcrop.Loader = function(imgobj,success,error){
    var $img = $(imgobj), img = $img[0];

    function completeCheck(){
      if (img.complete) {
        $img.unbind('.jcloader');
        if ($.isFunction(success)) success.call(img);
      }
      else window.setTimeout(completeCheck,50);
    }

    $img
      .bind('load.jcloader',completeCheck)
      .bind('error.jcloader',function(e){
        $img.unbind('.jcloader');
        if ($.isFunction(error)) error.call(img);
      });

    if (img.complete && $.isFunction(success)){
      $img.unbind('.jcloader');
      success.call(img);
    }
  };

  //}}}
  // Global Defaults {{{
  $.Jcrop.defaults = {

    // Basic Settings
    allowSelect: true,
    allowMove: true,
    allowResize: true,

    trackDocument: true,

    // Styling Options
    baseClass: 'jcrop',
    addClass: null,
    bgColor: 'black',
    bgOpacity: 0.6,
    bgFade: false,
    borderOpacity: 0.4,
    handleOpacity: 0.5,
    handleSize: null,

    aspectRatio: 0,
    keySupport: true,
    createHandles: ['n','s','e','w','nw','ne','se','sw'],
    createDragbars: ['n','s','e','w'],
    createBorders: ['n','s','e','w'],
    drawBorders: true,
    dragEdges: true,
    fixedSupport: true,
    touchSupport: null,

    shade: null,

    boxWidth: 0,
    boxHeight: 0,
    boundary: 2,
    fadeTime: 400,
    animationDelay: 20,
    swingSpeed: 3,

    minSelect: [0, 0],
    maxSize: [0, 0],
    minSize: [0, 0],

    // Callbacks / Event Handlers
    onChange: function () {},
    onSelect: function () {},
    onDblClick: function () {},
    onRelease: function () {}
  };

  // }}}
}(jQuery));
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//











;
