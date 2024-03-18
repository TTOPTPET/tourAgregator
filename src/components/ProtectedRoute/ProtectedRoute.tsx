import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useCookies } from "react-cookie";
import { LOGGINED, ROLE } from "../../config/types";

type Props = { children: JSX.Element };

function ProtectedRoute({ children }: Props) {
  const [cookies] = useCookies([LOGGINED, ROLE]);

  if (cookies.LOGGINED && cookies.ROLE != 3) {
    return <>{children}</>;
  } else if (cookies.ROLE === 3) {
    return <Navigate to="/admin" replace />;
  } else {
    return <Navigate to="/auth" replace />;
  }
}

export default ProtectedRoute;
