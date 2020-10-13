class Matrix {
  rows: number;
  cols: number;
  values: number[];

  constructor(rows: number, cols: number, values?: number[]) {
    this.rows = rows;
    this.cols = cols;

    if (values == undefined) {
      this.values = [];
      for (let i = 0; i < this.rows * this.cols; i++) {
        this.values.push(0);
      }
    } else {
      if (values.length == this.rows * this.cols) {
        this.values = values;
      } else
        throw "quantidade de elementos não coreesponde ao tamanho da matriz";
    }
  }

  public static clone(origem: Matrix) {
    return new Matrix(origem.rows, origem.cols, origem.values.slice());
  }

  private map(line: number, col: number) {
     if(line<1 || line>this.rows) throw "o índice da linha é incompatível"
     if(col<1 || col>this.cols) throw "o índice da coluna é incompatível"

    return col - 1 + (line - 1) * this.cols;
  }

  public get(line: number, col: number) {
    return this.values[this.map(line, col)];
  }

  public set(line: number, col: number, value: number) {
    this.values[this.map(line, col)] = value;
  }
}
