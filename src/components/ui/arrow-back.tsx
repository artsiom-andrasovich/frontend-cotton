import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export function ArrowBack({ path }: { path?: string }) {
  const { back, push } = useRouter();

  const handleBack = () => {
    if (!path) back();
    else {
      push(path);
    }
  };

  return (
    <Button onClick={handleBack} variant="ghost" size="sm" className="p-2">
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );
}
