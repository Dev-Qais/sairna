import AppRoute from "./routes/AppRoute";
import { useThemeStore } from "./store/useThemeStore"
import {useEffect} from "react"
function App() {

  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div>
      <AppRoute />
    </div>
  )
}

export default App
