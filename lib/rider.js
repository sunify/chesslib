'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.Rider = Rider;

var _point = require('./point');

var _mobility = require('./mobility');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RiderMobility = function (_Mobility) {
	_inherits(RiderMobility, _Mobility);

	function RiderMobility() {
		_classCallCheck(this, RiderMobility);

		return _possibleConstructorReturn(this, (RiderMobility.__proto__ || Object.getPrototypeOf(RiderMobility)).apply(this, arguments));
	}

	_createClass(RiderMobility, [{
		key: 'adjacentPoints',
		value: regeneratorRuntime.mark(function adjacentPoints(position, p0) {
			var m, n, _arr, _i, o, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p1, r, pN;

			return regeneratorRuntime.wrap(function adjacentPoints$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							m = this.m, n = this.n;
							_arr = [new _point.Point(m, n), new _point.Point(n, m)];
							_i = 0;

						case 3:
							if (!(_i < _arr.length)) {
								_context.next = 42;
								break;
							}

							o = _arr[_i];
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							_context.prev = 8;
							_iterator = _mobility.quadrants[Symbol.iterator]();

						case 10:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								_context.next = 25;
								break;
							}

							p1 = _step.value;
							r = 1;

						case 13:
							if (!(r < 8)) {
								_context.next = 22;
								break;
							}

							pN = p0.sum(p1.product(o.product(new _point.Point(r, r))));
							_context.next = 17;
							return pN;

						case 17:
							if (!(position.pieceByCoords(pN) != null)) {
								_context.next = 19;
								break;
							}

							return _context.abrupt('continue', 22);

						case 19:
							r++;
							_context.next = 13;
							break;

						case 22:
							_iteratorNormalCompletion = true;
							_context.next = 10;
							break;

						case 25:
							_context.next = 31;
							break;

						case 27:
							_context.prev = 27;
							_context.t0 = _context['catch'](8);
							_didIteratorError = true;
							_iteratorError = _context.t0;

						case 31:
							_context.prev = 31;
							_context.prev = 32;

							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}

						case 34:
							_context.prev = 34;

							if (!_didIteratorError) {
								_context.next = 37;
								break;
							}

							throw _iteratorError;

						case 37:
							return _context.finish(34);

						case 38:
							return _context.finish(31);

						case 39:
							_i++;
							_context.next = 3;
							break;

						case 42:
						case 'end':
							return _context.stop();
					}
				}
			}, adjacentPoints, this, [[8, 27, 31, 39], [32,, 34, 38]]);
		})
	}]);

	return RiderMobility;
}(_mobility.Mobility);

function Rider(m, n) {
	this.mobility.push(new RiderMobility(m, n));
}