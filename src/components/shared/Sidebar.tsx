import { NavLink } from "react-router-dom";
import Logo from "@/images/logo/logo.svg";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-70 flex-col bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>
      {/* Header */}
      <div className="flex flex-col">
        <nav className="mt-5 py-4 px-4">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">MENU</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink to="/dashboard">
                  <div className="bg-red-400">Dashboard</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/products">
                  <div className="bg-red-400">Products</div>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
