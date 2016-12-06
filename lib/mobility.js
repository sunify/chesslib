'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.quadrants = exports.Mobility = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brands = require('./brands');

var _point = require('./point');

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mobility = exports.Mobility = function () {
	function Mobility(m, n) {
		_classCallCheck(this, Mobility);

		this.m = m;
		this.n = n;
	}

	_createClass(Mobility, [{
		key: 'test',
		value: function test(position, src, dest) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.adjacentPoints(position, src)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var adj = _step.value;

					if (dest.equal(adj)) {
						return true;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return false;
		}
	}, {
		key: 'adjacentPoints',
		value: regeneratorRuntime.mark(function adjacentPoints(position, coords) {
			return regeneratorRuntime.wrap(function adjacentPoints$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							throw new Error("subclass must override Mobility#adjacentPoints");

						case 1:
						case 'end':
							return _context.stop();
					}
				}
			}, adjacentPoints, this);
		})
	}], [{
		key: 'isLegal',
		value: function isLegal(_ref) {
			var position = _ref.position,
			    piece = _ref.piece,
			    target = _ref.target,
			    capturePiece = _ref.capturePiece;

			// a piece cannot move out of turn.
			if (position.activeColor !== piece.color) {
				return false;
			}
			if (capturePiece != null) {
				// a piece cannot move to a square occupied by a piece of its color.
				if (piece.color === capturePiece.color) {
					return false;
				}
				// a piece must be able to legally capture at the square.
				return legally('canCapture', position, piece, target);
			}
			// a piece must be able to legally move to the vacant square;
			return legally('canMove', position, piece, target);
		}
	}]);

	return Mobility;
}();

var quadrants = exports.quadrants = [new _point.Point(1, 1), new _point.Point(1, -1), new _point.Point(-1, 1), new _point.Point(-1, -1)];

function legally(method, position, piece, target) {
	return piece[method](position, position.pieceCoords(piece), target);
}