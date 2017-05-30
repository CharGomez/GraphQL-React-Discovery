import React , { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import fetchProject from '../queries/fetchProject';
import FeatureCreate from './FeatureCreate';
import FeatureList from './FeatureList';

class ProjectDetail extends Component {
    render() {
        const { project } = this.props.data;

        // You can use loading to catch status and avoid any empty data
        if (!project) { return <div>Loading...</div>;}

        return (
            <div>
                <Link to="/">Back</Link>
                <h3> { project.title } </h3>
                <FeatureList features={ project.features }/>
                <FeatureCreate projectId={this.props.params.id} />
            </div>
        );
    }
}

export default graphql (fetchProject, {
    options: (props) => { return { variables: { id: props.params.id } } }
}) (ProjectDetail);