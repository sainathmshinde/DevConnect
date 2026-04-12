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

connectionrequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionrequestSchema.pre('save', function (next) {
  const connectionRequest = this;
  //check if fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error('Cannot send connection request to yourself!');
  }
  next();
});

const connectionrequestModel = mongoose.model(
  'ConnectionRequest',
  connectionrequestSchema
);

module.exports = connectionrequestModel;
