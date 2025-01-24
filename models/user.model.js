const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true, unique: true },
  role: {type: String, default:"user"},
  password: { type: String, required: true },
  products: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  address: { type: String, required: true },
  pincode: { type: String, required: true, minlength: 6, maxlength: 6 }, // Assuming pincode is a 6-digit number (as in India)
  city: { type: String, required: true },
  landmark: { type: String, required: true }

}, { timestamps: true });

const validateUser = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().required().messages({
      "string.empty": "Full name is required.",
    }),

    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email is required.",
    }),

    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/) // Ensure it's a 10-digit number
      .required()
      .messages({
        'string.pattern.base': 'Mobile number must be a 10-digit number.',
        'string.empty': 'Phone number is required.',
      }),

    password: Joi.string().required().messages({
      "string.empty": "Password is required.",
    }),

    // New validations for added fields
    address: Joi.string().required().messages({
      "string.empty": "Address is required.",
    }),

    pincode: Joi.string().length(6).pattern(/^[0-9]{6}$/).required().messages({
      "string.length": "Pincode must be exactly 6 digits.",
      "string.pattern.base": "Pincode should only contain numbers.",
      "string.empty": "Pincode is required.",
    }),

    city: Joi.string().required().messages({
      "string.empty": "City is required.",
    }),

    landmark: Joi.string().required().messages({
      "string.empty": "Landmark is required.",
    }),
  });

  const { error } = schema.validate(data);
  return error?.message;
};

const userModel = mongoose.model("User", userSchema);

module.exports = { validateUser, userModel };
