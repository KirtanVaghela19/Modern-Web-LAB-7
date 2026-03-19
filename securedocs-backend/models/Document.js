import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    documentId: {
      type: String,
      default: function () {
        return this._id.toString();
      }
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    creationDate: {
      type: Date,
      default: Date.now
    },
    lastUpdatedDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: false }
);

documentSchema.pre('save', function (next) {
  this.lastUpdatedDate = new Date();
  next();
});

export default mongoose.model('Document', documentSchema);
