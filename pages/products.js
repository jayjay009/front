import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { authOption } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { WishedProduct } from "@/models/WishedProducts";
import styled from "styled-components";


const Bg = styled.div`
  background-color: #714423;
  color: #fff;
  height: 100vh;
  width: 100%;
  padding-bottom: 210vh;
  bottom: 210vh;
`;

export default function ProductPage({ products, wishedProducts }) {
  return (
     <Bg>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductsGrid products={products} wishedProducts={wishedProducts} />
      </Center>
      </Bg>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const session = await getServerSession(ctx.req, ctx.res, authOption);
  const wishedProducts = session?.user ? await WishedProduct.find({
    userEmail:session?.user.email,
    product: products.map((p) => p._id.toString()),
  }) : [];
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map(i => i.product.toString()),
    },
  };
}
