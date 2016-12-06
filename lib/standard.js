'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Knight = exports.Bishop = exports.Rook = exports.Queen = exports.King = exports.Pawn = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pawn = require('./pawn');

Object.defineProperty(exports, 'Pawn', {
	enumerable: true,
	get: function get() {
		return _pawn.Pawn;
	}
});

var _brands = require('./brands');

var _piece = require('./piece');

var _leaper = require('./leaper');

var _rider = require('./rider');

var _royal = require('./royal');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var King = exports.King = function (_Piece) {
	_inherits(King, _Piece);

	function King(options) {
		_classCallCheck(this, King);

		var _this = _possibleConstructorReturn(this, (King.__proto__ || Object.getPrototypeOf(King)).call(this, options));

		_royal.Royal.call(_this);
		return _this;
	}

	_createClass(King, [{
		key: 'canCapture',
		value: function canCapture(position, from, to) {
			// FIXME: this is an ugly hack:
			var _arr = [this.mobility[0], this.mobility[1]];
			for (var _i = 0; _i < _arr.length; _i++) {
				var m = _arr[_i];
				var success = m.test(position, from, to);
				if (success) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: 'fenEncoding',
		get: function get() {
			return this.isWhite ? 'K' : 'k';
		}
	}], [{
		key: 'brand',
		get: function get() {
			return _brands.KING;
		}
	}]);

	return King;
}(_piece.Piece);

var Queen = exports.Queen = function (_Piece2) {
	_inherits(Queen, _Piece2);

	function Queen(options) {
		_classCallCheck(this, Queen);

		var _this2 = _possibleConstructorReturn(this, (Queen.__proto__ || Object.getPrototypeOf(Queen)).call(this, options));

		_rider.Rider.call(_this2, 1, 0);
		_rider.Rider.call(_this2, 1, 1);
		return _this2;
	}

	_createClass(Queen, [{
		key: 'fenEncoding',
		get: function get() {
			return this.isWhite ? 'Q' : 'q';
		}
	}], [{
		key: 'brand',
		get: function get() {
			return _brands.QUEEN;
		}
	}]);

	return Queen;
}(_piece.Piece);

var Rook = exports.Rook = function (_Piece3) {
	_inherits(Rook, _Piece3);

	function Rook(options) {
		_classCallCheck(this, Rook);

		var _this3 = _possibleConstructorReturn(this, (Rook.__proto__ || Object.getPrototypeOf(Rook)).call(this, options));

		_rider.Rider.call(_this3, 1, 0);
		return _this3;
	}

	_createClass(Rook, [{
		key: 'fenEncoding',
		get: function get() {
			return this.isWhite ? 'R' : 'r';
		}
	}], [{
		key: 'brand',
		get: function get() {
			return _brands.ROOK;
		}
	}]);

	return Rook;
}(_piece.Piece);

var Bishop = exports.Bishop = function (_Piece4) {
	_inherits(Bishop, _Piece4);

	function Bishop(options) {
		_classCallCheck(this, Bishop);

		var _this4 = _possibleConstructorReturn(this, (Bishop.__proto__ || Object.getPrototypeOf(Bishop)).call(this, options));

		_rider.Rider.call(_this4, 1, 1);
		return _this4;
	}

	_createClass(Bishop, [{
		key: 'fenEncoding',
		get: function get() {
			return this.isWhite ? 'B' : 'b';
		}
	}], [{
		key: 'brand',
		get: function get() {
			return _brands.BISHOP;
		}
	}]);

	return Bishop;
}(_piece.Piece);

var Knight = exports.Knight = function (_Piece5) {
	_inherits(Knight, _Piece5);

	function Knight(options) {
		_classCallCheck(this, Knight);

		var _this5 = _possibleConstructorReturn(this, (Knight.__proto__ || Object.getPrototypeOf(Knight)).call(this, options));

		_leaper.Leaper.call(_this5, 1, 2);
		return _this5;
	}

	_createClass(Knight, [{
		key: 'fenEncoding',
		get: function get() {
			return this.isWhite ? 'N' : 'n';
		}
	}], [{
		key: 'brand',
		get: function get() {
			return _brands.KNIGHT;
		}
	}]);

	return Knight;
}(_piece.Piece);