import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, children, onclose }) => {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  });
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onclose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
