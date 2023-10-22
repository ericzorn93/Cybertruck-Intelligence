"use client";

import NextLink from "next/link";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { useWindowSize } from "usehooks-ts";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { FacebookIcon, GithubIcon, CybertruckLogo } from "@/components/icons";

export const Navbar = () => {
  const windowSize = useWindowSize();
  const isSmallWindow = windowSize.width < 600;

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <CybertruckLogo width={isSmallWindow ? 80 : 100} />
            <p className="font-bold text-inherit text-xl">
              Cybertruck Intelligence
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            isExternal
            href={siteConfig.links.facebook}
            aria-label="Twitter"
          >
            <FacebookIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
