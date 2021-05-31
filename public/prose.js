
async function get(numbre) {
    fetch("http://localhost:3001/table/" + numbre).then(data => {
     window.location.replace("Pag1.ejs")
        
    }) 
}

async function readTable() {
    await fetch("http://localhost:3001/table")
        .then(response => response.json())
        .then(data => {
            var text = '';
            console.log(data)
            for (item in data) {
                text = text + data[item] + '<br/>'
            }
            console.log(text)
            document.getElementById('tabla').innerHTML = text;
        });
}

function data() {
    
    var number = document.getElementById('number').value;
    if (number > 0) {
        get(number);
    } else {
        alert('el numero debe ser mayor a cero');
    }
}