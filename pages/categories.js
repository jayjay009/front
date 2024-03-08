import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import styled from "styled-components";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProducts";
import { mongooseConnect } from "@/lib/mongoose";

const Bg = styled.div`
  background-color: #714423;
  color:#fff;
  height: 100%;
  padding-bottom: 14%;

`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const CategoryTitle = styled.div`
 background-color: #714423;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  gap: 20px;
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a {
    color: #fff;
    display: inline-block;
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;
const ShowAllSquare = styled(Link)`
  background-color: #97704F;
  height: 160px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #fff;
  text-decoration: none;
`;

export default function CategoriesPage({ mainCategories, categoriesProduct, wishedProducts=[] }) {
  return (
    <Bg>
      <Header />
      <Center>
        {mainCategories.map((cat) => (
          <CategoryWrapper>
            <CategoryTitle>
              <h2>{cat.name}</h2>
              <div>
                <Link href={"/category/" + cat._id}>Show All</Link>
              </div>
            </CategoryTitle>
            <CategoryGrid>
              {categoriesProduct[cat._id].map((p, index) => (
                <RevealWrapper delay={index * 50}>
                  <ProductBox {...p} wished={wishedProducts.includes(p._id)}/>
                </RevealWrapper>
              ))}
              <RevealWrapper delay={categoriesProduct[cat._id].length * 50}>
                <ShowAllSquare href={"/category/" + cat._id}>
                  Show All &rarr;
                </ShowAllSquare>
              </RevealWrapper>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </Bg>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProduct = {};
  const allFetchedProductsId =[];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCarIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCarIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 50,
      sort: { _id: -1 },
    });
    allFetchedProductsId.push(...products.map(p => p._id.toString()))
    categoriesProduct[mainCat._id] = products;
  }
  const session = await getServerSession(ctx.req, ctx.res, authOption);
  const wishedProducts = session?.user ? await WishedProduct.find({
    userEmail: session?.user.email,
    product: allFetchedProductsId,
  }): [];
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProduct: JSON.parse(JSON.stringify(categoriesProduct)),
      wishedProducts: wishedProducts.map(i => i.product.toString()),
    },
  };
}
