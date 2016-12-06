'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Pawn = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brands = require('./brands');

var _piece = require('./piece');

var _point = require('./point');

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pawn = exports.Pawn = function (_Piece) {
	_inherits(Pawn, _Piece);

	function Pawn() {
		_classCallCheck(this, Pawn);

		return _possibleConstructorReturn(this, (Pawn.__proto__ || Object.getPrototypeOf(Pawn)).apply(this, arguments));
	}

	_createClass(Pawn, [{
		key: 'canMove',
		value: function canMove(position, from, to) {
			// pawns can only move forwards:
			if (from.x !== to.x) {
				return false;
			}
			var reach = this.reach;
			// pawns can move two squares on their first move.
			if (from.y === this.homeRank) {
				return to.y === from.y + reach || to.y === from.y + reach * 2 && position.pieceByCoords(new _point.Point(from.x, from.y + reach)) == null;
			}
			return to.y === from.y + reach;
		}
	}, {
		key: 'canCapture',
		value: function canCapture(position, from, to) {
			return (
				// it's one rank "below" the pawn to be captured:
				to.y === from.y + this.reach && (
				// it's a from a neighboring file:
				from.x === to.x + 1 || from.x === to.x - 1)
			);
		}
	}, {
		key: 'fenEncoding',
		get: function get() {
			return this.isWhite ? 'P' : 'p';
		}
	}, {
		key: 'homeRank',
		get: function get() {
			return this.isWhite ? 6 : 1;
		}
	}, {
		key: 'reach',
		get: function get() {
			return this.isWhite ? -1 : 1;
		}
	}], [{
		key: 'brand',
		get: function get() {
			return _brands.PAWN;
		}
	}]);

	return Pawn;
}(_piece.Piece);