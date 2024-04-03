import User from "../models/UserModel.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email and password" });
  }
  const newUser = new User({ name, email, password });
  try {
    await newUser.save();
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ message: "User with that id is not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User with that id is not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletedUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `User with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
