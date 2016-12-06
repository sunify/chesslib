'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Position = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brands = require('./brands');

var _board = require('./board');

var _mobility = require('./mobility');

var _castling = require('./castling');

var _eptarget = require('./eptarget');

var _point = require('./point');

var _promotion = require('./promotion');

var _algebraic = require('./algebraic');

var _halfmoveclock = require('./halfmoveclock');

var _util = require('./util');

var _error = require('./error');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assign = require('lodash.assign');

var Position = exports.Position = function () {
	function Position() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref$ranks = _ref.ranks,
		    ranks = _ref$ranks === undefined ? 8 : _ref$ranks,
		    _ref$files = _ref.files,
		    files = _ref$files === undefined ? 8 : _ref$files,
		    _ref$activeColor = _ref.activeColor,
		    activeColor = _ref$activeColor === undefined ? _brands.WHITE : _ref$activeColor,
		    _ref$castling = _ref.castling,
		    castling = _ref$castling === undefined ? null : _ref$castling,
		    _ref$enPassantTarget = _ref.enPassantTarget,
		    enPassantTarget = _ref$enPassantTarget === undefined ? null : _ref$enPassantTarget,
		    _ref$halfmoveClock = _ref.halfmoveClock,
		    halfmoveClock = _ref$halfmoveClock === undefined ? null : _ref$halfmoveClock,
		    _ref$fullmoveCounter = _ref.fullmoveCounter,
		    fullmoveCounter = _ref$fullmoveCounter === undefined ? 0 : _ref$fullmoveCounter,
		    _ref$board = _ref.board,
		    board = _ref$board === undefined ? new _board.Board(ranks, files) : _ref$board;

		_classCallCheck(this, Position);

		this.board = board;
		this.activeColor = activeColor;
		this.castling = castling;
		this.enPassantTarget = enPassantTarget;
		this.halfmoveClock = halfmoveClock;
		this.fullmoveCounter = fullmoveCounter;
		this.promotionSquare = _promotion.Promotion.square(this);
	}

	_createClass(Position, [{
		key: 'beget',
		value: function beget(overrides) {
			return new Position(assign({}, this, overrides));
		}
	}, {
		key: 'material',
		value: function material(brand) {
			return this.board.getPieces(brand);
		}
	}, {
		key: 'pieceBySquare',
		value: function pieceBySquare(squareName) {
			return this.pieceByCoords((0, _util.squareCoords)(squareName));
		}
	}, {
		key: 'pieceCoords',
		value: function pieceCoords(piece) {
			return this.board.getPieceCoords(piece);
		}
	}, {
		key: 'pieceByCoords',
		value: function pieceByCoords(point) {
			var rotated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			return this.board.getPieceByCoords(point, rotated);
		}
	}, {
		key: 'pieces',
		value: function (_pieces) {
			var _marked = [pieces].map(regeneratorRuntime.mark);

			function pieces() {
				var _args = arguments;
				return regeneratorRuntime.wrap(function pieces$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								return _context.delegateYield(_pieces.apply(this, _args), 't0', 1);

							case 1:
								return _context.abrupt('return', _context.t0);

							case 2:
							case 'end':
								return _context.stop();
						}
					}
				}, _marked[0], this);
			}

			pieces.toString = function () {
				return _pieces.toString();
			};

			return pieces;
		}(regeneratorRuntime.mark(function _callee() {
			var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, piece, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, val, key;

			return regeneratorRuntime.wrap(function _callee$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							_context2.prev = 3;
							_iterator = this.material(selector.brand)[Symbol.iterator]();

						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								_context2.next = 38;
								break;
							}

							piece = _step.value;
							_iteratorNormalCompletion2 = true;
							_didIteratorError2 = false;
							_iteratorError2 = undefined;
							_context2.prev = 10;
							_iterator2 = (0, _util.entries)(selector)[Symbol.iterator]();

						case 12:
							if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
								_context2.next = 19;
								break;
							}

							_step2$value = _slicedToArray(_step2.value, 2), val = _step2$value[0], key = _step2$value[1];

							if (!(piece[key] !== val)) {
								_context2.next = 16;
								break;
							}

							return _context2.abrupt('continue', 35);

						case 16:
							_iteratorNormalCompletion2 = true;
							_context2.next = 12;
							break;

						case 19:
							_context2.next = 25;
							break;

						case 21:
							_context2.prev = 21;
							_context2.t0 = _context2['catch'](10);
							_didIteratorError2 = true;
							_iteratorError2 = _context2.t0;

						case 25:
							_context2.prev = 25;
							_context2.prev = 26;

							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}

						case 28:
							_context2.prev = 28;

							if (!_didIteratorError2) {
								_context2.next = 31;
								break;
							}

							throw _iteratorError2;

						case 31:
							return _context2.finish(28);

						case 32:
							return _context2.finish(25);

						case 33:
							_context2.next = 35;
							return piece;

						case 35:
							_iteratorNormalCompletion = true;
							_context2.next = 5;
							break;

						case 38:
							_context2.next = 44;
							break;

						case 40:
							_context2.prev = 40;
							_context2.t1 = _context2['catch'](3);
							_didIteratorError = true;
							_iteratorError = _context2.t1;

						case 44:
							_context2.prev = 44;
							_context2.prev = 45;

							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}

						case 47:
							_context2.prev = 47;

							if (!_didIteratorError) {
								_context2.next = 50;
								break;
							}

							throw _iteratorError;

						case 50:
							return _context2.finish(47);

						case 51:
							return _context2.finish(44);

						case 52:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee, this, [[3, 40, 44, 52], [10, 21, 25, 33], [26,, 28, 32], [45,, 47, 51]]);
		}))
	}, {
		key: 'piece',
		value: function piece(selector) {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.pieces(selector)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var i = _step3.value;

					return i;
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return null;
		}
	}, {
		key: 'all',
		value: function all(selector) {
			return [].concat(_toConsumableArray(this.pieces(selector)));
		}
	}, {
		key: 'checks',
		value: regeneratorRuntime.mark(function checks() {
			var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.activeColor;
			var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.pieceCoords(this.piece({ brand: _brands.KING, color: color }));

			var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, enemy;

			return regeneratorRuntime.wrap(function checks$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_iteratorNormalCompletion4 = true;
							_didIteratorError4 = false;
							_iteratorError4 = undefined;
							_context3.prev = 3;
							_iterator4 = this.pieces({ color: (0, _util.oppositeColor)(color) })[Symbol.iterator]();

						case 5:
							if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
								_context3.next = 13;
								break;
							}

							enemy = _step4.value;

							if (!enemy.canCapture(this, this.pieceCoords(enemy), loc)) {
								_context3.next = 10;
								break;
							}

							_context3.next = 10;
							return enemy;

						case 10:
							_iteratorNormalCompletion4 = true;
							_context3.next = 5;
							break;

						case 13:
							_context3.next = 19;
							break;

						case 15:
							_context3.prev = 15;
							_context3.t0 = _context3['catch'](3);
							_didIteratorError4 = true;
							_iteratorError4 = _context3.t0;

						case 19:
							_context3.prev = 19;
							_context3.prev = 20;

							if (!_iteratorNormalCompletion4 && _iterator4.return) {
								_iterator4.return();
							}

						case 22:
							_context3.prev = 22;

							if (!_didIteratorError4) {
								_context3.next = 25;
								break;
							}

							throw _iteratorError4;

						case 25:
							return _context3.finish(22);

						case 26:
							return _context3.finish(19);

						case 27:
						case 'end':
							return _context3.stop();
					}
				}
			}, checks, this, [[3, 15, 19, 27], [20,, 22, 26]]);
		})
	}, {
		key: 'moves',
		value: regeneratorRuntime.mark(function moves() {
			var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.activeColor;

			var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, piece, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, move;

			return regeneratorRuntime.wrap(function moves$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_iteratorNormalCompletion5 = true;
							_didIteratorError5 = false;
							_iteratorError5 = undefined;
							_context4.prev = 3;
							_iterator5 = this.pieces({ color: color })[Symbol.iterator]();

						case 5:
							if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
								_context4.next = 36;
								break;
							}

							piece = _step5.value;
							_iteratorNormalCompletion6 = true;
							_didIteratorError6 = false;
							_iteratorError6 = undefined;
							_context4.prev = 10;
							_iterator6 = (0, _util.bounded)(this.board, piece.moves(this))[Symbol.iterator]();

						case 12:
							if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
								_context4.next = 19;
								break;
							}

							move = _step6.value;
							_context4.next = 16;
							return { piece: piece, move: move };

						case 16:
							_iteratorNormalCompletion6 = true;
							_context4.next = 12;
							break;

						case 19:
							_context4.next = 25;
							break;

						case 21:
							_context4.prev = 21;
							_context4.t0 = _context4['catch'](10);
							_didIteratorError6 = true;
							_iteratorError6 = _context4.t0;

						case 25:
							_context4.prev = 25;
							_context4.prev = 26;

							if (!_iteratorNormalCompletion6 && _iterator6.return) {
								_iterator6.return();
							}

						case 28:
							_context4.prev = 28;

							if (!_didIteratorError6) {
								_context4.next = 31;
								break;
							}

							throw _iteratorError6;

						case 31:
							return _context4.finish(28);

						case 32:
							return _context4.finish(25);

						case 33:
							_iteratorNormalCompletion5 = true;
							_context4.next = 5;
							break;

						case 36:
							_context4.next = 42;
							break;

						case 38:
							_context4.prev = 38;
							_context4.t1 = _context4['catch'](3);
							_didIteratorError5 = true;
							_iteratorError5 = _context4.t1;

						case 42:
							_context4.prev = 42;
							_context4.prev = 43;

							if (!_iteratorNormalCompletion5 && _iterator5.return) {
								_iterator5.return();
							}

						case 45:
							_context4.prev = 45;

							if (!_didIteratorError5) {
								_context4.next = 48;
								break;
							}

							throw _iteratorError5;

						case 48:
							return _context4.finish(45);

						case 49:
							return _context4.finish(42);

						case 50:
						case 'end':
							return _context4.stop();
					}
				}
			}, moves, this, [[3, 38, 42, 50], [10, 21, 25, 33], [26,, 28, 32], [43,, 45, 49]]);
		})
	}, {
		key: 'isCheck',
		value: function isCheck(color, loc) {
			var _iteratorNormalCompletion7 = true;
			var _didIteratorError7 = false;
			var _iteratorError7 = undefined;

			try {
				for (var _iterator7 = this.checks(color, loc)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
					var _ = _step7.value;

					return true;
				}
			} catch (err) {
				_didIteratorError7 = true;
				_iteratorError7 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion7 && _iterator7.return) {
						_iterator7.return();
					}
				} finally {
					if (_didIteratorError7) {
						throw _iteratorError7;
					}
				}
			}

			return false;
		}
	}, {
		key: 'isCheckmate',
		value: function isCheckmate() {
			var color = this.activeColor;
			if (!this.isCheck(color)) {
				// it can't be checkmate if it's not even check:
				return false;
			}
			var _iteratorNormalCompletion8 = true;
			var _didIteratorError8 = false;
			var _iteratorError8 = undefined;

			try {
				for (var _iterator8 = this.moves()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
					var _step8$value = _step8.value,
					    piece = _step8$value.piece,
					    move = _step8$value.move;

					try {
						if (!this.movePiece(piece, move).isCheck(color)) {
							return false;
						}
					} catch (err) {
						if (err instanceof _error.ChessError) {
							continue;
						}
						throw err;
					}
				}
			} catch (err) {
				_didIteratorError8 = true;
				_iteratorError8 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion8 && _iterator8.return) {
						_iterator8.return();
					}
				} finally {
					if (_didIteratorError8) {
						throw _iteratorError8;
					}
				}
			}

			return true;
		}
	}, {
		key: 'is50MoveDraw',
		value: function is50MoveDraw() {
			return this.halfmoveClock.count >= 50 * 2;
		}
	}, {
		key: 'isCheckmatePossible',
		value: function isCheckmatePossible() {
			var pieces = this.all();
			var kings = pieces.filter(function (piece) {
				return piece.brand === _brands.KING;
			});
			var nonKings = pieces.filter(function (piece) {
				return piece.brand !== _brands.KING;
			});
			if (
			// There is an illegal number of Kings on the board:
			kings.length !== 2 ||
			// Bare kings:
			pieces.length === 2 ||
			// King + Knight vs. King
			pieces.length === 3 && nonKings[0].brand === KNIGHT ||
			// same-colored bishop hijinx:
			nonKings.every(function (_ref2) {
				var brand = _ref2.brand;
				return brand === BISHOP;
			}) && (nonKings.every(function (piece) {
				return squareColor(position.pieceCoords(piece)) === _brands.LIGHT;
			}) || nonKings.every(function (piece) {
				return squareColor(position.pieceCoords(piece)) === _brands.DARK;
			}))) {
				return false;
			}
			return true;
		}
	}, {
		key: 'tryMovePiece',
		value: function tryMovePiece(piece, target) {
			try {
				return this.movePiece(piece, target);
			} catch (err) {
				if (err instanceof _error.ChessError) {
					return this;
				}
				throw err;
			}
		}
	}, {
		key: 'movePiece',
		value: function movePiece(piece, target) {
			if (target == null || piece == null) {
				throw new Error("Argument error");
			}

			var _EnPassantTarget$capt = _eptarget.EnPassantTarget.capturablePiece(this, piece, target),
			    capturePiece = _EnPassantTarget$capt.capturePiece,
			    captureTarget = _EnPassantTarget$capt.captureTarget,
			    isEnPassant = _EnPassantTarget$capt.isEnPassant;

			if (!_mobility.Mobility.isLegal({
				position: this,
				piece: piece,
				target: target,
				capturePiece: capturePiece
			})) {
				throw new _error.MobilityError();
			}

			var castling = _castling.Castling.analyze(this, piece, target);

			var position = this.beget({
				activeColor: (0, _util.oppositeColor)(this.activeColor),
				castling: castling,
				enPassantTarget: _eptarget.EnPassantTarget.analyze(this, piece, target),
				halfmoveClock: _halfmoveclock.HalfmoveClock.analyze(this, piece, target),
				fullmoveCounter:
				// Increment the fullmove counter for each Black move:
				this.activeColor === _brands.BLACK ? this.fullmoveCounter + 1 : this.fullmoveCounter,
				board: this.board.map(function (p, square) {
					if ( // it is...
					// ...the square vacated by the piece:
					p === piece ||
					// ...a pawn just captured en passant:
					isEnPassant && square.equal(captureTarget) ||
					// ...the square vacated by the rook during castling:
					p && p === castling.rook) {
						return null;
					}
					if (castling.square && square.equal(castling.square)) {
						// it is the target square for the rook during castling.
						return castling.rook;
					}
					if (square.equal(target)) {
						// it is the target square for the piece
						return piece;
					}
					return p;
				})
			});
			if (position.isCheck(this.activeColor)) {
				// this move is illegal, because it would put the king in check!
				throw new _error.CheckError();
			}
			return position;
		}
	}, {
		key: 'promote',
		value: function promote(prize) {
			var _this = this;

			if (this.promotionSquare == null) {
				throw new _error.PromotionError();
			}
			return this.beget({
				board: this.board.map(function (p, square) {
					return (
						// replace the promoted pawn with the new piece:
						square.equal(_this.promotionSquare) ? prize : p
					);
				}),
				// that we we've promoted, unset the promotion square.
				promotionSquare: null
			});
		}
	}, {
		key: 'move',
		value: function move(notation) {
			var _Algebraic$parse = _algebraic.Algebraic.parse(notation, this),
			    piece = _Algebraic$parse.piece,
			    target = _Algebraic$parse.target,
			    promotionPrize = _Algebraic$parse.promotionPrize;

			var position = this.movePiece(piece, target);
			if (promotionPrize != null) {
				return position.promote(promotionPrize);
			}
			return position;
		}
	}, {
		key: 'files',
		get: function get() {
			return this.board.files;
		}
	}, {
		key: 'ranks',
		get: function get() {
			return this.board.ranks;
		}
	}]);

	return Position;
}();