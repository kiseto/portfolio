import { themeStorageKey } from "@/components/portfolio/theme-storage";

export function ThemeInitScript() {
  return (
    <script
      id="theme-init"
      dangerouslySetInnerHTML={{
        __html: `
        (() => {
          try {
            const savedTheme = window.localStorage.getItem("${themeStorageKey}");
            const theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
            document.documentElement.classList.toggle("dark", theme === "dark");
          } catch {
            document.documentElement.classList.add("dark");
          }
        })();
      `,
      }}
    />
  );
}
