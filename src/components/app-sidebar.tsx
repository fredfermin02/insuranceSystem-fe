"use client"
import * as React from "react"
import { ChevronRight } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar"
import { Collapsible,
  CollapsibleContent,
  CollapsibleTrigger, } from "./ui/collapsible"

import Link from "next/link";
import useAuthUser from "@/hooks/use-auth-user"

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebar = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      {
        title: "Monitoring2 Center",
        url: "/dashboard",
        items: [
          {
            title: "Agents",
            url: "/dashboard/agents",
          },
        ],
      },
      {
        title: "Community",
        url: "#",
        items: [
          {
            title: "Contribution Guide",
            url: "#",
          },
        ],
      },
    ],
  }
  const user = useAuthUser();
  if (user?.isAdmin) {
    sidebar.navMain[0].items.push({
      title: "File Upload",
      url: "/dashboard/fileupload",
    })
    sidebar.navMain[0].items.push({
      title: "Payroll",
      url: "/dashboard/payroll",
    })
  }

  return (
    <Sidebar className="z-40" {...props}>
      <SidebarHeader>
        <h1 className="justify-center align-middle font-bold self-center text">Monitoring Center</h1>

      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {sidebar.navMain.map((item,index) => (
          <Collapsible
            key={index}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem,index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild>
                          
                          <Link href={subItem.url} >{subItem.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}