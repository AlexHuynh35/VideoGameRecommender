import React from "react";

type ListProp = {
  listType: string;
  list: string[];
}

const BulletList: React.FC<ListProp> = ({ listType, list }) => {
  if (!list || list.length === 0) {
    return <p>No {listType} available.</p>;
  }
    
  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default BulletList