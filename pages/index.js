import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProduct from "@/components/NewProducts";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProducts";
import { Setting } from "@/models/Setting";

export default function HomePage({
  featuredProduct,
  newProducts,
  wishedNewProducts,
}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProduct products={newProducts} wishedProducts={wishedNewProducts} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const featuredProductSetting = await Setting.findOne({name:'featuredProductId'});
  const featuredProductId = featuredProductSetting.value;
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 50,
  });
  const  session = await getServerSession(ctx.req, ctx.res, authOption);
  const wishedNewProducts = session?.user
  ? await WishedProduct.find({
    userEmail:session?.user.email,
    product: newProducts.map((p) => p._id.toString()),
  })
  : [];
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
    },
  };
}
