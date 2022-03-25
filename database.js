import mongoose from 'mongoose';

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_NAME,
} = process.env;

const dbConnect = async () => {

  const url = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?authSource=admin`;
  console.log("🚀 ~ file: database.js ~ line 13 ~ dbConnect ~ url", url)
  await mongoose.connect(url);

  return url;
}


export default {
  dbConnect
};