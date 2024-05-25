import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { TaskProvider } from "@/Context/task";
export default function App({ Component, pageProps }) {
  return (
    <TaskProvider>
      <Navbar />
      <Component {...pageProps} />
    </TaskProvider>
  );
}
