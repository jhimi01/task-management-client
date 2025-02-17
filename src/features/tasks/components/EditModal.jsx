import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Group,
  Modal,
  Textarea,
  TextInput,
  Checkbox,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateTask } from "../taskSlice"; // Import update action

const EditModal = ({ setOpened, opened, selectedTask }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // When a new task is selected, reset form values
  useEffect(() => {
    if (selectedTask) {
      setValue("title", selectedTask.title);
      setValue("description", selectedTask.description);
      setValue("status", selectedTask.status === "completed");
      const formattedDate = selectedTask.dueDate
        ? new Date(selectedTask.dueDate).toISOString().split("T")[0]
        : "";
      setValue("dueDate", formattedDate);
    }
  }, [selectedTask, setValue]);

  // Handle submit
  const onSubmit = (data) => {
    const updatedTask = {
      ...selectedTask,
      title: data.title,
      description: data.description,
      status: data.status ? "completed" : "pending",
      dueDate: new Date(data.dueDate),
    };

    dispatch(updateTask(updatedTask));
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      centered
      onClose={() => setOpened(false)}
      title="Edit Task"
      zIndex={1000000} 
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
          mb="md"
        />

        {/* Due Date */}
        <div className="mb-5">
          <label htmlFor="dueDate" className="text-sm">
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            {...register("dueDate", { required: "Due date is required" })}
            className="w-full border border-gray-300 p-2 focus:outline-none"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        <Textarea
          label="Description"
          {...register("description", { required: "Description is required" })}
          error={errors.description?.message}
          mb="md"
        />
        <Checkbox label="Mark as completed" {...register("status")} mb="md" />

        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Modal>
  );
};

EditModal.propTypes = {
  setOpened: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  selectedTask: PropTypes.object,
};

export default EditModal;
