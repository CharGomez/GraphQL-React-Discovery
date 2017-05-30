const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Feature = mongoose.model('feature');

const FeatureType = new GraphQLObjectType({
  name:  'FeatureType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    project: {
      type: require('./project_type'),
      resolve(parentValue) {
        return Feature.findById(parentValue).populate('project')
          .then(feature => {
            return feature.project
          });
      }
    }
  })
});

module.exports = FeatureType;
