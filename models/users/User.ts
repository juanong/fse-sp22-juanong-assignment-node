import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

// All attributes for a User object with default values
export default interface User {
   _id?: mongoose.Schema.Types.ObjectId,
   username: string,
   password: string,
   firstName?: string,
   lastName?: string,
   email: string,
   profilePhoto?: string,
   headerImage?: string,
   biography?: string,
   dateOfBirth?: Date,
   accountType?: AccountType,
   maritalStatus?: MaritalStatus,
   location?: Location,
   salary?: number,
   join?: Date
};
