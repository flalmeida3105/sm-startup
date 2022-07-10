const router = require('express').Router();

const { 
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
} = require('../../controllers/userControllers');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser)


module.exports = router;