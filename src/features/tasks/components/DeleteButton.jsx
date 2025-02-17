import { Trash2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../taskSlice";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const DeleteButton = ({ id }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.tasks);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTask(id)).unwrap(); // unwrap returns a promise for the fulfilled state
      toast.success("Item deleted successfully");
    } catch (err) {
      toast.error("Failed deleting task");
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="flex items-center gap-2" onClick={() => handleDelete(id)}>
      {isLoading ? (
        <span>Deleting...</span>
      ) : (
        <>
          <Trash2Icon size={20} /> Delete
        </>
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

DeleteButton.prototypes = {
  id: PropTypes.any.isRequired,
};

export default DeleteButton;
