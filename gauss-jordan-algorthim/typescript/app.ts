const la = new LinearAlgebra();
let input = document.querySelector("input");
input.addEventListener("change", function () {
  let files = input.files;
  if (files.length == 0) return;

  const file = files[0];

  const reader = new FileReader();
  
  reader.onload = function (e) {
    let file = e.target.result;
    let lines = file.split(/\r\n|\n/);
    let matrz = lines[21].split(" ");
    let values = [];

    for (let i = 22; i < lines.length - 1; i++) {
      let vet = lines[i].split(" ");
      values.push(parseInt(vet[2]));
    }

    //    console.log(values)

    let matriz = new Matrix(parseInt(matrz[0]), parseInt(matrz[1]), values);
    let vetor = [];
    let a = performance.now();
    la.solve(matriz);
    let b = performance.now();
    console.log("esse é o vetor resultante: ");

    for (let i = 1; i <= matriz.rows; i++)
      vetor.push(matriz.get(i, matriz.cols));

    let vector = new Vector(matriz.rows, vetor);
    console.log(vector);
    // console.log(matriz)
    console.log(`resolvido em ${b - a} milisegundos!`);
  };

  reader.readAsText(file);
});
