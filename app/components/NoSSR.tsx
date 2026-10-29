"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), { ssr: false });
const SideBar = dynamic(() => import("./SideBar"), { ssr: false });

export { Header, SideBar };
