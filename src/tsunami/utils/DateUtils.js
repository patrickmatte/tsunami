tsunami = this.tsunami || {};

(function() {

	tsunami.DateUtils = function() {};

	var c = tsunami.DateUtils;

	c.toUnixString = function(date) {
		return date.getFullYear() + "-" + tsunami.NumberUtil.addLeadingZero(date.getMonth() + 1) + "-" + tsunami.NumberUtil.addLeadingZero(date.getDate()) + " " + tsunami.NumberUtil.addLeadingZero(date.getHours()) + ":" + tsunami.NumberUtil.addLeadingZero(date.getMinutes()) + ":" + tsunami.NumberUtil.addLeadingZero(date.getSeconds());
	};

	c.toUnixUTCString = function(date) {
		return date.getUTCFullYear() + "-" + tsunami.NumberUtil.addLeadingZero(date.getUTCMonth() + 1) + "-" + tsunami.utils.NumberUtil.addLeadingZero(date.getUTCDate()) + " " + tsunami.NumberUtil.addLeadingZero(date.getUTCHours()) + ":" + tsunami.NumberUtil.addLeadingZero(date.getUTCMinutes()) + ":" + tsunami.utils.NumberUtil.addLeadingZero(date.getUTCSeconds());
	};

	c.addHours = function(date, hours) {
		date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
		return date;
	};

	c.addDays = function(date, days) {
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		return date;
	};

	c.months = {
		en:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	};

	c.getMonth = function(date, language) {
		if (!language) {
			language = "en";
		}
		var month;
		switch(language) {
			case "en":
				month = tsunami.utils.DateUtils.months[language][date.getMonth()];
				break;
		}
		return month;
	};

	c.getAge = function(birthDate) {
		var today = new Date();
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	c.treatAsUTC = function(date) {
		var result = new Date(date);
		result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
		return result;
	};

	c.minutesBetween = function(startDate, endDate) {
		var millisecondsPerMinute = 60 * 1000;
		return (tsunami.utils.DateUtils.treatAsUTC(endDate) - tsunami.utils.DateUtils.treatAsUTC(startDate)) / millisecondsPerMinute;
	};

	c.hoursBetween = function(startDate, endDate) {
		var millisecondsPerHour = 60 * 60 * 1000;
		return (tsunami.utils.DateUtils.treatAsUTC(endDate) - tsunami.utils.DateUtils.treatAsUTC(startDate)) / millisecondsPerHour;
	};

	c.daysBetween = function(startDate, endDate) {
		var millisecondsPerDay = 24 * 60 * 60 * 1000;
		return (tsunami.utils.DateUtils.treatAsUTC(endDate) - tsunami.utils.DateUtils.treatAsUTC(startDate)) / millisecondsPerDay;
	};

	c.weeksBetween = function(startDate, endDate) {
		var millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
		return (tsunami.utils.DateUtils.treatAsUTC(endDate) - tsunami.utils.DateUtils.treatAsUTC(startDate)) / millisecondsPerWeek;
	};

	c.monthsBetween = function(startDate, endDate) {
		var millisecondsPerMonth = 365 / 12  * 24 * 60 * 60 * 1000;
		return (tsunami.utils.DateUtils.treatAsUTC(endDate) - tsunami.utils.DateUtils.treatAsUTC(startDate)) / millisecondsPerMonth;
	};

	c.yearsBetween = function(startDate, endDate) {
		var millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;
		return (tsunami.utils.DateUtils.treatAsUTC(endDate) - tsunami.utils.DateUtils.treatAsUTC(startDate)) / millisecondsPerYear;
	};

	c.getFamiliarTimeBetween = function(startDate, endDate) {
		var text = "";
		var yearsBetween = tsunami.utils.DateUtils.yearsBetween(startDate, endDate);
		if (yearsBetween >= 1) {
			var yearsBetweenFloor = Math.floor(yearsBetween);
			if (yearsBetweenFloor > 1) {
				text = yearsBetweenFloor.toString() + " years ago";
			} else {
				text = yearsBetweenFloor.toString() + " year ago";
			}
		} else {
			var monthsBetween = tsunami.utils.DateUtils.monthsBetween(startDate, endDate);
			if (monthsBetween >= 1) {
				var monthsBetweenFloor = Math.floor(monthsBetween);
				if (monthsBetweenFloor > 1) {
					text = monthsBetweenFloor.toString() + " months ago";
				} else {
					text = monthsBetweenFloor.toString() + " month ago";
				}
			} else {
				var weeksBetween = tsunami.utils.DateUtils.weeksBetween(startDate, endDate);
				if (weeksBetween >= 1) {
					var weeksBetweenFloor = Math.floor(weeksBetween);
					if (weeksBetweenFloor > 1) {
						text = weeksBetweenFloor.toString() + " weeks ago";
					} else {
						text = weeksBetweenFloor.toString() + " week ago";
					}
				} else {
					var daysBetween = tsunami.utils.DateUtils.daysBetween(startDate, endDate);
					if (daysBetween >= 1) {
						var daysBetweenFloor = Math.floor(daysBetween);
						if (daysBetweenFloor > 1) {
							text = daysBetweenFloor.toString() + " days ago";
						} else {
							text = daysBetweenFloor.toString() + " day ago";
						}
					} else {
						var hoursBetween = tsunami.utils.DateUtils.hoursBetween(startDate, endDate);
						if (hoursBetween >= 1) {
							var hoursBetweenFloor = Math.floor(hoursBetween);
							if (hoursBetweenFloor > 1) {
								text = hoursBetweenFloor.toString() + " hours ago";
							} else {
								text = hoursBetweenFloor.toString() + " hour ago";
							}
						} else {
							var minutesBetween = tsunami.utils.DateUtils.minutesBetween(startDate, endDate);
							if (minutesBetween > 1) {
								var minutesBetweenFloor = Math.floor(minutesBetween);
								if (minutesBetweenFloor > 1) {
									text = minutesBetweenFloor.toString() + " minutes ago";
								} else {
									text = minutesBetweenFloor.toString() + " minute ago";
								}
							} else {
								text = "Just now";
							}
						}
					}
				}
			}
		}
		return text;
	}

}());