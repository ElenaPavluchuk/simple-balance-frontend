import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
};

// использование в компонентах
// вместо useContext -> useUser
// import { useUser } from "../context/useUser";

// const Profile = () => {
//   const { user, loading, clearUser } = useUser();

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{user?.name}</h1>
//       <button onClick={clearUser}>Logout</button>
//     </div>
//   );
// };

// подключение в provider
// import UserProvider from "./context/UserProvider";

// function App() {
//   return (
//     <UserProvider>
//       <YourApp />
//     </UserProvider>
//   );
// }
