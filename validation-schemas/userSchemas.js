const Joi = require("joi");

//user list schema
module.exports.userListSchema = Joi.object().keys({
    page: Joi.number().min(1).required(),
    search: Joi.string().allow('', null)
});