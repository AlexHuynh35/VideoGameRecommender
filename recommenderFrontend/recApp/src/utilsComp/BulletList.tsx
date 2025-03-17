import React from "react";

type ListProp = {
  listType: string;
  list: string[];
}

const BulletList: React.FC<ListProp> = ({ listType, list }) => {
  if (!list || list.length === 0) {
    return (
      <div className="bg-cyan-50 rounded-xl p-2">
        <p className="font-bold">{listType}</p>
      </div>
    );
  }
  return (
    <div className="bg-cyan-50 rounded-xl p-2">
      <p className="font-bold">{listType}</p>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BulletList