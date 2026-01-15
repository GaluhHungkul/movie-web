"use client";

import * as React from "react";
import {
  AudioWaveform,
  Clapperboard,
  Command,
  GalleryVerticalEnd,
  Trophy,
  Tv,
} from "lucide-react";

import { NavMain } from "@/components/layout/AppSidebar/NavMain";
import { NavUser } from "@/components/layout/AppSidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { disableSidebar } from "@/lib/data/disableSidebar";
import { NavProjects } from "./NavProjects";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: Trophy,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Movies",
      url: "/movies",
      icon: Clapperboard,
      isActive: false,
      items: [
        {
          title: "Explore",
          url: "/movies",
        },
        // {
        //   title: "Top Rated",
        //   url: "/showmore/top_rated",
        // },
        {
          title: "Upcoming",
          url: "/movies/upcoming",
        },
        {
          title: "Now Playing",
          url: "/movies/now_playing",
        },
        {
          title: "Genre",
          url: "/movies/genre",
        },
      ],
    },
    {
      title: "TV Series",
      url: "/tv",
      icon: Tv,
      isActive: false,
      items: [
        {
          title: "Explore",
          url: "/tv",
        },
        // {
        //   title: "Top Rated",
        //   url: "/showmore/top_rated?type=tv",
        // },
        {
          title: "Airing Today",
          url: "/tv/airing_today",
        },
        {
          title: "On the Air",
          url: "/tv/on_the_air",
        },
        {
          title: "Genre",
          url: "/tv/genre",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Top Rated",
      url: "/showmore/top_rated",
      icon: Trophy,
    },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {

  const pathname = usePathname()

  if(disableSidebar.includes(pathname)) return null

  return (
    <Sidebar collapsible="icon" {...props} variant="sidebar" className="font-bold">
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar