import toast from "react-hot-toast";

export const successHandler = () => {
  toast.success(`Done!`, { icon: "✨" });
};
export const errorHandler = (error: any) => {
  toast.error(`${error}`, { icon: "💣" });
};
