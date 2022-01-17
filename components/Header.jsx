import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between px-4 py-6 items-center">
      <div>
        <div className="text-3xl font-semibold">Vartsity PQ</div>
      </div>
      <div>
        <ul className="flex space-x-5 text-base">
          <li>How it works API</li>
          <li>Feature</li>
          <li>Requests</li>
          <li>Contributors</li>
          <li>On Review</li>
          <li>Collections</li>
          <li>Bookmarks</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
