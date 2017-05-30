const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'project'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

FeatureSchema.statics.like = function(id) {
  const Feature = mongoose.model('feature');

  return Feature.findById(id)
    .then(feature => {
      ++feature.likes;
      return feature.save();
    })
}

mongoose.model('feature', FeatureSchema);
