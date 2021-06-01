var rect = {
    perimeter: (x, y) => (2 * (x + y)),
    area: (x, y) => (x * y),
};

const solveRect = (l, b) => {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    if (l <= 0 || b <= 0) {
        console.log("Rectangles should be greater than 0");
    } else {
        console.log("Area: " + rect.area(l, b));
        console.log("Perimeter: " + rect.perimeter(l, b));
    }
};

solveRect(2, 4);
solveRect(0, 5);