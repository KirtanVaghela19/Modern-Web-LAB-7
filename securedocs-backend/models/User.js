import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: function () {
        return this._id.toString();
      }
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    creationDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

export default mongoose.model('User', userSchema);
