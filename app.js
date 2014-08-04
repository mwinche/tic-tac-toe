var app = (function(){
	var X = 'x', O = 'o';

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

			turn = (turn === X ? O : X);

			return turn;
		},
		winning: function(){
			var diagR = undefined, diagL = undefined;

			for(var i = 0; i < 3; i++){
				var vert = undefined, horiz = undefined;

				for(var j = 0; j < 3; j++){
					vert = (vert === undefined ? state[j][i] :
						(vert === false ? false :
							(vert === state[j][i] ? vert : false)));

					horiz = (horiz === undefined ? state[i][j] :
						(horiz === false ? false :
							(horiz === state[i][j] ? horiz : false)));
				}

				if(vert){
					return vert;
				}

				if(horiz){
					return horiz;
				}	

				diagR = (diagR === undefined ? state[i][i] :
					(diagR === false ? false :
						(diagR === state[i][i] ? diagR : false)));

				diagL = (diagL === undefined ? state[i][2-i] :
					(diagL === false ? false :
						(diagL === state[i][2-i] ? diagL : false)));
			}

			if(diagR){
				return diagR;
			}

			if(diagL){
				return diagL;
			}

			return undefined;
		},
		reset: resetState,
		X: X,
		O: O
	};
})();