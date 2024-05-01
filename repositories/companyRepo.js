const sequelize = require('../config/dbConfig').sequelize;
var DataTypes = require('sequelize/lib/data-types');

const Company = require('../models/companies')(sequelize, DataTypes);

//create Company
module.exports.create = (data, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {}

        //if trunsaction exist
        if (t != null) options.transaction = t;

        Company.create(data, options).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//find one Company
module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        Company.findOne({ where: where }).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//Company count
module.exports.count = (where) => {
    return new Promise((resolve, reject) => {
        Company.count({ where: where }).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//update Company
module.exports.update = (where, data, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {
            where: where
        }

        //if trunsaction exist
        if (t != null) options.transaction = t;

        Company.update(data, options).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//find All Company
module.exports.findAll = (where) => {
    return new Promise((resolve, reject) => {
        Company.findAll({ where: where }).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//delete Company
module.exports.delete = (where, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {
            where: where
        }

        //if trunsaction exist
        if (t != null) options.transaction = t;

        Company.destroy(options).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findAndCountAll = (where, data) => {
    return new Promise((resolve, reject) => {
        Company.findAndCountAll({ 
            where: where,
            limit: data?.limit,
            offset: data?.offset,
        }).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}