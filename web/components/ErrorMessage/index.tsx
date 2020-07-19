import React, { Fragment } from "react";

function ErrorMessage(props) {
  const { errorCode } = props;

  function getErrorMessage() {
    switch (errorCode) {
      case "anonymous-auth-failed":
        return "Anonymous authentication failed. Try again.";
      case "grocery-list-not-found":
        return "The grocery list could not be found. Try creating a new one.";
      case "grocery-list-get-fail":
        return "Failed to retrieve the grocery list. Try again.";
      case "add-list-item-error":
        return "Failed to add grocery item to list. Try again.";
      case "create-list-error":
        return "Failed to create the grocery list. Try again.";
      case "add-user-to-list-error":
        return "Failed to add user to the grocery list. Try again.";
      case "grocery-item-desc-req":
        return "grocery item description required";
      case "duplicate-item-error":
        return "grocery item on list already";
      case "user-name-required":
        return "your name is required";
      case "grocery-list-item-get-fail":
        return "failed to get grocery list items";
      default:
        return "Oops, something went wrong.";
    }
  }

  return errorCode ? (
    <Fragment>
      <p className="error">{getErrorMessage()}</p>

      <style jsx global>{`
        .error {
          font-family: sans-serif;
          font-weight: bold;
          color: #a33535;
          background-color: #e0caca;
          padding: 5px;
          text-align: center;
        }
      `}</style>
    </Fragment>
  ) : null;
}

export default ErrorMessage;
