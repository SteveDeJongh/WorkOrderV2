function Actions({ page, openForm }) {
  return (
    <>
      <ul id="actions-list">
        <li>
          <button onClick={() => openForm(true)}>Add {page}</button>
        </li>
        <li>View</li>
        <li>Edit</li>
        <li>Delete</li>
      </ul>
    </>
  );
}

export default Actions;
