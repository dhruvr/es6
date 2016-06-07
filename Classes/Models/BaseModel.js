class BaseModel {
    constructor() {
        this.endpoint = '/api/1.0/data'
    }

    get() {
        return new Promise(
            function(resolve) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        resolve(xhttp.responseText);
                    }
                };
                xhttp.open("GET", "http://memebuild.com"+this.endpoint, true);
                xhttp.send();
            }.bind(this)
        )
    }
}

module.exports = BaseModel;