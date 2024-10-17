import NavBar from "@/components/shared/Navbar/NavBar"





export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <NavBar></NavBar>
   
        {children}
      </section>
    )
  }