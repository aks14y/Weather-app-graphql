import { gql } from "@apollo/client";

export const GET_CHARACTERS_QUERY = gql`
  query characters($name: String) {
    characters(filter: { name: $name }) {
      info {
        count
      }
      results {
        name
      }
    }
  }
`;
