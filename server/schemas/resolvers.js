const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if(!context.user) {
                throw new AuthenticationError('Sign in required!');
            }
            const userData = await User.findOne({_id: context.user._id}).select('-__v -password');

            return userData;
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async(parent, {data}, context) => {
            if(!context.user) {
                throw new AuthenticationError("Sign-in required");               
            }

            const userData = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: data }},
                { new: true, runValidators: true }
            );

            return userData;
        },
        removeBook: async(parent, {bookId}, context) => {
            if(!context.user) {
                throw new AuthenticationError("Sign-in required");               
            }

            const userData = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } }},
                { new: true }
            );

            return userData;
        }
    }
}

module.exports = resolvers;
