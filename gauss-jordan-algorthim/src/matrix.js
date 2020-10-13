var Matrix = /** @class */ (function () {
  function Matrix(rows, cols, values) {
    this.rows = rows;
    this.cols = cols;
    if (values == undefined) {
      this.values = [];
      for (var i = 0; i < this.rows * this.cols; i++) {
        this.values.push(0);
      }
    } else {
      if (values.length == this.rows * this.cols) {
        this.values = values;
      } else
        throw "quantidade de elementos não coreesponde ao tamanho da matriz";
    }
  }
  Matrix.clone = function (origem) {
    return new Matrix(origem.rows, origem.cols, origem.values.slice());
  };
  Matrix.prototype.map = function (line, col) {
    if (line < 1 || line > this.rows) throw "o índice da linha é incompatível";
    if (col < 1 || col > this.cols) throw "o índice da coluna é incompatível";
    return col - 1 + (line - 1) * this.cols;
  };
  Matrix.prototype.get = function (line, col) {
    return this.values[this.map(line, col)];
  };
  Matrix.prototype.set = function (line, col, value) {
    this.values[this.map(line, col)] = value;
  };
  return Matrix;
})();
