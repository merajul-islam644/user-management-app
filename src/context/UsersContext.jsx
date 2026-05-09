import { useState, useEffect, useMemo, useCallback } from "react";
import { createContext } from "react";
import { toast } from "sonner";
// eslint-disable-next-line react-refresh/only-export-components
export const UsersContext = createContext();
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("users")) || [],
  );
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [confirmUpdate, setConfirmUpdate] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const isEditMode = selectedUser?.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (!users || users.length === 0) {
      setError("No users found");
    } else {
      setError(null);
    }
    setLoading(false);
  }, [users]);

  const addUser = useCallback((user) => {
    setUsers((prev) => [...prev, user]);
    toast.success("User added successfully");
  }, []);

  const updatedUser = useCallback((updateUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updateUser.id ? updateUser : user)),
    );
    setOpenEditModal(false);
    toast.success("User updated successfully");
  }, []);

  const deleteUser = useCallback((deletedId) => {
    setUsers((prev) => prev.filter((user) => user.id !== deletedId));
    setOpenModal(false);
    toast.success("User deleted successfully");
  }, []);

  const filterUser = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()),
  );
  const sortedUser = useMemo(() => {
    return [...filterUser].sort((a, b) => a.name.localeCompare(b.name));
  }, [filterUser]);

  const paginationUsers = sortedUser.slice(0, 10);

  return (
    <UsersContext.Provider
      value={{
        addUser,
        updatedUser,
        deleteUser,
        users,
        loading,
        error,
        open,
        setOpen,
        openModal,
        setOpenModal,
        selectedUser,
        setSelectedUser,
        isEditMode,
        openEditModal,
        setOpenEditModal,
        confirmUpdate,
        setConfirmUpdate,
        setSearch,
        paginationUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
