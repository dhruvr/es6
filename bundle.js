(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseComponent = function BaseComponent() {
    _classCallCheck(this, BaseComponent);

    this.endpoint = '/api';
};

module.exports = BaseComponent;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = require('./BaseComponent.js');
var DataModel = require('../Models/DataModel.js');

var DataComponent = function (_BaseComponent) {
    _inherits(DataComponent, _BaseComponent);

    function DataComponent() {
        _classCallCheck(this, DataComponent);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataComponent).call(this));

        _this.model = new DataModel();
        _this.data = {};
        _this.container = document.getElementById('app');
        _this.getData();
        _this.saveData = {};
        return _this;
    }

    _createClass(DataComponent, [{
        key: 'getData',
        value: function getData() {
            this.model.get().then(function (data) {
                data = JSON.parse(data);
                this.saveData = data;
                this.populateData(data);
            }.bind(this));
        }
    }, {
        key: 'populateData',
        value: function populateData(data) {
            this.data = data;
            this.container.innerHTML = '';
            for (var i = 0; i < data.length; i++) {
                var template = this.dataTemplate(data[i].top_text + data[i].bottom_text, data[i].id, data[i].file);
                this.bindClick(template);
                this.container.appendChild(template);
            }
        }
    }, {
        key: 'dataTemplate',
        value: function dataTemplate(name, id, file) {
            var div = document.createElement("div");
            var node = document.createTextNode(name);
            div.setAttribute('id', id);
            div.setAttribute('class', 'item');
            div.appendChild(node);
            var img = document.createElement("img");
            img.setAttribute('src', 'https://s3-us-west-2.amazonaws.com/memebuilder/uploads/' + file + '.jpg');
            div.appendChild(img);
            return div;
        }
    }, {
        key: 'bindClick',
        value: function bindClick(div) {
            div.addEventListener("click", this.handleClick, false);
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            alert(event.target.id);
            console.log(event);
        }
    }]);

    return DataComponent;
}(BaseComponent);

module.exports = DataComponent;

},{"../Models/DataModel.js":5,"./BaseComponent.js":1}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = require('./BaseComponent.js');
var DataModel = require('../Models/DataModel.js');
var DataComponent = require('./DataComponent.js');

var SearchComponent = function (_BaseComponent) {
    _inherits(SearchComponent, _BaseComponent);

    function SearchComponent() {
        _classCallCheck(this, SearchComponent);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SearchComponent).call(this));

        _this.container = document.getElementById('search');
        _this.buildForm();
        _this.bindChange();
        _this.data = new DataComponent();
        return _this;
    }

    _createClass(SearchComponent, [{
        key: 'buildForm',
        value: function buildForm() {
            var html = '<form>' + '<input type="text" id="search-field">' + '</form>';

            this.container.innerHTML = html;
        }
    }, {
        key: 'bindChange',
        value: function bindChange() {
            document.getElementById('search-field').addEventListener('input', function (e) {
                this.handleChange(e);
            }.bind(this), false);
        }
    }, {
        key: 'mapOverData',
        value: function mapOverData(data) {
            console.log(data);
            var arr = [];
            this.data.saveData.map(function (item) {
                var txt = item.bottom_text + item.top_text;
                if (txt !== 0 && txt.indexOf(data) > -1) {
                    arr.push(item);
                }
            });

            return arr;
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            this.data.populateData(this.mapOverData(event.target.value));
        }
    }]);

    return SearchComponent;
}(BaseComponent);

module.exports = SearchComponent;

},{"../Models/DataModel.js":5,"./BaseComponent.js":1,"./DataComponent.js":2}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseModel = function () {
    function BaseModel() {
        _classCallCheck(this, BaseModel);

        this.endpoint = '/api/1.0/data';
    }

    _createClass(BaseModel, [{
        key: "get",
        value: function get() {
            return new Promise(function (resolve) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        resolve(xhttp.responseText);
                    }
                };
                xhttp.open("GET", "http://memebuild.com" + this.endpoint, true);
                xhttp.send();
            }.bind(this));
        }
    }]);

    return BaseModel;
}();

module.exports = BaseModel;

},{}],5:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseModel = require('./BaseModel.js');

var DataModel = function (_BaseModel) {
    _inherits(DataModel, _BaseModel);

    function DataModel() {
        _classCallCheck(this, DataModel);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataModel).call(this));

        _this.endpoint = '/api/1.0/getRecentMemes?limit=90&api-key=U4rvFQNiox';
        return _this;
    }

    return DataModel;
}(BaseModel);

module.exports = DataModel;

},{"./BaseModel.js":4}],6:[function(require,module,exports){
'use strict';

var DataModel = require('./Classes/Models/DataModel.js');
var DataComponent = require('./Classes/Components/DataComponent.js');
var SearchComponent = require('./Classes/Components/SearchComponent.js');

//new DataComponent();
new SearchComponent();

},{"./Classes/Components/DataComponent.js":2,"./Classes/Components/SearchComponent.js":3,"./Classes/Models/DataModel.js":5}]},{},[6]);
