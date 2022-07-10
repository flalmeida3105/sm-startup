const router = require('express').Router();

const { 
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser
} = require('../../controllers/userControllers');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getSingleUser)
    .delete(deleteUser)


module.exports = router;