import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchProjects';


class ProjectList extends Component {

    // need to add pre handler on Mongo to delete related features
    onProjectDelete(id) {
        this.props.mutate({ variables: { id } })
        //execute any query related to the current component
            .then(() => this.props.data.refetch()); 
    }

    renderProjects() {
        //project.id --> Destructuring on the map
        return this.props.data.projects.map(({id, title}) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`projects/${id}`}>
                        {title}
                    </Link>
                    <i className="material-icons"
                    onClick={()=> this.onProjectDelete(id)}>delete</i>
                </li>
            );
        });
    }

    render() {
        if(this.props.data.loading) { return <div>Loading...</div>;}
        return (
            <div>
                <ul className="collection">
                    {this.renderProjects()}
                </ul>
                <Link 
                    to="/projects/new"
                    className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
       ) 
    }
}

const mutation = gql`
    mutation DeleteProject ($id: ID){
        deleteProject(id: $id){
            id
        }
    }
`;


export default graphql(mutation)(
    graphql(query)(ProjectList)
);