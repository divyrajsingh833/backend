const mongoose = require('mongoose');
const Joi = require('joi')

const orderSchema = new mongoose.Schema({
  liters: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default:"Confirmed"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // assuming there's a User model in your database
    required: true,
  },
}, { timestamps: true });


const validateOrder = (data) =>{

  const schema = Joi.object({

    liters: Joi.number().required().min(1).messages({
      'number.base': '"liters" should be a number',
      'number.min': '"liters" cannot be less than 1',
      'any.required': '"liters" is required',
    }),
    price: Joi.number().required().min(0).messages({
      'number.base': '"Price" should be a number',
      'number.min': '"Price" cannot be less than 0',
      'any.required': '"Price" is required',
    }),
    userId: Joi.string().required().hex().length(24).messages({
      'string.base': '"userId" should be a string',
      'string.hex': '"userId" should be a valid ObjectId',
      'string.length': '"userId" should be 24 characters long',
      'any.required': '"userId" is required',
    }),
  })

  const {error} = schema.validate(data)
  return error?.message
}
const orderModel = mongoose.model('Product', orderSchema);

module.exports = {validateOrder, orderModel};
