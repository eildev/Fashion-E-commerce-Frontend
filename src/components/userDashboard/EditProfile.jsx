import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserInfoQuery,
  useUpdateUserMutation,
} from "../../redux/features/api/auth/authApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const userID = user?.id;

  const { data, isLoading, isError } = useGetUserInfoQuery(userID, {
    skip: !userID,
  });

  const [
    updateUser,
    {
      isLoading: isUpdating,
      isSuccess: isUpdated,
      isError: updateError,
      error,
    },
  ] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [imageFile, setImageFile] = useState(null);

  // Update form values when API data is loaded, adding leading zero to phone
  useEffect(() => {
    if (data?.user) {
      const rawPhone = data?.userDetails?.phone_number || "";
      const formattedPhone = rawPhone
        ? String(rawPhone).startsWith("0")
          ? rawPhone
          : `0${rawPhone}`
        : "";

      const userData = {
        name: data?.user?.name || "",
        email: data?.user?.email || "",
        address: data?.userDetails?.address || "",
        country: data?.userDetails?.country || "",
        region: data?.userDetails?.city || "",
        zone: data?.userDetails?.police_station || "",
        postalCode: data?.userDetails?.postal_code || "",
        phone: formattedPhone,
      };
      reset(userData);
    }
  }, [data, reset]);

  // Handle image change with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      setImageFile(file);
    }
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    if (!userID) {
      toast.error("User ID is not available. Please log in again.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", userID);
      formDataToSend.append("full_name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("city", formData.region);
      formDataToSend.append("police_station", formData.zone);
      formDataToSend.append("postal_code", formData.postalCode);
      formDataToSend.append("phone_number", formData.phone);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await updateUser({
        id: userID,
        ...Object.fromEntries(formDataToSend),
      }).unwrap();

      toast.success("User information updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      const errorMessage = err?.data?.message || "Failed to update user";
      const fieldErrors = err?.data?.errors || {};
      toast.error(errorMessage);
      Object.entries(fieldErrors).forEach(([field, messages]) => {
        toast.error(`${field}: ${messages.join(", ")}`);
      });
    }
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success("Profile updated successfully!");
    }
  }, [isUpdated]);

  useEffect(() => {
    if (updateError) {
      toast.error("Failed to update profile. Please try again.");
    }
  }, [updateError]);

  if (!userID) {
    return (
      <div className="text-center text-red-500">
        Error: User ID not found. Please log in again.
      </div>
    );
  }

  if (isLoading) return <div className="text-center">Loading user data...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Failed to load user data.</div>
    );

  return (
    <div className="tab-content p-4">
      <h3 className="text-lg fw-semibold mb-4 text-center">
        My Account Information
      </h3>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row mb-20">
              <div className="col-md-12">
                <label className="form-label">User Name *</label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  type="text"
                  className={`form-control form-control-md ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-20">
              <label className="form-label">Address *</label>
              <input
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters",
                  },
                })}
                type="text"
                className={`form-control form-control-md ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div className="mb-20">
              <label className="form-label">Country *</label>
              <input
                {...register("country", { required: "Country is required" })}
                type="text"
                className={`form-control form-control-md ${
                  errors.country ? "border-red-500" : ""
                }`}
              />
              {errors.country && (
                <span className="text-red-500 text-sm">
                  {errors.country.message}
                </span>
              )}
            </div>

            <div className="mb-20">
              <label className="form-label">Province/Region *</label>
              <select
                {...register("region", { required: "Region is required" })}
                className={`form-control form-control-md ${
                  errors.region ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Region</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Sylhet">Sylhet</option>
              </select>
              {errors.region && (
                <span className="text-red-500 text-sm">
                  {errors.region.message}
                </span>
              )}
            </div>

            <div className="mb-20">
              <label className="form-label">Zone *</label>
              <input
                {...register("zone", { required: "Zone is required" })}
                type="text"
                className={`form-control form-control-md ${
                  errors.zone ? "border-red-500" : ""
                }`}
              />
              {errors.zone && (
                <span className="text-red-500 text-sm">
                  {errors.zone.message}
                </span>
              )}
            </div>

            <div className="mb-20">
              <label className="form-label">Postal Code *</label>
              <input
                {...register("postalCode", {
                  required: "Postal code is required",
                })}
                type="text"
                className={`form-control form-control-md ${
                  errors.postalCode ? "border-red-500" : ""
                }`}
              />
              {errors.postalCode && (
                <span className="text-red-500 text-sm">
                  {errors.postalCode.message}
                </span>
              )}
            </div>

            <div className="mb-20">
              <label className="form-label">E-Mail *</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className={`form-control form-control-md ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-20">
              <label className="form-label">Phone *</label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^0[0-9]{9,}$/,
                    message:
                      "Phone number must start with 0 and be at least 10 digits",
                  },
                })}
                type="tel"
                className={`form-control form-control-md ${
                  errors.phone ? "border-red-500" : ""
                }`}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value && !value.startsWith("0")) {
                    value = `0${value}`;
                    setValue("phone", value);
                  }
                }}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* <div className="mb-20">
              <label className="form-label">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-md"
                onChange={handleImageChange}
              />
            </div> */}

            <div className="text-center">
              <button
                type="submit"
                disabled={isUpdating}
                className={`btn btn-main ${
                  isUpdating ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "Saving..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;