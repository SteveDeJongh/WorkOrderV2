import PropTypes from "prop-types";

function NoSelection({ item }) {
  return (
    <>
      <h1>No {item} selected.</h1>
    </>
  );
}

NoSelection.propTypes = {
  item: PropTypes.string,
};

export default NoSelection;
