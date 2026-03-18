import { useContext, useState, useEffect } from 'react'
import { MdFacebook } from "react-icons/md";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Link, useNavigate } from 'react-router';
import { createdContext } from "./context/authContext";
import { MdHome } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function MyNavbar() {
  const { userToken, resetUserToken, setAuthUserToken } = useContext(createdContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isUserAuth = !!userToken;
  const menuItems = isUserAuth ?
    [
      "profile",
      "home",
      "logOut",
    ] :
    [
      "Login",
      "Register",
    ];
  const navigator = useNavigate()

  function handleLogOut() {
    localStorage.removeItem("tkn");
    resetUserToken();
    navigator("/login")
  }

  // useEffect(function () {
  //   const localStorageValue = localStorage.getItem('tkn');

  //   if (localStorageValue !== null) {
  //     setAuthUserToken(localStorageValue);(localStorageValue);
  //   }

  // }, []);

  return (
    <div>
      <Navbar
        position="static"
        className="fixed top-0 left-0 w-full bg-white backdrop-blur-md z-50 shadow-lg"

      >
        <NavbarContent>
          {/* toggle menu */}
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          {/* brand */}
          <NavbarBrand>
            <MdFacebook size={45} color='blue' />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {!isUserAuth &&
            <>
              <NavbarItem className="hidden lg:flex">
                <Button color="primary" variant="flat">
                  <Link to="/login" className="w-full block">Login</Link>
                </Button>
              </NavbarItem>

              <NavbarItem>
                <Button color="primary" variant="flat">
                  <Link to="/register" className="w-full block">sing up</Link>
                </Button>
              </NavbarItem>
            </>}

          {isUserAuth &&
            <div>
              <NavbarItem>
                <NavLink to="/">
                  {({ isActive }) => (
                    <MdHome
                      size={45}
                      className={isActive ? "text-blue-600" : "text-gray-400"} />
                  )}
                </NavLink>
              </NavbarItem>
            </div>
          }
        </NavbarContent>

        {isUserAuth &&
          <>
            <NavbarContent as="div" justify="end">
              <Dropdown placement="bottom-end" size='30'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="setting">
                    <Link to="/profile" className="w-full block">
                      Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={handleLogOut}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </>
        }

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"

                to={`/${item}`}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

      </Navbar>
    </div>
  )
}
