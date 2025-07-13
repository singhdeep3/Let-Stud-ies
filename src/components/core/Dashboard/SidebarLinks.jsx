import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const SidebarLinks = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <NavLink
      to={link.path}
      className={` relative px-8 py-2 ${
        matchRoute(link.path) ? "bg-amber-400" : "bg-rose-400 text-black"
      } transition-all duration-200` } 
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-400 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        } `}
      ></span>

      <div className="flex items-center gap-x-2 text-black">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLinks;
