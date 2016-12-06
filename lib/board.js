'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Board = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brands = require('./brands');

var _point = require('./point');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board() {
		var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
		var ranks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
		var boardArr = arguments[2];

		_classCallCheck(this, Board);

		this.files = files;
		this.ranks = ranks;
		this.storage = createStorage(files, ranks);
		this.pieces = new Set();
		this.pieces[_brands.KING] = new Set();
		this.pieces[_brands.QUEEN] = new Set();
		this.pieces[_brands.KNIGHT] = new Set();
		this.pieces[_brands.BISHOP] = new Set();
		this.pieces[_brands.ROOK] = new Set();
		this.pieces[_brands.PAWN] = new Set();
		if (boardArr != null) {
			this.decorate(boardArr);
		}
	}

	_createClass(Board, [{
		key: 'map',
		value: function map(fn) {
			return new Board(this.ranks, this.files, this.storage.map(function (rank, i) {
				return rank.map(function (piece, j) {
					return fn(piece, new _point.Point(j, i));
				});
			}));
		}
	}, {
		key: 'getPieces',
		value: function getPieces(brand) {
			return brand == null ? this.pieces : this.pieces[brand];
		}
	}, {
		key: 'getPieceCoords',
		value: function getPieceCoords(piece) {
			for (var i = 0, iLen = this.storage.length; i < iLen; i++) {
				var rank = this.storage[i];
				for (var j = 0, jLen = rank.length; j < jLen; j++) {
					var p = rank[j];
					if (p && p === piece) {
						return new _point.Point(j, i);
					}
				}
			}
			return null;
		}
	}, {
		key: 'getPieceByCoords',
		value: function getPieceByCoords(_ref) {
			var x = _ref.x,
			    y = _ref.y;
			var rotated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var rank = this.storage[rotated ? this.ranks - y - 1 : y];
			return rank == null ? null : rank[rotated ? this.files - x - 1 : x];
		}
	}, {
		key: 'placePiece',
		value: function placePiece(piece, _ref2) {
			var file = _ref2.x,
			    rank = _ref2.y;

			this.storage[rank][file] = piece;
			this.pieces.add(piece);
			this.pieces[piece.brand].add(piece);
		}
	}, {
		key: 'decorate',
		value: function decorate(board) {
			var _this = this;

			board.forEach(function (rank, i) {
				rank.forEach(function (file, j) {
					var piece = board[i][j];
					if (piece != null) {
						_this.placePiece(piece, new _point.Point(j, i));
					}
				});
			});
		}
	}]);

	return Board;
}();

function createStorage() {
	var ranks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
	var files = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

	// ugly imperative way to create a board:
	var board = [];
	for (var i = 0; i < ranks; i++) {
		var rank = [];
		for (var j = 0; j < files; j++) {
			rank.push(null);
		}
		board.push(rank);
	}
	return board;
}