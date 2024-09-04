import React, { useState } from "react";
import Card from "../Card";
import BookedTickets from "./bookedtickets";

const ProfileManageTab = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  //temp data
  const tabMenu = ["Bookings", "Add Program"];
  const tabMenuDispComp = [<BookedTickets />, <>hello</>];

  return (
    <>
      <div
        className="mt-5 d-flex flex-wrap pt-3 px-5"
        style={{ backgroundColor: "#20242b" }}
      >
        {tabMenu.map((tab, index) => (
          <button
            key={index}
            className="btn text-light me-4 mb-3"
            style={
              selectedTabIndex == index ? { borderBottom: "1px solid" } : {}
            }
            onClick={() => setSelectedTabIndex(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabMenuDispComp.map((comp, index) => (
        <div key={index} style={{ backgroundColor: "#20242b" }} className="p-5">
          {selectedTabIndex === index && comp}
        </div>
      ))}
    </>
  );
};

export default ProfileManageTab;
