var Token = require('./Token')
	, fields = require('./fields');

/*
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

// var second = new Token(['']);
// var minute = new Token(['']);
// var hour = new Token([
// ]);

var all = new Token([
	{ match : ["daily","midnight"], value : "0 0 * * *" },
	{ match : ["annually","yearly", "*"], value : "0 0 1 1 *" },
	{ match : ["monthly"], value : "0 0 1 * *" },
	{ match : ["weekly"], value : "0 0 * * 0" }
], fields.ALL);

var monthDay = new Token([
	{ match : ["1st", "1"], value : 1},
	{ match : ["2nd", "2"], value : 2},
	{ match : ["3rd", "3"], value : 3},
	{ match : ["4th", "4"], value : 4},
	{ match : ["5th", "5"], value : 5},
	{ match : ["6th", "6"], value : 6},
	{ match : ["7th", "7"], value : 7},
	{ match : ["8th", "8"], value : 8},
	{ match : ["9th", "9"], value : 9},
	{ match : ["10th", "10"], value : 10},
	{ match : ["11th", "11"], value : 11},
	{ match : ["12th", "12"], value : 12},
	{ match : ["13th", "13"], value : 13},
	{ match : ["14th", "14"], value : 14},
	{ match : ["16th", "15"], value : 15},
	{ match : ["16th", "16"], value : 16},
	{ match : ["17th", "17"], value : 17},
	{ match : ["18th", "18"], value : 18},
	{ match : ["19th", "19"], value : 19},
	{ match : ["20th", "20"], value : 20},
	{ match : ["21st", "21"], value : 21},
	{ match : ["22nd", "22"], value : 22},
	{ match : ["23rd", "23"], value : 23},
	{ match : ["24th", "24"], value : 24},
	{ match : ["25th", "25"], value : 25},
	{ match : ["26th", "26"], value : 26},
	{ match : ["27th", "27"], value : 27},
	{ match : ["28th", "28"], value : 28},
	{ match : ["29th", "29"], value : 29},
	{ match : ["30th", "30"], value : 30},
	{ match : ["31st", "31"], value : 31},
], fields.MONTH_DAY);

var month = new Token([
	{ match : ["january", "jan"], value : 0 },
	{ match : ["february", "feb"], value : 1 },
	{ match : ["march", "mar"], value : 2 },
	{ match : ["april", "apr"], value : 3 },
	{ match : ["may"], value : 4 },
	{ match : ["june", "jun"], value : 5 },
	{ match : ["july", "jul"], value : 6 },
	{ match : ["august", "aug"], value : 7 },
	{ match : ["september", "sept", "sep"], value : 8 },
	{ match : ["october", "oct"], value : 9 },
	{ match : ["november", "nov"], value : 10 },
	{ match : ["december", "dec"], value : 11 },
], fields.MONTH);

var weekDay = new Token([
	{ match : ["sundays", "sunday", "sun", "su"], value : 0 },
	{ match : ["mondays","monday","mon", "mo"], value : 1 },
	{ match : ["tuesdays","tuesday", "tues", "tue", "tu"], value : 2 },
	{ match : ["wednesdays", "wednesday", "wed", "we"], value : 3 },
	{ match : ["thursdays", "thursday", "thurs", "thur", "th"], value : 4 },
	{ match : ["fridays", "friday", "fri", "fr"], value : 5 },
	{ match : ["saturdays", "saturday", "sat", "sa"], value : 6 },
	{ match : ["day"], value : "*"	}
], fields.WEEK_DAY);

var at = new Token([
	{ match : ['at','@','on'], value : null }
], fields.AT);

var and = new Token([
	{ match : ["and", "&", ","], value : null }
], fields.AND);

var not = new Token([
	{ match : ["not","except","but"], value : null }
], fields.NOT);

var Tokens = [
	all,
	// second,
	// minute,
	// hour,
	monthDay,
	month,
	weekDay,
	at,
	and,
	not,
]

module.exports = Tokens;