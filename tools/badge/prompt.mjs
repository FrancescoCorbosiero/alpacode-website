// Builds docs/credits-badge-prompt.md: the prompt to paste in a Claude Code
// chat on a client's codebase, with the badge's source embedded verbatim
// (tools/badge/alpacode-badge.js is the one source). Run: npm run badge-prompt
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("./alpacode-badge.js", import.meta.url), "utf8").trimEnd();

const prompt = `# Add the «Made by Alpacode» credit badge

This site was built by Alpacode (https://alpacode.it). Add its credit badge to
the site footer. The badge is a self-contained Web Component
(\`<alpacode-badge>\`): one vanilla JS file, no dependencies, Shadow DOM, so
the site's CSS can't break it and it can't touch the site's CSS.

## Do this

1. **Find the stack and the footer.** Identify the framework (plain HTML,
   Astro, Next.js, Nuxt/Vue, SvelteKit, React/Vite, WordPress theme, Shopify
   theme, …) and the component/template that renders the footer on every page.

2. **Self-host the file.** Create it in the project's static folder
   (\`public/\`, \`static/\`, the theme's \`assets/\`, …) as
   \`alpacode-badge.js\`, with **exactly** the content at the end of this
   prompt. Don't edit it, don't reformat it, don't hotlink it from
   alpacode.it, don't npm-install anything.

3. **Load it once, deferred**, on every page:
   - plain HTML / Astro / SvelteKit / Nuxt: \`<script src="/alpacode-badge.js" defer></script>\` in the shared layout's head (Nuxt: \`app.head.script\`; Astro: \`is:inline\`).
   - Next.js: \`<Script src="/alpacode-badge.js" strategy="lazyOnload" />\` in the root layout.
   - WordPress: \`wp_enqueue_script('alpacode-badge', get_theme_file_uri('assets/alpacode-badge.js'), [], null, ['strategy' => 'defer', 'in_footer' => true])\`.
   - Shopify: \`<script src="{{ 'alpacode-badge.js' | asset_url }}" defer></script>\` in \`theme.liquid\`.

4. **Place the element** in the footer's bottom row (next to the copyright,
   or right-aligned), keeping the inner link — it's the fallback without JS
   and what crawlers read:

   \`\`\`html
   <alpacode-badge lang="it" theme="light">
     <a href="https://alpacode.it">Realizzato da Alpacode</a>
   </alpacode-badge>
   \`\`\`

   - \`lang\`: \`it\` or \`en\` — the page's language (on a bilingual site, bind it
     to the current locale; English fallback text: "Made by Alpacode").
   - \`theme\`: \`light\` on a light footer, \`dark\` on a dark one, \`auto\` only if
     the site itself follows the OS colour scheme. Look at the real
     footer background, don't guess.
   - \`compact\`: add it only if the footer has no room (it shows the alpaca
     window alone, 48×48; the label stays for screen readers).
   - Leave \`rel\` alone unless asked (the default is \`noopener\`).

5. **Framework notes.** React 18/19, Vue, Svelte render custom elements as-is:
   pass the attributes as plain strings. In TSX, if the type checker complains,
   declare it: \`declare namespace JSX { interface IntrinsicElements { "alpacode-badge": any } }\`
   (React 19: \`declare module "react" { namespace JSX { interface IntrinsicElements { "alpacode-badge": any } } }\`).
   Vue/Vite: \`compilerOptions.isCustomElement = (t) => t === "alpacode-badge"\`.
   If the site sends a Content-Security-Policy, \`script-src 'self'\` already
   covers a self-hosted file; nothing else is needed (no inline script, no
   external requests, no fonts loaded).

6. **Don't** restyle its insides, wrap it in a card, change its colours,
   or add hover effects of your own: the motion is part of it. You may set
   only its placement (margin, alignment) from outside. To align it, the
   host element is \`display: inline-block\` and 48px tall.

7. **Verify**: build/run the site and look at the footer at desktop width
   and at 390px: the badge reads, sits on the footer's line, doesn't overflow;
   hover it (the alpaca rises from its window and the name rolls to
   "alpacode.it ↗"); the link opens alpacode.it in a new tab. Report the
   file you added and where you placed the element.

## \`alpacode-badge.js\` (copy verbatim)

\`\`\`js
${src}
\`\`\`
`;

writeFileSync(new URL("../../docs/credits-badge-prompt.md", import.meta.url), prompt);
console.log("docs/credits-badge-prompt.md written");
