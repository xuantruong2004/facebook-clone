import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";

import "./UserModal.scss";
import UserItem from "../LeftSidebar/UserItem";
const UserModal = ({ modalOpened, setModalOpened, persons }) => {
  const theme = useMantineTheme();
  const widthScreen = window.screen.availWidth;

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size={widthScreen > 700 ? "40%" : "80%"}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div className="userModal">
        <h2>User</h2>
        <div className="user">
          {persons.map((person) => (
            <UserItem key={person._id} person={person} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
