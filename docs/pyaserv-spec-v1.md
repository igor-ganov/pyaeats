# PyaServ — Product Spec v1 (Sprint 1–6 scope)

**Дата:** 2026-06-24
**Зависит от:** [pyaserv-market-strategy-2026-06.md](pyaserv-market-strategy-2026-06.md)
**Версия:** v1 — drafted, требует ревью пользователя по pricing/legal/categories
**Цель документа:** превратить стратегию в исполнимое ТЗ с (a) чёткой границей «кто что делает», (b) игровой механикой удержания, (c) acceptance-критериями.

---

## 0. Структура документа

1. **Implementation Split Matrix** — какие шаги требуют твоего личного участия, какие я делаю сам.
2. **Открытые решения** — то, что блокирует меня и требует твоего ответа.
3. **Feature Specs A–I** — value-pull фичи из раздела 5b стратегии.
4. **Feature Spec J: Gamification** — отдельная глубокая глава.
5. **Data Model** — сущности и связи.
6. **API Surface** — endpoint'ы.
7. **Acceptance Criteria (EARS)** — по каждой фиче.
8. **Sprint Plan v2** — интегрировано в 90-дневный playbook из стратегии.

---

## 1. Implementation Split Matrix

### Принципы разделения

**[USER]** = шаги, которые я (Claude) не могу выполнить за тебя — требуют твоей идентичности, юр. решений, человеческих переговоров, доступа к платным сервисам, или находятся в области бизнес-стратегии.

**[AUTO]** = шаги, которые я могу выполнить полностью самостоятельно при наличии доступа к репозиториям и стандартным dev-инструментам.

**[HYBRID]** = я могу подготовить (код / черновик / выгрузку), но финальный шаг — за тобой.

### Полная матрица

