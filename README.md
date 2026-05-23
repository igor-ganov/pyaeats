# PyaEats

Maquetas de diseño de un marketplace de delivery de comida para Paraguay.
Astro + Web Components nativos, paleta "apetitosa" (estilo Glovo / PedidosYa),
tema claro / oscuro y diseño responsive (desktop + móvil).

Mismo enfoque y stack que `ParaguayCasa`.

## Desarrollo

```bash
bun install
bun run dev       # http://127.0.0.1:4322
```

Otros scripts: `bun run build`, `bun run preview`, `bun run check`.

## 5 conceptos de diseño

Cinco soluciones **radicalmente distintas** para la misma tarea (escaparate de
delivery). Se cambia entre ellas con la barra superior `ConceptNav`. Cada una es
otro lenguaje visual y otro layout — no un recoloreado.

| # | Ruta | Concepto | Carácter |
|---|------|----------|----------|
| 1 | `/` | **Apetitoso** | Tarjetas con foto, gradientes vivos, estilo Glovo/PedidosYa. Incluye el customizer 🎨 |
| 2 | `/c/editorial` | **Editorial** | Revista gastronómica: tipografía serif, rejilla asimétrica, mucho aire |
| 3 | `/c/brutalism` | **Neo-brutalism** | Bordes gruesos, sombras duras, monoespaciada, acentos ácidos |
| 4 | `/c/mapa` | **Mapa-first** | Estilo navegador: mapa a pantalla completa + bottom-sheet |
| 5 | `/c/glass` | **Glass / iOS** | Vidrio esmerilado, fondo mesh-gradient, esquinas grandes |

Todos: responsive, tema claro/oscuro (toggle 🌙/☀️ en `ConceptNav`, compartido).

### Glass — prototipo interactivo (profundizado)

El concepto Glass es un mini-app funcional, no una maqueta estática:

| Ruta | Pantalla |
|------|----------|
| `/c/glass` | Escaparate con **filtros reales** |
| `/c/glass/tienda/[id]` | Detalle por tienda (15 rutas) — reseñas + menú con "agregar" |
| `/c/glass/carrito` | Carrito con stepper, totales y confirmación |

Interactividad (vanilla Web Components, sin framework):
- **Filtros vivos**: búsqueda por texto, categoría, tabs (Cerca/Top/Promos/Nuevos),
  toggles (envío gratis / express / abierto) y precio; recuento y estado vacío.
- **Favoritos** ♥ por tienda — persistidos (`pya.glass.favorites`).
- **Carrito** — agregar desde el menú, badge en vivo en el header, stepper +/−,
  subtotal/envío/total y "confirmar pedido"; persistido (`pya.glass.cart`).
- Datos tipados en `src/data/stores.ts`; estado en `src/lib/{cart,favorites}.ts`;
  componentes en `src/components/wc/glass/`; estilos en `src/styles/glass.css`.
- Rendimiento: solo 2 `backdrop-filter`, fondo mesh estático (≈60 fps al scrollear).

**Paletas apetitosas** (botón 🎨 abajo a la derecha, `data-glass` + `pya.glass`):
`mango` (default), `tomate` (tomate-albahaca), `lima` (lima-palta), `miel`
(miel-frutos), `caramelo` (caramelo-cacao). Cada una redefine `--acc/--acc2` y el
mesh; recolorea todo el UI y funciona en claro/oscuro. Sin morado/rosa dominante.

**Animaciones modernas (modern CSS, GPU-driven)**
- **View Transitions API** (`<ViewTransitions />` en `BaseLayout`) — SPA con
  cross-fade corto (~150 ms), sin morph para evitar warp.
- **`astro:before-swap`** copia `data-theme/palette/glass` y tokens en el nuevo
  documento *antes* del snapshot → cero flash de tema/paleta al navegar.
