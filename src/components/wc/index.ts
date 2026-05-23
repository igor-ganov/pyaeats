/**
 * Single import point for all custom elements.
 * Imported by BaseLayout via <script>; runs once per page (client-side only).
 */
import { bootstrapTheme } from './theme-toggle.ts';
import { bootstrapTokens } from './customizer-panel.ts';

import './theme-toggle.ts';
import './customizer-panel.ts';

bootstrapTheme();
bootstrapTokens();
