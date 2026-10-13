import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { logout } from "../redux/features/auth/authSlice";

const WorkspaceNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const displayName = user?.name || user?.email?.split("@")[0] || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <div className="max-w-full mx-auto w-full flex h-14 items-center justify-between gap-2 rounded-3xl md:rounded-full border border-border backdrop-blur pl-2 pr-2 sm:pl-3">
        {/* Logo + section tag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-heading text-lg font-bold text-text">
            <span className="h-8 w-8 rounded-lg bg-linear-to-br from-gold to-coral shadow-lg" />
            SprintFlow
          </div>
          {/* <span className="hidden h-5 w-px bg-border/80 sm:block" />
          <span className="hidden rounded-full border border-lime/30 bg-lime/10 px-3 py-0.5 text-xs font-semibold text-lime sm:block">
            Workspace
          </span> */}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Greeting + avatar */}
          <div className="flex items-center gap-3">
            <span
              title={user?.email}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gold to-coral text-sm font-bold text-black ring-2 ring-border/60 capitalize"
            >
              {initial}
            </span>
            <p className="hidden text-sm text-muted md:block">
              Welcome back, {" "}
              <span className="max-w-32 truncate font-semibold text-text capitalize">
                {displayName}
              </span>
            </p>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={() => dispatch(logout())}
            aria-label="Log out"
            className="group flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-sm text-muted transition hover:border-coral/60 hover:bg-coral/10 hover:text-coral sm:px-4"
          >
            <LogOut
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default WorkspaceNavbar;
