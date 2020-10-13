var la = new LinearAlgebra();
var input = document.querySelector("input");
input.addEventListener("change", function () {
    var files = input.files;
    if (files.length == 0)
        return;
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var file = e.target.result;
        var lines = file.split(/\r\n|\n/);
        var matrz = lines[21].split(" ");
        var values = [];
        for (var i = 22; i < lines.length - 1; i++) {
            var vet = lines[i].split(" ");
            values.push(parseInt(vet[2]));
        }
        //    console.log(values)
        var matriz = new Matrix(parseInt(matrz[0]), parseInt(matrz[1]), values);
        var vetor = [];
        var a = performance.now();
        la.solve(matriz);
        var b = performance.now();
        console.log("esse é o vetor resultante: ");
        for (var i = 1; i <= matriz.rows; i++)
            vetor.push(matriz.get(i, matriz.cols));
        var vector = new Vector(matriz.rows, vetor);
        console.log(vector);
        // console.log(matriz)
        console.log("resolvido em " + (b - a) + " milisegundos!");
    };
    reader.readAsText(file);
});
