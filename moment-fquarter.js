// moment-fquarter.js
// version : 0.4
// author : Rob Allen
// license : MIT
// github.com/robgallen/moment-fquarter

(function () {

	function onload(moment) {
		moment.fn.fquarter = function (startMonth) {
			var initial = this.lang()._quarter || "Q";
			var result = {}, adjustedDate, nextYear = null;
			startMonth = startMonth || 4; // default is April

			if (startMonth > 1) {
				adjustedDate = this.subtract("months", startMonth - 1);
				nextYear = adjustedDate.clone().add("years", 1);
			} else {
				adjustedDate = this;
			}

			result.adjusted = adjustedDate;
			result.week = adjustedDate.week();
			result.quarter = adjustedDate.quarter();
			result.year = adjustedDate.year();
			result.nextYear = (nextYear) ? nextYear.year() : nextYear;
			result.fiscalYear = (nextYear) ?
				result.year + "/" + nextYear.format("YY") :
				result.year;

			result.toString = function () {
				var str = initial + result.quarter + " " + result.fiscalYear;
			};

			return result;
		};

		return moment;
	}

	if (typeof define === "function" && define.amd) {
		define("moment-fquarter", ["moment"], onload);
	} else if (typeof module !== "undefined") {
		module.exports = onload(require("moment"));
	} else if (typeof window !== "undefined" && window.moment) {
		onload(window.moment);
	}

}).apply(this);
