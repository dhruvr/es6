var BaseComponent = require('./BaseComponent.js');
var DataModel = require('../Models/DataModel.js');
var DataComponent = require('./DataComponent.js');

class SearchComponent extends BaseComponent {

    constructor() {
        super();
        this.container = document.getElementById('search');
        this.buildForm();
        this.bindChange();
        this.data = new DataComponent();
    };

    buildForm() {
        var html = '<form>' +
            '<input type="text" id="search-field">' +
            '</form>';

        this.container.innerHTML = html;
    };

    bindChange() {
        document.getElementById('search-field').addEventListener('input', function(e) {
            this.handleChange(e)
        }.bind(this), false);
    };

    mapOverData(data) {
        console.log(data);
        var arr = [];
        this.data.saveData.map(function(item) {
            var txt = item.bottom_text+item.top_text;
            if(txt !== 0 && txt.indexOf(data) > -1) {
                arr.push(item);
            }
        });

        return arr;
    };

    handleChange(event) {
        this.data.populateData(this.mapOverData(event.target.value));
    };

}

module.exports = SearchComponent;