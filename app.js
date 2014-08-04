var app = (function(){
	var X = 'x', Y = 'y';

	var state, turn = X;

	function resetState(){
		state = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];

		turn = X;
	}

	function checkBounds(x, y){
		if(x > 2 || x < 0 || y > 2 || y < 0){
			throw "Out of bounds!";
		}
	}

	resetState();

	return {
		get: function(x, y){
			checkBounds(x, y);

			return state[y][x];
		},
		set: function(x, y, value){
			checkBounds(x, y);

			state[y][x] = value;
		},
		turn: function(x, y){
			if(x === undefined || y === undefined){
				return turn;
			}

			if(this.get(x, y)){
				throw "Already taken!";
			}

			this.set(x, y, turn);

			turn = (turn === X ? Y : X);

			return turn;
		},
		reset: resetState,
		X: X,
		Y: Y
	};
})();