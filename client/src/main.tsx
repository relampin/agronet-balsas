import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>AGRONET.TEC.BR - Internet de Alta Velocidade</title>
      <meta name="description" content="Internet de alta velocidade para o campo e a cidade. Planos de fibra óptica e rádio com instalação grátis. Atendemos áreas rurais e urbanas." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="AGRONET.TEC.BR - Internet de Alta Velocidade" />
      <meta property="og:description" content="Internet de alta velocidade para o campo e a cidade. Planos de fibra óptica e rádio com instalação grátis." />
      <meta property="og:type" content="website" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    </Helmet>
    <App />
  </HelmetProvider>
);
