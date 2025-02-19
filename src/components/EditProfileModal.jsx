import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserData } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onClose, selectedUser }) => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // When a new user is selected, reset form values
  useEffect(() => {
    if (selectedUser) {
      setValue("name", selectedUser.name);
      setValue("userName", selectedUser.userName);
      setValue("email", selectedUser.email);
      setValue("bio", selectedUser.bio || "");
    }
  }, [selectedUser, setValue]);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateUserData(data)).unwrap();
      onClose(); // Close the modal after successful update
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error === "Email is already in use") {
        setEmailError("This email address is already in use");
      } else {
        console.error("Error updating user data:", error);
        toast.error("Failed to update profile");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      opened={isOpen}
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      centered
      onClose={onClose}
      title="Edit Profile"
      className="z-[1000000]"
      zIndex={1000000}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <TextInput
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={errors.name?.message}
          mb="md"
        />

        {/* User Name */}
        <TextInput
          label="User Name"
          {...register("userName", { required: "User Name is required" })}
          error={errors.userName?.message}
          mb="md"
        />

        {/* Email */}
        <TextInput
          label="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message || emailError}
          mb="md"
        />

        {/* Bio */}
        <Textarea
          label="Bio"
          {...register("bio")}
          error={errors.bio?.message}
          mb="md"
        />

        <Group position="right" mt="md">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </Group>
      </form>
    </Modal>
  );
};

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedUser: PropTypes.object.isRequired,
};

export default EditProfileModal;
