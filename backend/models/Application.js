const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    property: {
      type: String,
      required: true,
      trim: true,
    },

    visitDate: {
      type: String,
      default: "",
    },

    configuration: {
      type: String,
      required: true,
      trim: true,
    },

    budget: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Application", applicationSchema);
