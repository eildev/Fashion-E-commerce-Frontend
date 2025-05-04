import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserInfoQuery, useUpdateUserMutation } from '../../redux/features/api/auth/authApi';
import { useForm } from 'react-hook-form';

const EditProfile = () => {
     const { token, user } = useSelector((state) => state.auth);
     const userID = user?.id;
console.log(user);
     const { data, isLoading, isError } = useGetUserInfoQuery(userID, {
       skip: !userID,
     });
     console.log(data);
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
   
    //  const [imagePreview, setImagePreview] = useState(avatarPlaceholder);
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
        //  if (data.userDetails?.image) {
        //    setImagePreview(data.userDetails.image); // Use userDetails.image
        //  }
       }
     }, [data, reset]);
    return (
        <div>
             <div className="tab-content p-4">
  <h3 className="text-lg fw-semibold mb-4 text-center">My Account Information</h3>

  <div className="row justify-content-center">
    <div className="col-md-8">
      <form>
        <div className="row mb-20">
          <div className="col-md-12">
            <label className="form-label">User Name *</label>
            <input type="text" className="form-control form-control-md" defaultValue={user?.name} />
          </div>
        </div>

        <div className="mb-20">
          <label className="form-label">E-Mail *</label>
          <input type="email" className="form-control form-control-md" defaultValue={user?.email} />
        </div>

        <div className="mb-20">
          <label className="form-label">Phone *</label>
          <input type="tel" className="form-control form-control-md" defaultValue={user?.phone} />
        </div>

        <div className="text-center">
          <button type="button" className="btn btn-main ">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>

        </div>
    );
};

export default EditProfile;