import { Badge } from "@/components/ui/badge";
import React from "react";

const RequiredBadge = () => {
  return (
    <Badge className="ms-2" variant="destructive" size="sm">
      Required
    </Badge>
  );
};

export default RequiredBadge;
