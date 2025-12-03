
import { useEffect } from "react";

import { useTokenMutation } from "./redux/features/auth/authApi";
import { useAppDispatch } from "./redux/hooks";
import { setUser } from "./redux/features/auth/authSlice";


function App() {
  const [tokenApi] = useTokenMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await tokenApi({
          tokenType: "frontEndTest",
        }).unwrap();
        const token = res?.token;
        const expire = res?.expire;
        dispatch(setUser({ expire, token }));
      } catch (error: unknown) {
        console.error(error);
      }
    };
    getToken();
  }, [tokenApi, dispatch]);





  return <main className=""></main>;
}

export default App;
