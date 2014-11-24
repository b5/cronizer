
function Token (cases, type) {
	this.cases = cases;
	this.type = type;

	return this;
}

Token.prototype.match = function (string) {
	for (var i=0,c; c=this.cases[i]; i++) {
		for (var j=0,m; m=c.match[j]; j++) {
			if (string === m) {
				return  [this.type, c.value];
			}
		}
	}

	return false;
}


module.exports = Token;