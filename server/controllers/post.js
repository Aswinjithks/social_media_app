import Post from "../models/post.js";
import User from "../models/users.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    console.log(userId, description, picturePath);
    const user = await User.findById(userId);
    console.log("user", user);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picture,
      picturePath,
      description,
      likes: {},
      comments: [],
    });
    const aa = await newPost.save();
    console.log("wpppppp");
    console.log(aa);

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getUsersPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
