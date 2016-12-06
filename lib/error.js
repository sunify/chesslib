"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChessError = exports.ChessError = function (_Error) {
	_inherits(ChessError, _Error);

	function ChessError(message, position) {
		_classCallCheck(this, ChessError);

		var _this = _possibleConstructorReturn(this, (ChessError.__proto__ || Object.getPrototypeOf(ChessError)).call(this, message));

		Error.call(_this);
		_this.name = _this.constructor.name;
		_this.message = message != null ? message : _this.name;
		_this.position = position;
		return _this;
	}

	return ChessError;
}(Error);

var MobilityError = exports.MobilityError = function (_ChessError) {
	_inherits(MobilityError, _ChessError);

	function MobilityError() {
		_classCallCheck(this, MobilityError);

		return _possibleConstructorReturn(this, (MobilityError.__proto__ || Object.getPrototypeOf(MobilityError)).apply(this, arguments));
	}

	return MobilityError;
}(ChessError);

var CheckError = exports.CheckError = function (_ChessError2) {
	_inherits(CheckError, _ChessError2);

	function CheckError() {
		_classCallCheck(this, CheckError);

		return _possibleConstructorReturn(this, (CheckError.__proto__ || Object.getPrototypeOf(CheckError)).apply(this, arguments));
	}

	return CheckError;
}(ChessError);

var PromotionError = exports.PromotionError = function (_ChessError3) {
	_inherits(PromotionError, _ChessError3);

	function PromotionError() {
		_classCallCheck(this, PromotionError);

		return _possibleConstructorReturn(this, (PromotionError.__proto__ || Object.getPrototypeOf(PromotionError)).apply(this, arguments));
	}

	return PromotionError;
}(ChessError);

var ResultError = exports.ResultError = function (_ChessError4) {
	_inherits(ResultError, _ChessError4);

	function ResultError() {
		_classCallCheck(this, ResultError);

		return _possibleConstructorReturn(this, (ResultError.__proto__ || Object.getPrototypeOf(ResultError)).apply(this, arguments));
	}

	return ResultError;
}(ChessError);

var AmbiguityError = exports.AmbiguityError = function (_ChessError5) {
	_inherits(AmbiguityError, _ChessError5);

	function AmbiguityError(rejection, candidates) {
		_classCallCheck(this, AmbiguityError);

		var _this6 = _possibleConstructorReturn(this, (AmbiguityError.__proto__ || Object.getPrototypeOf(AmbiguityError)).call(this, "Ambiguous notation: " + rejection));

		_this6.rejection = rejection;
		_this6.candidates = candidates;
		return _this6;
	}

	return AmbiguityError;
}(ChessError);