import gql from 'graphql-tag';

export default gql`
    query ProjectQuery ($id: ID!){
        project(id : $id) {
            id
            title
            features {
                id
                content
            }
        }
    }
`;