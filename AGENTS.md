<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Store site styles live in src/mexican-wear.css (ported from the original HTML) and are linked per route via head(); keeps the original design intact.
- Products live in the products table; only users with the admin role (first account created) can edit; photos go to the private product-images bucket with long-lived signed URLs because public buckets are blocked.
- Store interface overrides in the singleton public.site_settings JSON document, with public SELECT and admin-only INSERT/UPDATE enforced by RLS; use shared validated defaults so unchanged content retains the original design.
- Apply saved storefront colours through semantic CSS variables scoped to the storefront; keep owner controls independently styled so an appearance change cannot obscure editing controls.
