const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  features: [{
    type: Schema.Types.ObjectId,
    ref: 'feature'
  }]
});

ProjectSchema.statics.addFeature = function(id, content) {
  const Feature = mongoose.model('feature');

  return this.findById(id)
    .then(project => {
      const feature = new Feature({ content, project })
      project.features.push(feature)
      return Promise.all([feature.save(), project.save()])
        .then(([feature, project]) => project);
    });
}

ProjectSchema.statics.findFeatures = function(id) {
  return this.findById(id)
    .populate('features')
    .then(project => project.features);
}

mongoose.model('project', ProjectSchema);
