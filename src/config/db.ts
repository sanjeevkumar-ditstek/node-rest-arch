import { DATABASE_URL } from "../env";
import { connect, ConnectOptions } from "mongoose";
console.log("DATABASE_URL ", DATABASE_URL);
export default connect(`${DATABASE_URL}`, {} as ConnectOptions);
