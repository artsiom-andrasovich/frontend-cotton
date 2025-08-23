import { ArrowBack } from "../ui";

type NavbarProps = {
  title?: string;
  path?: string;
  children?: React.ReactNode;
};

export const Navbar = ({ children, title, path }: NavbarProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ArrowBack path={path} />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
        {children}
      </div>
    </header>
  );
};
