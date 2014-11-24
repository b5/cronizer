var assert = require('assert')
	, Cronizer = require('../index')

var cron = new Cronizer({});

describe("Cronizer", function(){
	it('reduce', function () {

	});

	it('cronize', function () {
		var cases = {
			'glorp' : false,
			'yearly' : '0 0 1 1 *',
			'daily' : '0 0 * * *',
			'Monthly' : '0 0 1 * *',
			'Weekly' : "0 0 * * 0",

			'Tuesdays' : "0 0 * * 2",
			'friday' : "0 0 * * 5",
			'Mondays, Wednesdays, Fridays' : '0 0 * * 1,3,5',
			'Monday, Tuesdays, thursday' : '0 0 * * 1,2,4',
			'Tuesdays & thursdays' : '0 0 * * 2,4',

			// 'May 10th @ midnight' : '0 0 10 4 *',
			// 'Weekdays @ 4:30' : '30 4 * * 1-5',
			// 'Saturday & Sunday' : '0 0 * * 6,0',
			// 'The first and third Sunday of the month' : '0 0 * * 0/1,0/3',
			// '1st & second sunday' : '0 0 * * 0/1,0/3',
			// 'May 10 every year' : '0 0 10 4 *',
			// 'May 10th every year' : '0 0 10 4 *',

			// 'Last Sunday in October' : '* * * * * *',
			// 'Third Tuesday in May' '* * * * * *',
		}

		for (var key in cases) {
			var outcome = cases[key];
			// console.log(key, outcome);
			assert.equal(outcome, cron.parse(key));
		}

	});
});