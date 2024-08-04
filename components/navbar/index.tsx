"use client";

import NextLink from "next/link";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  FacebookIcon,
  CybertruckLogo,
  WebIcon,
  TeslaIcon,
} from "@/components/icons";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <CybertruckLogo width={80} />
            <p className="font-bold text-inherit text-xl">Intelligence</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="sm:flex gap-2">
          <Link
            isExternal
            href={siteConfig.links.facebook}
            aria-label="Facebook"
          >
            <FacebookIcon />
          </Link>
        </NavbarItem>
        <NavbarItem className="sm:flex gap-2">
          <Link
            isExternal
            href={siteConfig.links.web}
            aria-label="Cybertruck Owner's Club"
          >
            <WebIcon />
          </Link>
        </NavbarItem>
        <NavbarItem className="sm:flex gap-2">
          <Link
            isExternal
            href={siteConfig.links.tesla}
            aria-label="Tesla Cybertruck Homepage"
          >
            <TeslaIcon />
          </Link>
        </NavbarItem>
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
