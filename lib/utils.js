
module.exports = {
	extend : function extend(obj) {
		Array.prototype.slice.call(arguments, 1).forEach(function(source){
			if (source) {
		    for (var prop in source) {
		      obj[prop] = source[prop];
		    }
	    }
		});
		return obj;
	}
}