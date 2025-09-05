import ChangeProfilePic from "./ChangeProfilePic"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="h-full w-11/12 ml-20 -scroll-my-px">
      <h1 className="mb-14 text-3xl mt-6  font-medium text-center text-black">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePic />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </div>
  )
}