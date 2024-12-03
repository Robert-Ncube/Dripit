import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { RiHomeSmile2Fill } from "react-icons/ri";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { IoLogOutOutline, IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoCartOutline } from "react-icons/io5";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { FaUserCog } from "react-icons/fa";
import { logoutUser, resetTokenAndCredentials } from "@/store/authSlice";
import CartWrapper from "./CartWrapper";
import { fetchCartItems } from "@/store/cartSlice";
import { Label } from "../ui/label";

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.ShopCart);
  console.log("cartItems:", cartItems.items);
  const [openCart, setOpenCart] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex mx-4  md:items-center flex-row gap-4">
      <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
        <Button
          variant="outline"
          title="cart"
          size="icon"
          onClick={() => setOpenCart(true)}
          className="relative"
        >
          <IoCartOutline size={28} />
          <span className="absolute -left-2 -top-2 text-white bg-orange-600 rounded-full px-2">
            {cartItems?.items?.length}
          </span>
          <span className="sr-only">User Cart</span>
        </Button>
        <CartWrapper setOpenCart={setOpenCart} cartItems={cartItems} />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger title="profile" className="cursor-pointer" asChild>
          <Avatar className="bg-slate-800">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as:{" "}
            <span className="capitalize font-bold">{user?.username}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center justify-between cursor-pointer"
            onClick={() => navigate("/shop/account")}
            title="your profile"
          >
            <span>Account</span>
            <FaUserCog size={30} className="mr-2" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center justify-between cursor-pointer"
            onClick={handleLogout}
            title="logout"
          >
            <span>Log Out</span>
            <IoLogOutOutline size={30} className="mr-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("user", user);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const menuItems = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleNavToListing = (currentMenuItem) => {
      sessionStorage.removeItem("filters");
      const currentFilter =
        currentMenuItem.id !== "home" &&
        currentMenuItem.id !== "products" &&
        currentMenuItem.id !== "search"
          ? {
              category: [currentMenuItem.id],
            }
          : null;

      sessionStorage.setItem("filters", JSON.stringify(currentFilter));

      location.pathname.includes("listing") && currentFilter !== null
        ? setSearchParams(
            new URLSearchParams(`?category=${currentMenuItem.id}`)
          )
        : navigate(currentMenuItem.path);
    };

    return (
      <nav className="flex flex-col mb-3 md:mb-0 md:items-center gap-6 md:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Label
            key={menuItem.id}
            onClick={() => {
              handleNavToListing(menuItem);
              setIsSheetOpen(false);
            }}
            className="text-md font-medium hover:text-orange-600 text-black cursor-pointer"
          >
            {menuItem.label}
          </Label>
        ))}
      </nav>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          title="home"
          className="flex items-center gap-2 text-black"
          to={"/shop/home"}
        >
          <RiHomeSmile2Fill size={32} className="" />
          <h1 className="text-2xl font-bold">Dripit</h1>
        </Link>

        <div className="flex items-center">
          <nav className="hidden md:flex items-center gap-6">{menuItems()}</nav>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                title="menu"
                size="icon"
                className="md:hidden"
              >
                <IoMenu size={30} />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              {menuItems()}
            </SheetContent>
          </Sheet>
          {isAuthenticated ? <HeaderRightContent /> : null}
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
