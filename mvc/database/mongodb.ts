import { connect } from "mongoose";

const DB_URL = `${process.env.DB_URL}`;
const DB_NAME = `${process.env.DB_NAME}`;

const mongoDBInit = async () => {
  await connect(DB_URL, { dbName: DB_NAME });
  console.log("Mongodb database connected");
};

export default mongoDBInit;
