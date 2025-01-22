import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const AddToFav: React.FC = () => {
  return (
    <div className="flex items-center">
        <Button variant={"link"} className="flex items-center gap-2 md:gap-4" asChild>
      <Link to="/favorites">
          <BookmarkPlus className="w-5 h-5 text-slate-900" />
      </Link>
        </Button>
    </div>
  );
};

export default AddToFav;
