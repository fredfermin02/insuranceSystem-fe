import { AppSidebar } from "@/components/app-sidebar"
import { DynamicBreadcrumbs } from "@/components/shared/Navbar/DynamicBreadcrumbs";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"



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
        <header className="flex sticky top-0 bg-white h-16 shrink-0 items-center gap-2 border-b px-4 dark:bg-neutral-950">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {/* Render dynamic breadcrumbs */}
          <DynamicBreadcrumbs />
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
      

      
      
    

  );
}
