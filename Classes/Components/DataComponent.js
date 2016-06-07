var BaseComponent = require('./BaseComponent.js');
var DataModel = require('../Models/DataModel.js');

class DataComponent extends BaseComponent {

    constructor() {
        super();
        this.model = new DataModel();
        this.data = {};
        this.container = document.getElementById('app');
        this.getData();
        this.saveData = {};
    };

    getData() {
        this.model.get().then(function(data) {
            data = JSON.parse(data);
            this.saveData = data;
            this.populateData(data);
        }.bind(this));
    }

    populateData(data) {
        this.data = data;
        this.container.innerHTML = '';
        for(var i = 0; i < data.length; i++) {
            var template = this.dataTemplate(data[i].top_text+data[i].bottom_text, data[i].id, data[i].file);
            this.bindClick(template);
            this.container.appendChild(template);
        }
    }

    dataTemplate(name,id,file) {
        var div = document.createElement("div");
        var node = document.createTextNode(name);
        div.setAttribute('id', id);
        div.setAttribute('class', 'item');
        div.appendChild(node);
        var img = document.createElement("img");
        img.setAttribute('src', 'https://s3-us-west-2.amazonaws.com/memebuilder/uploads/'+file+'.jpg');
        div.appendChild(img);
        return div;
    }

    bindClick(div) {
        div.addEventListener("click", this.handleClick, false);
    }

    handleClick(event) {
        alert(event.target.id);
        console.log(event);
    }

}

module.exports = DataComponent;