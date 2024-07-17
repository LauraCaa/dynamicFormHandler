import "@/assets/styles.css"
import Form from "@/components/form";
import { useState } from "react";
export default function Home() {
  const[isOpen, setIsOpen]= useState(false);
  function toggleIsOpen(value) {
    setIsOpen(value)
  }
  return (
    <main>
      <button onClick={() => toggleIsOpen(!isOpen)}>Register</button>
      <Form isOpen={isOpen} toggleIsOpen={toggleIsOpen}></Form>
    </main>
  );
}
