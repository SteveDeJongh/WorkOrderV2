import React from "react";
import ReactDom from "react-dom";

type Props = {
  open: boolean;
  children?: React.ReactNode;
  onClose: Function;
  resourceId: number;
};

function MainPaneModal({ open, children, onClose, resourceId }: Props) {
  if (!open) return null;

  function handleClose(e) {
    if (e.target.className === "main-modal-background") {
      onClose();
    }
  }

  return ReactDom.createPortal(
    <>
      <div className="main-modal-background" onClick={(e) => handleClose(e)}>
        <div className="main-modal">
          <p>Hello! {resourceId}</p>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default MainPaneModal;
