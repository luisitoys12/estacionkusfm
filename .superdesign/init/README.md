# SuperDesign init for Estación KUS FM

Este proyecto incluye la skill **superdesign** para inspiración visual y drafts UI.

Para inicializar el contexto localmente en tu Codespace (o máquina):

```bash
npm install -g @superdesign/cli@latest
superdesign --version
superdesign login

# Desde la raíz del repo
superdesign init
```

Esto generará la carpeta `.superdesign/init/` con:

- `components.md` — componentes de UI reutilizables
- `layouts.md` — layouts principales (navbar, footer, grids)
- `routes.md` — rutas/páginas
- `theme.md` — design tokens, CSS variables, tipografías
- `pages.md` — árbol de dependencias por página

Una vez generado, usa `superdesign` para iterar nuevos drafts y flujos antes de llevarlos a código.
