import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3,
            max: 150,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 130,
        },
        password: {
            type: String,
            required: true,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        occupation: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'devadmin'],
            default: 'user',
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
