import Contacts from "react-native-contacts";
import { PermissionsAndroid } from "react-native";
const MESSAGE_DENIED = "Permission Denied: Read Contacts";

export const getAllContacts = callBackFunction => {
  Contacts.checkPermission((err, permission) => {
    if (!!err) {
      callBackFunction([], MESSAGE_DENIED);
      return;
    }

    if (permission === "undefined" || permission === "denied") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ).then(permission => {
        if (permission === "granted") {
          Contacts.getAll((err, contacts) => {
            if (!!err) {
              callBackFunction([], MESSAGE_DENIED);
              return;
            }
            callBackFunction(contacts, "SUCCESS");
          });
        } else {
          callBackFunction([], MESSAGE_DENIED);
        }
      });
    }

    if (permission === "authorized") {
      Contacts.getAll((err, contacts) => {
        if (!!err) {
          callBackFunction([], MESSAGE_DENIED);
          return;
        }
        callBackFunction(contacts, "SUCCESS");
      });
    }
  });
};

// Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
