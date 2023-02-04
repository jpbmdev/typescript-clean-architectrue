import { connect } from "mongoose";

const DB_URL = `${process.env.DB_URL}`;

const mongoDBInit = async () => {
  await connect(DB_URL);
  console.log("Mongodb database connected");
};

export default mongoDBInit;
