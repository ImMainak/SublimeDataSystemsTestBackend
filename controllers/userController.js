// ################################ Repositories ################################ //
const userRepo = require('../repositories/userRepo');
const cityRepo = require('../repositories/cityRepo');
const companyRepo = require('../repositories/companyRepo');

// ################################ Response Messages ################################ //
const responseMessages = require('../ResponseMessages');

/*
|------------------------------------------------ 
| API name          :  userList
| Response          :  Respective response message in JSON format
| Logic             :  User List
| Request URL       :  BASE_URL/api/user_list
| Request method    :  GET
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.userList = (req, res) => {
    (async () => {
        let purpose = "User List";
        try {
            let query = req.query;
            let where = {};
            let data = {};
            let page = query.page ? parseInt(query.page) : 1;
            data.limit = 10;
            data.offset = data.limit ? data.limit * (page - 1) : null;

            if (query?.search) {
                let cityList = await cityRepo.findAll({ name: { $like: `%${query.search}%` } });
                where = {
                    $or: [
                        { first_name: { $like: `%${query.search}%` } },
                        { last_name: { $like: `%${query.search}%` } },
                        { city: { $in: cityList.map(m => m.id) } }
                    ]
                }
            }

            let userList = await userRepo.findAndCountAll(where, data);
            let companyList = await companyRepo.findAll({ id: { $in: userList.rows.map(m => m.company) } });
            let cityList = await cityRepo.findAll({ id: { $in: userList.rows.map(m => m.city) } });
            
            userList.rows.forEach(element => {
                element.city = cityList[cityList.findIndex(f => f.id == element.city)].name;
                element.company = companyList[companyList.findIndex(f => f.id == element.company)].name;
            });

            return res.send({
                status: 200,
                msg: responseMessages.userlistFetch,
                data: {
                    data: userList.rows,
                    total: userList.count
                },
                purpose: purpose
            })

        } catch (err) {
            console.log("User List ERROR, ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  userDetails
| Response          :  Respective response message in JSON format
| Logic             :  User Details
| Request URL       :  BASE_URL/api/user_details/:id
| Request method    :  GET
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.userDetails = (req, res) => {
    (async () => {
        let purpose = "User Details";
        try {
            let userID = req.params.id;

            let userDetails = await userRepo.findOne({ id: userID });

            if (!userDetails)
                return res.send({
                    status: 404,
                    msg: responseMessages.userNotFound,
                    data: {},
                    purpose: purpose
                })

            let companyDetails = await companyRepo.findOne({ id: userDetails.company });
            let cityDetails = await cityRepo.findOne({ id: userDetails.city });
            
            userDetails.city = cityDetails.name;
            userDetails.company = companyDetails.name;

            return res.send({
                status: 200,
                msg: responseMessages.userlistFetch,
                data: userDetails,
                purpose: purpose
            })

        } catch (err) {
            console.log("User Details ERROR, ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  cityWithUser
| Response          :  Respective response message in JSON format
| Logic             :  Unique Cities With User Count
| Request URL       :  BASE_URL/api/city_with_user_count
| Request method    :  GET
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.cityWithUser = (req, res) => {
    (async () => {
        let purpose = "Unique Cities With User Count";
        try {
            let cityIDList = await userRepo.distinctCity({});
            let cityDetails = await cityRepo.findCityWithUser({ id: cityIDList.map(m => m.city) });

            return res.send({
                status: 200,
                msg: responseMessages.uniqueCityWithUserCount,
                data: cityDetails,
                purpose: purpose
            })

        } catch (err) {
            console.log("Unique Cities With User Count ERROR, ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}