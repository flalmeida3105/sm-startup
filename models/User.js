const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        // thoughts: [
        //     {
        //         type: Schema.Types.objectId,
        //         ref: 'Thought',
        //     }
        // ],
        // friends: [
        //     {
        //         type: Schema.Types.objectId,
        //         ref: 'User',
        //     }
        // ]
    },
    // {
    //     toJSON: {
    //         virtuals: true,
    //     }
    // }
);

// UserSchema.virtual('friendCount').get(() => {
//     return this.friends.reduce((total, friend) => total + friend.length, + 1, 0);
// });

const User = model('User', UserSchema); 

module.exports = User;