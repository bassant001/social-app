import React, { useContext, useState, useEffect } from 'react'
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
      "sing up",
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
      <Navbar position="static" className="bg-blue-300" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          {/* toggle menu */}
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          {/* brand */}
          <NavbarBrand>
            <p className="font-bold text-inherit">social App</p>
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
            <>
              <NavbarItem>
                <Link color="foreground" className="w-full block" to="/">
                  Home
                </Link>
              </NavbarItem>
            </>
          }
        </NavbarContent>

        {isUserAuth &&
          <>
            <NavbarContent as="div" justify="end">
              <Dropdown placement="bottom-end">
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