| # | Шаг | Категория | Кто | Блокирует | Срок |
|---|---|---|---|---|---|
| **1** | Консультация с PY бухгалтером/юристом по SIFEN при volume-cap freemium | Legal | **[USER]** | Sprint 5+ (платный тариф) | до конца Sprint 0 |
| **2** | Pagopar sales call — реальные комиссии + контракт | Commercial | **[USER]** | Sprint 5 | до Sprint 4 |
| **3** | Bancard vPOS контракт + RUC компании | Commercial | **[USER]** | Опционально, Sprint 7+ | позже |
| **4** | Финальные цены: Gs 50k / 80k / другое за безлимит | Strategic | **[USER]** | Sprint 6 (платный тариф) | до Sprint 5 |
| **5** | Финальный список 10 категорий старта | Strategic | **[USER]** | Sprint 0 (i18n + seed) | до Sprint 0 |
| **6** | Бренд-тон: ES only / ES+Guaraní микс / formal / informal | Strategic | **[USER]** | Sprint 0 (копирайт) | до Sprint 0 |
| **7** | WhatsApp Business аккаунт PyaServ (телефон + верификация Meta) | External | **[USER]** | Sprint 1 (outreach) | до Sprint 1 |
| **8** | WhatsApp Business API approval (Meta business verification) | External | **[USER]** | Sprint 4 (smart-matching) | до Sprint 4 |
| **9** | Google Search Console доступ для pyaserv.com | External | **[USER]** | Sprint 3 (SEO) | до Sprint 3 |
| **10** | Google Keyword Planner / Ahrefs trial — данные SEO-объёмов | Research | **[HYBRID]** — ты доступ, я анализ выгрузки | Sprint 3 (SEO landings) | до Sprint 2 |
| **11** | Партнёрство с APEM / Colegio de Arquitectos / районной ассоциацией | Human | **[USER]** | Sprint 2 (партнёрство #1) | Sprint 2 |
| **12** | Influencer outreach (TikTok/IG, DIY/home-improvement) | Human | **[USER]** | Sprint 4 | Sprint 4 |
| **13** | Outreach 30 DM/день в WhatsApp по Clasipar-парсу | Human | **[USER]** | Sprint 1–2 (cold-start специалистов) | Sprint 1 |
| **14** | First-party survey 30-50 клиентов | Human + Tool | **[HYBRID]** — я подготовлю форму + анализирую ответы, ты распространяешь | Sprint 6 | Sprint 6 |
| **15** | Скрипт парсинга публичных Clasipar/OLX listings | Code | **[HYBRID]** — я пишу, ты подтверждаешь правовую корректность и запускаешь | Sprint 0 | Sprint 0 |
| **16** | Полная feature-реализация (см. разделы 3–4) | Code | **[AUTO]** | — | непрерывно |
| **17** | DB-миграции + seed-данные категорий, барриос | Code | **[AUTO]** | — | непрерывно |
| **18** | E2E тесты + CI-проверки | Code | **[AUTO]** | — | непрерывно |
| **19** | SEO meta-теги, sitemap.xml, schema.org structured data | Code | **[AUTO]** | — | Sprint 3 |
| **20** | i18n инфраструктура (ES + Guaraní фрагменты) | Code | **[AUTO]** | контент в (6) | Sprint 1 |
| **21** | Gamification engine (XP, badges, streaks, quests, levels) | Code | **[AUTO]** | — | Sprint 2–4 |
| **22** | Recap-card generator (PNG для WhatsApp Status) | Code | **[AUTO]** | — | Sprint 3 |
| **23** | Pagopar SDK интеграция (sandbox) | Code | **[AUTO]** | контракт в (2) | Sprint 5 |
| **24** | SIFEN факт-инвойсинг (UI + интеграция) | Code | **[HYBRID]** — я делаю код, ты подтверждаешь юр. правильность с бухгалтером | Sprint 5–6 | Sprint 5 |
| **25** | Документация, ADR, runbook'и | Docs | **[AUTO]** | — | непрерывно |
| **26** | Wrangler deploys на pyaserv.com | DevOps | **[AUTO]** (доступ уже настроен) | — | непрерывно |
| **27** | Финальное ревью / приёмка / merge в main | Review | **[USER]** | каждый PR | непрерывно |
| **28** | Утверждение копирайта T1-T3 туров (испанский voseo) | Content | **[USER]** | Sprint 1 | до Sprint 1 |
| **29** | Утверждение списка features для /docs/ MVP (топ-5) | Content | **[USER]** | Sprint 3 | до Sprint 3 |
| **30** | Запись GIF'ов для /docs/ — Playwright recordings | Content | **[HYBRID]** — я записываю, ты ревьюишь визуальное качество | Sprint 3 | Sprint 3 |
| **31** | Черновики release notes для каждой версии | Content | **[HYBRID]** — я генерирую draft, ты editing pass | непрерывно | непрерывно |
| **32** | Driver.js tour engine + T1 implementation | Code | **[AUTO]** | Sprint 1 | Sprint 1 |
| **33** | Demo Mode infrastructure (`apiFetch` interception, sessionStorage, banner, visual treatment, 10 safety mechanisms) | Code | **[AUTO]** | Sprint 5 | Sprint 5 |
| **34** | `/docs/` Astro Content Collections + Pagefind search | Code | **[AUTO]** | Sprint 3 | Sprint 3 |
| **35** | `/releases/` index + per-release pages + RSS feed + login toast | Code | **[AUTO]** | Sprint 4 | Sprint 4 |

### Что я могу начать **прямо сейчас** без твоих решений

- Реализация **Feature A** (персональная микро-страница) — backend для нового публичного route'а + UI
- **Feature C** (recap-card generator) — генератор PNG (Cloudflare Workers + satori/og-image library)
- **Feature E** (quote-builder) — UI + storage
- **Feature F** (lead-filters для специалиста) — UI + query-логика
- **Feature G** (badges) — список с дизайном + первая партия
- **Feature J** (gamification engine) — XP + streaks + quests инфраструктура

### Что мне нужно от тебя в порядке приоритета

1. **(6) Бренд-тон** — мне нужен прежде чем писать копирайт UI. Можно за 5 минут: «формальный/неформальный», «вкрапления гуарани да/нет», «обращение vos / tú / usted».
2. **(5) 10 категорий старта** — нужен список для seed. Я могу предложить чер новик (см. раздел 2), ты подтвердишь.
3. **(1) SIFEN-консультация** — асинхронно, пока я делаю Sprint 1–4. К Sprint 5 нужно решение.
4. **(15) Запуск парсера** — я подготовлю код, ты подтвердишь правовой OK и нажмёшь кнопку.

---

## 2. Принятые решения (2026-06-24)

### 2.1. Стартовые категории — ПРИНЯТО: черновик из 10

1. Plomero (сантехник)
2. Electricista (электрик)
3. Técnico de aire acondicionado
4. Albañil (каменщик/строитель)
5. Pintor
6. Carpintero
7. Jardinero / paisajista
8. Limpieza (уборка)
9. Cerrajero
10. Gasista

**Расширение:** mecánico / mudanzas / técnico PC / fumigador / técnico electrodomésticos — добавим в Sprint 4+ когда liquidity в первых 10 устаканится.

### 2.2. Бренд-тон — ПРИНЯТО: vos + точечные Guaraní/Jopará вставки

**Правила копирайта:**
- Default UI: voseo («Tu perfil», «Encontrá», «Compartí»)
- Категории и SEO-заголовки: чистый испанский (для индексации Google PY)
- CTA и эмоциональные блоки: допустимы guaraní-вставки («Ya nde rógape», «Tuicha rasa»)
- Push/email subject lines: смешанные допустимы
- Legal-страницы (T&C, Privacy, SIFEN docs): остаются «vos», только грамматически корректные

**Шаблон выбора:** если фраза несёт эмоцию или зовёт к действию → можно guaraní. Если описывает функциональность → чистый испанский.

### 2.3. Pricing — ПРИНЯТО: 10 inquiries/мес → Gs 50k/мес безлимит

**Семантика (детали):**
- 1 inquiry = 1 уникальный клиентский контакт через PyaServ-форму или WhatsApp-CTA
- Дедуп: тот же клиент, обратившийся повторно в течение 7 дней — НЕ считается новым inquiry
- Окно: calendar month по PY-таймзоне (Asunción)
- При пересечении 10 — soft cap: специалист получает push «Llegaste a 10 contactos este mes, suscribite por Gs 50.000» + продолжает работать с warning UI до конца месяца (НЕ блокируем сразу)
- Hard cap включается со следующего месяца

### 2.4. Геймификация — ПРИНЯТО: strong для специалистов, soft для клиентов

**Specialist (strong):**
- Profile Completeness bar (постоянно видим в шапке /me/ до 100%)
- XP + 5 tier-уровней Aprendiz → Patrón
- Daily/weekly quests с авто-rotation
- Streaks с flame icon и защитами от punitive feeling
- Badges public visible, shareable PNG
- Sunday recap modal
- Push при leads, streak risk, badge unlock

**Client (soft):**
- Hire counter («Has contratado a 3 profesionales»)
- Annual «Tu año en PyaServ» recap
- Review prompt после 7 дней без job (gentle, no push)
- «Vecino que ayuda» badge после 3 reviews с фото
- БЕЗ daily quests, streaks, push, leaderboards

---

## 3. Feature Specs A–I

Каждая фича: **purpose → user story → screens/states → data → API → acceptance.**

### Feature A — Персональная микро-страница специалиста

**Purpose.** Дать каждому специалисту brandable публичный URL, который не даёт ни FB Page (коряво на мобильном) ни WhatsApp Business (только catalog). Это первый и основной value-pull: «то, что я могу расшарить».

**URL pattern.** `pyaserv.com/p/<slug>` где `<slug>` = `<nombre>-<oficio>-<barrio>`, например `juan-perez-plomero-villa-morra`. Slug auto-generated при регистрации, редактируем 1 раз.

**Components (above the fold mobile):**
- Cover image (16:9 user-uploaded или auto-generated с категорией)
- Avatar (round, 96px)
- Имя + tier badge (см. геймификацию)
- Главный oficio + barrio
- **WhatsApp CTA button** (primary, sticky внизу на мобильном)
- Public stats: «47 trabajos · 4.8★ (12 reseñas) · responde en <10min»
- Verified WhatsApp badge

**Components (scroll):**
- Bio (markdown, до 500 chars)
- Services + price ranges (карточки)
- Portfolio (галерея до 12 фото с lazy-loading)
- Reviews (паджинация по 10)
- Service-area map / список барриос
- Schedule / availability widget
- QR code (downloadable PNG для печатной визитки)
- «Compartir mi perfil» — генератор share-карточки для WhatsApp Status / IG Story / FB

**Non-functional:**
- LCP < 2.0s на 3G/PY (статика + edge cache).
- Полностью индексируем (sitemap + Open Graph + schema.org `LocalBusiness`).
- Доступен анонимам без рег.

**Data:** новых таблиц нет, расширение `User`:
```
User.slug         text unique
User.cover_url    text nullable
User.bio          text nullable (max 500)
User.services     jsonb  // [{name, priceMin, priceMax, currency: 'PYG'}]
User.portfolio    jsonb  // [{url, caption, order}]
User.barrios      text[]
User.schedule     jsonb  // {weekly: {mon: [09:00-18:00]}, vacationUntil?: date}
```

**API:**
- `GET /api/p/:slug` — публичный, edge-cached 5 мин
- `PATCH /api/me/profile` — частичный апдейт (auth)
- `POST /api/me/portfolio/upload-url` — presigned R2 URL

**Acceptance:** см. раздел 7.A.

---

### Feature B — Дашборд аналитики специалиста

**Purpose.** Дать специалисту **видимость воронки**, которой нет в WhatsApp/FB. Это то, что превращает «у меня вроде работа есть» в «у меня вторник плохой день, надо больше отвечать утром».

**Метрики (MVP):**
1. **Profile views** последние 7/30 дней + спарклайн
2. **WhatsApp button clicks** + конверсия view→click
3. **Inquiries received** (формальные через PyaServ)
4. **Avg response time** (vs avg по твоему oficio в твоём barrio — sticky comparison)
5. **Reviews collected** + средняя оценка
6. **Heatmap «когда смотрят твой профиль»** — 7×24 grid с интенсивностью
7. **Source attribution:** % с search / referrer / direct / shared link

**Privacy:** все метрики только владельцу профиля. Никаких leaderboards без opt-in.

**Frequency:** реальное время для счётчиков, агрегаты пересчитываются ночью (CF cron).

**Data:**
```
ProfileEvent {
  id, profileUserId, type: enum('view'|'wa_click'|'inquiry'|'share'),
  at: timestamp, source?: string, visitorHash?: string (для dedupe)
}
ProfileEventDaily {  // материализация для производительности
  userId, date, type, count, uniqueVisitors
}
```

**API:**
- `POST /api/p/:slug/event` — beacon на просмотр (no auth)
- `GET /api/me/analytics?range=7d|30d|90d` — auth

**Acceptance:** см. 7.B.

---

### Feature C — Recap-card generator (shareable PNG)

**Purpose.** Превратить достижения / итоги недели в графическую карточку **под WhatsApp Status (1080×1920) и IG Story**. Это виральный канал, который не зависит от роста PyaServ-аудитории — каждый share идёт в чужое окружение.

**Триггеры генерации:**
- Воскресенье 18:00 PY: «Tu semana en PyaServ» (если был ≥1 значимый event за неделю)
- Unlock значимого badge
- Достижение milestone (50 / 100 trabajos)
- Опубликовать отзыв ≥4★ (с разрешения клиента)
- Ручной триггер «Compartir mi perfil» с произвольного места

**Технология:** Cloudflare Workers + `@vercel/og` (satori) или `resvg` для рендеринга. Шаблоны хранятся как JSX-like в коде. Кэш в R2.

**Шаблоны (MVP, 4 штуки):**
1. **Weekly recap** — аватар + 4 метрики + позиция в твоём barrio
2. **Badge unlock** — большой бейдж + название + дата
3. **Milestone** — «100 trabajos completados» + аватар
4. **Profile teaser** — фото + tagline + QR на профиль

**Все шаблоны:** в нижней части — `pyaserv.com/p/<slug>` + лого. Это growth-loop.

**Acceptance:** см. 7.C.

---

### Feature D — SIFEN-helper (фактуризация)

**Зависимость:** заблокирована решением (1) из матрицы — нужна юр. консультация.

**Purpose.** Дать специалисту инструмент выпуска факт-инвойсов одним кликом — это **главный pain point** микро-бизнеса в PY и причина, по которой многие работают «в чёрную». Если PyaServ снимает эту фрустрацию, специалист останется ради этого даже без лидов.

**Scope MVP:**
- Кнопка «Generar factura» на завершённой работе
- Pre-fill: данные специалиста (RUC, имя), сумма, дата, дата налоговой
- Pre-fill клиента: RUC если задан, иначе «Consumidor final»
- Отправка через провайдера SIFEN (TBD: zeronk / facturasend / Pagopar встроенный)
- Хранение PDF + XML для отчётности
- Месячный экспорт «Tus facturas de mayo» (zip PDF + XML)

**Что нужно от юриста:**
- Нужен ли RUC у специалиста для использования (vs «monotributista pequeño»)
- Кто формальный эмитент: специалист или PyaServ как marketplace
- DGII-схема: тип документа, серия, нумерация
- Архивные требования (10 лет хранения и т.п.)

**Что я делаю сейчас (без блокировки):** заглушку UI с состоянием «coming soon — pending legal review», placeholder-кнопкой, плюс drafts документации, которые юрист потом валидирует.

**Acceptance:** см. 7.D.

---

### Feature E — Quote-builder (генератор смет)

**Purpose.** Снять с специалиста рутину набора цены в каждом чате. WhatsApp заставляет печатать всё руками; PyaServ даёт шаблоны и одну кнопку «Отправить смету в WhatsApp».

**Flow:**
1. Специалист открывает Quote Builder из лида или из меню
2. Выбирает шаблон или начинает с нуля
3. Заполняет позиции (товар/услуга, количество, цена)
4. Видит итог + IVA (если RUC) + опц. скидка
5. Жмёт «Enviar por WhatsApp» → откроется `wa.me/<numero>?text=<auto-message>` со ссылкой на сгенерированный PDF в R2

**Шаблоны (MVP, по 2-3 на oficio):**
- Plomero: «Cambio de calentador», «Destape de cañería», «Instalación de grifería»
- Electricista: «Instalación de tablero», «Cambio de instalación», «Iluminación»
- AC-técnico: «Instalación split 12k», «Carga de gas R410», «Mantenimiento»
- (остальные — по запросу пользователя)

**Шаблоны редактируемые — специалист может сохранить свою версию.**

**Data:**
```
QuoteTemplate { id, userId, oficio, title, items: jsonb, isDefault: bool }
Quote { id, userId, clientName?, items, total, ivaIncluded: bool, sentAt, pdfUrl }
```

**Acceptance:** см. 7.E.

---

### Feature F — Lead-filters для специалиста

**Purpose.** В WhatsApp всё валится в одну кучу. PyaServ даёт фильтры, экономящие время.

**Фильтры (MVP):**
- Bid min: «только запросы с указанным бюджетом ≥ Gs X»
- Distance: «только мой barrio + N км»
- Account age: «скрыть запросы от аккаунтов младше 7 дней» (anti-spam)
- Category: множественный выбор
- Time-of-day: «только в моё рабочее время по моему расписанию»

**Storage:** конфиг сохраняется в `User.leadFilters jsonb`.

**Indicator:** в каждом скрытом запросе — sticky уведомление в дашборде «5 запросов скрыты твоими фильтрами в эту неделю → review settings».

**Acceptance:** см. 7.F.

---

### Feature G — Public profile badges (visual + shareable)

**Объединено с разделом 4 (Gamification).** Бейджи — это unit'ы геймификации. Public-visible, shareable. См. ниже.

---

### Feature H — Per-specialist multilingual landing

**Purpose.** ES — default. Опционально специалист может добавить Guaraní и/или PT-BR версии своей bio + service-names. PT-BR полезен для Ciudad del Este / приграничных бразильцев (отложено для Sprint 7+, базовая инфра в Sprint 1).

**Scope MVP:**
- i18n-инфра: каждое поле `User.bio`, `User.services[].name`, `User.services[].description` имеет nullable варианты `_gn`, `_pt`
- Public profile определяет язык:
  - Если query `?lang=gn` — отдать гуарани (если есть)
  - Если `accept-language` содержит pt — pt
  - Иначе — es
- В профиле специалиста — toggle «Editar en Guaraní» открывает дублирующие поля
- На листинге профиля в дашборде клиента — флажки языков

**SEO:** дополнительные `<link rel="alternate" hreflang="...">` теги.

**Acceptance:** см. 7.H.

---

### Feature I — Lite-CRM («Mis clientes»)

**Purpose.** WhatsApp-контакты тонут. PyaServ помнит, кто был клиентом, что делал, когда.

**Scope MVP:**
- Автоматически создаётся `ClientRecord` при первом завершённом job
- Поля: имя (с разрешения), телефон (verified), barrio, история работ, заметки специалиста
- Поиск + фильтры
- Автоматическое напоминание: «X дней с последней работы у Juan Perez — pitch maintenance?» (триггер: 6/12 мес после конкретных типов работ — AC, plomería)

**Privacy:** клиент видит, что он в чьём-то CRM («Visible para Juan Perez»), может opt-out.

**Acceptance:** см. 7.I.

---

## 4. Feature J — Gamification System (deep-dive)

### 4.1. Психологическая база и источники

Применяем механики, доказавшие удержание в продуктах с «серьёзной» аудиторией (не казуальные игры):

| Механика | Где работает | Что берём | Источник |
|---|---|---|---|
| **Profile completeness bar** | LinkedIn All-Star | 10-step bar, награда за 100% | LinkedIn engineering blog |
| **Streaks + freeze** | Duolingo | Дневной цикл с защитой от punitive feeling | Duolingo growth blog; >20× retention lift у streak users |
| **XP + tier levels** | Stack Overflow reputation | Очки за конкретные действия, открывают привилегии | SO meta + Atwood/Spolsky писали много |
| **Achievement badges** | Pokemon GO / Fitbit | Collectible, shareable | Hamari & Koivisto 2015 review |
| **Endowed progress effect** | Car-wash punch cards (Nunes 2006) | Прогресс начинается с 20%, а не 0% | Joseph Nunes, JCR |
| **Variable reward** | Mobile games / Twitter feed | Только ethical: weekly recap | Skinner; Hooked (Eyal) — *с осторожностью* |
| **Public commitment** | Strava clubs | Optional cohorts | Strava engagement data |
| **Status tiers** | Frequent flyer programs | Bronze → Platinum, тангибельные перки | Air-loyalty research |

**Anti-patterns мы избегаем:**
- Fake scarcity / fake counters
- Дарк-loss-aversion («ВСЁ потеряется!»)
- Notification спам
- Принудительные leaderboards без opt-in (могут демотивировать)
- Нет gambling-mechanics (loot-boxes, etc.)

### 4.2. Композитная модель PyaServ Gamification

Четыре независимых, но связанных слоя:

```
   ┌──────────────────────────────────────────────────────────┐
   │  PROFILE COMPLETENESS (один раз, 0–100%)                 │
   ├──────────────────────────────────────────────────────────┤
   │  XP + LEVEL (накопительно, Aprendiz → Patrón)            │
   ├──────────────────────────────────────────────────────────┤
   │  STREAKS (короткий цикл, дневной)                        │
   ├──────────────────────────────────────────────────────────┤
   │  QUESTS (средний цикл, daily/weekly)                     │
   ├──────────────────────────────────────────────────────────┤
   │  BADGES (события: milestone / superlative / collection)  │
   └──────────────────────────────────────────────────────────┘
```

Каждый слой даёт **отдельную причину вернуться завтра**. Слой 1 — для онбординга. 2 — долгосрочная цель. 3 — habit loop. 4 — variable reward. 5 — статус.

### 4.3. Слой 1 — Profile Completeness

**Цель:** дать новому специалисту дорогу к «готовому профилю» за ≤30 минут, с видимым прогрессом и наградой на 100%.

**Стартовое состояние (endowed progress, +Nunes 2006):**

При регистрации профиль уже на **20%**:
- [x] WhatsApp номер верифицирован (10%) — гейт регистрации
- [x] Базовое имя + oficio выбран (10%) — гейт регистрации

То есть к моменту первого открытия дашборда специалист видит progress 20%, что психологически тригерит «уже начал, надо доделать».

**Шаги до 100% (по 10% каждый):**

| % | Шаг | UI-плейс |
|---|---|---|
| +10 | Загрузить avatar | Прямо в дашборде, big CTA на первой загрузке |
| +10 | Cover image или auto-generate (1 клик) | — |
| +10 | Bio ≥80 символов | — |
| +10 | ≥2 услуги с прайсом | — |
| +10 | ≥1 barrio в service-area | — |
| +10 | ≥3 фото portfolio | — |
| +10 | Schedule заполнен | — |
| +10 | Cédula или RUC верифицирован | Опц. шаг, может пропустить |

**Награда на 100%:**
- Badge **«Perfil Maestro»**
- **7 дней Boosted placement** (приоритет в списке твоего oficio + barrio)
- Открывается возможность участвовать в «Maestro de Mes»

**Visibility:**
- Sticky bar в шапке `/me/` пока < 100%
- Полностью скрывается после 100% (NO прогрессион punishment, achieved — done)

**Anti-pattern guard:** если специалист пропускает шаг 7 дней — НЕ punitive nudge, а помощник «Hola, ¿necesitás ayuda para completar tu perfil?» с кнопкой «¿Cómo me ayuda esto?» → 30-секундное объяснение пользы.

### 4.4. Слой 2 — XP + Tier Levels

**XP-таблица (specialist):**

| Действие | XP | Cap |
|---|---:|---|
| Daily login + open notifications | +1 | 1×/день |
| Respond to lead within 1 hour | +5 | 10×/день |
| Respond to lead within 24 hours | +2 | 20×/день |
| Mark job completed (client confirms) | +25 | unlimited |
| Get review (any rating, with text) | +30 | unlimited |
| Get review with photo | +50 | unlimited |
| Get 5★ review | +20 bonus | unlimited |
| Update portfolio (add photo) | +5 | 5×/день |
| Share completed job to WhatsApp | +15 | 1×/job |
| Complete weekly quest | +50 | 1×/неделю |
| Complete daily quest | +10 | 1×/день |
| Refer colleague who completes profile to 100% | +100 | unlimited |
| Get referred client converts to job | +50 | unlimited |

**Tier levels (specialist):**

| XP | Tier | ES name | Unlocks |
|---:|---|---|---|
| 0 | T0 | Aprendiz | Базовый профиль, листинг |
| 100 | T1 | Oficial | «Tiempo de respuesta» publicly shown, eligibility для daily quests |
| 500 | T2 | Maestro | Tier badge на listing, 1 день/мес free boost |
| 2000 | T3 | Maestro Mayor | «Recomendado por PyaServ» tag, 3 дня/мес free boost, eligibility «Maestro de Mes» |
| 5000 | T4 | Patrón del Oficio | Verified-blue equivalent, hand-curated featured slot, доступ к beta-фичам |

**Decay rule:** XP не падает. Tier — sticky. Но visibility-perks (boost дни) сбрасываются месячно.

**Visibility:**
- Tier badge всегда в шапке профиля рядом с именем
- XP-bar к следующему уровню — только в `/me/` (не публично)
- Прогресс «Te faltan 47 XP para Maestro» — gentle next-milestone display

### 4.5. Слой 3 — Streaks (Duolingo pattern)

**Что считается «активным днём»:**

Любое из (≥1 за день):
- Login + opened notifications
- Responded to ≥1 lead
- Added portfolio photo
- Updated service price
- Marked job completed

**Streak-mechanics:**

- Visible **flame icon + number** в `/me/` шапке (как Duolingo)
- 7+ дней — flame становится оранжевым
- 30+ дней — flame становится красным
- 100+ дней — золотой
- Public visibility: только после 7 дней; на профиле — «En racha de 23 días» (опц., можно скрыть)

**Streak protection (no-punitive):**

1. **Auto-freeze:** если за день не было входящих leads — streak не ломается (с лимитом 3 «бесплатных» дней/мес).
2. **Manual pause:** кнопка «Pausar racha (vacaciones)» — до 14 дней без потери.
3. **Streak repair:** один раз в 30 дней можно восстановить сломанную streak за 100 XP.

**Reward thresholds:**
- 7 дней — badge «Constante»
- 30 дней — badge «Dedicado» + 1 free boost день
- 100 дней — badge «Imparable» + 3 free boost дня + custom thank-you message in dashboard

### 4.6. Слой 4 — Quests (daily/weekly missions)

**Daily quests (показывается 3 на выбор, complete ≥1):**

Pool (random subset из):
- Respond to ≥1 lead today
- Add 1 portfolio photo
- Update at least 1 service price
- Share profile or completed work to WhatsApp
- Read 1 article in PyaServ helpcenter

**Reward:** +10 XP + «1-hour Boost» voucher (используется руками)

**Weekly quests (показывается 2 на выбор):**

Pool:
- Get ≥3 reviews this week
- Respond <1h to ≥5 leads
- Complete ≥2 jobs
- Add ≥3 portfolio photos
- Update bio or services

**Reward:** +50 XP + «1-day Boost» voucher

**Mechanics:**
- Quests resetются на 00:00 PY time
- Если quest невыполним по объективным причинам (например, «complete 2 jobs» а нет лидов в неделе) — на следующей неделе автоматически заменяется на «easier» вариант
- Voucher boost = специалист в топе своего barrio+oficio на 1 час / 1 день

### 4.7. Слой 5 — Badges (collection + status + shareable)

**Категории:**

**Milestone badges (auto):**
- «Primer trabajo» — первая completed job
- «10 trabajos», «50 trabajos», «100 trabajos», «500 trabajos»
- «Primer 5★»
- «10 reseñas», «50 reseñas», «100 reseñas»

**Superlative badges (auto, monthly evaluation):**
- «Velocista del mes» — top 10% по response-time в твоём oficio в Asunción
- «Estrella del barrio» — top 3 по reviews в твоём barrio+oficio
- «Maestro de Villa Morra» — #1 в твоём barrio+oficio

**Collection badges (auto):**
- «Multilingüe» — bio на ES + GN (или PT)
- «Constructor» — portfolio ≥10 фото
- «Equipo» — referral 3+ коллег
- «Embajador» — 5+ client-referrals
- «Verificado completo» — WA + Cédula + (опц. RUC)

**Tier badges (auto, см. 4.4):**
- Aprendiz / Oficial / Maestro / Maestro Mayor / Patrón

**Visibility rules:**
- Все badges по умолчанию **public** на профиле специалиста
- Owner может скрыть конкретные badges (toggle в settings)
- Badges имеют tooltips с критериями получения — это transparency, важно

**Share-card generation:**
- Unlock badge → modal с auto-generated 1080×1920 PNG ready for WA Status
- One-click «Share to WhatsApp Status»

### 4.8. Sunday Recap (variable reward, ethical)

**Triggered:** воскресенье 18:00 PY каждую неделю, если за неделю было ≥1 значимое событие.

**Содержимое:**
- 4 ключевые метрики (views, clicks, inquiries, reviews) — с сравнением vs прошлая неделя
- Hero-momentum sentence: «Tu mejor día fue el martes — 8 personas vieron tu perfil»
- 1 random «surprise» stat (variable reward), показывается только если правда:
  - «Estás en el top 10% de plomeros en Villa Morra por velocidad de respuesta»
  - «Tu perfil fue compartido 3 veces esta semana»
  - «Recibiste tu primera reseña en lunes»
- CTA «Compartir mi semana» → recap-card generator

**Anti-fake-scarcity guard:** если значимых событий мало — НЕ показывать (лучше тишина, чем фейк-celebration).

### 4.9. Notification cadence

**Push/WhatsApp notifications:**

- Новый лид — immediate (если в рабочем времени специалиста по его schedule)
- Streak risk: «Te falta ~3h para mantener tu racha de 14 días» — только если за день не было activity и >18:00 PY
- Weekly recap — Sunday 18:00 PY
- Badge unlock — immediate, но silent push (badge + sound off)
- Quest completion — toast in-app, no push

**Quiet hours:** настраивается специалистом, по умолчанию 22:00–08:00 PY локально. В quiet hours пуши только critical (новый лид).

**Frequency cap:** не больше 5 не-критических notifications в неделю.

### 4.10. Cilent-side gamification (lite)

Клиенты — низкочастотные, агрессивные мечханики контрпродуктивны. Минимум:

- **Hire counter** — «Has contratado a 3 profesionales en PyaServ»
- **Review prompt** — после 7 дней после job: gentle WA-сообщение «¿Podés dejar una reseña? Ayuda a otros vecinos»
- **«Vecino que ayuda» badge** — после 3 review с фото
- **Annual «Tu año en PyaServ»** recap — раз в год

NO daily quests, NO streaks для клиентов.

### 4.11. Data model для геймификации

```
UserGameState {
  userId,
  xp: int,
  tier: enum,
  profileCompletePercent: int,
  streakCurrent: int,
  streakBest: int,
  streakLastActiveDate: date,
  streakFreezesUsedThisMonth: int,
  badges: Badge[]
}

Badge {
  code: string (e.g. 'milestone_10_jobs'),
  earnedAt: timestamp,
  meta?: jsonb,
  hidden: bool
}

XPEvent {  // event-sourced для audit + replay
  id, userId, type, xp, at, ctx: jsonb
}

Quest {
  id, userId, type: enum('daily'|'weekly'),
  template: string,
  goal: jsonb,
  progress: jsonb,
  status: enum('active'|'done'|'expired'),
  startedAt, expiresAt, completedAt
}
```

### 4.12. EARS-критерии для геймификации — см. раздел 7.J

---

## 5. Data Model (consolidated)

```
User {
  id, email?, phone (verified),
  slug, oficio, secondaryOficios[],
  cover_url?, avatar_url?,
  bio?, bio_gn?, bio_pt?,
  services: jsonb,
  portfolio: jsonb,
  barrios: text[],
  schedule: jsonb,
  rucNumber?, cedulaVerified: bool,
  leadFilters: jsonb,
  createdAt, lastLoginAt
}

UserGameState — см. 4.11
XPEvent — см. 4.11
Badge — см. 4.11
Quest — см. 4.11

Job {
  id, specialistId, clientId, oficio, barrio,
  status: enum('inquiry'|'quoted'|'accepted'|'in_progress'|'completed'|'cancelled'),
  amount?, currency: 'PYG',
  createdAt, completedAt
}

Review {
  id, jobId, rating: 1..5, text, photos: jsonb,
  authorUserId, targetUserId, createdAt
}

Inquiry {
  id, fromUserId, toUserId, jobId?, message, createdAt, respondedAt?
}

ProfileEvent — см. 3.B
ProfileEventDaily — см. 3.B

QuoteTemplate, Quote — см. 3.E
ClientRecord — см. 3.I
```

---

## 6. API Surface (REST, prefix `/api/v1`)

### Public
- `GET /p/:slug` — публичный профиль (edge-cached 5 мин)
- `POST /p/:slug/event` — beacon на view/click (no-auth)
- `GET /p/:slug/oembed.json` — для соц.сетей
- `GET /search?oficio=&barrio=&...` — поиск

### Specialist (authed)
- `PATCH /me/profile`
- `POST /me/portfolio/upload-url`
- `PATCH /me/services` — список услуг
- `PATCH /me/schedule`
- `PATCH /me/lead-filters`
- `GET /me/analytics?range=7d`
- `GET /me/game-state`
- `POST /me/quest/:id/claim`
- `POST /me/streak/freeze`
- `POST /me/quote` — create
- `GET /me/quotes`
- `POST /me/quote/:id/send` — WhatsApp deep-link
- `GET /me/clients` — lite-CRM list
- `PATCH /me/clients/:id/note`

### Client (authed)
- `POST /requests` — new service request
- `GET /me/requests`
- `POST /reviews` — leave review on job

### Webhooks (internal)
- `POST /webhook/wa-verify` — Meta callback
- `POST /webhook/pagopar` — payment notif

---

## 7. Acceptance Criteria (EARS-style)

> Используем синтаксис: **WHEN** … **THE SYSTEM SHALL** …

### 7.A — Personal Micro-Page

- AC-A1: **WHEN** anonymous visitor opens `pyaserv.com/p/<slug>`, **THE SYSTEM SHALL** render profile within LCP < 2.0s on simulated 3G+4× CPU throttle.
- AC-A2: **WHEN** specialist's profile is incomplete (< 30%), **THE SYSTEM SHALL** still serve the page (no blocking gate) but with a banner "Este profesional está completando su perfil".
- AC-A3: **WHEN** any visitor taps WhatsApp CTA, **THE SYSTEM SHALL** open `wa.me/<numero>?text=<auto-message>` and record a `wa_click` ProfileEvent.
- AC-A4: **WHEN** specialist's slug changes, **THE SYSTEM SHALL** 301 redirect old slug for 90 days.
- AC-A5: **THE SYSTEM SHALL** include schema.org `LocalBusiness` JSON-LD with name, image, address (barrio), aggregateRating if reviews ≥ 3.
- AC-A6: **WHEN** profile is published, **THE SYSTEM SHALL** auto-add to `sitemap.xml` within 15 minutes.

### 7.B — Analytics Dashboard

- AC-B1: **WHEN** specialist opens `/me/analytics`, **THE SYSTEM SHALL** load all metrics for default range (30d) within 1.5s p95.
- AC-B2: **THE SYSTEM SHALL** dedupe `view` events by `visitorHash` per 24h window (1 unique view per hash per day).
- AC-B3: **WHEN** specialist has fewer than 7 days of data, **THE SYSTEM SHALL** show a placeholder with "Necesitamos más datos para mostrar tendencias" instead of misleading sparkline.
- AC-B4: **THE SYSTEM SHALL** compute «vs avg» comparison only when there are ≥ 5 specialists in the same (oficio, barrio); otherwise hide that metric.

### 7.C — Recap-Card Generator

- AC-C1: **WHEN** generator is invoked, **THE SYSTEM SHALL** produce a 1080×1920 PNG within 3s p95.
- AC-C2: **THE SYSTEM SHALL** cache rendered cards in R2 for 7 days; identical inputs return cached.
- AC-C3: **THE SYSTEM SHALL** include `pyaserv.com/p/<slug>` at the bottom of every card.
- AC-C4: **WHEN** specialist taps "Share to WA Status", **THE SYSTEM SHALL** open device-native share sheet with image attached.

### 7.D — SIFEN Helper

- AC-D1 (placeholder): **WHEN** specialist clicks "Generar factura" before SIFEN integration is approved, **THE SYSTEM SHALL** show modal "Estamos preparando esta función — completá este formulario para ser primero en probarla" and capture interest.
- AC-D2..D8: TBD после консультации с юристом.

### 7.E — Quote-Builder

- AC-E1: **WHEN** specialist selects template, **THE SYSTEM SHALL** pre-fill items in < 200ms.
- AC-E2: **WHEN** specialist saves a custom template, **THE SYSTEM SHALL** persist it and offer in subsequent quotes.
- AC-E3: **WHEN** specialist sends quote, **THE SYSTEM SHALL** generate PDF, store in R2, open `wa.me/<numero>?text=<message-with-link>`.
- AC-E4: **THE SYSTEM SHALL** allow IVA toggle; **IF** user has RUC, IVA is on by default.

### 7.F — Lead Filters

- AC-F1: **THE SYSTEM SHALL** persist filter config and apply across sessions.
- AC-F2: **THE SYSTEM SHALL** show count of hidden leads in dashboard ("3 leads ocultos esta semana → revisar filtros").
- AC-F3: **THE SYSTEM SHALL** allow temporary disable of all filters ("Mostrar todo por hoy").

### 7.G — Badges

Объединено с разделом 7.J.

### 7.H — Multilingual Landing

- AC-H1: **WHEN** specialist saves bio_gn or bio_pt, **THE SYSTEM SHALL** add `<link rel="alternate" hreflang>` tags accordingly.
- AC-H2: **WHEN** visitor uses `?lang=gn`, **THE SYSTEM SHALL** serve guarani version if exists, else fall back to es with a "Versión en guaraní no disponible aún" notice.
- AC-H3: **THE SYSTEM SHALL** never auto-translate (translation is opt-in manual edit only).

### 7.I — Lite-CRM

- AC-I1: **WHEN** first job between (specialist, client) is marked completed, **THE SYSTEM SHALL** create a ClientRecord.
- AC-I2: **WHEN** specialist updates a note, **THE SYSTEM SHALL** persist and timestamp it.
- AC-I3: **WHEN** N days pass after a maintenance-eligible job (configurable per oficio), **THE SYSTEM SHALL** show «Pitch maintenance» nudge on the client card.
- AC-I4: **WHEN** client opts out, **THE SYSTEM SHALL** anonymize the ClientRecord (keep only aggregate stats).

### 7.J — Gamification

**Profile Completeness:**
- AC-J1: **WHEN** specialist completes any of the 8 remaining items, **THE SYSTEM SHALL** update completeness % within 500ms and emit toast.
- AC-J2: **WHEN** completeness reaches 100%, **THE SYSTEM SHALL** unlock «Perfil Maestro» badge AND grant a 7-day boost AND show confetti modal with «Share to WA Status» CTA.
- AC-J3: **THE SYSTEM SHALL** never decrement profile completeness (achieved is sticky).

**XP/Levels:**
- AC-J4: **WHEN** XP event fires (per table in 4.4), **THE SYSTEM SHALL** persist `XPEvent` and update `UserGameState.xp` transactionally.
- AC-J5: **WHEN** XP crosses tier threshold, **THE SYSTEM SHALL** update tier AND emit «Subiste a <tier>» modal AND unlock tier perks.
- AC-J6: **THE SYSTEM SHALL** enforce per-event daily caps from the XP table.

**Streaks:**
- AC-J7: **WHEN** specialist performs any active-day action, **THE SYSTEM SHALL** increment `streakCurrent` if previous date was yesterday OR set to 1 if it was older.
- AC-J8: **WHEN** specialist has zero leads on day N AND has freeze available, **THE SYSTEM SHALL** auto-apply freeze and notify next session.
- AC-J9: **WHEN** specialist activates «Pausar racha» (vacation), **THE SYSTEM SHALL** preserve streak for up to 14 days.

**Quests:**
- AC-J10: **WHEN** UTC date crosses 00:00 PY, **THE SYSTEM SHALL** generate fresh daily quests (3 from pool) for active users.
- AC-J11: **WHEN** quest goal met, **THE SYSTEM SHALL** mark as `done` AND grant rewards AND emit toast.
- AC-J12: **WHEN** weekly quest expires uncompleted, **THE SYSTEM SHALL** replace with «easier» variant next week.

**Badges:**
- AC-J13: **WHEN** badge criteria met (eval daily by cron + on-event for milestones), **THE SYSTEM SHALL** grant badge AND emit modal AND offer share-card.
- AC-J14: **THE SYSTEM SHALL** allow specialist to toggle visibility per badge.
- AC-J15: **THE SYSTEM SHALL** never auto-revoke a granted badge (sticky).

**Notifications:**
- AC-J16: **THE SYSTEM SHALL** respect specialist's quiet-hours config; non-critical notifications outside of those hours.
- AC-J17: **THE SYSTEM SHALL** not exceed 5 non-critical notifications per week per specialist.

---

## 8. Sprint Plan v2 (integrated with strategy 90-day playbook)

Каждый Sprint содержит **[USER]**, **[AUTO]**, **[HYBRID]** маркеры из матрицы.

### Sprint 0 (неделя 0) — Setup

- **[USER]** Решения 2.1–2.4 + (1)(7)(9)(10) из матрицы
- **[USER]** Init юр. консультации
- **[AUTO]** Архитектурные ADR в `docs/adr/`
- **[AUTO]** DB-схема + миграции (User extension, ProfileEvent, UserGameState, Badge, XPEvent, Quest)
- **[AUTO]** i18n инфра (en/es/gn/pt structure)
- **[AUTO]** Seed-данные: 10 категорий, 30+ барриос Asunción, badge-list
- **[HYBRID]** Парсер Clasipar (код от меня, запуск твой)

### Sprint 1 (неделя 1–2) — Feature A + Profile Completeness + Tour T1

- **[AUTO]** Feature A (Personal micro-page) — full implementation
- **[AUTO]** Profile Completeness bar + 8 шагов + endowed-progress start at 20%
- **[AUTO]** WA verification (code, ждёт твой WA Business в Sprint 0)
- **[AUTO]** WhatsApp deep-linking + auto-message templates
- **[AUTO]** Public price ranges (UI + storage)
- **[AUTO]** **Feature K — Driver.js engine + T1 «Tu primer perfil» tour (7 шагов)** + `user_tours_completed` миграция
- **[USER]** Утвердить копирайт T1 (раздел 14.3)
- **[USER]** Ручной outreach 30 DM/день

### Sprint 2 — Feature G (Badges) + Trust + Barrio filter + Tours T2/T3

- **[AUTO]** Badge engine + первый комплект 15 badges (milestone + collection + tier)
- **[AUTO]** Структурированные отзывы с фото
- **[AUTO]** Barrio service-area filter
- **[AUTO]** Share-completed-job петля (вторая часть recap-card generator)
- **[AUTO]** **T2 «Publicá tu primer servicio» (5 шагов) + T3 «Compartí tu perfil» (3 шага)**
- **[USER]** Partnership #1

### Sprint 3 — Feature B (Analytics) + SEO + Recap-card + Docs MVP

- **[AUTO]** Analytics dashboard
- **[AUTO]** Recap-card generator (Sunday recap + manual trigger)
- **[AUTO]** Hyperlocal SEO landing pages (~150 страниц auto-gen)
- **[AUTO]** Sitemap + GSC integration
- **[AUTO]** **Feature M — /docs/ MVP: Astro Content Collections + Pagefind search + 5 первых feature pages** (perfil, cotizaciones, insignias, análisis, tours)
- **[HYBRID]** **Запись 5 GIF'ов** через Playwright + ffmpeg (я записываю, ты ревьюишь)
- **[USER]** Реферальная программа (бизнес-логика готова, ты решаешь параметры)

### Sprint 4 — Feature E (Quotes) + XP/Levels + Streaks + Quests + Releases

- **[AUTO]** Quote-builder (templates + PDF + WA send)
- **[AUTO]** XP engine + tier levels
- **[AUTO]** Streak engine + auto-freeze + pause
- **[AUTO]** Quests (daily/weekly) + auto-rotation
- **[AUTO]** Weekly recap modal
- **[AUTO]** **/releases/ scaffold + RSS + login-toast + первые 2 release entries** (Foundation, Sprint 1)
- **[USER]** Partnership #2 / influencer outreach

### Sprint 5 — Monetization infra + Feature I (Lite-CRM) + Demo Mode infrastructure

- **[AUTO]** Pagopar SDK интеграция (sandbox)
- **[HYBRID]** SIFEN-helper UI placeholder + код (ждёт юр. подтверждение)
- **[AUTO]** Lead-counter UI + soft cap notification
- **[AUTO]** Lite-CRM (Feature I)
- **[AUTO]** Feature F (Lead-filters)
- **[AUTO]** **Feature L — Demo Mode infrastructure**: 10 safety mechanisms, `apiFetch` interception layer, sessionStorage state, sticky banner, visual treatment, auto-exit, exit modal
- **[AUTO]** **D1 — Demo Profile** (`/demo/profile`) с pre-populated «Demo: Juan Pérez»
- **[USER]** Финал юр. consultation + цены

### Sprint 6 — Paid tier ON + Feature H (multilingual) + survey + Demos D2/D3

- **[AUTO]** Cap-trigger включён для >10 inquiries/мес
- **[AUTO]** Платный тариф через Pagopar (Bancard карта + Tigo Money + Personal + Zimple)
- **[HYBRID]** SIFEN-helper turn-on (если юр. зелёный свет)
- **[AUTO]** Feature H — multilingual fields + hreflang
- **[AUTO]** **D2 — Demo Quote Builder + D3 — Demo Analytics**
- **[HYBRID]** First-party survey 30-50 клиентов
- **[AUTO]** Dashboard платных конверсий

---

## 9. Метрики качества и здоровья геймификации

Отдельно от метрик стратегии (раздел 11 strategy doc), для **engagement-уровня**:

| Метрика | Target к Sprint 6 | Хелсчек |
|---|---|---|
| **D1 retention (specialist)** — % new specialists who return day after signup | ≥ 50% | < 30% → перерабатываем onboarding |
| **D7 retention (specialist)** | ≥ 30% | < 20% → перерабатываем daily quests |
| **D30 retention (specialist)** | ≥ 15% | < 10% → проверяем streak + variable rewards |
| **Profile completion to 100%** | ≥ 60% within 14 days of signup | < 40% → пересмотр endowed-progress + reward |
| **Streak ≥7 дней** | ≥ 25% активных специалистов | < 15% → notification timing review |
| **Quest engagement** — % дней с хотя бы 1 завершённым daily quest | ≥ 40% | < 25% → quest pool / difficulty review |
| **Share-card generation** — % unlocked badges resulting in share | ≥ 30% | < 15% → UX модалки + проверка размеров |
| **Notification opt-out rate** | < 5% | > 10% → cadence перегруз |

---

## 10. Что-я-сделаю-сразу (стартовый список)

После твоего ответа на блокирующие вопросы (2.1–2.4) я смогу непрерывно работать по следующим задачам, не требующим тебя:

1. ADR для Feature A архитектуры (1 день)
2. DB-миграции + seed (1 день)
3. Feature A backend + UI (3–4 дня)
4. Profile Completeness bar + первые 4 шага (2 дня)
5. Badge engine (skeleton) + первая партия 5 badges (2 дня)
6. E2E тесты на A + completeness (1 день)

То есть **первая обозримая ценность за 1–2 недели** даже без полного завершения юр. вопросов.

---

## 12. Service Areas Seed (Asunción + Departamento Central)

**Структура.** Service area = `{ id, name, type: 'barrio' | 'distrito', region: 'asuncion' | 'central', slug, priority, lat?, lng? }`.

`priority` определяет порядок в выпадающих списках и весе SEO-landing'ов (0 = top, 99 = низ).

### 12.1. Asunción — barrios (25)

| # | Name | Slug | Priority | Note |
|---|---|---|---|---|
| 1 | Villa Morra | `villa-morra` | 0 | Upper-mid residential + commercial, высокий доход, прайм для услуг |
| 2 | Carmelitas | `carmelitas` | 1 | Premium residential |
| 3 | Recoleta | `recoleta` | 2 | Mid-upper, density клиентов |
| 4 | Las Mercedes | `las-mercedes` | 3 | Mid, hospitales зона |
| 5 | Manorá | `manora` | 4 | Premium gated |
| 6 | Mariscal López | `mariscal-lopez` | 5 | Mixed commercial / residential |
| 7 | Las Lomas | `las-lomas` | 6 | Premium |
| 8 | Sajonia | `sajonia` | 7 | Established mid |
| 9 | Mburicaó | `mburicao` | 8 | Mid |
| 10 | Centro / Casco Histórico | `centro` | 9 | Commercial heart, density |
| 11 | Trinidad | `trinidad` | 10 | Mid |
| 12 | Pinozá | `pinoza` | 11 | Mid |
| 13 | San Vicente | `san-vicente` | 12 | Mid |
| 14 | Vista Alegre | `vista-alegre` | 13 | Mid |
| 15 | Bella Vista | `bella-vista` | 14 | Mid |
| 16 | Ciudad Nueva | `ciudad-nueva` | 15 | Lower-mid |
| 17 | Santa Ana | `santa-ana` | 16 | Lower-mid |
| 18 | Pettirossi | `pettirossi` | 17 | Mixed, central |
| 19 | Jara | `jara` | 18 | Lower-mid |
| 20 | Herrera | `herrera` | 19 | Lower-mid |
| 21 | General Caballero | `general-caballero` | 20 | Lower-mid |
| 22 | Itay | `itay` | 21 | Lower-mid edge |
| 23 | Loma Pytá | `loma-pyta` | 22 | Northern, growing |
| 24 | San Pablo | `san-pablo` | 23 | Lower-mid |
| 25 | Ricardo Brugada (Chacarita) | `ricardo-brugada` | 24 | Lower density, sensitive |

### 12.2. Departamento Central — distritos (15)

| # | Name | Slug | Priority | Note |
|---|---|---|---|---|
| 26 | Lambaré | `lambare` | 25 | Major suburb, high commerce |
| 27 | Fernando de la Mora | `fernando-de-la-mora` | 26 | Major suburb |
| 28 | San Lorenzo | `san-lorenzo` | 27 | Educational hub, density |
| 29 | Luque | `luque` | 28 | Airport corridor |
| 30 | Ñemby | `nemby` | 29 | Growing |
| 31 | Mariano Roque Alonso | `mariano-roque-alonso` | 30 | Industrial + residential |
| 32 | Capiatá | `capiata` | 31 | Big population |
| 33 | Limpio | `limpio` | 32 | Northern Central |
| 34 | Villa Elisa | `villa-elisa` | 33 | South-west of Asunción |
| 35 | San Antonio | `san-antonio` | 34 | Industrial |
| 36 | Areguá | `aregua` | 35 | Touristic/lakeside |
| 37 | Itauguá | `itaugua` | 36 | Mid Central |
| 38 | Ypané | `ypane` | 37 | South of Asunción |
| 39 | Itá | `ita` | 38 | South Central |
| 40 | Villeta | `villeta` | 39 | River-port industrial |

### 12.3. Решения по UI/UX

- **Selection UI.** Multi-select с поиском, max 8 service areas на специалиста (предотвращает «работаю везде» паттерн).
- **Listing display.** Top-3 areas на карточке + «+N más» tooltip.
- **SEO landing pages.** 10 oficios × 40 areas = 400 страниц авто-генерации. Приоритизация по `barrio.priority + oficio.priority`. Топ-100 индексируем первыми.
- **Hierarchy.** Asunción имеет barrios; Central treated flat (distrito = barrio в data model).
- **Future:** добавление гео-координат для radius-based search (Sprint 7+).

### 12.4. Открытое для расширения

После cold-start (Sprint 6+) можно добавить:
- Encarnación (Itapúa), Ciudad del Este (Alto Paraná) — другие города PY (если liquidity позволит)
- Гео-координаты для каждого barrio (catastro municipal Asunción — public)
- Sub-barrios для крупных (например, Villa Morra Norte/Sur)

---

## 13. UI Wireframes (ASCII, mobile-first 375px)

> Wireframes = layout intent. Финальный design делает дизайн-проход. Цель — закрепить иерархию элементов и приоритет действий.

### 13.1. Feature A — Public Profile (mobile, above-the-fold + scroll)

```
┌─────────────────────────────┐
│ pyaserv      [ES ▾]  [Iniciar] │ ← header
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │     COVER IMAGE         │ │
│ │     (16:9, lazy)        │ │
│ └─────────────────────────┘ │
│        ┌──────┐             │
│        │ ⬤   │  ← avatar    │
│        │      │  (96px round)│
│        └──────┘             │
│                             │
│  Juan Pérez   [MAESTRO]🏅   │ ← name + tier badge
│  Plomero · Villa Morra      │
│                             │
│  ★4.8 (12)  ·  47 trabajos  │ ← public stats row
│  Responde en <10 min        │
│  [WA verificado ✓]          │
│                             │
│  ┌─────────────────────────┐│
│  │ 📱 Contactar por WhatsApp││ ← PRIMARY, sticky
│  └─────────────────────────┘│   на mobile внизу
│                             │
├─── scroll ──────────────────┤
│                             │
│  Sobre mí                   │
│  ─────────                  │
│  Plomero matriculado con    │
│  10 años de experiencia en  │
│  el barrio Villa Morra...   │
│                             │
│  Servicios                  │
│  ─────────                  │
│  ▸ Destape de cañería       │
│    Desde Gs 80.000          │
│  ▸ Cambio de calentador     │
│    Desde Gs 250.000         │
│  ▸ Instalación de grifería  │
│    Desde Gs 120.000         │
│                             │
│  Zonas de trabajo           │
│  ─────────                  │
│  [Villa Morra] [Carmelitas] │
│  [Recoleta] [Las Mercedes]  │
│                             │
│  Horario                    │
│  ─────────                  │
│  Lun-Vie  08:00 – 18:00     │
│  Sáb       09:00 – 13:00    │
│  Dom       Cerrado          │
│                             │
│  Trabajos recientes (12)    │
│  ─────────                  │
│  ┌──┬──┬──┐                 │
│  │📷│📷│📷│  (lazy grid)    │
│  ├──┼──┼──┤                 │
│  │📷│📷│📷│                 │
│  └──┴──┴──┘                 │
│  [Ver todos]                │
│                             │
│  Reseñas (12) ★4.8          │
│  ─────────                  │
│  Carlos M. · ★★★★★ · ago    │
│  "Excelente trabajo, rápido │
│   y limpio. Recomendado!"   │
│  📷📷                       │
│  ───                        │
│  María R. · ★★★★☆ · 2 sem   │
│  ...                        │
│  [Ver todas]                │
│                             │
│  Logros 🏅                  │
│  ─────────                  │
│  [Velocista] [Constructor]  │
│  [Estrella de Villa Morra]  │
│  [Verificado completo]      │
│                             │
│  ┌─────────────────────────┐│
│  │ Compartir mi perfil    📤││
│  └─────────────────────────┘│
│  ┌─────────────────────────┐│
│  │ ▣ QR para tarjeta       ││
│  └─────────────────────────┘│
│                             │
│  ─────────                  │
│  pyaserv.com — profesionales│
│  cerca tuyo                 │
└─────────────────────────────┘

Sticky bottom on scroll:
┌─────────────────────────────┐
│ 📱 Contactar por WhatsApp   │
└─────────────────────────────┘
```

### 13.2. `/me/` header with Gamification HUD

```
┌─────────────────────────────────────┐
│ ◀ Mi PyaServ                  [⚙]  │
├─────────────────────────────────────┤
│                                     │
│  ┌────┐  Juan Pérez                 │
│  │ ⬤ │  [MAESTRO] · ★4.8           │
│  └────┘  pyaserv.com/p/juan-perez  📋│
│                                     │
│  ┌─ Perfil 80% completo ──────────┐│
│  │ ████████████░░░░  +20% para 🏅 ││
│  │ Falta: portfolio (3 fotos),    ││
│  │        horario, RUC            ││
│  │ [Completar →]                  ││
│  └────────────────────────────────┘│
│                                     │
│  Progreso:                          │
│  ┌─────────┬──────────┬──────────┐ │
│  │ XP 1247 │ 🔥 14 d  │ ⚡ T2     │ │
│  │ → 2000  │ racha    │ Maestro  │ │
│  └─────────┴──────────┴──────────┘ │
│                                     │
├─ Misiones de hoy (1/3) ────────────┤
│  ✅ Respondé 1 lead (+10 XP)       │
│  ☐ Compartí tu perfil en WhatsApp  │
│  ☐ Agregá 1 foto al portfolio      │
├─ Misión semanal (0/3) ─────────────┤
│  ☐ Conseguir 3 reseñas (3 días)    │
└─────────────────────────────────────┘
       [Inquiries (3)] [Stats] [Profile]
```

### 13.3. Profile Completeness — close-up

```
Initial state (after signup, endowed progress = 20%):

┌────────────────────────────────────┐
│  Perfil 20% completo               │
│  ████░░░░░░░░░░░░░░░░░░░░░░░       │
│                                    │
│  ✓ WhatsApp verificado        +10% │
│  ✓ Oficio elegido             +10% │
│  ─────────                         │
│  ☐ Foto de perfil             +10% │
│  ☐ Imagen de portada          +10% │
│  ☐ Bio (≥80 caracteres)       +10% │
│  ☐ 2 servicios con precio     +10% │
│  ☐ Zona de trabajo            +10% │
│  ☐ 3 fotos de trabajos        +10% │
│  ☐ Horario                    +10% │
│  ☐ Cédula o RUC               +10% │
│                                    │
│  Recompensa al 100%:               │
│  ✦ Insignia "Perfil Maestro"      │
│  ✦ 7 días de Boost gratis          │
│                                    │
│  [Continuar →]                     │
└────────────────────────────────────┘
```

### 13.4. Badge Unlock Modal + Share Card

```
On unlock event:

┌────────────────────────────────────┐
│                            [✕]     │
│                                    │
│         ╔══════════════════╗       │
│         ║       ╱╲         ║       │
│         ║      ╱  ╲        ║       │
│         ║     ╱ 🏅 ╲       ║       │
│         ║      ╲  ╱        ║       │
│         ║       ╲╱         ║       │
│         ╚══════════════════╝       │
│                                    │
│      ¡Ganaste una insignia!        │
│       "Estrella de Villa Morra"    │
│                                    │
│      Sos top 3 plomero en          │
│      Villa Morra por reseñas       │
│      este mes.                     │
│                                    │
│   ┌──────────────────────────────┐│
│   │ Compartir en WhatsApp Status ││
│   └──────────────────────────────┘│
│   ┌──────────────────────────────┐│
│   │ Compartir en Instagram        ││
│   └──────────────────────────────┘│
│   [ Después ]                      │
└────────────────────────────────────┘

Generated share card (1080×1920):

┌──────────────────────────┐
│                          │
│   ╔══════════╗           │
│   ║  ┌────┐  ║           │
│   ║  │ ⬤ │  ║           │
│   ║  └────┘  ║           │
│   ║          ║           │
│   ║ Juan P.  ║           │
│   ║ Plomero  ║           │
│   ╚══════════╝           │
│                          │
│      🏅                  │
│  Estrella de             │
│  Villa Morra             │
│                          │
│  Top 3 plomero           │
│  por reseñas             │
│                          │
│  ─────────               │
│  pyaserv.com/p/juan-perez│
└──────────────────────────┘
```

### 13.5. Sunday Recap Modal

```
Sundays 18:00 PY (only if events worth showing):

┌────────────────────────────────────┐
│                            [✕]     │
│                                    │
│      Tu semana en PyaServ          │
│      ─────────                     │
│                                    │
│       📊  Vistas del perfil        │
│       42  ↑ +15 vs semana pasada   │
│                                    │
│       📱  Clicks a WhatsApp        │
│       12  ↑ +3                     │
│                                    │
│       📨  Inquiries recibidas       │
│       8   ↑ +2                     │
│                                    │
│       ⭐  Reseñas nuevas            │
│       2   ↑ +1 (1 con foto)        │
│                                    │
│  ─────────                         │
│  Tu mejor día fue el martes —      │
│  8 personas vieron tu perfil       │
│                                    │
│  ✨ Estás en el top 10% de plomeros│
│     en Villa Morra por velocidad   │
│                                    │
│   ┌──────────────────────────────┐│
│   │ Compartir mi semana 📤        ││
│   └──────────────────────────────┘│
│   [ Después ]                      │
└────────────────────────────────────┘
```

### 13.6. Quote Builder

```
┌─────────────────────────────┐
│ ◀  Nueva cotización         │
├─────────────────────────────┤
│ Cliente (opcional)          │
│ ┌─────────────────────────┐ │
│ │ Nombre o teléfono       │ │
│ └─────────────────────────┘ │
│                             │
│ Plantillas                  │
│ ┌─────────────────────────┐ │
│ │ ▾ Cambio de calentador  │ │
│ └─────────────────────────┘ │
│ (Plomero: 3 disponibles)    │
│                             │
│ ─────────                   │
│ Items                       │
│                             │
│ ┌─────────────────────────┐ │
│ │ Calentador eléctrico    │ │
│ │ x 1     Gs    250.000   │ │
│ │                    [✕]  │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Mano de obra            │ │
│ │ x 1     Gs    150.000   │ │
│ │                    [✕]  │ │
│ └─────────────────────────┘ │
│  + Agregar item             │
│                             │
│ ─────────                   │
│ Subtotal      Gs   400.000  │
│ IVA 10%       Gs    40.000  │
│ ☑ Incluir IVA               │
│ ─────────                   │
│ TOTAL         Gs   440.000  │
│                             │
│ ┌─────────────────────────┐ │
│ │ Enviar por WhatsApp 📱  │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Guardar como plantilla  │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### 13.7. Tier Badge in Listing (specialist card)

```
Search result row:

┌────────────────────────────────────┐
│ ┌────┐ Juan Pérez   [MAESTRO]🏅    │
│ │ ⬤ │ Plomero · Villa Morra        │
│ └────┘ ★4.8 (12) · resp. <10 min   │
│        [Velocista] [Estrella]      │
│ ┌────────────────────────────────┐ │
│ │ 📱 WhatsApp                    │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
```

---

## 14. Feature K — Onboarding Tour (interactive guidance)

**Зависит от:** Driver.js (~5 KB gzipped, MIT) — lazy-loaded на роутах где tour запускается.
**Спринт:** Sprint 1 (T1 «Tu primer perfil»). T2–T5 — Sprint 2+.

### 14.1. Purpose

Walk first-time specialists by the hand: signup → 100% profile → first listing → first share. Tour — это **endowed-progress accelerator**, доводящий специалиста с baseline 20% до 50%+ за один сеанс (≤10 минут).

Жёсткие требования от пользователя 2026-06-24:
- **Ведомый + конечный.** No open-ended exploration. Clear start, clear end.
- **Skip-able at any step.** Никакого «trapped» ощущения.
- **Re-launchable** из /docs/ или /me/ help menu (без повторной XP-награды).
- Initial scope: **только startup (T1)**. T2-T5 — позже в спринтах.

### 14.2. Tours catalog

| Code | Name (es, voseo) | Trigger | Steps | XP | Badge |
|---|---|---|---|---|---|
| T1 | Tu primer perfil | First /me/ visit (no prior tour record) | 7 | +50 | `aprendiz_orientado` |
| T2 | Publicá tu primer servicio | T1 done + 0 listings | 5 | +30 | `publicador` |
| T3 | Compartí tu perfil | T2 done + profile ≥ 50% | 3 | +20 | `embajador_inicio` |
| T4 | Configurá tu agenda | T1 done + empty schedule | 4 | +20 | TBD |
| T5 | Cotizá rápido (Quote Builder) | After feature E ships | 6 | +30 | TBD |

T4–T5 — Sprint 2+; список НЕ исчерпывающий.

### 14.3. T1 — «Tu primer perfil» (7 шагов)

| # | Anchor | Tooltip headline | Body (voseo) |
|---|---|---|---|
| 1 | `#avatar-upload` | Empezamos por tu cara | Una buena foto duplica las consultas. Sacate una con luz natural. |
| 2 | `#cover-image` | Imagen de portada | Lo primero que ven los clientes. Una foto de tu trabajo o algo de tu rubro. |
| 3 | `#bio-textarea` | Contales quién sos | 2-3 frases. Tu experiencia, herramientas, qué zonas cubrís. |
| 4 | `#services-add` | ¿Qué servicios ofrecés? | Al menos dos, con precio aproximado. Los clientes odian «consultar por privado». |
| 5 | `#service-area-selector` | Tu zona de trabajo | Elegí hasta 8 barrios. Los más cercanos primero. |
| 6 | `#schedule-editor` | Tu horario | Cuándo respondés. Fuera de eso los clientes ven que estás cerrado y no se enojan. |
| 7 | `#completeness-bar` | ¡Listo! | Tu perfil está en X %. Cada paso adicional sube tu visibilidad. ¡Tomá tu primer Boost! |

Step 7 fires «Perfil Maestro» modal (см. 4.3) ТОЛЬКО при completion ≥ 100% к концу тура.

### 14.4. State management

```sql
-- migration 0011_tours
CREATE TABLE user_tours_completed (
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tour_code    TEXT NOT NULL,           -- 'T1', 'T2', ...
  status       TEXT NOT NULL,           -- 'completed' | 'skipped'
  completed_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, tour_code)
);
```

Client cache:
```
localStorage:
  pyaserv.tours.completed = ['T1']
  pyaserv.tours.skipped   = ['T3']
```

Sync rules:
- On login: GET /api/v1/me/tours → localStorage
- On tour finish: POST /api/v1/me/tours { code, status } → both updated, DB источник правды
- Single source of truth: DB; localStorage — кэш для off-line first

### 14.5. Auto-launch rules

```
T1: first /me/ visit AND no T1 record AND profile_complete_pct < 100
T2: /me/listings tab open AND T1 done AND 0 listings
T3: /me/ visit AND T2 done AND profile_complete_pct ≥ 50
```

Throttle: **max 1 tour per session**. Если несколько eligible — самый старый в очереди первым.

### 14.6. Mobile rendering

- Spotlight через `clip-path: polygon(...)` cutout
- Tooltip below anchor если есть место (≥ 200 px) else above
- Controls sticky внизу: «Atrás · 3/7 · Siguiente»
- Reduced-motion: no animations, instant transitions
- Pinch-zoom не блокируется

### 14.7. Wireframe — Tour step

```
┌─────────────────────────────┐
│ pyaserv     [ES ▾]  [⚙]     │
├─────────────────────────────┤
│                             │
│  ╔═══════════════════════╗  │  ← spotlight cutout
│  ║  [cover image area]   ║  │
│  ╚═══════════════════════╝  │
│                             │
│  ┌─────────────────────────┐│  ← tooltip
│  │ Imagen de portada       ││
│  │                         ││
│  │ Lo primero que ven los  ││
│  │ clientes. Una foto de tu││
│  │ trabajo o algo del rubro││
│  │                         ││
│  │ Paso 2 de 7  ▌▌▌░░░░    ││
│  └─────────────────────────┘│
│ ┌───────────────────────────┐│
│ │ Atrás · Saltar · Siguiente││
│ └───────────────────────────┘│
└─────────────────────────────┘
```

### 14.8. EARS criteria (Feature K)

- **AC-K1**: WHEN first-time user opens `/me/` AND has no T1 record, THE SYSTEM SHALL launch T1 within 500 ms of page-load.
- **AC-K2**: WHEN user clicks Skip at any step, THE SYSTEM SHALL persist completion status `'skipped'` and never auto-launch the same tour again.
- **AC-K3**: WHEN user finishes a tour, THE SYSTEM SHALL grant matching quest reward AND persist `completed` AND grant matching badge.
- **AC-K4**: THE SYSTEM SHALL respect `prefers-reduced-motion: reduce` (instant transitions, no auto-scroll).
- **AC-K5**: WHEN user re-launches a completed tour from `/docs/`, THE SYSTEM SHALL replay it without re-rewarding.
- **AC-K6**: THE SYSTEM SHALL never auto-launch more than 1 tour per session.

---

## 15. Feature L — Demo Mode (Safety-First Sandbox)

**Зависит от:** Sprint 5+ infrastructure.
**Доступ:** из /docs/ (anonymous) или /me/ → «Probar primero».
**Главный design driver:** пользователь физически НЕ может перепутать demo с реальным профилем.

### 15.1. Purpose

Per-feature playground that lets visitors AND logged-in users experience functionality with zero risk to real data. Используется:
- **Marketing** (anonymous из /docs/ → «Probar demo»)
- **Re-discovery** (logged-in user хочет потрогать X до commit'а)
- **Onboarding deepening** (после T-tour user практикуется в demo)

### 15.2. Safety Charter — 10 anti-confusion mechanisms

**Это ЗАКОН demo mode.** ВСЕ должны быть активны одновременно. Если хоть один сломан — demo НЕ запускается (fail-closed).

| # | Mechanism | Implementation |
|---|---|---|
| 1 | **URL signal** | Route prefix `/demo/<feature-slug>`. Виден в browser bar. |
| 2 | **Non-dismissible banner** | Orange (`#F59E0B`) sticky banner сверху: «MODO DEMO — los cambios no se guardan». Кнопка «Salir». **НЕ dismissible**. |
| 3 | **Visual differentiation** | `<html data-demo-mode="1">` триггерит: subtle yellow tint via CSS filter, `border-top: 4px solid #F59E0B`, «DEMO» diagonal watermark на key components. |
| 4 | **Mock data names** | Каждая сущность префикс `Demo:` (`Demo: Juan Pérez`, `Demo: Villa Morra Plomeros`). Phone fake (`+595 000 0000000`), email fake (`demo@ejemplo.com`). |
| 5 | **Sandboxed state** | ВСЕ writes в `sessionStorage["pyaserv.demo.{feature}"]`. API calls перехватываются на `apiFetch` слое → canned responses из `apps/site/src/demo/stubs/*.ts`. **Ноль DB writes.** |
| 6 | **Identity separation** | Demo рендерится LOGGED-OUT visually, даже если real session активна. Real avatar/имя НЕ показывается в demo UI нигде. |
| 7 | **Exit confirmation** | «Salir» → modal «Volver a tu perfil real. Nada de lo que probaste se guarda.» с явной кнопкой confirm. |
| 8 | **Auto-exit on idle** | 10 минут без активности → modal «Tu sesión demo terminó» → redirect `/docs/`. |
| 9 | **No data import** | «Save» в demo → «¿Querés probar lo mismo en tu perfil real?» с линком, но **НЕ переносит данные**. |
| 10 | **Audit log** | Client emits `analytics_event` `demo_started` / `demo_exited` / `demo_idle_timeout` для метрик (anonymized, no PII). |

### 15.3. Demo flows MVP

| Code | Feature | Sprint | Steps user can experience |
|---|---|---|---|
| D1 | Demo Profile | 5 | Edit avatar/cover/bio/services/areas; completeness bar; mock «Compartir mi perfil» |
| D2 | Demo Quote Builder | 6 | Pick template, fill items, PDF preview, mock «Enviar por WhatsApp» |
| D3 | Demo Analytics | 6 | Pre-populated metrics, hover sparklines, heatmap |

### 15.4. State management

```
sessionStorage:
  pyaserv.demo.profile         = { displayName: "Demo: Juan", ... }
  pyaserv.demo.startedAt       = ISO timestamp
  pyaserv.demo.lastActivity    = ISO timestamp

Auto-exit loop:
  on user input → update lastActivity
  setInterval каждые 30 s: if now - lastActivity > 10 min → exit modal

Cleanup:
  on demo exit → delete pyaserv.demo.* keys
  on 24 h TTL (next session) → also cleared
```

### 15.5. API interception layer

В `src/lib/api.ts`:
```ts
const apiFetch = async (path: string, opts?: RequestInit) => {
  if (location.pathname.startsWith('/demo/')) {
    return demoStub(path, opts)  // canned response
  }
  // real fetch logic
}
```

`demoStub` возвращает `Promise` с canned response, соответствующим schema real endpoint. Stubs в `apps/site/src/demo/stubs/*.ts`, по одному на endpoint.

### 15.6. Wireframe — Demo banner + visual

```
┌─────────────────────────────────────────┐  ← orange border-top 4 px
│ ⚠  MODO DEMO — los cambios no se guardan│  ← non-dismissible sticky banner
│                                  [Salir]│
├─────────────────────────────────────────┤
│ pyaserv [ES ▾] [Iniciar]   (yellow tint applied to all UI)
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ [DEMO watermark diagonal background]│ │
│ │                                     │ │
│ │  ┌──┐  Demo: Juan Pérez             │ │
│ │  │⬤│  [MAESTRO]  ★4.8               │ │
│ │  └──┘  Plomero · Villa Morra        │ │
│ │                                     │ │
│ │  Perfil 60 % completo               │ │
│ │  ███████████████░░░░░░░             │ │
│ │  [Agregar foto] [Agregar servicio]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│  ┌────────────────────────────────────┐ │
│  │ 📱 Contactar por WhatsApp [DEMO]   │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

Exit modal:

```
┌──────────────────────────────────────┐
│                              [✕]     │
│                                      │
│   Volver a tu perfil real            │
│   ─────────                          │
│                                      │
│   Nada de lo que probaste en el      │
│   modo demo se guarda. Tu perfil     │
│   real sigue como lo dejaste.        │
│                                      │
│   ┌────────────────────────────────┐ │
│   │ Sí, volver a mi perfil         │ │
│   └────────────────────────────────┘ │
│   ┌────────────────────────────────┐ │
│   │ Seguir en demo                 │ │
│   └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

### 15.7. EARS criteria (Feature L)

- **AC-L1**: WHEN demo route is entered, THE SYSTEM SHALL set `html[data-demo-mode="1"]` AND render persistent non-dismissible banner before first paint.
- **AC-L2**: THE SYSTEM SHALL NEVER write to the database from any demo route — verified by integration test asserting zero D1 writes.
- **AC-L3**: WHEN user has an active real session AND enters demo, THE SYSTEM SHALL render the demo as logged-out (real user identity NOT visible anywhere in demo UI).
- **AC-L4**: WHEN user idles 10 minutes in demo, THE SYSTEM SHALL show idle modal AND auto-redirect to `/docs/` after user confirms or 30 s additional inactivity.
- **AC-L5**: THE SYSTEM SHALL prefix every mock entity name with `Demo:` OR render with `DEMO` badge in the corner.
- **AC-L6**: WHEN user clicks «Salir», THE SYSTEM SHALL show confirmation modal explaining nothing was saved.
- **AC-L7**: THE SYSTEM SHALL NOT support any data import from demo to real profile (no «Save to real profile» button anywhere).
- **AC-L8**: WHEN any of the 10 Safety Charter mechanisms cannot be enabled (e.g., CSS for banner failed to load), THE SYSTEM SHALL refuse to enter demo mode (fail-closed) AND show «Demo no disponible. Intentá de nuevo.».

---

## 16. Feature M — Documentation + Release Notes

**Зависит от:** Sprint 3 (docs MVP, 5 страниц), Sprint 4 (release notes scaffold), Sprint 5+ (demo links activate).

### 16.1. Purpose

Public-facing operating manual. Single source of truth для «как работает X» + «что нового». SEO surface: каждая feature page индексируется.

### 16.2. URL & file layout

| URL | Source |
|---|---|
| `/docs/` | `src/content/docs/_index.md` — feature grid index |
| `/docs/<slug>` | `src/content/docs/<slug>.md` |
| `/releases/` | `src/content/releases/_index.md` — chronological list |
| `/releases/<date>-<slug>` | `src/content/releases/<date>-<slug>.md` |
| `/releases/rss.xml` | Auto через `@astrojs/rss` |

**Astro Content Collections** — frontmatter validated by Zod schema, type-safe rendering.

### 16.3. Per-feature page structure

**Media format:** animated WebP primary (Markdown-native `![](file.webp)`, ~80% smaller than GIF, loops natively, supported in all modern browsers since 2019). MP4 H.264 fallback для редких случаев когда нужны полные тона / длинный clip. **Никаких GIF'ов** — устаревший формат.

```yaml
---
title: "Tu perfil público"
slug: perfil
order: 1
demoUrl: /demo/profile
relaunchTour: T1
media:
  src: /docs/media/perfil.webp
  alt: "Demo: edición de perfil con barra de completitud subiendo a 80%"
  width: 800
tags: [profile, sharing]
updatedAt: 2026-06-24
---

## TL;DR
Mostrá tu trabajo, tu zona, tu precio en una página propia.

![Demo: edición de perfil](/docs/media/perfil.webp)

## ¿Qué incluye?
- Foto + portada
- Bio + servicios con precio
- Zonas (hasta 8 barrios)
- Horario
- Galería de trabajos
- Reseñas

## Cómo usarlo
1. ...

[Probar demo →](/demo/profile)
[Lanzar el tour →](#relaunch-tour=T1)

## Preguntas frecuentes
...
```

### 16.4. Per-release entry structure

```yaml
---
title: "Spec v1 Foundation"
version: v1.0.0
date: 2026-06-24
tags: [foundation, schema, i18n]
authors: [igor]
---

## TL;DR
Base de datos lista para todas las features de spec v1.

## Nuevo
### Idioma guaraní
Ahora podés ver PyaServ con vocablos en guaraní en los lugares con
emoción (CTAs, saludos). El resto sigue en español.
![Cambio de idioma a guaraní](/docs/media/releases/2026-06/gn-toggle.webp)

### 40 barrios + distritos
Asunción + Departamento Central catalogados. Tu perfil puede listar
hasta 8 zonas de trabajo.
[Ver lista completa →](/docs/zonas)

## Mejorado
…

## Arreglado
…

## Próximamente
- Tu perfil público (`/p/<tu-slug>`) — Sprint 1
- Insignias y XP — Sprint 2

[Suscribirme a las novedades →](#subscribe)
```

### 16.5. Search

**Pagefind** (MIT, no external service):
- Build hook: `pagefind --site dist` после `bun run build`
- Static index в `dist/pagefind/`
- Client: `<input id="search">` + `pagefind.search(query)`
- Покрывает `/docs/` + `/releases/`
- Полностью client-side, без БД

### 16.6. Release subscription

**1. Email digest (monthly)** — opt-in от /releases/ или /me/
- Backend через `@pya-company/email`
- Schedule: 1-е число месяца
- Content: все releases за прошлый месяц, render из Markdown
- Migration table:
  ```
  user_release_subscriptions(
    user_id TEXT FK,
    email TEXT,
    last_sent_at INTEGER,
    PRIMARY KEY (user_id)
  )
  ```

**2. In-app toast on login** — automatic для logged-in
- Track `users.last_seen_release_at` (timestamp)
- On login: `releases.date > last_seen_release_at` → toast «Hay novedades. Ver release notes.» → `/releases/`
- One toast per session

### 16.7. Animation generation pipeline (VS Code marketplace-style)

**Стиль:** как в VS Code marketplace previews — screen-only с visible custom cursor (большой оранжевый dot, бренд-цвет), без face-cam, без аудио. Каждый клик подсвечивается. Loop seamless.

**Формат:** animated WebP (primary, Markdown-native, <200 KB target) + MP4 H.264 (fallback для длинных или цветных анимаций, через `<video autoplay muted loop playsinline>`).

Self-recording через Playwright:

```
apps/site/scripts/record-docs-animations.ts
  - Запускает Chromium через Playwright headed mode
  - Открывает /demo/<feature>
  - Performs scripted user actions с программируемым delay
  - Overlay PyaServ custom cursor (orange #F59E0B 24px dot)
    через page.addInitScript (CSS injection + mousemove tracker)
  - Page video recorded as WebM (Chromium default)
  - ffmpeg conversion pipeline:
      ffmpeg -i input.webm \
        -vf "fps=20,scale=800:-1:flags=lanczos" \
        -loop 0 -quality 80 \
        public/docs/media/<feature>.webp
  - Fallback MP4 для длинных clips (>10s):
      ffmpeg -i input.webm -c:v libx264 -crf 28 \
        -preset slow -an public/docs/media/<feature>.mp4
```

**Бюджеты:**
- WebP: ≤ 200 KB / 8 секунд / 800 px ширина / fps 20
- MP4: ≤ 800 KB / 15 секунд / 800 px / H.264 CRF 28

Запуск **перед каждым release** через `bun run record-animations` или CI-job по schedule. Файлы commit'ятся в репо в `public/docs/media/`.

### 16.8. Wireframe — /docs/ index

```
┌─────────────────────────────┐
│ pyaserv [ES ▾] [Buscar 🔍]  │
├─────────────────────────────┤
│ Documentación               │
│ ─────────                   │
│ Cómo usar PyaServ + qué hay │
│ de nuevo.                   │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🔍 Buscar en docs       │ │
│ └─────────────────────────┘ │
│                             │
│ Features                    │
│ ┌──────────┬──────────────┐ │
│ │ Perfil   │ Cotizaciones │ │
│ │ [▶ webp] │ [▶ webp]     │ │
│ │ Probar → │ Probar →     │ │
│ ├──────────┼──────────────┤ │
│ │ Insignias│ Análisis     │ │
│ │ [▶ webp] │ [▶ webp]     │ │
│ │ Probar → │ Probar →     │ │
│ ├──────────┼──────────────┤ │
│ │ Tour     │ Compartir    │ │
│ │ [▶ webp] │ [▶ webp]     │ │
│ │ Lanzar → │ Probar →     │ │
│ └──────────┴──────────────┘ │
│                             │
│ Últimas novedades           │
│ ─────────                   │
│ • 2026-06-24 Spec v1…       │
│ • 2026-06-10 Tab switch fix │
│ [Ver todas →]               │
└─────────────────────────────┘
```

### 16.9. EARS criteria (Feature M)

- **AC-M1**: WHEN docs page loads, THE SYSTEM SHALL render LCP < 1.5 s (static + edge-cached) on simulated 3G+4× CPU.
- **AC-M2**: THE SYSTEM SHALL include «Probar demo» CTA on each feature page that has a corresponding demo route.
- **AC-M3**: Each release entry SHALL appear in RSS feed within 5 min of publication.
- **AC-M4**: THE SYSTEM SHALL provide client-side search via Pagefind covering all docs + releases.
- **AC-M5**: WHEN user logs in AND there are unread releases since `last_seen_release_at`, THE SYSTEM SHALL show one toast «Hay novedades» linking to `/releases/`.
- **AC-M6**: THE SYSTEM SHALL allow tour re-launch from feature page (`#relaunch-tour=T1` hash) — same tour engine as section 14.

---

## 17. Multi-language strategy — DE / EN / RU / ES первого класса (2026-06-25 PIVOT)

**Контекст.** Изначальное предположение «Spanish-first для PY рынка» НЕВЕРНО. Реальная целевая аудитория PyaServ на первое время — **expat communities в Парагвае:** немецкая (исторически большая, Колониа Indep / Filadelfia / Asunción), англоговорящая (digital nomads, retirees, business), русскоговорящая (быстрорастущая community 2022+), плюс локальный испаноговорящий рынок. Все четыре языка — **равноправные**, без приоритета.

### 17.1. Что меняется

| Было | Стало |
|---|---|
| Default locale ES, fallback EN | Default = `navigator.language` round-robin fairness: DE/EN/RU/ES определяется первым `lang.startsWith()` совпадением; если нет — EN (нейтральный) |
| Locale type `'es' \| 'en' \| 'gn'` | `'es' \| 'en' \| 'de' \| 'ru' \| 'gn'` — GN сдвинут с «equal» в **deferred** (нишевое culture-add, не блокер) |
| GN был в Sprint 1 i18n inf | DE+RU **выходят** в Sprint 1 i18n инфра, базовые dict минимум nav+home+me/tabs+login |
| Один lang-switch ES/EN | 4-button switch ES/EN/DE/RU + меню «Más idiomas» для GN |
| ~150 hyperlocal SEO pages × 2 langs | × 4 langs = 600 страниц (hreflang генерируется автоматически) |
| Tour copy — voseo only | Все 7 шагов T1 локализуются на 4 языка через i18n keys |
| Email/push — испанский | Учитывают locale из user.locale (already in DB) |

### 17.2. Implementation Tasks

| # | Что | Sprint |
|---|---|---|
| ML-1 | Locale type → `'es' \| 'en' \| 'de' \| 'ru' \| 'gn'` + auto-detect rewrite (нейтрально) + 4-button switcher | Sprint 1 |
| ML-2 | Base DE dictionary (~80 keys: nav/home/me/login/badges/quests) | Sprint 1 |
| ML-3 | Base RU dictionary (~80 keys) | Sprint 1 |
| ML-4 | Extend EN to 100% parity (сейчас baseline) | Sprint 1 |
| ML-5 | Astro `i18n.locales` config: `['es', 'en', 'de', 'ru']`, no `prefixDefaultLocale` | Sprint 1 |
| ML-6 | Per-specialist multilingual: extend Feature H spec — add `bio_de` / `bio_ru` / `headline_de` / `headline_ru` columns (migration 0013) | Sprint 2 |
| ML-7 | `<link rel="alternate" hreflang>` на /p/`<slug>` и SEO landing pages — все 4 langs | Sprint 3 |
| ML-8 | SEO landing pages × 4 langs (600 страниц total) | Sprint 3 |
| ML-9 | Tour T1 copy на 4 langs | Sprint 1 |
| ML-10 | Email + push notifications respect `user.locale` | Sprint 4 |

### 17.3. EARS criteria

- **AC-ML1**: WHEN any new visitor arrives, THE SYSTEM SHALL detect locale from `navigator.language` без bias на ES.
- **AC-ML2**: THE SYSTEM SHALL render full UI in any of DE/EN/RU/ES без missing strings (fallback chain locale → EN → key; EN dict mandatory-complete).
- **AC-ML3**: WHEN specialist creates profile, THE SYSTEM SHALL allow translation в любые DE/EN/RU/ES of `bio` + `headline`.
- **AC-ML4**: WHEN visitor uses `?lang=de`, THE SYSTEM SHALL serve full DE site.
- **AC-ML5**: SEO landing pages SHALL emit `hreflang` tags для всех 4 langs.

---

## 18. Mobile strategy — Tauri + WebView, single codebase (2026-06-25)

### 18.1. Decision

PyaServ mobile (iOS + Android) = **Tauri 2.0 mobile + WebView**, wrapping **the same web codebase**. NO React Native. NO Flutter. NO separate mobile app.

### 18.2. Implications

| Decision | Constraint |
|---|---|
| Single codebase | Все features (профиль, quote, badges, tours) работают идентично в browser и Tauri-mobile. |
| WebView compat | Никаких Node.js-only API. Только browser APIs + Tauri command bridge for native (camera, share, push, file system). |
| Build target | `apps/site` builds to static HTML/CSS/JS; `apps/mobile` (new) — Tauri shell wrapping `apps/site/dist`. |
| Native APIs | Doorway через `@tauri-apps/api` — capture screen for share-card, push notifications, biometric для passkeys. |
| Distribution | iOS App Store + Google Play (Tauri 2.0 mobile подходит). |

### 18.3. Implementation Tasks (deferred to Sprint 7+)

| # | Что | Sprint |
|---|---|---|
| TR-1 | Create `apps/mobile` workspace with Tauri 2.0 scaffold | 7 |
| TR-2 | Tauri config — wrap `apps/site/dist` as WebView source | 7 |
| TR-3 | iOS Xcode project + signing | 7 |
| TR-4 | Android Gradle project + signing | 7 |
| TR-5 | Push notifications via Tauri plugin → Pyaserv API | 8 |
| TR-6 | Native share intent (Share to WhatsApp / Telegram) | 8 |
| TR-7 | Biometric integration for passkey auth | 8 |
| TR-8 | App Store submission | 9 |
| TR-9 | Google Play submission | 9 |

### 18.4. NON-goals

- Никаких native-only screens. Все UI декларируется в Astro + WebView рендерит.
- Никаких mobile-only features первое время. Web и mobile видят одно и то же.

### 18.5. EARS

- **AC-TR1**: THE SYSTEM SHALL ship a Tauri mobile build (iOS + Android) WITHOUT modifying `apps/site` source code beyond conditional Tauri-bridge calls (guarded with `typeof window.__TAURI__ !== 'undefined'`).
- **AC-TR2**: WHEN web codebase is updated, THE SYSTEM SHALL build mobile from the same commit без divergence.

---

## 19. Local-first / Offline-first architecture (2026-06-25 — TOP PRIORITY INITIATIVE)

### 19.1. Vision

**Reference product:** Todoist mobile + web. Когда сеть пропадает:
- Любая страница **открывается** (нет «cannot connect» errors)
- Local cache рендерит последние known данные
- Mutations (создание / правка) **queued** в IndexedDB
- UI отображает **status indicator**: offline / syncing / synced / conflict
- При reconnect — **automatic background sync** mutations к API
- **Conflict resolution** интерактивная (показать diff, попросить выбор)

Это **архитектурный sprint** на 4-6 недель. Не оптимизация — фундамент.

### 19.2. Sub-features (как отдельные tickets)

| # | Что | Sprint | Эффорт |
|---|---|---|---|
| OF-1 | **Service Worker offline shell** — precache `_app shell` HTML/CSS/JS, serve when offline, не показывать chrome errors | 7 | M |
| OF-2 | **IndexedDB persistence layer** — таблицы `profiles_local`, `inquiries_local`, `messages_local`, `mutations_queue` | 7 | L |
| OF-3 | **Mutation queue + sync engine** — каждый POST/PATCH сначала в queue + optimistic apply local, потом background sync to API | 7 | XL |
| OF-4 | **Conflict resolution model** — Last-Write-Wins per field + manual resolution для critical (price, schedule) | 8 | L |
| OF-5 | **UI status indicators** — global "offline" badge, per-row sync state (pending / syncing / synced / conflict / failed) | 8 | M |
| OF-6 | **Background Sync API** — register sync events, retry с exponential backoff | 8 | M |
| OF-7 | **Optimistic UI** — все писания моментально reflect в UI, queue tracks для rollback при API reject | 8 | L |
| OF-8 | **Network status detection** — `navigator.onLine` + periodic ping `/health`, не bait into false-positive | 8 | S |
| OF-9 | **Comprehensive E2E test suite** — 50+ сценариев Playwright: offline navigate, offline create profile, offline send message, conflict on parallel edit, sync after 24h offline, etc. | 8-9 | XL |
| OF-10 | **Documentation + user-facing help** — `/docs/offline` объясняющая что работает offline и почему | 9 | S |

### 19.3. Architecture decisions

```
┌─ Browser ────────────────────────────────────────┐
│                                                  │
│  UI Components                                   │
│    ↕  (always read local first)                 │
│  Local Data Layer (IndexedDB via idb-keyval)    │
│    ↕                                             │
│  Mutation Queue (IndexedDB)                     │
│    ↕  (background sync)                         │
│  Sync Engine                                    │
│    ↓ (when online)                              │
│  apiFetch — adds optimistic + queues if offline │
│                                                  │
└──────────────────────────────────────────────────┘
                    ↓ HTTPS
        ┌─── api.pyaserv.com ───┐
        │  CF Worker + D1 + KV  │
        └───────────────────────┘
```

**Conflict resolution model:**
- Per-field LWW (Last-Write-Wins) by server timestamp для большинства полей
- Manual resolution для критичных: `price`, `schedule`, `services` — показать diff modal с «оставить локальное / принять серверное / merge»
- Operation log per entity для audit

**Mutation queue schema:**
```typescript
interface QueuedMutation {
  readonly id: string                  // uuid
  readonly entityType: 'profile' | 'inquiry' | 'message' | 'quote' | 'client_record'
  readonly entityId: string
  readonly method: 'POST' | 'PATCH' | 'DELETE'
  readonly path: string                // /v1/me/profile-extended
  readonly body: unknown
  readonly createdAt: number
  readonly retryCount: number
  readonly lastError?: string
  readonly status: 'pending' | 'syncing' | 'synced' | 'failed' | 'conflict'
}
```

### 19.4. Reference behavior (Todoist comparison)

| Scenario | Todoist | PyaServ target |
|---|---|---|
| Open app offline | ✓ Shows cached data | ✓ Same |
| Create task offline | ✓ Stored locally, syncs later | ✓ Create profile / inquiry / quote offline |
| Edit task offline | ✓ Edits queue, applied on reconnect | ✓ Same |
| Two devices edit same task | ✓ LWW + notification | ✓ Same |
| 24h offline → reconnect | ✓ Batch sync, no data loss | ✓ Same |
| Offline + low storage | ✓ Graceful degradation | ✓ Same |

### 19.5. Test suite requirements (OF-9 detail)

E2E tests via Playwright + `context.setOffline(true)`:

1. Offline navigate /me/, /docs/, /demo/profile, /servicios/ — все 200 from SW cache
2. Offline create profile → queue → reconnect → sync → server has it
3. Offline edit profile, parallel server edit by another device → reconnect → conflict modal
4. Offline send message in inquiry → optimistic show → reconnect → confirmed
5. Offline create quote → reconnect → PDF still generated from local data
6. Network flaky (intermittent 50% loss) → sync engine survives
7. Offline 7 days → reconnect → batch sync all 50 queued mutations
8. Mutation fails server-side validation → user notified, can fix locally
9. Cache eviction at storage limit — only ancient + synced entries evicted
10. Multiple browser tabs concurrent writes → single source of truth in IndexedDB

### 19.6. EARS

- **AC-OF1**: WHEN client loses network connectivity, THE SYSTEM SHALL continue rendering all UI from local cache without errors.
- **AC-OF2**: WHEN user performs mutation offline, THE SYSTEM SHALL queue it locally AND apply optimistically to UI.
- **AC-OF3**: WHEN connectivity returns, THE SYSTEM SHALL automatically sync queued mutations to API with exponential backoff on failures.
- **AC-OF4**: WHEN server returns conflict (concurrent edit), THE SYSTEM SHALL show user-facing diff modal with manual resolution choices for critical fields.
- **AC-OF5**: THE SYSTEM SHALL display network status indicator AND per-entity sync state AT ALL TIMES.
- **AC-OF6**: WHEN mutation fails permanently (4xx after retries), THE SYSTEM SHALL notify user without data loss; mutation remains in queue marked `failed` with explain.
- **AC-OF7**: E2E test suite SHALL include ≥ 50 offline / sync / conflict scenarios.

### 19.7. Mobile (Tauri) reuse

Все Local-first инфра работает в Tauri WebView идентично browser — same IndexedDB, same SW, same code. Native push wakes sync engine when app backgrounded.

---

## 20. Demo Mode v2 — same codebase + IntelliJ-style guidance (2026-06-25 REWRITE)

### 20.1. Problem with v1

Текущая реализация `/demo/profile`, `/demo/tour`, `/demo/badges`, `/demo/quote`, `/demo/analytics` — отдельные mock pages с inline HTML mockups. Это **дублирование кода** + **не передаёт реальный UX**. User'у видна не настоящая фича, а её reconstruction.

### 20.2. New architecture (v2)

```
URL: /me/?demo=1&tour=T1   (any real page with ?demo=1)
  ↓
Layout: SAME as real (Base.astro)
  ↓
apiFetch interception: if URLSearchParams.has('demo') → return demoStub instead of real API call
  ↓
Tour overlay: spotlight (rest of page darkened) + tooltip + Next/Prev/Skip/Close
  ↓
Walk user through actual real-page elements step-by-step
```

### 20.3. IntelliJ-style guidance — design spec

Reference: JetBrains IDEA «Help → Productivity Guide» + onboarding tour.

| Element | Implementation |
|---|---|
| **Darken overlay** | Full-page `position:fixed; inset:0; background:rgba(0,0,0,0.6); pointer-events:none;` — клик НЕ блокируется |
| **Spotlight cutout** | `clip-path: polygon(...)` или 4-side mask вокруг anchor element; элемент остаётся «highlighted» |
| **Tooltip** | Absolute positioned относительно spotlight; top/bottom/left/right выбирается автоматом по доступному месту |
| **Step navigation** | «Atrás» + step count «3/7» + «Saltar» + «Siguiente» — в нижней части tooltip |
| **Sequential walk** | Click «Siguiente» → spotlight + tooltip перемещаются на следующий anchor, smooth animation (200 ms) |
| **Click-to-progress** | Опционально: «Hacé click acá para continuar» — wait for actual click before advancing |
| **Close button** | «×» в углу tooltip; close = skip tour |
| **Restart** | Re-launch из help menu или `?tour=T1` query param |

### 20.4. Components

`apps/site/src/lib/guided-tour.ts`:
```typescript
interface TourStep {
  readonly selector: string          // CSS selector for anchor
  readonly title: string
  readonly body: string
  readonly position?: 'top'|'bottom'|'left'|'right'|'auto'
  readonly waitForClick?: boolean    // если true — Next disabled пока user не кликнет anchor
}

interface TourConfig {
  readonly code: string              // 'T1', 'T2', ...
  readonly steps: ReadonlyArray<TourStep>
  readonly onClose?: (reason: 'skip'|'finish') => void
}

export const startTour = (config: TourConfig): void => { /* ... */ }
```

`apps/site/src/components/GuidedTour.astro` — overlay markup + styles.

`apps/site/src/lib/demo-data.ts` — canned data per entity (Demo: Juan Pérez profile, mock quotes, mock badges, etc).

### 20.5. apiFetch interception

В `apps/site/src/lib/api.ts`:
```typescript
const isDemoMode = (): boolean => {
  if (typeof location === 'undefined') return false
  return new URLSearchParams(location.search).has('demo')
}

export const apiFetch = async (path, opts) => {
  if (isDemoMode()) {
    const stub = await demoStub(path, opts)
    if (stub !== null) return stub
    // unrecognized path → still fall through to real fetch (read-only)
  }
  // ... existing logic
}
```

`demoStub` returns object matching real API shape, or `null` if path не имеет demo data.

### 20.6. Migration plan

1. Delete `apps/site/src/pages/demo/profile.astro`, `tour.astro`, `badges.astro`, `quote.astro`, `analytics.astro`, `index.astro`.
2. Delete `apps/site/src/layouts/DemoLayout.astro`.
3. Keep `apps/site/src/lib/demo-mode.ts` infrastructure (banner, exit, idle) — adapt для overlay context.
4. Build `apps/site/src/lib/guided-tour.ts` engine (IntelliJ-style, replace Driver.js).
5. Build `apps/site/src/lib/demo-data.ts` stubs.
6. Wire `apiFetch` interception.
7. Update `/docs/` feature cards: «Probar demo →» links to `/me/?demo=1&tour=T1` style URLs.
8. Tour T1 firing на /me/ для new specialists — reuse `guided-tour` engine.

### 20.7. Safety Charter — упрощено

Old 10 mechanisms list still applies (banner, tint, DEMO watermark, sandbox state, logged-out identity, etc) but now **applied on top of real pages**, не на mock pages. Mechanism 1 (URL signal) changes: `?demo=1` query param visible in URL.

### 20.8. EARS

- **AC-L2-1**: WHEN user adds `?demo=1` to any real route, THE SYSTEM SHALL apply Safety Charter visual treatment AND intercept all writes to be sandboxed.
- **AC-L2-2**: WHEN demo tour is launched (`?tour=T1`), THE SYSTEM SHALL show darken-overlay-spotlight on each step, with Next/Prev/Skip/Close controls.
- **AC-L2-3**: THE SYSTEM SHALL render real page components в demo, not separate mock pages.
- **AC-L2-4**: WHEN user clicks Next, THE SYSTEM SHALL animate spotlight to next step's anchor element.
- **AC-L2-5**: WHEN anchor element is off-screen, THE SYSTEM SHALL auto-scroll to it before highlighting.

---

## 11. Открытые вопросы

### Закрыто 2026-06-24
- ~~Бренд-тон~~ → vos + Guaraní вставки (раздел 2.2)
- ~~10 категорий~~ → черновик принят (раздел 2.1)
- ~~Pricing~~ → 10 inquiries/мес → Gs 50k (раздел 2.3)
- ~~Геймификация~~ → strong/soft asymmetry (раздел 2.4)
- ~~Барриос seed list~~ → 40 areas зафиксированы (раздел 12)
- ~~UI wireframes~~ → 7 ключевых экранов (раздел 13)
- ~~Features K/L/M scope~~ → Tour (T1 в Sprint 1) + Docs (Sprint 3) + Demo Mode (Sprint 5+) (разделы 14, 15, 16)

### Закрыто 2026-06-25
- ~~Workflow для копирайта~~ → Claude драфтит ВСЁ end-to-end (туры, docs, releases, marketing copy, help text). Post-hoc review. Никаких отдельных copy-approval gates. Объём: только CONTENT/COPY (не код, не legal, не migrations).
- ~~Стиль анимаций /docs/~~ → VS Code marketplace style: screen-only + visible custom cursor (бренд-orange dot), без face-cam. Формат: **animated WebP** primary (Markdown-native), MP4 H.264 fallback. **NO GIF.** (раздел 16.7)
- ~~Demo Mode visual~~ → STRONG: все 4 механизма (banner + tint + watermark + 4 px border) активны одновременно (раздел 15.2)
- ~~Demo Mode access~~ → BOTH: anonymous из /docs/ + logged-in «Probar primero» из /me/. Safety Charter работает идентично в обоих сценариях.

### Открытые / асинхронные

| # | Вопрос | Тип | Срок | Кто |
|---|---|---|---|---|
| O1 | Юр. консультация SIFEN при volume-cap | Legal | до Sprint 5 | [USER] |
| O2 | Pagopar sales call — реальные комиссии | Commercial | до Sprint 4 | [USER] |
| O3 | Trade association partnerships (APEM / Colegio) | Human | Sprint 2 | [USER] |
| O4 | Keyword volumes (Ahrefs / Keyword Planner) | Research | Sprint 2 | [HYBRID] |
| O5 | Запуск парсера Clasipar — правовое OK | Legal | Sprint 0 | [USER] |
| O9 | Email-провайдер release digest (Resend / CF Email Routing / другое) | Infrastructure | Sprint 4 | [USER] |

**Стартовая блокировка снята.** Sprint 0 закрыт (PR #24 ждёт review). Sprint 1 готов к запуску после merge.
