import { headers } from "next/headers";

export default function Page() {
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };
  
  return (
    <div className="flex gap-8 flex-wrap">
      <h1>DASHBOARD</h1>
    </div>
  );  

  
}
