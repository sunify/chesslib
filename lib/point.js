"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
	function Point(x, y) {
		_classCallCheck(this, Point);

		this.x = x;
		this.y = y;
	}

	_createClass(Point, [{
		key: "equal",
		value: function equal(_ref) {
			var x = _ref.x,
			    y = _ref.y;

			return this.x === x && this.y === y;
		}
	}, {
		key: "sum",
		value: function sum(_ref2) {
			var x = _ref2.x,
			    y = _ref2.y;

			return new Point(this.x + x, this.y + y);
		}
	}, {
		key: "difference",
		value: function difference(_ref3) {
			var x = _ref3.x,
			    y = _ref3.y;

			return new Point(this.x - x, this.y - y);
		}
	}, {
		key: "product",
		value: function product(_ref4) {
			var x = _ref4.x,
			    y = _ref4.y;

			return new Point(this.x * x, this.y * y);
		}
	}, {
		key: "lt",
		value: function lt(_ref5) {
			var x = _ref5.x,
			    y = _ref5.y;

			return this.x < x && this.y < y;
		}
	}, {
		key: "lte",
		value: function lte(_ref6) {
			var x = _ref6.x,
			    y = _ref6.y;

			return this.x <= x && this.y <= y;
		}
	}, {
		key: "gt",
		value: function gt(_ref7) {
			var x = _ref7.x,
			    y = _ref7.y;

			return this.x > x && this.y > y;
		}
	}, {
		key: "gte",
		value: function gte(_ref8) {
			var x = _ref8.x,
			    y = _ref8.y;

			return this.x >= x && this.y >= y;
		}
	}, {
		key: "to",
		value: regeneratorRuntime.mark(function to(_to) {
			var _ref9, x0, x1, _ref10, y0, y1, i, j;

			return regeneratorRuntime.wrap(function to$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_ref9 = [Math.min(this.x, _to.x), Math.max(this.x, _to.x)], x0 = _ref9[0], x1 = _ref9[1], _ref10 = [Math.min(this.y, _to.y), Math.max(this.y, _to.y)], y0 = _ref10[0], y1 = _ref10[1];
							i = y0;

						case 2:
							if (!(i < y1)) {
								_context.next = 13;
								break;
							}

							j = x0;

						case 4:
							if (!(j < x1)) {
								_context.next = 10;
								break;
							}

							_context.next = 7;
							return new Point(j, i);

						case 7:
							j++;
							_context.next = 4;
							break;

						case 10:
							i++;
							_context.next = 2;
							break;

						case 13:
						case "end":
							return _context.stop();
					}
				}
			}, to, this);
		})
	}]);

	return Point;
}();

exports.Point = Point;