import { ConfirmForm } from "./confirm.form";

interface ConfirmPageProps {
  searchParams: {
    userId?: string;
    email?: string;
  };
}

export default function ConfirmPage({ searchParams }: ConfirmPageProps) {
  const { userId, email } = searchParams;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ConfirmForm userId={userId} email={email} />
      </div>
    </div>
  );
}
