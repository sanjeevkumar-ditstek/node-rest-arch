import { DATABASE_URL } from "../env";
import { connect, ConnectOptions } from "mongoose";
export default connect(`${DATABASE_URL}`, {} as ConnectOptions);
