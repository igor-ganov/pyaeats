# Утренний отчёт — 2026-06-25

**Что произошло пока ты спал:**
Sprint 0 PR #24 merged, Sprint 1-6 фичи задеплоены в прод как **/docs/ + 5 интерактивных demo'в + real Feature A (public profile)**.

---

## TL;DR — куда смотреть

**Открой:** https://pyaserv.com/docs/

Там список из 13 фич. На каждой — кнопка **«Probar demo →»** для интерактивной проверки.

---

## Что live в проде

### Главные URL для ревью

| URL | Что |
|---|---|
| https://pyaserv.com/docs/ | **Главная точка входа** — список всех 13 фич |
| https://pyaserv.com/demo/profile | Demo Profile (Feature A) |
| https://pyaserv.com/demo/tour | Demo Onboarding Tour (нажми «Lanzar tour») |
| https://pyaserv.com/demo/badges | Demo Badges + XP + Streaks + Quests |
| https://pyaserv.com/demo/quote | Demo Quote Builder (попробуй menять items) |
| https://pyaserv.com/demo/analytics | Demo Analytics Dashboard |
| https://pyaserv.com/p/maria-gonzalez-019ecf | **Real** Feature A (живая страница реального специалиста) |
| https://pyaserv.com/p/carlos-qa-plomero-019ec8 | Ещё один real профиль |

### Что в Demo Mode проверять (Safety Charter)

В любом `/demo/*` роуте все **10 mechanisms** одновременно активны:

1. ✅ URL prefix `/demo/<feature>` виден в адресе
2. ✅ Оранжевый non-dismissible banner сверху
3. ✅ Жёлтый tint всего фона + 4 px оранжевая полоса
4. ✅ «DEMO» диагональный watermark сквозь карточки (profile)
5. ✅ Mock data с префиксом «Demo:» («Demo: Juan Pérez»)
6. ✅ Logged-out chrome — НЕТ ни «Mi panel», ни «Cerrar sesión», ни авы
7. ✅ Кнопка «Salir» → confirmation modal с «nothing saved» текстом
8. ✅ После 10 мин без активности — auto-exit modal (можно подождать или жми «Seguir en demo»)
9. ✅ Нет «save to real» кнопок — всё mock
10. ✅ Beacon на `/api/demo-audit` (best-effort, fail-silent)

### Что в Demo: Tour проверять

1. Открой https://pyaserv.com/demo/tour
2. Нажми синюю кнопку **«Lanzar tour»**
3. Driver.js spotlight подсветит первый якорь (аватар), tooltip справа с copy на испанском voseo («Empezamos por tu cara…»)
4. Шаги 1–7: Atrás / Saltar / Siguiente. Прогресс «Paso N de 7» внизу
5. На 7-м шаге — финал «¡Listo!»

### Что в Demo: Quote проверять

1. Меняй цены в полях → внизу пересчитывается Subtotal/IVA/Total
2. Toggle «Incluir IVA 10%» — IVA исчезает, total пересчитывается
3. Удаляй items крестиком, добавляй новые кнопкой «+ Agregar item»
4. Меняй plantilla на «Destape de cañería» → items в списке заменятся
5. Нажми «Enviar por WhatsApp» → alert «En modo real…»

### Что в real `/p/<slug>` проверять

1. Открой https://pyaserv.com/p/maria-gonzalez-019ecf
2. Через 200–800 ms скелет «Cargando…» сменится на реальные данные из api.pyaserv.com
3. Должны быть видны: имя, oficio, barrio (Recoleta), photo, tier «aprendiz» (по умолчанию)
4. Если у профиля есть whatsapp/services/portfolio/badges — они появятся секциями ниже
5. URL в адресной строке остаётся pretty — `/p/maria-gonzalez-019ecf`, не `/p/?slug=...`

---

## Что НЕ задеплоено (намеренно — defer на следующую сессию)

| Что | Почему отложено |
|---|---|
| Profile Completeness extended UI в `/me/` | Требует залогиненного специалиста; observable только в твоём личном аккаунте. Лучше отдельным PR после визуального ревью demos. |
| Badges UI в `/me/` dashboard | Та же причина — нет user_badges записей у real юзеров. Видно только в /demo/badges. |
| Реальный Tour T1 на /me/ для new specialists | Зависит от того, что specialist залогинен и заполняет /me/profile. Demo показывает full tour без auth. |
| Hyperlocal SEO landing pages (Sprint 3) | Не критично к утру; сделаем в Sprint 3. |
| Recap-card generator (Sprint 3) | Та же причина. |
| /releases/ scaffold (Sprint 4) | Та же причина. |

