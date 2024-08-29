import { toast } from "react-toastify";

const toastHandler = ({ data, error, pending }) => {
  toast.dismiss();
  if (pending) {
    toast.loading(pending);
  }
  if (data) {
    toast.success(data);
  }
  if (error) {
    toast.error(error);
  }
};

export default toastHandler;
