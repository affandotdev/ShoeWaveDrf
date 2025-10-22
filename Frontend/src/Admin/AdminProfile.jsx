// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const AdminProfile = () => {
//   const { user, updatePassword } = useAuth(); 
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();

//     if (!oldPassword || !newPassword || !confirmPassword) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("New password and confirm password do not match");
//       return;
//     }

//     try {
//       setLoading(true);
     
//       await updatePassword(oldPassword, newPassword);
//       toast.success("Password updated successfully!");
//       setOldPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//     } catch (error) {
//       toast.error(error.message || "Failed to update password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
//       <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

//       <div className="mb-4">
//         <p>
//           <strong>Name:</strong> {user?.name || "Admin"}
//         </p>
//         <p>
//           <strong>Email:</strong> {user?.email}
//         </p>
//       </div>

//       <form onSubmit={handlePasswordChange} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Old Password</label>
//           <input
//             type="password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Updating..." : "Update Password"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminProfile;
