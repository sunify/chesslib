'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.last = exports.partition = exports.isOdd = exports.isEven = exports.squareColor = exports.oppositeColor = exports.squareCoordsByName = exports.squareCoords = exports.rankIndex = exports.fileIndex = exports.rankName = exports.fileName = exports.squareName = exports.identity = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.entries = entries;
exports.bounded = bounded;

var _brands = require('./brands');

var _point = require('./point');

var _marked = [entries, bounded].map(regeneratorRuntime.mark);

var isNumber = require('lodash.isnumber');

function entries(collection) {
	var k;
	return regeneratorRuntime.wrap(function entries$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.t0 = regeneratorRuntime.keys(collection);

				case 1:
					if ((_context.t1 = _context.t0()).done) {
						_context.next = 7;
						break;
					}

					k = _context.t1.value;
					_context.next = 5;
					return [collection[k], k];

				case 5:
					_context.next = 1;
					break;

				case 7:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}

function bounded(_ref, iterator) {
	var files = _ref.files,
	    ranks = _ref.ranks;

	var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pt;

	return regeneratorRuntime.wrap(function bounded$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					_context2.prev = 3;
					_iterator = iterator[Symbol.iterator]();

				case 5:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						_context2.next = 13;
						break;
					}

					pt = _step.value;

					if (!(new _point.Point(0, 0).lte(pt) && new _point.Point(files, ranks).gt(pt))) {
						_context2.next = 10;
						break;
					}

					_context2.next = 10;
					return pt;

				case 10:
					_iteratorNormalCompletion = true;
					_context2.next = 5;
					break;

				case 13:
					_context2.next = 19;
					break;

				case 15:
					_context2.prev = 15;
					_context2.t0 = _context2['catch'](3);
					_didIteratorError = true;
					_iteratorError = _context2.t0;

				case 19:
					_context2.prev = 19;
					_context2.prev = 20;

					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}

				case 22:
					_context2.prev = 22;

					if (!_didIteratorError) {
						_context2.next = 25;
						break;
					}

					throw _iteratorError;

				case 25:
					return _context2.finish(22);

				case 26:
					return _context2.finish(19);

				case 27:
				case 'end':
					return _context2.stop();
			}
		}
	}, _marked[1], this, [[3, 15, 19, 27], [20,, 22, 26]]);
}

var identity = exports.identity = function identity(it) {
	return it;
};

var squareName = exports.squareName = function squareName(_ref2) {
	var file = _ref2.x,
	    rank = _ref2.y;
	return '' + fileName(file) + rankName(rank);
};

var fileName = exports.fileName = function fileName(file) {
	return 'abcdefgh'.charAt(file);
};

var rankName = exports.rankName = function rankName(rank) {
	var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
	return String(top - rank);
};

var fileIndex = exports.fileIndex = function fileIndex(fileName) {
	return 'abcdefgh'.indexOf(fileName);
};

var rankIndex = exports.rankIndex = function rankIndex(rankName) {
	var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
	return top - Number(rankName);
};

var squareCoords = exports.squareCoords = function squareCoords(squareName) {
	var _squareName$split = squareName.split(''),
	    _squareName$split2 = _slicedToArray(_squareName$split, 2),
	    fileName = _squareName$split2[0],
	    rankName = _squareName$split2[1];

	return squareCoordsByName(fileName, rankName);
};

var squareCoordsByName = exports.squareCoordsByName = function squareCoordsByName(fileName, rankName) {
	return new _point.Point(fileIndex(fileName), rankIndex(rankName));
};

var oppositeColor = exports.oppositeColor = function oppositeColor(color) {
	return color === _brands.WHITE ? _brands.BLACK : _brands.WHITE;
};

var squareColor = exports.squareColor = function squareColor(_ref3) {
	var x = _ref3.x,
	    y = _ref3.y;
	return isEven(x) && isEven(y) || isOdd(x) && isOdd(y) ? _brands.LIGHT : _brands.DARK;
};

var isEven = exports.isEven = function isEven(n) {
	return isNumber(n) && n % 2 === 0;
};

var isOdd = exports.isOdd = function isOdd(n) {
	return !isEven(n);
};

var partition = exports.partition = function partition(list, fn) {
	var result = [[], []];
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var item = _step2.value;

			result[+!fn(item)].push(item);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return result;
};

var last = exports.last = function last(arr) {
	return arr[arr.length - 1];
};