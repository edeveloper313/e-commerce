
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type myButtonProps={
content:string;
}

const MyButton = ({content}:myButtonProps) => {
  const CollaborateButton = ({ className }: { className?: string }) => (
    <Button className={cn("relative text-sm font-medium rounded-full h-10 p-1 ps-4 pe-12 group transition-all duration-500 hover:ps-12 hover:pe-4 w-fit overflow-hidden hover:bg-primary/80", className)}>
      <span className="relative z-10 transition-all duration-500 hover:cursor-pointer">
        {content}
      </span>
      <div className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );
  return <>
              <CollaborateButton className="hidden lg:flex" />

  </>;
};

export default MyButton;
