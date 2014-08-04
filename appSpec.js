(function(){
	describe('Tic-Tac-Toe', function(){
		beforeEach(app.reset);

		it('should have method for accessing coordinates', function(){
			expect(typeof app.get).toBe('function');
		});

		it('should have a method for setting coordinates', function(){
			expect(typeof app.set).toBe('function');
		});

		describe('setter method', function(){
			describe('row access', function(){
				it('should not be allowed over 2', function(){
					expect(function(){
						app.set(3, 0, app.X);
					}).toThrow();
				});

				it('should not be allowed below 0', function(){
					expect(function(){
						app.set(-1, 0, app.X);
					}).toThrow();
				});

				it('should allow between 0 and 2', function(){
					expect(function(){
						app.set(0, 0, app.X);
					}).not.toThrow();
				});
			});

			describe('column access', function(){
				it('should not be allowed over 2', function(){
					expect(function(){
						app.set(0, 3, app.X);
					}).toThrow();
				});

				it('should not be allowed below 0', function(){
					expect(function(){
						app.set(0, -1, app.X);
					}).toThrow();
				});

				it('should allow between 0 and 2', function(){
					expect(function(){
						app.set(0, 0, app.X);
					}).not.toThrow();
				});
			});
		});


		describe('getter method', function(){
			describe('row access', function(){
				it('should not be allowed over 2', function(){
					expect(function(){
						app.get(3, 0);
					}).toThrow();
				});

				it('should not be allowed below 0', function(){
					expect(function(){
						app.get(-1, 0);
					}).toThrow();
				});

				it('should allow between 0 and 2', function(){
					expect(function(){
						app.set(0, 0);
					}).not.toThrow();
				});
			});

			describe('column access', function(){
				it('should not be allowed over 2', function(){
					expect(function(){
						app.get(0, 3);
					}).toThrow();
				});

				it('should not be allowed below 0', function(){
					expect(function(){
						app.get(0, -1);
					}).toThrow();
				});

				it('should allow between 0 and 2', function(){
					expect(function(){
						app.get(0, 0);
					}).not.toThrow();
				});

				it('should retrieve null in the initial state', function(){
					expect(app.get(0,0)).toBe(null);
				});

				it('should return what was set by the setter', function(){
					app.set(0,0,app.X);

					expect(app.get(0,0)).toBe(app.X);
				})
			});
		});

		describe('turns', function(){
			it("should start as X's turn", function(){
				expect(app.turn()).toBe(app.X);
			});

			it("should set the current players token when they take their turn", function(){
				app.turn(0,0);

				expect(app.get(0,0)).toBe(app.X);
			});

			it("should return the new players turn once a turn is taken", function(){
				expect(app.turn(0,0)).toBe(app.O);
			});

			it("should alternate turns", function(){
				app.turn(0,0);
				app.turn(0,1);

				expect(app.get(0,1)).toBe(app.O);
			});

			it("should not allow moving where there has been a move already", function(){
				app.turn(0,0);

				expect(function(){
					app.turn(0,0);
				}).toThrow();
			});
		});

		describe("winning", function(){
			it("should not be a win in the initial state", function(){
				expect(app.winning()).toBe(undefined);
			});

			it("should be a win when you get three in a row vertically", function(){
				app.set(0,0, app.X);
				app.set(0,1, app.X);
				app.set(0,2, app.X);

				expect(app.winning()).toBe(app.X);
			});

			it("should be a win when you get three in a row horizontally", function(){
				app.set(0,1, app.O);
				app.set(1,1, app.O);
				app.set(2,1, app.O);

				expect(app.winning()).toBe(app.O);
			});

			it("should be a win when you get three in a row diagonally", function(){
				app.set(0,0, app.O);
				app.set(1,1, app.O);
				app.set(2,2, app.O);

				expect(app.winning()).toBe(app.O);
			});

			it("should be a win when you get three in a row diagonally the other way", function(){
				app.set(0,2, app.O);
				app.set(1,1, app.O);
				app.set(2,0, app.O);

				expect(app.winning()).toBe(app.O);
			});
		});
	});
})();