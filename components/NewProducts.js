import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductGrid";

const Bg = styled.div`
  background-color: #714423;
  padding-bottom: 10%;
  h2 {
    color: #fff;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 30px 0 20px;
  font-weight: normal;

`;

export default function NewProduct({ products,wishedProducts }) {
  return (
    <Bg>
       <Center>
      <h2 >New Arrivals</h2>
      <ProductsGrid products={products} wishedProducts={wishedProducts}/>
    </Center> 
    </Bg>
  
  );
}
