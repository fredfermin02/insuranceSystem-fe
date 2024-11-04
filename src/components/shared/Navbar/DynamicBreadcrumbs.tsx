"use client"
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'; // Adjust based on your component structure

export function DynamicBreadcrumbs() {
  const pathname = usePathname(); // Get the current pathname, e.g., "/dashboard/fileupload"

  // Split the pathname into segments
  const pathArray = pathname.split('/').filter(Boolean);

  // Optionally map path segments to more user-friendly labels
  const pathMap: Record<string, string> = {
    dashboard: 'Dashboard',
    fileupload: 'File Upload',
    agents: 'Agents',
    // Add more mappings if needed
  };

  // Generate breadcrumb items
  const breadcrumbs = pathArray.map((segment, index) => {
    // Create the href for each breadcrumb
    const href = `/${pathArray.slice(0, index + 1).join('/')}`;

    // Check if it's the last breadcrumb
    const isLast = index === pathArray.length - 1;

    // Map segment to a more user-friendly label if available
    const label = pathMap[segment] || segment;

    return (
      <BreadcrumbItem key={href}>
  {isLast ? (
    <BreadcrumbLink>{decodeURIComponent(label)}</BreadcrumbLink>
  ) : (
    <BreadcrumbLink href={href}>{decodeURIComponent(label)}</BreadcrumbLink>
  )}
  {!isLast && <BreadcrumbSeparator />} {/* This is now a <span> element */}
</BreadcrumbItem>

    
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
    </Breadcrumb>
  );
}
