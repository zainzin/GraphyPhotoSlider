const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
    const {username, email} = user;
    return jwt.sign({username, email}, secret, {expiresIn})
}

module.exports = {
    Query: {
        async getCurrentUser(_, args, {User, currentUser}) {
            if (!currentUser) {
                return null;
            }
            return await User.findOne({username: currentUser.username})
            .populate({
                path: 'favorites',
                model: 'Post'
            });
        },
        async signinUser(_, {username, password}, {User}) {
            return await User.findOne({username, password});
        },
        async getPosts(_, args, {Post}) {
            return await Post.find({}).sort({createdDate: 'desc'}).populate({
                path: 'createdBy',
                model: 'User'
            });
        }
    },
    Mutation: {
        async addPost(_, {title, imageUrl, categories, description, createdBy}, {Post}) {
            const newPost = await new Post({
                title, 
                imageUrl, 
                categories, 
                description,
                createdBy
            }).save();
            return newPost;
        },
        async signupUser(_, {username, email, password}, {User}) {
            const user = await User.findOne({username});
            if (user) {
                throw new Error('User already exists');
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return {token: createToken(newUser, process.env.JWT_SECRET, '1hr')};
        },
        async signinUser(_, {username, password}, {User}) {
            const user = await User.findOne({username});
            if (!user) {
                throw new Error('Invalid username or password');
            }
            const isValidPaasword = await bcrypt.compare(password, user.password);
            if (!isValidPaasword) {
                throw new Error('Invalid username or password');
            }
            return {token: createToken(user, process.env.JWT_SECRET, '1hr')};
        }
    }
}