import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color:  transparent;
  font-weight: bold;
  color: white; 
  &::placeholder {
    color: #fff; 
    opacity: 0.7;
  }
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
