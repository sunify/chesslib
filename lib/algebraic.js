'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.chunker = exports.Algebraic = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parse = parse;
exports.stringify = stringify;

var _brands = require('./brands');

var _point = require('./point');

var _standard = require('./standard');

var _eptarget = require('./eptarget');

var _error = require('./error');

var _util = require('./util');

var _marked = [pieces, candidates].map(regeneratorRuntime.mark);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var unique = require('lodash.uniq');

var Algebraic = exports.Algebraic = {
	parse: parse,
	stringify: stringify,
	get chunker() {
		return chunker;
	}
};

var chunker = exports.chunker = /([KQRBN])?([a-h]?[1-8]?)?x?([a-h][1-8])(?:=([QRBN]))?/;

function parse(algStr, position) {
	if (algStr === 'O-O' || algStr === 'O-O-O') {
		return castlingMove(algStr, position);
	}
	return normalMove(algStr, position);
}

function stringify(_ref, position) {
	var piece = _ref.piece,
	    target = _ref.target,
	    _ref$source = _ref.source,
	    source = _ref$source === undefined ? position.pieceCoords(piece) : _ref$source,
	    _ref$isCapture = _ref.isCapture,
	    isCapture = _ref$isCapture === undefined ? position.pieceByCoords(target) != null : _ref$isCapture,
	    _ref$promotionPrize = _ref.promotionPrize,
	    promotionPrize = _ref$promotionPrize === undefined ? null : _ref$promotionPrize;

	var disambiguator = [];

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = pieces(position, null, target, stringifyPiece(piece))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var p = _step.value;

			if (p === piece) {
				continue;
			}
			if (position.pieceCoords(p).y === source.y) {
				disambiguator.push((0, _util.rankName)(source.y));
			} else {
				disambiguator.push((0, _util.fileName)(source.x));
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return [stringifyPiece(piece)].concat(_toConsumableArray(unique(disambiguator)), [isCapture ? 'x' : '', (0, _util.squareName)(target)]).join('');
}

function pieces(position, source, target) {
	var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	var Brand, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, p;

	return regeneratorRuntime.wrap(function pieces$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					Brand = pieceBrand(i);

					if (!(Brand === _standard.King)) {
						_context.next = 6;
						break;
					}

					_context.next = 4;
					return getKing(position);

				case 4:
					_context.next = 32;
					break;

				case 6:
					_iteratorNormalCompletion2 = true;
					_didIteratorError2 = false;
					_iteratorError2 = undefined;
					_context.prev = 9;
					_iterator2 = candidates(position, Brand.brand, source, target)[Symbol.iterator]();

				case 11:
					if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
						_context.next = 18;
						break;
					}

					p = _step2.value;
					_context.next = 15;
					return p;

				case 15:
					_iteratorNormalCompletion2 = true;
					_context.next = 11;
					break;

				case 18:
					_context.next = 24;
					break;

				case 20:
					_context.prev = 20;
					_context.t0 = _context['catch'](9);
					_didIteratorError2 = true;
					_iteratorError2 = _context.t0;

				case 24:
					_context.prev = 24;
					_context.prev = 25;

					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}

				case 27:
					_context.prev = 27;

					if (!_didIteratorError2) {
						_context.next = 30;
						break;
					}

					throw _iteratorError2;

				case 30:
					return _context.finish(27);

				case 31:
					return _context.finish(24);

				case 32:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this, [[9, 20, 24, 32], [25,, 27, 31]]);
}

function candidates(position, brand, source, target) {
	var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, p, loc;

	return regeneratorRuntime.wrap(function candidates$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					_iteratorNormalCompletion3 = true;
					_didIteratorError3 = false;
					_iteratorError3 = undefined;
					_context2.prev = 3;
					_iterator3 = position.pieces({ brand: brand, color: position.activeColor })[Symbol.iterator]();

				case 5:
					if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
						_context2.next = 23;
						break;
					}

					p = _step3.value;
					loc = position.pieceCoords(p);

					if (!(source == null || source.x === loc.x || source.y === loc.y)) {
						_context2.next = 20;
						break;
					}

					_context2.prev = 9;

					// best way to find out if the piece can move is to move it:
					position.movePiece(p, target);
					_context2.next = 13;
					return p;

				case 13:
					_context2.next = 20;
					break;

				case 15:
					_context2.prev = 15;
					_context2.t0 = _context2['catch'](9);

					if (!(_context2.t0 instanceof _error.ChessError)) {
						_context2.next = 19;
						break;
					}

					return _context2.abrupt('continue', 20);

				case 19:
					throw _context2.t0;

				case 20:
					_iteratorNormalCompletion3 = true;
					_context2.next = 5;
					break;

				case 23:
					_context2.next = 29;
					break;

				case 25:
					_context2.prev = 25;
					_context2.t1 = _context2['catch'](3);
					_didIteratorError3 = true;
					_iteratorError3 = _context2.t1;

				case 29:
					_context2.prev = 29;
					_context2.prev = 30;

					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}

				case 32:
					_context2.prev = 32;

					if (!_didIteratorError3) {
						_context2.next = 35;
						break;
					}

					throw _iteratorError3;

				case 35:
					return _context2.finish(32);

				case 36:
					return _context2.finish(29);

				case 37:
				case 'end':
					return _context2.stop();
			}
		}
	}, _marked[1], this, [[3, 25, 29, 37], [9, 15], [30,, 32, 36]]);
}

