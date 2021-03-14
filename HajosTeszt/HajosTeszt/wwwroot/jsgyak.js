window.onload = function () {
    console.log("Betöltés");
    
    var fakto = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * fakto(n - 1)
        }
    }
    for (var sor = 0; sor  < 10; sor++) {
        var s = document.createElement("div");
        s.classList.add("sor");
        document.getElementById("pascal").appendChild(s);
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            var e = document.createElement("div");
            e.classList.add("elem");
            e.innerText = fakto(sor) / (fakto(oszlop) * fakto(sor - oszlop));
            s.appendChild(e);
            e.style.background = `rgb(0,0, ${((10 * 255) / e.innerText)})`;
        }
    }



}