- **`@property`** para `--acc/--acc2` como `<color>`: el cambio de paleta interpola
  suavemente los acentos (CTAs, badges, pílulas de rating), mientras la malla del
  fondo se intercambia al instante (evita repintar 3 radial-gradients × full
  viewport por cada frame durante 500 ms).
- **`animation-timeline: view()`** (scroll-driven): las tarjetas aparecen al entrar
  en el viewport, sin JS y sin replay al filtrar. Envuelto en `@supports` para
  fallback graceful.
- "Bump" del badge al agregar, press en botones, zoom de foto en hover (transform
  compositado).
- Respeta `prefers-reduced-motion` (animaciones y view-transitions anuladas).

**Métricas reales (Chrome DevTools Performance trace en `/c/glass`)**
- LCP **359 ms** · CLS **0.02** (load) → CLS **0.00** durante interacción.
- Long Animation Frames: max **84 ms** (era 1208 ms con la transición de la malla).
- Long tasks: **0** durante 5 cambios de paleta + 24 pasos de scroll.
- Scroll p95: **20.1 ms** (era 33.5 ms cuando había 30 elementos con
  `view-transition-name`; ahora son 1).

### Pantallas del concepto Apetitoso (set completo)

| Ruta | Pantalla |
|------|----------|
| `/` | Lista de tiendas — categorías, hero, chips de filtro |
| `/buscar` | Búsqueda por tipo de comida — filtros laterales y resultados |
| `/promociones` | Promociones destacadas (2x1, descuentos, envío gratis) |
| `/mapa` | Mapa con pins de tiendas + lista lateral |
| `/tienda` | Detalle de tienda: rating, reseñas y menú |

## Estructura

```
src/
├── layouts/BaseLayout.astro        Shell + pre-paint del tema
├── components/
│   ├── shell/Topbar.astro          Barra superior (search, carrito, perfil)
│   ├── shell/BottomNav.astro       Navegación inferior (móvil)
│   └── wc/                         Web Components (light DOM)
│       ├── define.ts               Base class + registro idempotente
│       ├── theme-toggle.ts         Toggle de tema (clave localStorage `pya.theme`)
│       └── index.ts                Punto único de import + bootstrap
├── styles/
│   ├── reset.css
│   ├── tokens.css                  Tokens + tema oscuro [data-theme="dark"]
│   ├── components.css              Componentes + responsive
│   └── global.css                  Orquesta los @import
└── pages/                          index, buscar, promociones, mapa, tienda
```

## Personalizador en vivo

Botón flotante 🎨 (abajo a la derecha) abre el `<customizer-panel>`. Ejes de diseño,
escritos a `<html data-*>` y persistidos en `localStorage`:

- **Paleta** (`data-palette`) — `apetitoso` · `mango` · `tropical` · `frutilla` · `uva` · `paraguay`.
  Cambia las marcas (primary / promo / accent / rating); funciona en tema claro y oscuro.
- **Forma** (`data-shape`) — `redondo` · `suave` · `recto` · `pildora`. Controla los radios
  (`--r-sm/-md/-lg/-pill`) de tarjetas, chips y botones.
- **Ajuste fino** — sliders que escriben tokens inline en `<html>`: radio de tarjetas
  (`--r-md`), radio del hero (`--r-lg`), espaciado (`--gap`), altura de fotos (`--thumb-h`).
- **Restablecer todo** vuelve a los valores por defecto (`apetitoso` / `redondo`).

Combinable con el toggle de tema 🌙/☀️ (claro/oscuro). Las elecciones se aplican en todas
las pantallas y sobreviven a la recarga.

## Notas de diseño

- **Tema**: resuelto antes del primer paint en `BaseLayout` (sin flash), respeta
  `prefers-color-scheme` y persiste la elección en `localStorage` (`pya.theme`).
- Imágenes de comida con **emojis + gradientes** → maquetas autónomas, sin assets.
- Accesibilidad: foco visible, `aria-label` en íconos, `prefers-reduced-motion`.
