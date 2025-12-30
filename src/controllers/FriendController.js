const { User } = require("../models");
const FriendRequest = require("../models/FriendRequest");



// SEND FRIEND REQUEST

exports.sendRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const senderId = req.user.id;

    const receiverUser = await User.findOne({ email });
    if (!receiverUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (receiverUser._id.toString() === senderId) {
      return res.status(400).json({ error: "Cannot add yourself" });
    }

    const exists = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverUser._id,
      status: "pending",
    });

    if (exists) {
      return res.status(400).json({ error: "Request already sent" });
    }

    await FriendRequest.create({
      sender: senderId,              
      receiver: receiverUser._id,    
    });

    res.json({ message: "Friend request sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send request" });
  }
};


// ACCEPT FRIEND REQUEST

exports.acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // only receiver can accept
    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    request.status = "accepted";
    await request.save();

    // add each other as friends
    await User.findByIdAndUpdate(request.sender, {
      $addToSet: { friends: request.receiver },
    });

    await User.findByIdAndUpdate(request.receiver, {
      $addToSet: { friends: request.sender },
    });

    res.json({ message: "Friend request accepted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to accept request" });
  }
};


// GET PENDING REQUESTS

exports.getRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      receiver: req.user.id,    
      status: "pending",
    }).populate("sender", "name email");

    res.json(requests);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};
