import React from "react";

const MenuLink = ({ Icon, text }) => {
  return (
    <div className="sidebarItem">
      <Icon className="ImageItem" />
      <span className="title">{text}</span>
    </div>
  );
};

export default MenuLink;
