import mongoose from 'mongoose';

const tagsSchema = mongoose.Schema(
  {
    tagName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const memoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    memory: {
      type: String,
      required: [true, 'Memory cant be blank'],
    },

    tags: [tagsSchema],
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Memories = mongoose.model('Memories', memoriesSchema);

export default Memories;
