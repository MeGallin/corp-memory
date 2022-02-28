import mongoose from 'mongoose';

const tagsSchema = mongoose.Schema({
  tagName: {
    type: String,
  },
});

const memoriesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Title cant be blank'],
    },
    memory: {
      type: String,
      required: [true, 'Memory cant be blank'],
    },
    setDueDate: {
      type: Boolean,
      default: true,
    },
    dueDate: {
      type: String,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    tags: [tagsSchema],
  },
  {
    timestamps: true,
  },
);

const Memories = mongoose.model('Memories', memoriesSchema);

export default Memories;
