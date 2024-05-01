const express = require("express");
const router = express.Router();

/* ############################################ Middlewares ############################################ */
const validateRequest = require("../middlewares/ValidateRequest");

/* ############################################ Joi Validation Schema ################################## */
const userSchema = require("../validation-schemas/userSchemas");

/* ############################################ Controllers ############################################ */
const userController = require("../controllers/userController");

/* ############################################ User ############################################ */
router.get('/user_list', validateRequest.validate(userSchema.userListSchema, 'query'), userController.userList); // Fetch User List
router.get('/user_details/:id', userController.userDetails); // Fetch User Details
router.get('/city_with_user_count', userController.cityWithUser); // Fetch Unique City With City Count

module.exports = router;

