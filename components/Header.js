import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import SearchIcon from "./icons/SearchIcon";

const StyledHeader = styled.header`
  background-color: #97704F;
  position: sticky;
  top: 0;
  z-index: 10;
  padding-top: 1px;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
      display: block;
    `
      : `
      display: none;
    `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #97704F;
  @media screen and (min-width: 600px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
background-color: #97704F;
  display: block;
  color: #fff;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  svg {
    height: 20px;
  }
  @media screen and (min-width: 600px) {
    padding: 0;
  }
`;
const NavButton = styled.button`
 background-color: #97704F;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;
const SideIcon = styled.div`
  display: flex;
  align-items: center;
  a {
    display: inline-block;
    min-width: 20px;
    color: white;
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>SAINT’S CAFÉ</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcon>
            <Link href={"/search"}>
              <SearchIcon />
            </Link>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcon>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
