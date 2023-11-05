import { useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { EqubContext } from "../context/context";

const Toast = ({ ...props }) => {
  const { title, description, status, duration, isClosable } = props;
  const { setToastNotifcation, toastNotification } = useContext(EqubContext);
  const toast = useToast();
  // console.log("props ->", props)
  // console.log("toastNotification ->", toastNotification)
  useEffect(() => {
    console.log({ toastNotification });
    setToastNotifcation(false);
  });

  toast({
    title: title,
    description: description,
    status: status,
    duration: duration,
    isClosable: isClosable,
  });
};

export default Toast;
