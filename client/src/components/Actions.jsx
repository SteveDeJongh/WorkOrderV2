import { useEffect } from "react";
import PropTypes from "prop-types";

function Actions({ page, openForm, disableActions, selection }) {
  useEffect(() => {
    const toggleAbles = document.querySelectorAll(".toggleable");

    function toggleActions() {
      if (disableActions) {
        [...toggleAbles].forEach((button) => {
          button.classList.toggle("disabled");
          button.disabled = true;
        });
      } else {
        [...toggleAbles].forEach((button) => {
          button.classList.toggle("disabled");
          button.disabled = false;
        });
      }
    }

    toggleActions();
  }, [disableActions]);
  return (
    <>
      <ul id="actions-list">
        <li>
          <button onClick={() => openForm(true)}>Add {page}</button>
        </li>
        <li>
          <a href={`customers/${selection}`}>
            <button className="toggleable">View</button>
          </a>
        </li>
        <li>
          <button className="toggleable">Edit</button>
        </li>
        <li>
          <button className="toggleable">Delete</button>
        </li>
      </ul>
    </>
  );
}

Actions.propTypes = {
  page: PropTypes.string,
  openForm: PropTypes.func,
  disableActions: PropTypes.bool,
};

export default Actions;
