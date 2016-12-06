'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Promotion = undefined;

var _brands = require('./brands');

var _util = require('./util');

var Promotion = exports.Promotion = {
	square: function square(position) {
		var color = (0, _util.oppositeColor)(position.activeColor);
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = position.pieces({ brand: _brands.PAWN, color: color })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var pawn = _step.value;

				var square = position.pieceCoords(pawn);
				if (square.y === Promotion.rank(color)) {
					return square;
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

		return null;
	},
	rank: function rank(color) {
		switch (color) {
			case _brands.WHITE:
				return 0;
			case _brands.BLACK:
				return 7;
		}
	}
};