const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('startup').collection('user');
const recommendationCollection = client.db('startup').collection('recommendation');
const ratingCollection = client.db('startup').collection('rating');

function getUser(email) {
  console.log("database");
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addRecommendation(recommendation) {
  recommendationCollection.insertOne(recommendation);
}

async function addRating(rating) {
  const rate = await ratingCollection.findOne({ user: rating.user });
  if (rate) {
    await ratingCollection.updateOne({ user: rating.user }, { $set: { rate: rating.rate } });
  } else {
    await ratingCollection.insertOne(rating);
  }
}


async function getRecommendations(){
  const recommendations = await recommendationCollection.find().toArray();
  return recommendations;
}

async function getRatings(){
  const ratings = await ratingCollection.find().toArray();
  const nums = ratings.map((rating) => rating.rate);
  const sum = nums.reduce((acc, val) => acc + val, 0);
  const avg = sum / nums.length;

  const total = {
    avg: avg,
  };

  return total;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addRecommendation,
  addRating,
  getRecommendations,
  getRatings,
};