import { useEffect, useState } from "react";

const Footer = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    // Écoute les changements de thème
    window.addEventListener("themeChanged", handleThemeChange);

    return () => {
      window.removeEventListener("themeChanged", handleThemeChange);
    };
  }, []);

  return (
    <div className={`footer ${isDark ? "footer_dark" : "footer_light"}`}>
      <p>Emilie Le Rouzic + Antoine * (Provain + Noel)</p>
    </div>
  );
};

export default Footer;
