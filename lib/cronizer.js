/*
 * Cronizer is intended to take plain english statements about *days* &
 * turn them into cron statements. It doesn't handle times, but rather assumes
 * we're matching a day
 *
 * possible statements (should) include things like:
 * May 10th every year @ midnight
 * Weekdays @ 4:30
 * Every Monday, Tuesday, Friday
 * Saturday & Sunday
 * The first and third Sunday of the month
 * 1st & third sunday
 * May 10 every year
 * Tuesdays & thursdays
 * Last Sunday in October
 * Third Tuesday in May
*/

var Tokens = require('./tokens')
	, utils = require('./utils')
	, fields = require("./fields");


function Cronizer (options) {
	this.options = options;
}

utils.extend(Cronizer.prototype, {
	parse : function (statement) {
		var context = this.newContext(statement);

		// 1. Identify each token in the statement string
		this.identify(context);
		if (context.error) {
			// console.log(context.error);
			return false;
		}

		// 2. Reduce tokens
		this.reduce(context);
		if (context.error) {
			// console.log(context.error);
			return false;
		}

		// 3.
		return this.result(context);
	},

	newContext : function (statement) {
		return {
			statement : statement,
			tokens : this.tokens(statement),
			symbols : [],
			results : [[],[],[],[],[]],
			state : {
				foundAt : false
			},
			error : undefined
		}
	},

	tokens : function tokens (statement) {
		var tokens;

		tokens = statement.trim().toLowerCase();
		// space out commas to capture
		tokens = tokens.replace(/,/g, " ,");
		// remove multiple spaces
		tokens = tokens.replace(/\s{2,}/g,' ');


		return tokens.split(" ");
	},

	// Symbol identification
	identify : function identify (context) {

		for (var i=0,token; token=context.tokens[i]; i++) {
			var symbol = this.identifySymbol(token, context.state);
			
			// if we can't identify a symbol, everything
			// is presumed to be broken. bail.
			if (!symbol) { 
				context.error = "couldn't identify symbol: \"" + token + "\"";
				return context;
			}

			// check for at field, don't add it to symbols
			if (symbol[0] === fields.AT) {
				context.state.foundAt = true;
				continue;
			}

			context.symbols.push(symbol);
		}

		return context;
	},

	identifySymbol : function identifySymbol (string, state) {
		var symbol;
		for(var i=0,t; t=Tokens[i]; i++) {
			symbol = t.match(string);
			if (symbol) {
				return symbol;
			}
		}

		return false;
	},

	// Reduce should combine away any modifier fields
	// with the symbols the effect, leaving only
	// cron fields in the symbols array
	reduce : function reduce(context) {
		var clean;


		while (true) {
			if (!this.reduceSymbols(context)) {
				return context;
			}
		}
	},

	reduceSymbols : function reduceSymbols (context) {
		for (var i=0,s; s=context.symbols[i]; i++) {
			switch (s[0]) {
				case fields.ALL:
					context.symbols = [s];
					return false;
					break;
				case fields.AND:
					var left = context.symbols[i - 1]
						, right = context.symbols[i + 1];
					
					// need a left & a right to join

					if (!left || !right) {
						context.error = "unmathed and identifier";
						return false;
					}
					// if types don't match we can't join
					if (left[0] != right[0]) {
						context.error = "unmathed and types on either side of and symbol";
						return false;
					}

					context.symbols.splice(i-1, 3, [ left[0], left[1] + "," + right[1]]);
					return true;

					break;
				case fields.NOT:
					break;
				case fields.PREFIX:
					break;
				case fields.SUFFIX:
					break;
				case fields.JOIN:
					break;
				case fields.IGNORE:
					break;
			}
		}

		return false;
	},

	/* At this point the only symbol types in the symbols array
	 * should be one of the cron fields:
	 * SECOND,MINUTE,HOUR,MONTH_DAY,MONTH,WEEK_DAY,ALL
	 */
	result : function result (context) {
		var fo = this.fieldOrder();

		if (context.error) { return false; }
		// if (typeof symbols === "string" || !symbols) { return symbols; }

		// if we haven't found an at symbol
		// assume we're dealing with midnights.
		if (!context.state.foundAt) {
			context.results[0] = ["0"];
			context.results[1] = ["0"];
		}

		// Sort symbols into the fields they affect
		for (var i=0,s; s=context.symbols[i]; i++) {
			if (s[0] === fields.ALL) { return s[1]; }
			var field = fo[s[0]];
			context.results[field].push(s[1]);
		}

		// Reduce sets to corresponding arrays
		for (var i=0,r; r=context.results[i]; i++) {
			r = r.join();
			if (!r || r === "") { 
				r = "*";
			}
			context.results[i] = r;
		}

		return context.results.join(" ");
	},

	fieldOrder : function () {
		var fo = {}
		// currently don't support seconds
		// fo[fields.SECOND] = 0;
		fo[fields.MINUTE] = 0;
		fo[fields.HOUR] = 1;
		fo[fields.MONTH_DAY] = 2;
		fo[fields.MONTH] = 3;
		fo[fields.WEEK_DAY] = 4;
		return fo
	}
});


module.exports = Cronizer;