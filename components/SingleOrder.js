import styled from "styled-components";

const Time = styled.div`
color: #fff;
`

const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 20px;
  align-items: center;
  time {
    font-size: 1rem;
    color: #fff;
  }
`;
const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;
const Address = styled.div`
font-size: .8rem;
line-height: 1rem;
margin-top: 10px;
mix-blend-mode: soft-light;
`;

export default function SingleOrder({ line_items, createdAt,...rest }) {
  return (
    <StyledOrder>
      <div>
        <time>{new Date(createdAt).toLocaleString("PHL")}</time>
        <Address>
          {rest.name}<br />
          {rest.email}<br />
          {rest.course}<br />
          {rest.yearLevel} {rest.room}, {rest.number}
        </Address>
      </div>
      <div>
        {line_items.map((item) => (
          <ProductRow>
            <span>{item.quantity} x</span> {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}
