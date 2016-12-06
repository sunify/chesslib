'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Castling = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = require('./point');

var _brands = require('./brands');

var _error = require('./error');

var _util = require('./util');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Castling = exports.Castling = function () {
	function Castling(_ref) {
		var _ref$fenEncoding = _ref.fenEncoding,
		    fenEncoding = _ref$fenEncoding === undefined ? '' : _ref$fenEncoding,
		    _ref$modes = _ref.modes,
		    modes = _ref$modes === undefined ? parseCastlingModes(fenEncoding) : _ref$modes,
		    rook = _ref.rook,
		    square = _ref.square;

		_classCallCheck(this, Castling);

		this.modes = modes;
		this.rook = rook;
		this.square = square;
	}

	_createClass(Castling, [{
		key: 'isLegal',
		value: function isLegal(color, side) {
			return this.modes[color][side];
		}
	}, {
		key: 'toString',
		value: function toString() {
			var modes = this.modes;

			return [modes[_brands.WHITE][_brands.KINGSIDE] ? 'K' : '', modes[_brands.WHITE][_brands.QUEENSIDE] ? 'Q' : '', modes[_brands.BLACK][_brands.KINGSIDE] ? 'k' : '', modes[_brands.BLACK][_brands.QUEENSIDE] ? 'q' : ''].join('') || '-';
		}
	}], [{
		key: 'analyze',
		value: function analyze(position, piece, coords) {
			var brand = piece.brand,
			    color = piece.color;
			var castling = position.castling;

			if (brand !== _brands.KING) {
				return new Castling({ modes: castling.modes });
			}
			var side = Castling.side(position, piece, coords);
			var modes = blankModes();
			var opponent = (0, _util.oppositeColor)(position.activeColor);
			modes[opponent] = position.castling.modes[opponent];
			if (side == null || !castling.isLegal(color, side)) {
				return new Castling({ modes: modes });
			}
			if (!isValid(position, color, side)) {
				throw new _error.CheckError();
			}
			return new Castling({
				rook: Castling.rook(position, color, side),
				square: position.pieceCoords(piece).sum(Castling.rookOffset(color, side)),
				modes: modes
			});
		}
	}, {
		key: 'side',
		value: function side(position, king, coords) {
			if (king.brand !== _brands.KING) {
				return null;
			}
			var _arr = [_brands.KINGSIDE, _brands.QUEENSIDE];
			for (var _i = 0; _i < _arr.length; _i++) {
				var side = _arr[_i];
				if (Castling.isCastlingMove(position, king, side, coords)) {
					return side;
				}
			}
			return null;
		}
	}, {
		key: 'rook',
		value: function rook(position, color, side) {
			var _position$pieceCoords = position.pieceCoords(position.piece({ brand: _brands.KING, color: color })),
			    kingX = _position$pieceCoords.x;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {

				for (var _iterator = position.pieces({ brand: _brands.ROOK, color: color })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var rook = _step.value;

					var _position$pieceCoords2 = position.pieceCoords(rook),
					    rookX = _position$pieceCoords2.x;

					if (color === _brands.WHITE ? rookX > kingX && side === _brands.KINGSIDE || rookX < kingX && side === _brands.QUEENSIDE : rookX > kingX && side === _brands.QUEENSIDE || rookX < kingX && side === _brands.KINGSIDE) {
						return rook;
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
		}
	}, {
		key: 'isCastlingMove',
		value: function isCastlingMove(position, king, side, coords) {
			return position.pieceCoords(king).sum(Castling.kingOffset(king.color, side)).equal(coords);
		}
	}, {
		key: 'kingOffset',
		value: function kingOffset(color, side) {
			return new _point.Point(xOffset(color, side, 2), 0);
		}
	}, {
		key: 'rookOffset',
		value: function rookOffset(color, side) {
			return new _point.Point(xOffset(color, side, -1), 0).sum(Castling.kingOffset(color, side));
		}
	}]);

	return Castling;
}();

var blankMode = function blankMode() {
	var _ref2;

	return _ref2 = {}, _defineProperty(_ref2, _brands.KINGSIDE, false), _defineProperty(_ref2, _brands.QUEENSIDE, false), _ref2;
};

var blankModes = function blankModes() {
	var _ref3;

	return _ref3 = {}, _defineProperty(_ref3, _brands.WHITE, blankMode()), _defineProperty(_ref3, _brands.BLACK, blankMode()), _ref3;
};

var sides = {
	'q': _brands.QUEENSIDE,
	'k': _brands.KINGSIDE
};

function parseCastlingModes(castling) {
	var modes = blankModes();
	String(castling || '').split('').forEach(function (mode) {
		var modeLower = mode.toLowerCase();
		var color = modeLower === mode ? _brands.BLACK : _brands.WHITE;
		modes[color][sides[modeLower]] = true;
	});
	return modes;
}

function xOffset(color, side) {
	var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

	// this is intentionally written explicitly:
	if (color === _brands.WHITE) {
		if (side === _brands.KINGSIDE) {
			return m;
		} else if (side === _brands.QUEENSIDE) {
			return -m;
		}
	} else if (color === _brands.BLACK) {
		if (side === _brands.KINGSIDE) {
			return -m;
		} else if (side === _brands.QUEENSIDE) {
			return m;
		}
	}
}

function isValid(position, color, side) {
	var loc = position.pieceCoords(position.piece({ brand: _brands.KING, color: color }));
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = loc.to(loc.sum(Castling.kingOffset(color, side)))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var pt = _step2.value;

			if (position.isCheck(color, pt)) {
				return false;
			}
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return true;
}