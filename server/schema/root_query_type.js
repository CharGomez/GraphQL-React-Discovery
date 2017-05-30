const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const ProjectType = require('./project_type');
const FeatureType = require('./feature_type');
const Feature = mongoose.model('feature');
const Project = mongoose.model('project');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find({});
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Project.findById(id);
      }
    },
    feature: {
      type: FeatureType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Feature.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
