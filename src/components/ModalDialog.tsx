import React, { useEffect, useRef } from "react";
import UIkit from "uikit";
import "./ModalDialog.css";

type ModalDialogProps = {
  title: string;
  show: boolean;
  full?: boolean;
  submitLabel?: string;
  onSubmit: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalDialog: React.FC<ModalDialogProps> = ({
  title,
  show,
  full,
  submitLabel,
  onSubmit,
  onClose,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (show) {
      UIkit.modal(ref.current).show();
    } else {
      UIkit.modal(ref.current).hide();
    }
  }, [show]);

  return (
    <div
      ref={ref}
      data-uk-modal="container: #root; stack: true; esc-close: false; bg-close: false"
      className={`uk-flex-top ${full ? "uk-modal-container" : ""}`}
    >
      {show && (
        <div className="uk-modal-dialog uk-margin-auto-vertical">
          <div className="uk-modal-header">
            <h2 className="uk-modal-title">{title}</h2>
          </div>
          <div className="uk-modal-body">{children}</div>

          <div className="uk-modal-footer uk-text-right">
            <button
              className="uk-button uk-button-default"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="uk-button uk-button-primary"
              type="button"
              onClick={() => {
                onSubmit();
                onClose();
              }}
            >
              {submitLabel ?? "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
