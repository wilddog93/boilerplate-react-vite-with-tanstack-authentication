import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/common/theme-switch";
import {
  SearchIcon,
  Logo,
} from "@/components/icons";
import { FC } from "react";
import UserMenus from "./user-menus";
import Notifications from "./notifications";

type NavbarProps = {
  [key: string]: unknown;
};

export const NavbarDashboard: FC<NavbarProps> = (props) => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const user = {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    name: 'Jason Hughes',
    email: 'zoey@example.com',
  }

  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <NextUINavbar
      maxWidth="full"
      position="sticky"
      className="h-16 dark:bg-foreground-50 bg-background dark:border-foreground-200 border-b"
      {...props}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className={clsx("flex justify-start items-center gap-1 md:hidden",)}
            href="/"
            prefetch={false}
          >
            <Logo />
            <p className="font-bold text-inherit">Dashboard</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem>
          <Notifications />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <UserMenus user={user} />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};