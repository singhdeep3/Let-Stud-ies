import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import Confirmation from "../../common/Confirmation";
const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="mt-11">Loading...</div>;
  }
  return (
    <div className="text-white h-full">
      <div className="flex min-w-[228px]  h-full flex-col border-r-[2px] border-r-amber-500  bg-rose-400 py-10">
        <div className="flex flex-col text-white">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLinks link={link} iconName={link.icon} key={link.id} />
            );
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-600"></div>

        <div className="flex flex-col ">
          <SidebarLinks
            link={{ name: "Settings", path: "dashboard/Settings" }}
            iconName={"VscSettingsGear"}
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure ?",
                text2: "You will be logged out of your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            <div className="flex items-center gap-x-2 text-black mx-auto px-8.5 cursor-pointer">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <Confirmation modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
