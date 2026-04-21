import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // user/admin 
  createdAt: { type: Date, default: Date.now }
});


UserSchema.methods.comparePassword = async function (passw) {
  return await bcrypt.compare(passw, this.password);
};

UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase().trim() });
};


// UserSchema.pre("save", async function (next) {
//   const saltRounds = 10;
//   if (this.isModified("password") || this.isNew) {
//     try {
//       const hash = await bcrypt.hash(this.password, saltRounds);
//       this.password = hash;
//       next();
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     next();
//   }
// });

UserSchema.pre("save", async function () {
  // hash if password is new/changed
  if (!this.isModified("password")) return;

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});


export default mongoose.model("User", UserSchema);
