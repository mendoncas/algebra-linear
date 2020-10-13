class LinearAlgebra {
  public transpose(matrix: Matrix) {
    if (!(matrix instanceof Matrix))
      throw "a entrada da função deve ser uma mariz";
    let newMatrix = new Matrix(matrix.cols, matrix.rows);
    for (let i = 1; i <= newMatrix.rows; i++) {
      for (let j = 1; j <= newMatrix.cols; j++) {
        newMatrix.set(i, j, matrix.get(j, i));
      }
    }

    return newMatrix;
  }

  public plus(a: Matrix, b: Matrix) {
    if (!(a instanceof Matrix && b instanceof Matrix))
      throw "ambas as entradas da função devem ser matrizes";
    if (!(a.rows == b.rows && b.cols == a.cols))
      throw "as matrizes são incompatíveis";

    let c = new Matrix(a.rows, a.cols);

    for (let i = 1; i <= c.rows; i++) {
      for (let j = 1; j <= c.cols; j++) {
        c.set(i, j, a.get(i, j) + b.get(i, j));
      }
    }

    return c;
  }

  //multiplica duas matrizes do mesmo tamanho, ou um escalar por uma matriz
  public times(a: any, b: Matrix) {
    if (typeof b != "object" || !(b instanceof Matrix)) {
      throw "o segundo parâmetro deve ser uma matriz";
    }

    let c = new Matrix(b.rows, b.cols);

    if (typeof a == "object" && a instanceof Matrix) {
      if (!(a.rows == b.rows && b.cols == a.cols)) {
        throw "as matrizes são incompatíveis";
      }

      for (let i = 1; i <= c.rows; i++) {
        for (let j = 1; j <= c.cols; j++) {
          c.set(i, j, a.get(i, j) * b.get(i, j));
        }
      }
    } else if (typeof a == "number") {
      for (let i = 1; i <= c.rows; i++) {
        for (let j = 1; j <= c.cols; j++) {
          c.set(i, j, a * b.get(i, j));
        }
      }
    } else {
      throw "o primeiro parâmetro deve ser um número ou objeto tipo Matrix";
    }

    return c;
  }

  public div(a: Matrix, b: Matrix) {
    if (
      typeof b != "object" ||
      !(b instanceof Matrix) ||
      typeof a != "object" ||
      !(a instanceof Matrix)
    ) {
      throw "ambos os parãmetros devem ser objetos do tipo Matrix";
    }
    if (!(a.rows == b.rows && b.cols == a.cols)) {
      throw "as matrizes são incompatíveis";
    }

    for (let i = 0; i < b.values.length; i++)
      if (b.values[i] == 0)
        throw "a matriz b possui pelo menos 1 elemento nulo";

    let c = new Matrix(b.rows, b.cols);

    for (let i = 1; i <= c.rows; i++) {
      for (let j = 1; j <= c.cols; j++) {
        c.set(i, j, a.get(i, j) / b.get(i, j));
      }
    }

    return c;
  }

  public dot(a: Matrix, b: Matrix) {
    if (!(a instanceof Matrix && b instanceof Matrix))
      throw "ambos os parâmetros devem ser matrizes!";
    if (!(a.cols == b.rows))
      throw "o número de colunas da primeira matriz deve ser igual ao da segunda";

    let c = new Matrix(a.rows, b.cols);
    for (let i = 1; i <= c.rows; i++) {
      for (let j = 1; j <= c.cols; j++) {
        let cij = 0;
        for (let k = 1; k <= a.cols; k++) {
          cij += a.get(i, k) * b.get(k, j);
        }
        c.set(i, j, cij);
      }
    }
    return c;
  }

  //multiplica uma linha por uma constante
  private multRow(a: Matrix, row: number, x: number) {
    for (let i = 1; i <= a.cols; i++) a.set(row, i, a.get(row, i) * x);
  }

  //substitui uma linha pelo produto de uma outra linha multiplicada por uma constante
  private sumRow(a: Matrix, rowX: number, rowY: number, cons: number) {
    for (let i = 1; i <= a.cols; i++)
      a.set(rowY, i, a.get(rowX, i) * cons + a.get(rowY, i));
  }

  public solve(a: Matrix) {
    if (!(a instanceof Matrix))
      throw "a entrada da função deve ser uma matriz!";
    if (!(a.rows == a.cols - 1))
      throw "formato de matriz inváido! deve ser utilizada uma matriz NxN+1";
    for (let pivot = 1; pivot < a.cols; pivot++) {
      for (let i = pivot + 1; i <= a.rows; i++) {
        let val = -(a.get(i, pivot) / a.get(pivot, pivot));

        this.sumRow(a, pivot, i, val);
      }
    }

    for (let row = 1; row <= a.rows; row++) {
      let val = 1 / a.get(row, row);

      this.multRow(a, row, val);
    }

    for (let pivot = 2; pivot < a.cols; pivot++) {
      for (let i = pivot - 1; i >= 1; i--) {
        let val = -(a.get(i, pivot) / a.get(pivot, pivot));
        this.sumRow(a, pivot, i, val);
      }
    }
  }
}
