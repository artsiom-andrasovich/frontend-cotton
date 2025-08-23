import { ConfirmForm } from "./confirm.form";

interface ConfirmPageProps {
  searchParams: Promise<{
    userId?: string;
    email?: string;
  }>;
}

export default async function ConfirmPage({ searchParams }: ConfirmPageProps) {
  const params = await searchParams;
  const { email, userId } = params;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ConfirmForm userId={userId} email={email} />
      </div>
    </div>
  );
}
