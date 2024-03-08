import styled from "styled-components";

const StyleTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: 0.7rem;
  }
  td {
    border-top: 2px solid ;
    color: white;
  }
`;

export default function Table(props) {
  return <StyleTable {...props} />;
}
