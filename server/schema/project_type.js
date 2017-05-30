const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const FeatureType = require('./feature_type');
const Project = mongoose.model('project');

const ProjectType = new GraphQLObjectType({
  name:  'ProjectType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    features: {
      type: new GraphQLList(FeatureType),
      resolve(parentValue) {
        return Project.findFeatures(parentValue.id);
      }
    }
  })
});

module.exports = ProjectType;
