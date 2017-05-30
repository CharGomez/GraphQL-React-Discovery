import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class FeatureCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { content: '' };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: { 
                content: this.state.content, 
                projectId: this.props.projectId 
            }
        }).then(() => this.setState({ content: '' }));
    }

    render () {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Feature</label>
                <input 
                    value={this.state.content}
                    onChange={event => this.setState({content: event.target.value})}
                    />
            </form>
        )
    }
}

// dataIdFromObject added to reactive
const mutation = gql`
    mutation addFeatureToProject($content: String, $projectId: ID) {
        addFeatureToProject(content: $content, projectId: $projectId) {
            id 
            features {
                id
                content
            }
        }
    }
`;

export default graphql (mutation) (FeatureCreate);