import mongoose, { ConnectOptions } from 'mongoose';

interface Props {
  mongoDBUri: string;
}

const connectToDB = async ({ mongoDBUri }: Props) => {
  const options: ConnectOptions = {
    dbName: 'comics',
  };

  if (!mongoDBUri)
    throw new Error('Invalid/Missing environment variable: MONGODB_URI');

  try {
    await mongoose.connect(mongoDBUri, options);

    console.log('You have successfully connected to MongoDB!');
  } catch (err) {
    console.log(err);
  }
};

export { connectToDB, type Props as MongoDbProps };
