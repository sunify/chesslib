import { WHITE, BLACK } from './constants'
import { Pawn, Rook, Knight, Bishop, King, Queen } from './pieces/standard'
import { Position } from './position'

export class Fen {

	constructor(fenStr) {
		const [
			ranks,
			activeColor,
			castling,
			enPassantTarget,
			halfmoveClock,
			fullmoveClock
		] = fenStr.split(' ');
		this.position = new Position({
			arr2d: parseRanks(ranks),
			activeColor: parseActiveColor(activeColor),
			castling: castling,
			enPassantTarget: parseEPTarget(enPassantTarget),
			halfmoveClock: Number(halfmoveClock),
			fullmoveClock: Number(fullmoveClock)
		});
	}

	get fen() {
		return stringifyPosition(this.position);
	}
}

function parseRanks(ranks) {
	return ranks.split('/').map(parseRank);
}

function parseRank(rank) {
	const cells = rank.split('');
	const row = [];
	for (var i = 0, c = 0; i < 8; c++) {
		var cell = rank[c];
		if (!isNaN(Number(cell))) {
			i += Number(cell);
			continue;
		}
		var piece = createPiece(cell);
		if (piece != null) {
			row[i] = piece;
		}
		i += 1;
	}
	return row;
}

function createPiece(piece='') {
	const lowered = piece.toLowerCase();
	const options = { color: lowered === piece ? BLACK : WHITE };
	switch (lowered) {
	case 'p': return new Pawn(options);
	case 'r': return new Rook(options);
	case 'n': return new Knight(options);
	case 'b': return new Bishop(options);
	case 'k': return new King(options);
	case 'q': return new Queen(options);
	case '': return null;
	default: throw new SyntaxError('Unparseable: ' + piece);
	}
}

function parseActiveColor(activeColor) {switch (activeColor) {
	case 'w': return WHITE;
	case 'b': return BLACK;
}}

function parseEPTarget(enPassantTarget) {switch (enPassantTarget) {
	case '-': return null;
	default: return enPassantTarget;
}}

function stringifyPosition(position) {
	var str = '';
	for (var i = 0; i < 8; i++) {
		for (var j = 0, cj = 0; j < 8; j++) {
			var piece = position.getPiece(i, j);
			if (piece == null) {
				cj += 1;
				if (j === 7) {
					str += `${cj ? cj : ''}/`
				}
				continue;
			}
			str += `${cj ? cj : ''}${piece.fenEncoding}`;
			cj = 0;
		}
	}
	return [
		str,
		position.activeColor === WHITE ? 'w' : 'b',
		position.castling,
		stringifyEPTarget(position.enPassantTarget),
		String(position.halfmoveClock),
		String(position.fullmoveClock)
	].join(' ');
}

function stringifyEPTarget(enPassantTarget) {switch(enPassantTarget) {
	case null: '-';
	default: return enPassantTarget;
}}
