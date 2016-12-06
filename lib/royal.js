'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.Royal = Royal;

var _brands = require('./brands');

var _point = require('./point');

var _mobility = require('./mobility');

var _castling = require('./castling');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoyalMobility = function (_Mobility) {
	_inherits(RoyalMobility, _Mobility);

	function RoyalMobility() {
		_classCallCheck(this, RoyalMobility);

		return _possibleConstructorReturn(this, (RoyalMobility.__proto__ || Object.getPrototypeOf(RoyalMobility)).apply(this, arguments));
	}

	_createClass(RoyalMobility, [{
		key: 'adjacentPoints',
		value: regeneratorRuntime.mark(function adjacentPoints(position, p0) {
			var m, n, _arr, _i, o, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p1;

			return regeneratorRuntime.wrap(function adjacentPoints$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							m = this.m, n = this.n;
							_arr = [new _point.Point(m, n), new _point.Point(n, m)];
							_i = 0;

						case 3:
							if (!(_i < _arr.length)) {
								_context.next = 34;
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
								_context.next = 17;
								break;
							}

							p1 = _step.value;
							_context.next = 14;
							return p0.sum(p1.product(o));

						case 14:
							_iteratorNormalCompletion = true;
							_context.next = 10;
							break;

						case 17:
							_context.next = 23;
							break;

						case 19:
							_context.prev = 19;
							_context.t0 = _context['catch'](8);
							_didIteratorError = true;
							_iteratorError = _context.t0;

						case 23:
							_context.prev = 23;
							_context.prev = 24;

							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}

						case 26:
							_context.prev = 26;

							if (!_didIteratorError) {
								_context.next = 29;
								break;
							}

							throw _iteratorError;

						case 29:
							return _context.finish(26);

						case 30:
							return _context.finish(23);

						case 31:
							_i++;
							_context.next = 3;
							break;

						case 34:
						case 'end':
							return _context.stop();
					}
				}
			}, adjacentPoints, this, [[8, 19, 23, 31], [24,, 26, 30]]);
		})
	}]);

	return RoyalMobility;
}(_mobility.Mobility);

var CastlingMobility = function (_Mobility2) {
	_inherits(CastlingMobility, _Mobility2);

	function CastlingMobility(color, side) {
		_classCallCheck(this, CastlingMobility);

		var _this2 = _possibleConstructorReturn(this, (CastlingMobility.__proto__ || Object.getPrototypeOf(CastlingMobility)).call(this, color, side));

		_this2.color = color;
		_this2.side = side;
		return _this2;
	}

	_createClass(CastlingMobility, [{
		key: 'adjacentPoints',
		value: regeneratorRuntime.mark(function adjacentPoints(position, p0) {
			return regeneratorRuntime.wrap(function adjacentPoints$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!position.castling.isLegal(this.color, this.side)) {
								_context2.next = 3;
								break;
							}

							_context2.next = 3;
							return p0.sum(_castling.Castling.kingOffset(this.color, this.side));

						case 3:
						case 'end':
							return _context2.stop();
					}
				}
			}, adjacentPoints, this);
		})
	}]);

	return CastlingMobility;
}(_mobility.Mobility);

function Royal() {
	this.mobility.push(new RoyalMobility(1, 0));
	this.mobility.push(new RoyalMobility(1, 1));
	this.mobility.push(new CastlingMobility(this.color, _brands.KINGSIDE));
	this.mobility.push(new CastlingMobility(this.color, _brands.QUEENSIDE));
}