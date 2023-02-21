$(function () {
	var a = [],
		d = !1,
		s = !1,
		e = { interval: 250, force_process: !1 },
		c = $(window),
		i;
	function n() {
		s = !1;
		for (var r = 0; r < a.length; r++) {
			var t = $(a[r]).filter(function () {
				return $(this).is(":appeared");
			});
			if ((t.trigger("appear", [t]), i)) {
				var f = i.not(t);
				f.trigger("disappear", [f]);
			}
			i = t;
		}
	}
	($.expr[":"].appeared = function (r) {
		var t = $(r);
		if (!t.is(":visible")) return !1;
		var f = c.scrollLeft(),
			o = c.scrollTop(),
			v = t.offset(),
			l = v.left,
			u = v.top;
		return (
			u + t.height() >= o &&
			u - (t.data("appear-top-offset") || 0) <= o + c.height() &&
			l + t.width() >= f &&
			l - (t.data("appear-left-offset") || 0) <= f + c.width()
		);
	}),
		$.fn.extend({
			appear: function (r) {
				var t = $.extend({}, e, r || {}),
					f = this.selector || this;
				if (!d) {
					var o = function () {
						s || ((s = !0), setTimeout(n, t.interval));
					};
					$(window).scroll(o).resize(o), (d = !0);
				}
				return t.force_process && setTimeout(n, t.interval), a.push(f), $(f);
			},
		}),
		$.extend({
			force_appear: function () {
				return d ? (n(), !0) : !1;
			},
		});
});
/*!
 * jQuery doTimeout: Like setTimeout, but better! - v1.0 - 3/3/2010
 * http://benalman.com/projects/jquery-dotimeout-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */ (function (a) {
	var d = {},
		s = "doTimeout",
		e = Array.prototype.slice;
	(a[s] = function () {
		return c.apply(window, [0].concat(e.call(arguments)));
	}),
		(a.fn[s] = function () {
			var i = e.call(arguments),
				n = c.apply(this, [s + i[0]].concat(i));
			return typeof i[0] == "number" || typeof i[1] == "number" ? this : n;
		});
	function c(i) {
		var n = this,
			r,
			t = {},
			f = i ? a.fn : a,
			o = arguments,
			v = 4,
			l = o[1],
			u = o[2],
			p = o[3];
		typeof l != "string" && (v--, (l = i = 0), (u = o[1]), (p = o[2])),
			i
				? ((r = n.eq(0)), r.data(i, (t = r.data(i) || {})))
				: l && (t = d[l] || (d[l] = {})),
			t.id && clearTimeout(t.id),
			delete t.id;
		function g() {
			i ? r.removeData(i) : l && delete d[l];
		}
		function h() {
			t.id = setTimeout(function () {
				t.fn();
			}, u);
		}
		if (p)
			(t.fn = function (m) {
				typeof p == "string" && (p = f[p]),
					p.apply(n, e.call(o, v)) === !0 && !m ? h() : g();
			}),
				h();
		else {
			if (t.fn) return u === void 0 ? g() : t.fn(u === !1), !0;
			g();
		}
	}
})(jQuery),
	$(function () {
		$(".animatedParent").appear(),
			$(".animatedClick").click(function () {
				var a = $(this).attr("data-target");
				if ($(this).attr("data-sequence") != null) {
					var d = $("." + a + ":first").attr("data-id"),
						s = $("." + a + ":last").attr("data-id"),
						e = d;
					$("." + a + "[data-id=" + e + "]").hasClass("go")
						? ($("." + a + "[data-id=" + e + "]").addClass("goAway"),
						  $("." + a + "[data-id=" + e + "]").removeClass("go"))
						: ($("." + a + "[data-id=" + e + "]").addClass("go"),
						  $("." + a + "[data-id=" + e + "]").removeClass("goAway")),
						e++,
						(delay = Number($(this).attr("data-sequence"))),
						$.doTimeout(delay, function () {
							if (
								(console.log(s),
								$("." + a + "[data-id=" + e + "]").hasClass("go")
									? ($("." + a + "[data-id=" + e + "]").addClass("goAway"),
									  $("." + a + "[data-id=" + e + "]").removeClass("go"))
									: ($("." + a + "[data-id=" + e + "]").addClass("go"),
									  $("." + a + "[data-id=" + e + "]").removeClass("goAway")),
								++e,
								e <= s)
							)
								return !0;
						});
				} else
					$("." + a).hasClass("go")
						? ($("." + a).addClass("goAway"), $("." + a).removeClass("go"))
						: ($("." + a).addClass("go"), $("." + a).removeClass("goAway"));
			}),
			$(document.body).on("appear", ".animatedParent", function (a, d) {
				var s = $(this).find(".animated"),
					e = $(this);
				if (e.attr("data-sequence") != null) {
					var c = $(this).find(".animated:first").attr("data-id"),
						i = c,
						n = $(this).find(".animated:last").attr("data-id");
					$(e)
						.find(".animated[data-id=" + i + "]")
						.addClass("go"),
						i++,
						(delay = Number(e.attr("data-sequence"))),
						$.doTimeout(delay, function () {
							if (
								($(e)
									.find(".animated[data-id=" + i + "]")
									.addClass("go"),
								++i,
								i <= n)
							)
								return !0;
						});
				} else s.addClass("go");
			}),
			$(document.body).on("disappear", ".animatedParent", function (a, d) {
				$(this).hasClass("animateOnce") ||
					$(this).find(".animated").removeClass("go");
			}),
			$(window).on("load", function () {
				$.force_appear();
			});
	});
//# sourceMappingURL=/s/files/1/0552/0015/3738/t/2/assets/animate-it.js.map?v=50704448564032202871635294591
