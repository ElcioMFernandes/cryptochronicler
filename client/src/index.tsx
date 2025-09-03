/* @refresh reload */
import "./index.css";
import App from "./App.tsx";
import { render } from "solid-js/web";

const root = document.getElementById("root");

render(() => <App />, root!);
