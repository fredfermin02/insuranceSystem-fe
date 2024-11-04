

export default function AuthLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

    return (
      <section className="h-screen w-screen flex flex-col justify-center items-center bg-background md:grid md:grid-cols-2">
      
      
      {/* Block that shows only on large screens */}
      <div className="hidden md:flex bg-primary items-center justify-center h-full w-full">
        {/* Content inside the block */}
        <h2 className="text-white text-4xl font-bold px-10">Welcome to Monitoring Center</h2>
      </div>
      
      <div className="flex  justify-center  ">
        
        {children}
        
      </div>
    </section>
    )
  }