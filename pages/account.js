import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import WhiteBox from "@/components/WhiteBox";
import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import axios from "axios";
import Spinner from "@/components/Spinner";
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";

const Bg = styled.div`
  background-color: #714423;
  color: #fff;
  height: 100vh;
  width: 100%;
  padding-bottom: 100vh;
  bottom: 100vh;
`;
const InsideBox = styled.div`
  background-color: #97704f;
  border-radius: 10px;
`;
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 10px;
  margin: 40px 0;
  p {
    margin: 5px;
  }
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  @media only screen and (max-width: 600px) {
    max-width: 100%;
  }
`;
const Box = styled.div`
  background-color: transparent;
  border-radius: 10px;
  padding: 30px;

  @media only screen and (max-width: 600px) {
    padding: 15px;
    max-width: 100%;
  }
`;
const ButColor = styled.div`
  background-color: #714423;
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 15px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [adressloaded, setAddressLoaded] = useState(true);
  const [wishListLoaded, setWishListLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders, SetOrders] = useState([]);
  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn("google");
  }
  async function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put("/api/address", data);
  }
  useEffect(() => {
    if (!session) {
      return;
    }
    axios
      .get("/api/address")
      .then((response) => {
        if (response.data) {
          setName(response.data.name || "");
          setEmail(response.data.email || "");
          setCity(response.data.city || "");
          setPostalCode(response.data.postalCode || "");
          setStreetAddress(response.data.streetAddress || "");
          setCountry(response.data.country || "");
        } else {
          // Handle the case where response.data is null or undefined
          console.error("Error: response.data is null or undefined");
        }
      })
      .catch((error) => {
        // Handle the error from the API request
        console.error("Error fetching data from /api/address:", error);
      });
    axios.get("/api/wishlist").then((response) => {
      setWishedProducts(response.data.map((wp) => wp.product));
      setWishListLoaded(true);
    });
    axios.get("/api/orders").then((response) => {
      SetOrders(response.data);
      setOrderLoaded(true);
    });
  }, [session]);
  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)];
    });
  }
  return (
    <Bg>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <InsideBox>
                <Box>
                  <Tabs
                    tabs={["Orders", "Wishlist"]}
                    active={activeTab}
                    onChange={setActiveTab}
                  />
                  {activeTab === "Orders" && (
                    <>
                      {!orderLoaded && <Spinner fullWidth={true} />}
                      {orderLoaded && (
                        <div>
                          {orders.length === 0 && (
                            <p>Login to see your orders</p>
                          )}
                          {orders.length > 0 &&
                            orders.map((o) => <SingleOrder {...o} />)}
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === "Wishlist" && (
                    <>
                      {!wishListLoaded && <Spinner fullWidth={true} />}
                      {wishListLoaded && (
                        <>
                          <WishedProductsGrid>
                            {wishedProducts.map((wp) =>
                              wp && wp._id ? (
                                <ProductBox
                                  key={wp._id}
                                  {...wp}
                                  wished={true}
                                  onRemoveFromWishlist={productRemovedFromWishlist}
                                />
                              ) : null
                            )}
                          </WishedProductsGrid>
                          {wishedProducts.length === 0 && (
                            <>
                              {session && <p>Your wishlist is empty</p>}
                              {!session && (
                                <p>Login to add products to your wishlist</p>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Box>
              </InsideBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <InsideBox>
                <Box>
                  <h2>{session ? "Account Details" : "LogIn"}</h2>
                  {!adressloaded && <Spinner fullWidth={true} />}
                  {adressloaded && session && (
                    <>
                      <Input
                        type="text"
                        placeholder="Name"
                        s
                        value={name}
                        name="name"
                        onChange={(ev) => setName(ev.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={(ev) => setEmail(ev.target.value)}
                      />
                      <CityHolder>
                        <Input
                          type="text"
                          placeholder="Course"
                          value={city}
                          name="city"
                          onChange={(ev) => setCity(ev.target.value)}
                        />
                        <Input
                          type="text"
                          placeholder="YearLevel"
                          value={postalCode}
                          name="postalCode"
                          onChange={(ev) => setPostalCode(ev.target.value)}
                        />
                      </CityHolder>
                      <Input
                        type="text"
                        placeholder="Room"
                        value={streetAddress}
                        name="streetAddress"
                        onChange={(ev) => setStreetAddress(ev.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Number"
                        value={country}
                        name="country"
                        onChange={(ev) => setCountry(ev.target.value)}
                      />
                      <Button black block onClick={saveAddress}>
                        Save
                      </Button>
                      <hr />
                    </>
                  )}
                  {session && (
                    <ButColor primary onClick={logout}>
                      Logout
                    </ButColor>
                  )}
                  {!session && (
                    <ButColor primary onClick={login}>
                      Login with Google
                    </ButColor>
                  )}
                </Box>
              </InsideBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </Bg>
  );
}
