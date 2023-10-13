import User from "../models/users.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, ocupation, location, picture }) => {
        return { _id, firstName, lastName, ocupation, location, picture };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {}
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendsId } = req.params;
    const user = User.findById(id);
    const friend = User.findById(friendsId);
    if (user.friends.includes(friendsId)) {
      user.friends = user.friends.filter((id) => {
        id !== friendsId;
      });
      friend.friends = friend.friends.filter((id) => {
        id !== id;
      });
    } else {
      user.friends.push(friendsId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, ocupation, location, picture }) => {
        return { _id, firstName, lastName, ocupation, location, picture };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
