import React from "react";
import "./Alert.css"

export default function AlertDialog(props) {
  return (
    <div
      open={props.open}
      className="alert-container"
    >
        <div className="alert-body">
          {props.content}
      </div>
      <div className="button-actions">
        {props.actionButtonText && (<button onClick={props.handleAccept} className="btn">
            {props.actionButtonText}
          </button>)}
        {props.isRejectRequired && (
            <button onClick={props.handleReject} className="btn">
              {props.cancelButtonText}
            </button>
        )}
      </div>
      </div>
  );
}