function pieceBrand(i) {
	switch (i) {
		case 'K':
			return _standard.King;
		case 'Q':
			return _standard.Queen;
		case 'R':
			return _standard.Rook;
		case 'B':
			return _standard.Bishop;
		case 'N':
			return _standard.Knight;
		case '':
			return _standard.Pawn;
	}
}

function parsePromotionPrize(i, color) {
	switch (i) {
		case 'Q':
			return new _standard.Queen({ color: color });
		case 'R':
			return new _standard.Rook({ color: color });
		case 'B':
			return new _standard.Bishop({ color: color });
		case 'N':
			return new _standard.Knight({ color: color });
	}
}

function parseSource(s) {
	if (s == null) {
		return null;
	}
	if (!isNaN(Number(s))) {
		return new _point.Point(NaN, (0, _util.rankIndex)(s));
	}
	return new _point.Point((0, _util.fileIndex)(s), NaN);
}

function normalMove(algStr, position) {
	var _chunker$exec = chunker.exec(algStr),
	    _chunker$exec2 = _slicedToArray(_chunker$exec, 5),
	    _ = _chunker$exec2[0],
	    i = _chunker$exec2[1],
	    s = _chunker$exec2[2],
	    t = _chunker$exec2[3],
	    p = _chunker$exec2[4];

	var source = parseSource(s);
	var target = (0, _util.squareCoords)(t);
	var promotionPrize = parsePromotionPrize(p, position.activeColor);

	var _ref2 = [].concat(_toConsumableArray(pieces(position, source, target, i))),
	    piece = _ref2[0],
	    extra = _ref2[1];

	if (piece == null) {
		throw new _error.MobilityError(algStr, position);
	}
	if (extra != null) {
		throw new _error.AmbiguityError(algStr);
	}

	var _EnPassantTarget$capt = _eptarget.EnPassantTarget.capturablePiece(position, piece, target),
	    captureTarget = _EnPassantTarget$capt.captureTarget,
	    capturePiece = _EnPassantTarget$capt.capturePiece,
	    isEnPassant = _EnPassantTarget$capt.isEnPassant;

	return {
		piece: piece,
		source: position.pieceCoords(piece),
		target: target,
		isCapture: capturePiece != null,
		captureTarget: captureTarget,
		capturePiece: capturePiece,
		isEnPassant: isEnPassant,
		promotionPrize: promotionPrize
	};
}

function castlingMove(algStr, position) {
	var king = position.piece({ brand: _brands.KING, color: position.activeColor });
	return {
		piece: king,
		source: position.pieceCoords(king),
		target: getCastlingCoords(algStr, position),
		isCapture: false,
		capturePiece: null,
		isEnPassant: false,
		promotionPrize: null
	};
}

function getCastlingCoords(algStr, position) {
	switch (algStr) {
		case 'O-O':
			return (0, _util.squareCoords)(position.activeColor === _brands.WHITE ? 'g1' : 'g8');
		case 'O-O-O':
			return (0, _util.squareCoords)(position.activeColor === _brands.WHITE ? 'c1' : 'c8');
	}
}

function getKing(position) {
	return position.piece({ brand: _standard.King.brand, color: position.activeColor });
}

function stringifyPiece(piece) {
	switch (piece.brand) {
		case _brands.KING:
			return 'K';
		case _brands.QUEEN:
			return 'Q';
		case _brands.ROOK:
			return 'R';
		case _brands.BISHOP:
			return 'B';
		case _brands.KNIGHT:
			return 'N';
		case _brands.PAWN:
			return '';
	}
}