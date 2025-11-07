import { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getMessage() {
      const req = await fetch("/api");
      if (!req.ok) {
        setMessage("unable to reach /api");
      }
      const msg = await req.text();
      setMessage(msg);
    }

    getMessage();
  }, []);

  return <h1>Hello World {message}</h1>;
}
