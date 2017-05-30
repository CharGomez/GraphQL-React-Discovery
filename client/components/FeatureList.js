import React, { Component } from 'react';

class FeatureList extends Component {
    renderFeatures() {
        // return this.props.features.map( feature =>)
        // destructurin change
        return this.props.features.map( ({ id, content }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                </li>
            )

        })
    }
    render() {
        return (
            <ul className="collection">
                {this.renderFeatures()}
            </ul>
        )
    }
}

export default FeatureList;