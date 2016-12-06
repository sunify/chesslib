'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Line = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fen = require('./fen');

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
	function Line() {
		var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _fen.FEN.standardPosition;

		_classCallCheck(this, Line);

		this.position = position;
		this.ply = [];
	}

	_createClass(Line, [{
		key: 'addPly',
		value: function addPly(ply) {
			this.ply.push(ply);
		}
	}, {
		key: 'move',
		value: function move(_move) {
			var note = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			var position = this.position.move(_move);
			this.addPly({ position: position, move: _move, note: note });
			this.position = position;
			return this;
		}
	}, {
		key: 'annotate',
		value: function annotate(note) {
			if (this.ply.length === 0) {
				throw new Error("no move to annotate");
			}
			(0, _util.last)(this.ply).note = note;
			return this;
		}
	}, {
		key: 'plyLength',
		get: function get() {
			return this.ply.length;
		}
	}, {
		key: 'length',
		get: function get() {
			return Math.ceil(this.ply.length / 2);
		}
	}]);

	return Line;
}();

exports.Line = Line;