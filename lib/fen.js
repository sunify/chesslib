'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.standardPosition = exports.standard = exports.FEN = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _brands = require('./brands');

var _standard = require('./standard');

var _castling = require('./castling');

var _eptarget = require('./eptarget');

var _position = require('./position');

var _board = require('./board');

var _point = require('./point');

var _halfmoveclock = require('./halfmoveclock');

var _util = require('./util');

var FEN = exports.FEN = {
	parse: function parse(fenStr) {
		var _fenStr$split = fenStr.split(' '),
		    _fenStr$split2 = _slicedToArray(_fenStr$split, 6),
		    ranks = _fenStr$split2[0],
		    activeColor = _fenStr$split2[1],
		    castling = _fenStr$split2[2],
		    enPassantTarget = _fenStr$split2[3],
		    halfmoveClock = _fenStr$split2[4],
		    fullmoveCounter = _fenStr$split2[5];

		return new _position.Position({
			board: parseRanks(ranks),
			activeColor: parseActiveColor(activeColor),
			castling: parseCastling(castling),
			enPassantTarget: parseEPTarget(enPassantTarget),
			halfmoveClock: parseClock(halfmoveClock),
			fullmoveCounter: parseCounter(fullmoveCounter)
		});
	},
	stringify: function stringify(position) {
		return stringifyPosition(position);
	},


	get standard() {
		return standard;
	},

	get standardPosition() {
		return standardPosition;
	}
};

var standard = exports.standard = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

var standardPosition = exports.standardPosition = FEN.parse(standard);

function parseRanks(ranks) {
	var board = new _board.Board();
	ranks.split('/').forEach(function (rank, i) {
		parseRank(rank, board, i);
	});
	return board;
}

function parseRank(rank, board, i) {
	var cells = rank.split('');
	for (var j = 0, c = 0; j < board.files; c++) {
		var cell = rank[c];
		if (!isNaN(Number(cell))) {
			// In FEN, a number means "skip this many squares":
			j += Number(cell);
			continue;
		}
		board.placePiece(createPiece(cell), new _point.Point(j, i));
		// not getting too fancy:
		j += 1;
	}
}

function createPiece(piece) {
	var lowered = piece.toLowerCase();
	var options = { color: lowered === piece ? _brands.BLACK : _brands.WHITE };
	switch (lowered) {
		case 'p':
			return new _standard.Pawn(options);
		case 'r':
			return new _standard.Rook(options);
		case 'n':
			return new _standard.Knight(options);
		case 'b':
			return new _standard.Bishop(options);
		case 'k':
			return new _standard.King(options);
		case 'q':
			return new _standard.Queen(options);
	}
}

function parseActiveColor(activeColor) {
	switch (activeColor) {
		case 'w':
			return _brands.WHITE;
		case 'b':
			return _brands.BLACK;
	}
}

function parseCastling(castling) {
	return new _castling.Castling({ fenEncoding: castling });
}

function parseEPTarget(enPassantTarget) {
	switch (enPassantTarget) {
		case '-':
			return _eptarget.EnPassantTarget.null();
		default:
			return _eptarget.EnPassantTarget.fromPoint((0, _util.squareCoords)(enPassantTarget));
	}
}

function parseCounter(clock) {
	if (clock == null) {
		return null;
	}
	return Number(clock);
}

function stringifyPosition(position) {
	return [stringifyRanks(position), stringifyActiveColor(position.activeColor), stringifyCastling(position.castling), stringifyEPTarget(position.enPassantTarget), stringifyClock(position.halfmoveClock), stringifyCounter(position.fullmoveCounter)].filter(Boolean).join(' ');
}

function stringifyRanks(position) {
	var ranks = '';
	for (var i = 0; i < 8; i++) {
		for (var j = 0, count = 0; j < 8; j++) {
			var piece = position.pieceByCoords(new _point.Point(j, i));
			if (piece == null) {
				count += 1;
				if (j === 7) {
					ranks += '' + (count ? count : '') + (i !== 7 ? '/' : '');
				}
				continue;
			}
			ranks += '' + (count ? count : '') + piece.fenEncoding;
			if (j === 7 && i !== 7) {
				ranks += '/';
			}
			count = 0;
		}
	}
	return ranks;
}

function stringifyActiveColor(activeColor) {
	switch (activeColor) {
		case _brands.WHITE:
			return 'w';
		case _brands.BLACK:
			return 'b';
	}
}

function stringifyCastling(castling) {
	return String(castling);
}

function stringifyEPTarget(enPassantTarget) {
	if (enPassantTarget == null || enPassantTarget instanceof _eptarget.NullEnPassantTarget) {
		return '-';
	}
	return String(enPassantTarget);
}

function stringifyClock(clock) {
	if (String(clock) === '0') {
		return clock.source;
	}
	return String(clock);
}

function stringifyCounter(counter) {
	if (counter == null) {
		return null;
	}
	return String(counter);
}

function parseClock(halfmoveClock) {
	return new _halfmoveclock.HalfmoveClock(halfmoveClock != null ? Number(halfmoveClock) : 0, halfmoveClock);
}