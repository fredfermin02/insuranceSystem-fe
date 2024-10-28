'use-client'
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FunctionComponent, memo } from "react";

export type TMenuCardProps = {
    icon?:string | JSX.Element;
    title:string;
    onClick:() => void;
}

const MenuCard: FunctionComponent<TMenuCardProps> = ({
  icon,
  onClick,
  title,
}) => {
  return (
    
      <Card onClick={onClick} className="items-center flex flex-col  cursor-pointer w-80 text-center   rounded-lg  text-primary bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-primary transition-colors duration-300 hover:text-white">
        
        <CardContent className=" self-center">

            <div >
                <p>{title}</p>
            </div>
          
        </CardContent>
        
      </Card>

  );
};

export default memo(MenuCard);
