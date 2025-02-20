import { useState } from "react";
import { Table, Menu, ActionIcon, Pagination } from "@mantine/core";
import { Link } from "react-router";
import { EllipsisVertical, Edit, Eye } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyTasks } from "../taskSlice";
import EditModal from "./EditModal";

const MyTaskList = () => {
  const dispatch = useDispatch();
  const { tasks, error } = useSelector((state) => state.tasks);
  const [opened, setOpened] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchMyTasks());
  }, [dispatch]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setOpened(true);
  };

  // calculation pagination tasks
  const indexOfLastItem = currentPage * itemsPerPage;
  const IndexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = tasks.slice(IndexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        <div className="md:h-[74vh] flex flex-col justify-between">
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
              {currentTasks.map((element) => (
                <Table.Tr key={element.id}>
                  <Table.Td>
                    <Link title="view" to={`/task/${element.id}`}>
                      <Eye className="text-gray-500" size={20} />
                    </Link>
                  </Table.Td>
                  <Table.Td>{element?.id}</Table.Td>
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
          {/* pagination */}
          <div className="mt-4 flex items-center justify-center">
            <Pagination
              total={Math.ceil(tasks.length / itemsPerPage)}
              value={currentPage}
              color="#5c0931"
              onChange={handlePageChange}
            />
          </div>
        </div>
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
