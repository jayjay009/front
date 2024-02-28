import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductGrid";

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

export default function NewProduct({ products,wishedProducts }) {
  return (
    <Center>
      <h2>New Arrivals</h2>
      <ProductsGrid products={products} wishedProducts={wishedProducts}/>
    </Center>
  );
}
