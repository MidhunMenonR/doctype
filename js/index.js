// Create Countdown
var Countdown = {
	// Backbone-like structure
	$el: $(".countdown"),

	// Params
	countdown_interval: null,
	total_seconds: 0,

	// Initialize the countdown
	init: function() {
		var _montharray = new Array(
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		);
		var _yr = 2017,
			_m = 10,
			_d = 22,
			_t = "7:.00";
		var _today = new Date();
		var _todayy = _today.getYear();
		if (_todayy < 1000) _todayy += 1900;
		var _todaym = _today.getMonth();
		var _todayd = _today.getDate();
		var _todayh = _today.getHours();
		var _todaymin = _today.getMinutes();
		var _todaysec = _today.getSeconds();
		_todaysec = "0" + _todaysec;
		_todaysec = _todaysec.substr(_todaysec.length - 2);
		var _todaystring =
			_montharray[_todaym] +
			" " +
			_todayd +
			", " +
			_todayy +
			" " +
			_todayh +
			":" +
			_todaymin +
			":" +
			_todaysec;
		var _futurestring = _montharray[_m - 1] + " " + _d + ", " + _yr + " " + _t;
		/* calculation of remaining days, hrs, min, and secs */
		_dd = Date.parse(_futurestring) - Date.parse(_todaystring);
		_dday = Math.floor(_dd / (60 * 60 * 1000 * 24) * 1);
		_dhour = Math.floor(_dd % (60 * 60 * 1000 * 24) / (60 * 60 * 1000) * 1);
		_dmin = Math.floor(
			_dd % (60 * 60 * 1000 * 24) % (60 * 60 * 1000) / (60 * 1000) * 1
		);
		_dsec = Math.floor(
			_dd %
			(60 * 60 * 60 * 1000 * 24) %
			(60 * 60 * 1000) %
			(60 * 1000) /
			1000 *
			1
		);

		// DOM
		this.$ = {
			days: this.$el.find(".bloc-time.days .figure"),
			hours: this.$el.find(".bloc-time.hours .figure"),
			minutes: this.$el.find(".bloc-time.min .figure"),
			seconds: this.$el.find(".bloc-time.sec .figure")
		};

		// Init countdown values
		this.values = {
			days: _dday,
			hours: _dhour,
			minutes: _dmin,
			seconds: _dsec
		};

		// Initialize total seconds
		this.total_seconds =
			this.values.days * 24 * 60 * 60 +
			this.values.hours * 60 * 60 +
			this.values.minutes * 60 +
			this.values.seconds;

		// Animate countdown to the end
		this.count();
	},

	count: function() {
		var that = this,
			$days_1 = this.$.days.eq(0),
			$days_2 = this.$.days.eq(1),
			$hour_1 = this.$.hours.eq(0),
			$hour_2 = this.$.hours.eq(1),
			$min_1 = this.$.minutes.eq(0),
			$min_2 = this.$.minutes.eq(1),
			$sec_1 = this.$.seconds.eq(0),
			$sec_2 = this.$.seconds.eq(1);

		this.countdown_interval = setInterval(function() {
			if (that.total_seconds > 0) {
				--that.values.seconds;

				if (that.values.minutes >= 0 && that.values.seconds < 0) {
					that.values.seconds = 59;
					--that.values.minutes;
				}

				if (that.values.hours >= 0 && that.values.minutes < 0) {
					that.values.minutes = 59;
					--that.values.hours;
				}

				if (that.values.days >= 0 && that.values.hours < 0) {
					that.values.hours = 23;
					--that.values.days;
				}

				that.checkHour(that.values.days, $days_1, $days_2);

				// Update DOM values
				// Hours

				that.checkHour(that.values.hours, $hour_1, $hour_2);

				// Minutes
				that.checkHour(that.values.minutes, $min_1, $min_2);

				// Seconds
				that.checkHour(that.values.seconds, $sec_1, $sec_2);

				--that.total_seconds;
			} else {
				clearInterval(that.countdown_interval);
			}
		}, 1000);
	},

	animateFigure: function($el, value) {
		var that = this,
			$top = $el.find(".top"),
			$bottom = $el.find(".bottom"),
			$back_top = $el.find(".top-back"),
			$back_bottom = $el.find(".bottom-back");

		// Before we begin, change the back value
		$back_top.find("span").html(value);

		// Also change the back bottom value
		$back_bottom.find("span").html(value);

		// Then animate
		TweenMax.to($top, 0.8, {
			rotationX: "-180deg",
			transformPerspective: 300,
			ease: Quart.easeOut,
			onComplete: function() {
				$top.html(value);

				$bottom.html(value);

				TweenMax.set($top, { rotationX: 0 });
			}
		});

		TweenMax.to($back_top, 0.8, {
			rotationX: 0,
			transformPerspective: 300,
			ease: Quart.easeOut,
			clearProps: "all"
		});
	},

	checkHour: function(value, $el_1, $el_2) {
		var val_1 = value.toString().charAt(0),
			val_2 = value.toString().charAt(1),
			fig_1_value = $el_1.find(".top").html(),
			fig_2_value = $el_2.find(".top").html();

		if (value >= 10) {
			// Animate only if the figure has changed
			if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
			if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
		} else {
			// If we are under 10, replace first figure with 0
			if (fig_1_value !== "0") this.animateFigure($el_1, 0);
			if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
		}
	}
};

// Let's go !
Countdown.init();

function clickButton() {
	var colors = ['#80DEEA','#FFF59D'];
	$('body').css('background-color',colors[Math.floor(Math.random()*colors.length)]);
}



function clickButton() {
	console.log("Second function");
}
