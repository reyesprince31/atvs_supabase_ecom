import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
