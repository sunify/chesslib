'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HalfmoveClock = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brands = require('./brands');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HalfmoveClock = exports.HalfmoveClock = function () {
	function HalfmoveClock() {
		var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		_classCallCheck(this, HalfmoveClock);

		this.count = count;
		this.source = source;
	}

	_createClass(HalfmoveClock, [{
		key: 'inc',
		value: function inc() {
			return new HalfmoveClock(this.count + 1);
		}
	}, {
		key: 'toString',
		value: function toString() {
			return String(this.count);
		}
	}], [{
		key: 'analyze',
		value: function analyze(position, piece, target) {
			if (
			// it's a pawn move.
			piece.brand === _brands.PAWN ||
			// it's a capture.
			position.pieceByCoords(target) != null) {
				return new HalfmoveClock(0);
			}
			return position.halfmoveClock.inc();
		}
	}]);

	return HalfmoveClock;
}();