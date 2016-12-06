'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PGN = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fen = require('./fen');

var _game = require('./game');

var _error = require('./error');

var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var TOKEN_TAG = 'tag';
var TOKEN_RESULT = 'result';
var TOKEN_MOVE_NUMBER_NOTATION = 'move number';
var TOKEN_PLY_NOTATION = 'ply';
var TOKEN_ANNOTATION_NOTATION = 'annotation';

var PGN = exports.PGN = {
	parse: function parse(pgnStr) {
		return pgnStr.split(/\r\n\r\n\r\n|\n\n\n/).map(parseGame); // FIXME: is this sane?
	},
	stringify: function stringify(game) {}
};

function parseGame(gameStr) {
	// transform the PGN into meaningful tokens:
	var tokens = tokenizePGN(
	// strip out different whitespace chars.
	' ' + gameStr.split(/[\n\r\r\t]+/g).join(' ') + ' ');

	var game = new _game.Game();

	try {
		tokens.forEach(function (_ref) {
			var mode = _ref.mode,
			    source = _ref.source;

			switch (mode) {
				case TOKEN_TAG:
					game.addTag.apply(game, _toConsumableArray(parseTag(source)));
					break;
				case TOKEN_PLY_NOTATION:
					game.move(source);
					break;
				case TOKEN_ANNOTATION_NOTATION:
					game.annotate(source);
					break;
				case TOKEN_RESULT:
					game.finish(source);
					break;
			}
		});
	} catch (err) {
		if (err instanceof _error.ChessError) {
			err.lastPosition = _fen.FEN.stringify((0, _util.last)(game.ply).position);
		}
		throw err;
	}

	return game;
}

function parseTag(line) {
	var _line$split = line.split(/\s+/),
	    _line$split2 = _slicedToArray(_line$split, 2),
	    key = _line$split2[0],
	    value = _line$split2[1];

	return [key, cleanValue(value)];
}

function cleanValue(value) {
	return value.replace(/^[\"\']|[\"\']$/g, '');
}

function tokenizePGN(transcript) {
	var tokens = [];
	var mode = null;
	var lastMode = null;
	var buffer = [];
	var halfmoveToggle = false;
	var skipping = 0;

	transcript.split('').forEach(function (char, i) {
		if (i < skipping) {
			return;
		}
		switch (char) {

			case '[':
			case '{':
				skip(1);
				lastMode = mode;
				finishToken();
				mode = char == '[' ? TOKEN_TAG : TOKEN_ANNOTATION_NOTATION;
				break;

			case '}':
			case ']':
				finishToken();
				mode = lastMode;
				lastMode = null;
				return;

			case ' ':
			case '.':
				if (mode === TOKEN_PLY_NOTATION) {
					if (buffer.length == 0) {
						return;
					}
					finishToken();
					if (halfmove()) {
						mode = TOKEN_PLY_NOTATION;
					}
					return;
				}
				if (mode === TOKEN_MOVE_NUMBER_NOTATION) {
					if ('.' === char) {
						buffer.push(char);
					}
					finishToken();
					mode = TOKEN_PLY_NOTATION;
					return;
				}
				break;

			default:
				if (!/\d/.test(char)) {
					break;
				}
				if (mode === null || mode === TOKEN_PLY_NOTATION) {
					var p3 = peek(3),
					    p7 = peek(7);
					if (p3 === '1-0' || p3 === '0-1') {
						result(p3);
						skip(3);
						return;
					}
					if (p7 === '1/2-1/2') {
						result(p7);
						skip(7);
						return;
					}
				}
				if (mode === null) {
					mode = TOKEN_MOVE_NUMBER_NOTATION;
				}
		}
		if (mode !== null && skipping < i) {
			buffer.push(char);
		}

		function skip(n) {
			skipping = i + n - 1;
		}

		function peek(n) {
			var str = '';
			for (var j = 0; j < n; j++) {
				str += transcript[i + j];
			}
			return str;
		}
	});

	return tokens;

	function halfmove() {
		return halfmoveToggle = !halfmoveToggle;
	}

	function result(source) {
		tokens.push({ mode: TOKEN_RESULT, source: source });
		mode = null;
		buffer = [];
	}

	function finishToken() {
		if (mode == null) {
			return;
		}
		if (buffer.length > 0) {
			var source = buffer.join('');
			tokens.push({ mode: mode, source: source });
		}
		mode = null;
		buffer = [];
	}
}