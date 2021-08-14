const mongoose = require("mongoose");
const mongooseCurrency = require("mongoose-currency");
mongooseCurrency.loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    price: {
      type: Currency,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Promotions = mongoose.model("Promotions", promotionSchema);
module.exports = Promotions;
