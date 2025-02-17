import { useState } from "react";
import { Table, Menu, ActionIcon } from "@mantine/core";
import { Link } from "react-router";
import { EllipsisVertical, Fullscreen, Edit } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyTasks } from "../taskSlice";
import EditModal from "./EditModal";

const MyTaskList = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);
  const [opened, setOpened] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  console.log("tasks", tasks)

  useEffect(() => {
    dispatch(fetchMyTasks());
  }, [dispatch]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setOpened(true);
  };

  // if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {!tasks || tasks.length === 0 ? (
        <div className="h-[74vh] flex items-center justify-center text-3xl">
          <h1>There is no data available</h1>
        </div>
      ) : (
        <Table stickyHeader stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>userId</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Create Date</Table.Th>
              <Table.Th>End Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tasks.map((element) => (
              <Table.Tr key={element.id}>
                <Table.Td>
                  <Link to={`/task/${element.id}`}>
                    <Fullscreen
                      size={20}
                      className="text-gray-600 cursor-pointer duration-300"
                    />
                  </Link>
                </Table.Td>
                <Table.Td>{element?.userId}</Table.Td>
                <Table.Td>
                  <p className="capitalize">{element?.title}</p>
                </Table.Td>
                <Table.Td>
                  {new Date(element?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </Table.Td>

                <Table.Td>
                  {new Date(element?.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </Table.Td>
                <Table.Td>
                  <h4
                    className={`px-4 py-1 text-sm font-semibold rounded-full ${
                      element?.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {element?.status}
                  </h4>{" "}
                </Table.Td>
                <Table.Td>
                  <Menu withArrow>
                    <Menu.Target>
                      <ActionIcon
                        style={{ backgroundColor: "#d1d5db", color: "#000" }}
                        className="bg-gray-300 hover:bg-gray-600 p-2 rounded"
                      >
                        <EllipsisVertical strokeWidth={1.25} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item onClick={() => handleEditClick(element)}>
                        <div className="flex items-center gap-2">
                          <Edit size={20} /> Edit
                        </div>
                      </Menu.Item>
                      <Menu.Item color="red">
                        <DeleteButton id={element?.id} />
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}

      <EditModal
        // onSave={handleSave}
        opened={opened}
        setOpened={setOpened}
        selectedTask={selectedTask}
      />
    </div>
  );
};

export default MyTaskList;
