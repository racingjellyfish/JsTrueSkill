var Matrix = require('sylvester').Matrix;
var TestUtil = require('../TestUtil');

var ERROR_TOLERANCE = 0.0000000000001;
var ERROR_TOLERANCE_LARGE = 0.000000001;

exports.testTwoByTwoDeterminant = function(test) {
	var matrix0 = Matrix.create([
			[1, 2],
			[3, 4]
		]);

	var expected = -2;
	TestUtil.equalsWithTolerance(test, matrix0.determinant(), expected, ERROR_TOLERANCE, "Expected 2x2 matrix0 determinant to be " + expected);

	var matrix1 = Matrix.create([
			[3, 4],
			[5, 6]
		]);

	expected = -2;
	TestUtil.equalsWithTolerance(test, matrix1.determinant(), expected, ERROR_TOLERANCE, "Expected 2x2 matrix1 determinant to be " + expected);

	var matrix2 = Matrix.create([
			[1, 1],
			[1, 1]
		]);

	expected = 0;
	TestUtil.equalsWithTolerance(test, matrix2.determinant(), expected, ERROR_TOLERANCE, "Expected 2x2 matrix2 determinant to be " + expected);

	var matrix3 = Matrix.create([
			[12, 15],
			[17, 21]
		]);

	expected = (12 * 21 - 15 * 17);
	TestUtil.equalsWithTolerance(test, matrix3.determinant(), expected, ERROR_TOLERANCE, "Expected 2x2 matrix3 determinant to be " + expected);

	test.done();
};

exports.testThreeByThreeDeterminant = function(test) {
	var matrix0 = Matrix.create([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		]);

	var expected = 0;
	TestUtil.equalsWithTolerance(test, matrix0.determinant(), expected, ERROR_TOLERANCE, "Expected 3x3 matrix0 determinant to be " + expected);

	var matrix1 = Matrix.create([
			[3, 1, 4],
			[1, 5, 9],
			[2, 6, 5]
		]);

	// Verified against
	// http://www.wolframalpha.com/input/?i=determinant+%7B%7B3%2C1%2C4%7D%2C%7B1%2C5%2C9%7D%2C%7B2%2C6%2C5%7D%7D
	expected = -90;
	TestUtil.equalsWithTolerance(test, matrix1.determinant(), expected, ERROR_TOLERANCE, "Expected 3x3 matrix1 determinant to be " + expected);

	test.done();
};

exports.testFourByFourDeterminant = function(test) {
	var matrix0 = Matrix.create([
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 10, 11, 12],
			[13, 14, 15, 16]
		]);

	var expected = 0;
	TestUtil.equalsWithTolerance(test, matrix0.determinant(), expected, ERROR_TOLERANCE, "Expected 4x4 matrix0 determinant to be " + expected);

	var matrix1 = Matrix.create([
			[3, 1, 4, 1],
			[5, 9, 2, 6],
			[5, 3, 5, 8],
			[9, 7, 9, 3]
		]);

	// Verified against
	// http://www.wolframalpha.com/input/?i=determinant+%7B+%7B3%2C1%2C4%2C1%7D%2C+%7B5%2C9%2C2%2C6%7D%2C+%7B5%2C3%2C5%2C8%7D%2C+%7B9%2C7%2C9%2C3%7D%7D
	expected = 98;
	TestUtil.equalsWithTolerance(test, matrix1.determinant(), expected, ERROR_TOLERANCE, "Expected 4x4 matrix0 determinant to be " + expected);

	test.done();
};

