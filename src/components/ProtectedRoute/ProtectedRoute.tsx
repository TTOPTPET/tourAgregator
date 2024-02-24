import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

type Props = { children: JSX.Element };

function ProtectedRoute({ children }: Props) {
  const islogined: boolean = useSelector(
    (state: RootState) => state?.userInfo?.islogined as boolean
  );

  if (islogined) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth" replace />;
  }
}

export default ProtectedRoute;
