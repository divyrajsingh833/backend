const { validateUser, userModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, address, pincode, city, landmark,role } = req.body;
    const error = validateUser({ fullname, email, phoneNumber, password, address, pincode, city, landmark });
    if (error) return res.status(400).send(error);

    let user = await userModel.findOne({ email });
    if (user) return res.status(409).send("Entity already exists");

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);

    user = await userModel.create({ fullname, email, phoneNumber, password: hashedPass, address, pincode, city, landmark, role });
 
    user = {
      id: user._id,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      address: user.address,
      pincode: user.pincode,
      city: user.city,
      landmark: user.landmark
    }

    res.status(201).send(user);

  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const error = validateUser({ fullname: 'gaurav', email, phoneNumber: '4343533335', password, address:"msdfkdgkkdjnjsd", pincode:"453221", city:"rrt", landmark:"fsdmfdskgka"});
    if (error) return res.status(400).send(error);

    let user = await userModel.findOne({ email });
    if (!user) return res.status(401).send("Invalid email or password");

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) return res.status(401).send("Invalid email or password");

    const token = jwt.sign({ id: user._id, role: user.role, fullname:user.fullname }, process.env.JWT_SECRET);

    user = {
      id: user._id,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };

    res.status(200).send({ user, token });

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).send({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
