'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NullEnPassantTarget = exports.EnPassantTarget = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brands = require('./brands');

var _point = require('./point');

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnPassantTarget = exports.EnPassantTarget = function (_Point) {
	_inherits(EnPassantTarget, _Point);

	function EnPassantTarget() {
		_classCallCheck(this, EnPassantTarget);

		return _possibleConstructorReturn(this, (EnPassantTarget.__proto__ || Object.getPrototypeOf(EnPassantTarget)).apply(this, arguments));
	}

	_createClass(EnPassantTarget, [{
		key: 'offset',
		value: function offset() {
			return new _point.Point(0, this.y === 3 ? -1 : 1);
		}
	}, {
		key: 'toString',
		value: function toString() {
			return (0, _util.squareName)(this);
		}
	}], [{
		key: 'fromPoint',
		value: function fromPoint(point) {
			return new EnPassantTarget(point.x, point.y);
		}
	}, {
		key: 'analyze',
		value: function analyze(position, piece, target) {
			if (piece.brand !== _brands.PAWN) {
				return new NullEnPassantTarget();
			}

			var _target$difference = target.difference(position.pieceCoords(piece)),
			    thrust = _target$difference.y;

			if (Math.abs(thrust) === 2) {
				return EnPassantTarget.fromPoint(new _point.Point(0, -piece.reach).sum(target));
			}
			return new NullEnPassantTarget();
		}
	}, {
		key: 'capturablePiece',
		value: function capturablePiece(position, capturer, target) {
			if (capturer.brand !== _brands.PAWN || !target.equal(position.enPassantTarget)) {
				return {
					capturePiece: position.pieceByCoords(target),
					captureTarget: target,
					isEnPassant: false
				};
			}
			var captureTarget = target.sum(new _point.Point(0, -capturer.reach));
			var capturePiece = position.pieceByCoords(captureTarget);
			if (capturePiece != null) {
				return {
					capturePiece: capturePiece,
					captureTarget: captureTarget,
					isEnPassant: true
				};
			}
		}
	}, {
		key: 'null',
		value: function _null() {
			return new NullEnPassantTarget();
		}
	}]);

	return EnPassantTarget;
}(_point.Point);

var NullEnPassantTarget = exports.NullEnPassantTarget = function (_EnPassantTarget) {
	_inherits(NullEnPassantTarget, _EnPassantTarget);

	function NullEnPassantTarget() {
		_classCallCheck(this, NullEnPassantTarget);

		return _possibleConstructorReturn(this, (NullEnPassantTarget.__proto__ || Object.getPrototypeOf(NullEnPassantTarget)).call(this));
	}

	_createClass(NullEnPassantTarget, [{
		key: 'equal',
		value: function equal(other) {
			if (other instanceof NullEnPassantTarget) {
				return true;
			}
			return false;
		}
	}, {
		key: 'toString',
		value: function toString() {
			return '-';
		}
	}]);

	return NullEnPassantTarget;
}(EnPassantTarget);