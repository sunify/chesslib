'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Piece = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brands = require('./brands');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = exports.Piece = function () {
	function Piece() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    color = _ref.color;

		_classCallCheck(this, Piece);

		this.color = color;
		this.mobility = [];
	}

	_createClass(Piece, [{
		key: 'moves',
		value: regeneratorRuntime.mark(function moves(position) {
			var loc, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, m, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, move;

			return regeneratorRuntime.wrap(function moves$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							loc = position.pieceCoords(this);
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							_context.prev = 4;
							_iterator = this.mobility[Symbol.iterator]();

						case 6:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								_context.next = 37;
								break;
							}

							m = _step.value;
							_iteratorNormalCompletion2 = true;
							_didIteratorError2 = false;
							_iteratorError2 = undefined;
							_context.prev = 11;
							_iterator2 = m.adjacentPoints(position, loc)[Symbol.iterator]();

						case 13:
							if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
								_context.next = 20;
								break;
							}

							move = _step2.value;
							_context.next = 17;
							return move;

						case 17:
							_iteratorNormalCompletion2 = true;
							_context.next = 13;
							break;

						case 20:
							_context.next = 26;
							break;

						case 22:
							_context.prev = 22;
							_context.t0 = _context['catch'](11);
							_didIteratorError2 = true;
							_iteratorError2 = _context.t0;

						case 26:
							_context.prev = 26;
							_context.prev = 27;

							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}

						case 29:
							_context.prev = 29;

							if (!_didIteratorError2) {
								_context.next = 32;
								break;
							}

							throw _iteratorError2;

						case 32:
							return _context.finish(29);

						case 33:
							return _context.finish(26);

						case 34:
							_iteratorNormalCompletion = true;
							_context.next = 6;
							break;

						case 37:
							_context.next = 43;
							break;

						case 39:
							_context.prev = 39;
							_context.t1 = _context['catch'](4);
							_didIteratorError = true;
							_iteratorError = _context.t1;

						case 43:
							_context.prev = 43;
							_context.prev = 44;

							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}

						case 46:
							_context.prev = 46;

							if (!_didIteratorError) {
								_context.next = 49;
								break;
							}

							throw _iteratorError;

						case 49:
							return _context.finish(46);

						case 50:
							return _context.finish(43);

						case 51:
						case 'end':
							return _context.stop();
					}
				}
			}, moves, this, [[4, 39, 43, 51], [11, 22, 26, 34], [27,, 29, 33], [44,, 46, 50]]);
		})
	}, {
		key: 'canMove',
		value: function canMove(position, from, to) {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.mobility[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var m = _step3.value;

					var success = m.test(position, from, to);
					if (success) {
						return true;
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return false;
		}
	}, {
		key: 'canCapture',
		value: function canCapture(position, from, to) {
			// most pieces capture the same way they move:
			return this.canMove(position, from, to);
		}
	}, {
		key: 'toString',
		value: function toString() {
			return this.constructor.name;
		}
	}, {
		key: 'isWhite',
		get: function get() {
			return this.color === _brands.WHITE;
		}
	}, {
		key: 'isBlack',
		get: function get() {
			return this.color === _brands.BLACK;
		}
	}, {
		key: 'brand',
		get: function get() {
			return this.constructor.brand;
		}
	}]);

	return Piece;
}();