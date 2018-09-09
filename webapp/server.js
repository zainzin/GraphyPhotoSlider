const {ApolloServer, AuthenticationError} = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filepath, 'utf-8');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');

require('dotenv').config({path: 'variables.env'});

const User = require('./models/User');
const Post = require('./models/Post');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('DB Connected'))
    .then(async () => {
        const p = await Post.find({});
        if (p.length < 1) {
            const user = await new User({
                username: 'test',
                password: 'test',
                email: 'test@test.com'
            }).save();
            for (const p of posts) {
                p.createdBy = user._id;
            }
            Post.insertMany(posts).catch((err) => {
                console.error('Posts was not inserted', err);
            });
        }
    })
    .catch((err) => console.log(err));

    const getUser = async (token) => {
      if (token) {
        try {
          return await jwt.verify(token, process.env.SECRET);
        } catch(err) {
          console.error(err);
          throw new AuthenticationError('Your session has ended, please sign in again');
        }
      }
    }

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
      const token = req.headers['authorization'];
      return {
        User,
        Post,
        currentUser: await getUser(token)
      };
    }
});

server.listen(4500).then(({url}) => console.log(`Server listening on ${url}`));


const posts = [
    new Post({
        "categories": ["Art"],
        "title": "Mona Lisa",
        "imageUrl": "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.readingpublicmuseum.org%2Fexhibit_secrets-of-mona-lisa-4.jpg&f=1",
        "description": "A painting",
    }),
    new Post({
      "categories": ["Furniture"],
      "title": "Credenza",
      "imageUrl": "https://images.crateandbarrel.com/is/image/Crate/ClybournIICredenza3QF16/?$web_zoom_furn_av$&180802085137&wid=1008&hei=567",
      "description": "A piece of furniture I want to buy",
    }),
    new Post({
      "categories": ["Art", "Food"],
      "title": "Tasty coffee",
      "imageUrl": "https://images.pexels.com/photos/374757/pexels-photo-374757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "description": "Some nice coffee artwork",
    }),
    new Post({
      "categories": ["Photography", "Travel"],
      "title": "Abstract Painting",
      "imageUrl": "https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "description": "A nice photo of the waves",
    }),
    new Post({
      "categories": ["Art"],
      "title": "Abstract Painting",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Vassily_Kandinsky%2C_1939_-_Composition_10.jpg/1024px-Vassily_Kandinsky%2C_1939_-_Composition_10.jpg",
      "description": "Nice painting",
    }),
    new Post({
      "categories": ["Travel", "Photography"],
      "title": "Travel Photo",
      "imageUrl": "https://images.pexels.com/photos/789380/pexels-photo-789380.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "description": "An inspiring travel photo",
    }),
    new Post({
      "categories": ["Photography"],
      "title": "Sunset Photo",
      "imageUrl": "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "description": "A beautiful sunset",
    }),
    new Post({
      "categories": ["Food"],
      "title": "Chocolate Cake",
      "imageUrl": "https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "description": "A delicious piece of chocolate cake",
    }),
    new Post({
      "categories": ["Food"],
      "title": "A tasty dinner",
      "imageUrl": "https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "description": "Picture of recipe I would like to prepare",
    }),
    new Post({
      "categories": ["Art"],
      "title": "Abstract Art",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Vassily_Kandinsky%2C_1923_-_Circles_in_a_Circle.jpg",
      "description": "A neat painting by Kandinsky",
    })
  ]
  