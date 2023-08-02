import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectRouteProp {
  children: React.ReactNode;
}
const ProtectRoute = (props: ProtectRouteProp) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, [navigate, token]);

  return props.children;
};

export default ProtectRoute;
