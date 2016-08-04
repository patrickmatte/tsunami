(function() {

	var c = tsunami.date = {};

	c.toUnixString = function(date) {
		return date.getFullYear() + "-" + tsunami.number.addLeadingZero(date.getMonth() + 1) + "-" + tsunami.number.addLeadingZero(date.getDate()) + " " + tsunami.number.addLeadingZero(date.getHours()) + ":" + tsunami.number.addLeadingZero(date.getMinutes()) + ":" + tsunami.number.addLeadingZero(date.getSeconds());
	};

	c.toUnixUTCString = function(date) {
		return date.getUTCFullYear() + "-" + tsunami.number.addLeadingZero(date.getUTCMonth() + 1) + "-" + tsunami.number.addLeadingZero(date.getUTCDate()) + " " + tsunami.number.addLeadingZero(date.getUTCHours()) + ":" + tsunami.number.addLeadingZero(date.getUTCMinutes()) + ":" + tsunami.number.addLeadingZero(date.getUTCSeconds());
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
		en:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		fr:["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
	};

	c.getMonth = function(date, language) {
		if (!language) {
			language = "en";
		}
		var month;
		switch(language) {
			case "en":
				month = tsunami.date.months[language][date.getMonth()];
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
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerMinute;
	};

	c.hoursBetween = function(startDate, endDate) {
		var millisecondsPerHour = 60 * 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerHour;
	};

	c.daysBetween = function(startDate, endDate) {
		var millisecondsPerDay = 24 * 60 * 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerDay;
	};

	c.weeksBetween = function(startDate, endDate) {
		var millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerWeek;
	};

	c.monthsBetween = function(startDate, endDate) {
		var millisecondsPerMonth = 365 / 12  * 24 * 60 * 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerMonth;
	};

	c.yearsBetween = function(startDate, endDate) {
		var millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerYear;
	};

	c.getFamiliarTimeBetween = function(startDate, endDate) {
		var text = "";
		var yearsBetween = tsunami.date.yearsBetween(startDate, endDate);
		if (yearsBetween >= 1) {
			var yearsBetweenFloor = Math.floor(yearsBetween);
			if (yearsBetweenFloor > 1) {
				text = yearsBetweenFloor.toString() + " years ago";
			} else {
				text = yearsBetweenFloor.toString() + " year ago";
			}
		} else {
			var monthsBetween = tsunami.date.monthsBetween(startDate, endDate);
			if (monthsBetween >= 1) {
				var monthsBetweenFloor = Math.floor(monthsBetween);
				if (monthsBetweenFloor > 1) {
					text = monthsBetweenFloor.toString() + " months ago";
				} else {
					text = monthsBetweenFloor.toString() + " month ago";
				}
			} else {
				var weeksBetween = tsunami.date.weeksBetween(startDate, endDate);
				if (weeksBetween >= 1) {
					var weeksBetweenFloor = Math.floor(weeksBetween);
					if (weeksBetweenFloor > 1) {
						text = weeksBetweenFloor.toString() + " weeks ago";
					} else {
						text = weeksBetweenFloor.toString() + " week ago";
					}
				} else {
					var daysBetween = tsunami.date.daysBetween(startDate, endDate);
					if (daysBetween >= 1) {
						var daysBetweenFloor = Math.floor(daysBetween);
						if (daysBetweenFloor > 1) {
							text = daysBetweenFloor.toString() + " days ago";
						} else {
							text = daysBetweenFloor.toString() + " day ago";
						}
					} else {
						var hoursBetween = tsunami.date.hoursBetween(startDate, endDate);
						if (hoursBetween >= 1) {
							var hoursBetweenFloor = Math.floor(hoursBetween);
							if (hoursBetweenFloor > 1) {
								text = hoursBetweenFloor.toString() + " hours ago";
							} else {
								text = hoursBetweenFloor.toString() + " hour ago";
							}
						} else {
							var minutesBetween = tsunami.date.minutesBetween(startDate, endDate);
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