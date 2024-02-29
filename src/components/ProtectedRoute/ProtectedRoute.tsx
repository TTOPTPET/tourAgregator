import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useCookies } from "react-cookie";
import { LOGGINED } from "../../config/types";

type Props = { children: JSX.Element };

function ProtectedRoute({ children }: Props) {
  const [cookies] = useCookies([LOGGINED]);

  if (cookies.LOGGINED) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth" replace />;
  }
}

export default ProtectedRoute;
