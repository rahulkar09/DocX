import React, { useState, useContext } from "react";
import { Appcontext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const Myprofile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(Appcontext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    userData && (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-6">
            {isEdit ? (
              <div className="w-50">
                <div>Upload image</div>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            ) : (
              <img
                src={userData.image}
                alt="profile"
                className="w-20 h-20 rounded-full border"
              />
            )}

            <div>
              {isEdit ? (
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                </div>
              ) : (
                <p className="text-lg font-semibold">{userData.name}</p>
              )}
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p>{userData.address}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Gender</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p>{userData.gender}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p>{userData.dob}</p>
              )}
            </div>
          </div>

          {/* Edit / Save Button */}
          <div className="text-right mt-6">
            <button
              onClick={() => {
                if (isEdit) {
                  updateUserProfileData();
                } else {
                  setIsEdit(true);
                }
              }}
              className="px-4 py-1 bg-primary text-white rounded hover:bg-indigo-700"
            >
              {isEdit ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Myprofile;
