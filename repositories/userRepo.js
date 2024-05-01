const sequelize = require('../config/dbConfig').sequelize;
var DataTypes = require('sequelize/lib/data-types');

const User = require('../models/users')(sequelize, DataTypes);

//create user
module.exports.create = (data, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {}

        //if trunsaction exist
        if (t != null) options.transaction = t;

        User.create(data, options).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//find one user
module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        User.findOne({ where: where }).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//user count
module.exports.count = (where) => {
    return new Promise((resolve, reject) => {
        User.count({ where: where }).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//update user
module.exports.update = (where, data, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {
            where: where
        }

        //if trunsaction exist
        if (t != null) options.transaction = t;

        User.update(data, options).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//find All user
module.exports.findAll = (where) => {
    return new Promise((resolve, reject) => {
        User.findAll({ where: where }).then(result => {
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

        User.destroy(options).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findAndCountAll = (where, data) => {
    return new Promise((resolve, reject) => {
        User.findAndCountAll({ 
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

//find All distinct city id
module.exports.distinctCity = (where) => {
    return new Promise((resolve, reject) => {
        User.findAll({ 
            where: where,
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('city')), 'city'],
                'city'
            ]
        }).then(result => {
            result = JSON.parse(JSON.stringify(result));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}