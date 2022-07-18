const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if(!context.user) {
                throw new AuthenticationError('Sign in required!');
            }
            const userData = await User.findOne({_id: context.user._id}).populate('savedBooks');
            return userData;
        }
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne( {email} );
            if (!user) {
                throw new AuthenticationError('No user or incorrect password');
            }
            const correctPw = await profile.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('No user or incorrect password');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async(parent, data, context) => {
            if(!context.user) {
                throw new AuthenticationError("Sign-in required");               
            }

            const update = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: {savedBooks: data }},
                { new: true, runValidators: true }
            ).populate("savedBooks");

            return update;
        },
        removeBook: async(parent, {bookId}, context) => {
            if(!context.user) {
                throw new AuthenticationError("Sign-in required");               
            }

            const update = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: {savedBooks: {bookId: bookId} }},
                { new: true }
            ).populate("savedBooks");

            return update;
        }
    }
}

module.exports = resolvers;
