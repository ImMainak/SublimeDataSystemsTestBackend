const sequelize = require('../config/dbConfig').sequelize;
var DataTypes = require('sequelize/lib/data-types');

const City = require('../models/cities')(sequelize, DataTypes);

//create City
module.exports.create = (data, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {}

        //if trunsaction exist
        if (t != null) options.transaction = t;

        City.create(data, options).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//find one City
module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        City.findOne({ where: where }).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//City count
module.exports.count = (where) => {
    return new Promise((resolve, reject) => {
        City.count({ where: where }).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//update City
module.exports.update = (where, data, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {
            where: where
        }

        //if trunsaction exist
        if (t != null) options.transaction = t;

        City.update(data, options).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//find All City
module.exports.findAll = (where) => {
    return new Promise((resolve, reject) => {
        City.findAll({ where: where }).then(result => {
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

        City.destroy(options).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findAndCountAll = (where, data) => {
    return new Promise((resolve, reject) => {
        City.findAndCountAll({ 
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

//find All City With User Count
module.exports.findCityWithUser = (where) => {
    return new Promise((resolve, reject) => {
        City.findAll({
            where: where,
            attributes: [ 'id', 'name', 
                [sequelize.literal(`(SELECT COUNT(id) FROM users WHERE users.city = cities.id)`), 'user_count']
            ]
        }).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}