import React, { Fragment } from "react";

function ErrorMessage(props) {
  const { errorCode } = props;

  function getErrorMessage() {
    switch (errorCode) {
      case "item-get-fail":
        return "Failed to get stocked items.";
      default:
        return "Oops, something went wrong.";
    }
  }

  return errorCode
    ? (
      <Fragment>
        <p className="error">{getErrorMessage()}</p>

        <style jsx global>
          {`
        .error {
          font-family: sans-serif;
          font-weight: bold;
          color: #a33535;
          background-color: #e0caca;
          padding: 5px;
          text-align: center;
        }
      `}
        </style>
      </Fragment>
    )
    : null;
}

export default ErrorMessage;
