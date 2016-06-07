var BaseModel = require('./BaseModel.js');

class DataModel extends BaseModel {
    constructor() {
        super();
        this.endpoint = '/api/1.0/getRecentMemes?limit=90&api-key=U4rvFQNiox';
    }
}

module.exports = DataModel;