exports.testEightByEightDeterminant = function(test) {
	var matrix0 = Matrix.create([
			[1, 2, 3, 4, 5, 6, 7, 8],
			[9, 10, 11, 12, 13, 14, 15, 16],
			[17, 18, 19, 20, 21, 22, 23, 24],
			[25, 26, 27, 28, 29, 30, 31, 32],
			[33, 34, 35, 36, 37, 38, 39, 40],
			[41, 42, 32, 44, 45, 46, 47, 48],
			[49, 50, 51, 52, 53, 54, 55, 56],
			[57, 58, 59, 60, 61, 62, 63, 64]
		]);

	var expected = 0;
	TestUtil.equalsWithTolerance(test, matrix0.determinant(), expected, ERROR_TOLERANCE, "Expected 8x8 matrix0 determinant to be " + expected);

	var matrix1 = Matrix.create([
			[3, 1, 4, 1, 5, 9, 2, 6],
			[5, 3, 5, 8, 9, 7, 9, 3],
			[2, 3, 8, 4, 6, 2, 6, 4],
			[3, 3, 8, 3, 2, 7, 9, 5],
			[0, 2, 8, 8, 4, 1, 9, 7],
			[1, 6, 9, 3, 9, 9, 3, 7],
			[5, 1, 0, 5, 8, 2, 0, 9],
			[7, 4, 9, 4, 4, 5, 9, 2]
		]);

	// Verified against
	// http://www.wolframalpha.com/input/?i=det+%7B%7B3%2C1%2C4%2C1%2C5%2C9%2C2%2C6%7D%2C%7B5%2C3%2C5%2C8%2C9%2C7%2C9%2C3%7D%2C%7B2%2C3%2C8%2C4%2C6%2C2%2C6%2C4%7D%2C%7B3%2C3%2C8%2C3%2C2%2C7%2C9%2C5%7D%2C%7B0%2C2%2C8%2C8%2C4%2C1%2C9%2C7%7D%2C%7B1%2C6%2C9%2C3%2C9%2C9%2C3%2C7%7D%2C%7B5%2C1%2C0%2C5%2C8%2C2%2C0%2C9%7D%2C%7B7%2C4%2C9%2C4%2C4%2C5%2C9%2C2%7D%7D
	// And Mathematica, but sylvester introduces roundoff error by using ?LUDecomposition?
	expected = 1378143;
	TestUtil.equalsWithTolerance(test, matrix1.determinant(), expected, ERROR_TOLERANCE_LARGE, "Expected 8x8 matrix0 determinant to be " + expected);

	test.done();
};

exports.testEquals = function(test) {
	var matrix0 = Matrix.create([
			[1, 2],
			[3, 4]
		]);

	var matrix1 = Matrix.create([
			[1, 2],
			[3, 4]
		]);

	test.ok(matrix0.eql(matrix1), "Expected matrix0 == matrix1");

	matrix0 = Matrix.create([
			[1, 2, 3],
			[1, 2, 3],
			[4, 5, 6]
		]);

	matrix1 = Matrix.create([
			[1, 2, 3],
			[1, 2, 3],
			[4, 5, 6]
		]);

	test.ok(matrix0.eql(matrix1), "Expected matrix0 == matrix1");

	matrix2 = Matrix.create([
			[1, 1, 4],
			[2, 2, 5],
			[3, 3, 6]
		]);

	test.ok(matrix0.eql(matrix2.transpose()), "Expected matrix0 == transpose(matrix2)");

	test.done();
};

exports.testInverse = function(test) {
	// see http://www.mathwords.com/i/inverse_of_a_SimpleMatrix.htm
	var matrix0 = Matrix.create([
			[4, 3],
			[3, 2]
		]);

	var matrix1 = Matrix.create([
			[-2, 3],
			[3, -4]
		]);

	var actual = matrix0.inverse();
	var expected = matrix1;
	test.ok(actual.eql(expected), ERROR_TOLERANCE,
		"Expected 2x2 matrix0.inverse() to be " + expected.inspect());

	actual = matrix0.multiply(matrix0.inverse());
	expected = Matrix.I(2);
	test.ok(actual.eql(expected), ERROR_TOLERANCE,
		"Expected 2x2 matrix0.multiply(matrix0.inverse()) to be " +
		expected.inspect());

	matrix0 = Matrix.create([
			[1, 2, 3],
			[0, 4, 5],
			[1, 0, 6]
		]);

	matrix1 = Matrix.create([
			[24, -12, -2],
			[5, 3, -5],
			[-4, 2, 4]
		]).multiply(1.0 / 22.0);

	actual = matrix0.inverse();
	expected = matrix1;
	test.ok(actual.eql(expected), ERROR_TOLERANCE,
		"Expected 3x3 matrix0.inverse() to be " + expected.inspect());

	actual = matrix0.multiply(matrix0.inverse());
	expected = Matrix.I(3);
	test.ok(actual.eql(expected), ERROR_TOLERANCE,
		"Expected 3x3 matrix0.multiply(matrix0.inverse()) to be " +
		expected.inspect());

	test.done();
};
