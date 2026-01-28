import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name_hi: {
    type: String,
  },
  name_te: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Restaurant", restaurantSchema);
