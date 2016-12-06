'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ninesixty = undefined;
exports.fischerandom = fischerandom;
exports.doubleFischerandom = doubleFischerandom;

var _brands = require('./brands');

var _standard = require('./standard');

var _point = require('./point');

var _board = require('./board');

var _fen = require('./fen');

var _util = require('./util');

var Die = require('jsdice');

function fischerandom() {
	var board = new _board.Board();

	randomizeSide(board);
	copySide(board);
	placePawns(board);

	return position(board);
};

function doubleFischerandom() {
	var board = new _board.Board();

	randomizeSide(board, _brands.WHITE);
	randomizeSide(board, _brands.BLACK);
	placePawns(board);

	return position(board);
};
// alias for people who don't like Bobby Fischer :)
var ninesixty = exports.ninesixty = fischerandom;

function randomizeSide(board) {
	var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _brands.WHITE;

	var rank = colorRank(color);
	var place = placeOnEmptySquare.bind(null, rank, board);

	// 1. place the first bishop on the square of octohedron roll:
	var b1 = rollDie('d8');
	board.placePiece(new _standard.Bishop({ color: color }), new _point.Point(b1, rank));

	// 2. place the opposite color bishop on the square of the tetrahedron role:
	var b2 = rollDie('d4');
	var b2Prime = colorClash(b1, b2) ? b2 + 1 : b2;
	board.placePiece(new _standard.Bishop({ color: color }), new _point.Point(b2Prime, rank));

	// 3. place the queen on the square of the cube roll:
	place(new _standard.Queen({ color: color }), rollDie('d6'));

	// 4. place the knights on the quotient and remainders of 1 below the
	//    icosahedron roll diveded by 4:
	var n = rollDie('d20');
	place(new _standard.Knight({ color: color }), Math.floor(n / 4));
	place(new _standard.Knight({ color: color }), n % 4);

	// 5. place the king between the rooks on the remaining 3 squares:
	place(new _standard.Rook({ color: color }), 0);
	place(new _standard.King({ color: color }), 0);
	place(new _standard.Rook({ color: color }), 0);
}

function placePawns(board) {
	for (var j = 0; j < board.files; j++) {
		board.placePiece(new _standard.Pawn({ color: _brands.WHITE }), new _point.Point(j, 6));
		board.placePiece(new _standard.Pawn({ color: _brands.BLACK }), new _point.Point(j, 1));
	}
}

function copySide(board) {
	var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _brands.BLACK;

	var rank = colorRank(color);
	var oppRank = colorRank((0, _util.oppositeColor)(color));
	for (var j = 0; j < board.files; j++) {
		var _board$getPieceByCoor = board.getPieceByCoords(new _point.Point(j, oppRank)),
		    Brand = _board$getPieceByCoor.constructor;

		board.placePiece(new Brand({ color: color }), new _point.Point(j, rank));
	}
}

function colorRank(color) {
	return color === _brands.WHITE ? 7 : 0;
}

function colorClash(a, b) {
	return (0, _util.isEven)(a) && (0, _util.isEven)(b) || (0, _util.isOdd)(a) && (0, _util.isOdd)(b);
}

function placeOnEmptySquare(rank, board, piece, n) {
	for (var j = 0, count = 0; j < board.files; j++) {
		var point = new _point.Point(j, rank);
		if (board.getPieceByCoords(point) != null) {
			continue;
		}
		if (n === count++) {
			board.placePiece(piece, point);
		}
	}
}

function rollDie(signature) {
	return new Die(signature).roll().total - 1;
}

function position(board) {
	return _fen.FEN.standardPosition.beget({ board: board });
}