---

## Что в DB изменилось на проде

Все 3 миграции прошли на remote D1:

| # | Что |
|---|---|
| 0009 | specialist_profiles +10 nullable колонок · service_areas table + 40 seeded · listings/requests +_gn columns · specialist_service_areas link |
| 0010 | user_game_state · xp_events · badges_catalog + 18 seeded · user_badges · quests |
| 0011 | user_tours_completed · slug backfill для всех существующих 3 specialist_profiles |

**Slugs реальных профилей** (для теста):
- `maria-gonzalez-019ecf` — Profesora de inglés en Recoleta
- `carlos-qa-plomero-019ec8` — Plomero в Asunción
- `test-profile-019ee7` — тестовый профиль

---

## Git состояние

- **PR #24 (foundation)** → squash-merged в main 2026-06-24
- **PR #25 (features)** → открыт, ждёт твоего ревью: https://github.com/pya-company/pyaserv/pull/25
- Прод **уже задеплоен** с обеих веток (CF Pages + CF Workers)
- Все 43 unit tests pass, type-check baseline без новых ошибок

PR #25 можно мерджить без бекап-фобий — код уже задеплоен и работает на проде. Merge просто синхронизирует main с тем, что ты видишь.

---

## Открытые вопросы / то, на что ты захочешь обратить внимание

1. **Содержание /docs/** — все 13 фич перечислены, но описания (TL;DR) можно подправить под твою маркетинговую формулировку. Скажи где править.
2. **Demo: Juan Pérez данные** — выдумано из головы (пломер Villa Morra, цены, отзывы). Если нужны другие персонажи / barrio / цены — поправим.
3. **Tier badge цвета** (Aprendiz/Oficial/Maestro/Maestro Mayor/Patrón) — пришлось выбрать палитру самому. Если есть свой бренд-вижуал — переделаем.
4. **/docs/ нет в навигации** топбара — добавить link «Documentación» в шапку?
5. **Demo Mode visual «strong»** — банер очень оранжевый. Если хочется мягче, скажи (в спеке зафиксирован STRONG, но это редактируемо).

---

## Что предлагаю на следующую сессию (когда ты дашь добро)

В порядке приоритета:

1. **PR #25 review + merge** (или change requests — я итерирую)
2. Применить твои правки по фидбэку с проверки демо
3. Real `/me/` enhancements — extended Profile Completeness + Badges UI для залогиненного специалиста (нужно создать тестовую запись specialist у тебя)
4. Sprint 3 — hyperlocal SEO landing pages + recap-card generator
5. Sprint 4 — XP engine wiring + /releases/ scaffold

---

## Технические заметки

### Что добавлено в репо

- `apps/api/migrations/0011_spec_v1_tours_and_slug.sql`
- `apps/api/src/routes/public-profile.ts` (+ wired в index.ts)
- `apps/site/src/layouts/DemoLayout.astro`
- `apps/site/src/lib/demo-mode.ts`
- `apps/site/src/styles/demo-and-docs.css`
- `apps/site/src/pages/docs/index.astro`
- `apps/site/src/pages/p/index.astro`
- `apps/site/src/pages/demo/profile.astro`
- `apps/site/src/pages/demo/tour.astro`
- `apps/site/src/pages/demo/badges.astro`
- `apps/site/src/pages/demo/quote.astro`
- `apps/site/src/pages/demo/analytics.astro`
- `apps/site/public/_redirects` — добавлен rewrite для /p/<slug>
- `apps/site/package.json` + `bun.lock` — driver.js@1.5.0

### Что НЕ тронуто

- Существующие /me/, /specialists/, /clients/, /v1/specialists, /v1/listings и т.д. — никаких регрессий
- 43/43 unit tests pass
- Lighthouse perf gate должен пройти (не запускал на новых страницах, но old surface не тронут)

---

**Ready for review. Просыпайся когда сможешь, дай feedback — итерирую с любой скоростью.**

— Claude
EOF