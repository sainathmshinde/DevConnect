const mongoose = require('mongoose');

const connectionrequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['ignored', 'interested', 'accepted', 'rejected'],
        message: `{VALUE} is not a valid status`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const connectionrequestModel = mongoose.model(
  'ConnectionRequest',
  connectionrequestSchema
);

module.exports = connectionrequestModel;
