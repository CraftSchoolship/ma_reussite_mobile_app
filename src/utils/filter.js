const filterBySelf = (data, selfId, selfName) => {
  return data.filter(
    (item) => item.self[0] === selfId && item.self[1] === selfName
  );
};

const filterChildrenByChildId = (children, childIds) => {
  return children.filter((child) => childIds.includes(child.child_id[0]));
};

export { filterBySelf, filterChildrenByChildId };
