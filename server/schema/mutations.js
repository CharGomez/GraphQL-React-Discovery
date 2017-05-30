const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Project = mongoose.model('project');
const Feature = mongoose.model('feature');
const ProjectType = require('./project_type');
const FeatureType = require('./feature_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Project({ title })).save()
      }
    },
    addFeatureToProject: {
      type: ProjectType,
      args: {
        content: { type: GraphQLString },
        projectId: { type: GraphQLID }
      },
      resolve(parentValue, { content, projectId }) {
        return Project.addFeature(projectId, content);
      }
    },
    likeFeature: {
      type: FeatureType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Feature.like(id);
      }
    },
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Project.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
