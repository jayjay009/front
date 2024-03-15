import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProduct from "@/components/NewProducts";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProducts";
import styled from "styled-components";


const Bg = styled.div`
  background-color: #714423;
  color:#fff;
`;

export default function HomePage({
  featuredProduct,
  newProducts,
  wishedNewProducts,
}) {
  return (
    <div> 
      <Header />
     <Bg>
      <Featured product={featuredProduct} />
      <NewProduct products={newProducts} wishedProducts={wishedNewProducts} /></Bg>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const featuredProductId = "65f3e867bb37b760cad2f686";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 50,
  });
  const session = await getServerSession(ctx.req, ctx.res, authOption);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
    },
  };
}
