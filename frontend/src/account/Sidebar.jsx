import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div className="flex flex-col w-full border rounded-xl shadow-sm p-4 mt-4">
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/account/posts"
            className={({ isActive }) =>
              isActive ? "font-bold" : "text-gray-700"
            }
          >
            Posts
          </NavLink>
          <NavLink
            to="/account/savedPosts"
            className={({ isActive }) =>
              isActive ? "font-bold" : "text-gray-700"
            }
          >
            Saved Posts
          </NavLink>
          <NavLink
            to="/account/conversations"
            className={({ isActive }) =>
              isActive ? "font-bold" : "text-gray-700"
            }
          >
            Conversations
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
