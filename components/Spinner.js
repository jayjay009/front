import { ClockLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? `
    display:block;
    display:flex;
    justify-content:center;
    align-items: center;
    width:100%; 
    height:60vh;
  `
      : `
    border: 5xp solid blue;
  `}
`;

export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <ClockLoader speedMultiplier={3} color={"#555"} size={200} />;
    </Wrapper>
  );
}
