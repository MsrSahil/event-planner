import mongoose from "mongoose";

const CateringSchema = mongoose.Schema(
  {
    catererName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bookingCharge: {
      type: String,
      required: true,
    },
    perPlateVeg: {
      type: String,
      required: true,
    },
    perPlateJain: {
      type: String,
      required: true,
    },
    perPlateNonVeg: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    plans: {
      type: [
        {
          name: { type: String },
          price: { type: Number },
          description: { type: String },
        },
      ],
      default: [],
    },
    menu: {
      type: [
        {
          name: { type: String },
          type: { type: String, enum: ["Veg", "Jain", "NonVeg", "Other"], default: "Veg" },
          price: { type: Number },
          description: { type: String },
        },
      ],
      default: [],
    },
    photos: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Caterer = mongoose.model("Caterer", CateringSchema);

export default Caterer;
