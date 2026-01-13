"use client";

import * as React from "react";
import {
  AudioWaveform,
  Clapperboard,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Tv,
} from "lucide-react";

import { NavMain } from "@/components/layout/Sidebar/NavMain";
import { NavUser } from "@/components/layout/Sidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { disabledLayout } from "@/lib/data/disabledLayout";

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
    {
      title: "Movies",
      url: "/movies",
      icon: Clapperboard,
      isActive: true,
      items: [
        {
          title: "Explore",
          url: "/movies",
        },
        {
          title: "Popular",
          url: "/movies/popular",
        },
        {
          title: "Upcoming",
          url: "/movies/upcoming",
        },
        {
          title: "Now Playing",
          url: "/movies/now-playing",
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
      items: [
        {
          title: "Explore",
          url: "/tv",
        },
        {
          title: "Popular",
          url: "/tv/popular",
        },
        {
          title: "Airing Today",
          url: "/tv/airing-today",
        },
        {
          title: "On the Air",
          url: "/tv/on-the-air",
        },
        {
          title: "Genre",
          url: "/tv/genre",
        },
      ],
    },

    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
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
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const pathname = usePathname()

  if([...disabledLayout, "/"].includes(pathname)) return null

  return (
    <Sidebar collapsible="icon" {...props} variant="sidebar" className="font-bold">
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}