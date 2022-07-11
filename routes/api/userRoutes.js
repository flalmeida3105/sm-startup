const router = require('express').Router();

const { 
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    createFriend,
    deleteFriend
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

router
    .route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend);

module.exports = router;