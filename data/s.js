function handleErrors(response) {
    if (!response.ok) {
        console.log("An Error During Check");
        //console.log(response);
        throw new Error(response.status);
    }
    return response;
}
function toTxt(response) {
    //console.log(response.status)
    //console.log("Unpacking");
    return response.text()
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

fetch('ins')
    .then(handleErrors)
    .then(toTxt)
    .then((ins) => {
        console.log(ins);
        document.getElementById("ins").innerHTML = ins
    })