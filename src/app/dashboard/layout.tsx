
import { AppSidebar } from "@/components/app-sidebar";
import AvatarCollapsableMenu from "@/components/AvatarCollapsibleMenu";
import EditProfileSheet from "@/components/editProfileSheet";
import { DynamicBreadcrumbs } from "@/components/shared/Navbar/DynamicBreadcrumbs";
import { Separator } from "@/components/ui/separator";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="">
          <header className="flex sticky top-0 bg-white h-16 shrink-0 items-center gap-2 border-b px-4 dark:bg-neutral-950 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumbs />
            </div>
            <div className="ml-auto">
            <AvatarCollapsableMenu />
            </div>
            
            {/* <EditProfileSheet  /> */}
          </header>

          {/* Make only the content scrollable */}
          <div className="p-4 max-w-[100vw]">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
