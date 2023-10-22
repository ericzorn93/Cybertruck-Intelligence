import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="w-full flex items-center justify-center py-3 gap-2">
      <span className="text-default-600">
        Built with ❤️ for the Tesla Cybertruck by
      </span>
      <p className="text-default-400 font-bold">Eric Zorn</p>
    </footer>
  );
};
