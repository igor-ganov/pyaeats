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

### Sprint 1 (неделя 1–2) — Feature A + Profile Completeness

- **[AUTO]** Feature A (Personal micro-page) — full implementation
- **[AUTO]** Profile Completeness bar + 8 шагов + endowed-progress start at 20%
- **[AUTO]** WA verification (code, ждёт твой WA Business в Sprint 0)
- **[AUTO]** WhatsApp deep-linking + auto-message templates
- **[AUTO]** Public price ranges (UI + storage)
- **[USER]** Ручной outreach 30 DM/день

### Sprint 2 — Feature G (Badges) + Trust + Barrio filter

- **[AUTO]** Badge engine + первый комплект 15 badges (milestone + collection + tier)
- **[AUTO]** Структурированные отзывы с фото
- **[AUTO]** Barrio service-area filter
- **[AUTO]** Share-completed-job петля (вторая часть recap-card generator)
- **[USER]** Partnership #1

### Sprint 3 — Feature B (Analytics) + SEO + Recap-card

- **[AUTO]** Analytics dashboard
- **[AUTO]** Recap-card generator (Sunday recap + manual trigger)
- **[AUTO]** Hyperlocal SEO landing pages (~150 страниц auto-gen)
- **[AUTO]** Sitemap + GSC integration
- **[USER]** Реферальная программа (бизнес-логика готова, ты решаешь параметры)

### Sprint 4 — Feature E (Quotes) + XP/Levels + Streaks + Quests

- **[AUTO]** Quote-builder (templates + PDF + WA send)
- **[AUTO]** XP engine + tier levels
- **[AUTO]** Streak engine + auto-freeze + pause
- **[AUTO]** Quests (daily/weekly) + auto-rotation
- **[AUTO]** Weekly recap modal
- **[USER]** Partnership #2 / influencer outreach

### Sprint 5 — Monetization infra + Feature I (Lite-CRM)

- **[AUTO]** Pagopar SDK интеграция (sandbox)
- **[HYBRID]** SIFEN-helper UI placeholder + код (ждёт юр. подтверждение)
- **[AUTO]** Lead-counter UI + soft cap notification
- **[AUTO]** Lite-CRM (Feature I)
- **[AUTO]** Feature F (Lead-filters)
- **[USER]** Финал юр. consultation + цены

### Sprint 6 — Paid tier ON + Feature H (multilingual) + survey

- **[AUTO]** Cap-trigger включён для >10 inquiries/мес
- **[AUTO]** Платный тариф через Pagopar (Bancard карта + Tigo Money + Personal + Zimple)
- **[HYBRID]** SIFEN-helper turn-on (если юр. зелёный свет)
- **[AUTO]** Feature H — multilingual fields + hreflang
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

## 11. Открытые вопросы

### Закрыто 2026-06-24
- ~~Бренд-тон~~ → vos + Guaraní вставки (раздел 2.2)
- ~~10 категорий~~ → черновик принят (раздел 2.1)
- ~~Pricing~~ → 10 inquiries/мес → Gs 50k (раздел 2.3)
- ~~Геймификация~~ → strong/soft asymmetry (раздел 2.4)
- ~~Барриос seed list~~ → 40 areas зафиксированы (раздел 12)
- ~~UI wireframes~~ → 7 ключевых экранов (раздел 13)

### Открытые / асинхронные

| # | Вопрос | Тип | Срок | Кто |
|---|---|---|---|---|
| O1 | Юр. консультация SIFEN при volume-cap | Legal | до Sprint 5 | [USER] |
| O2 | Pagopar sales call — реальные комиссии | Commercial | до Sprint 4 | [USER] |
| O3 | Trade association partnerships (APEM / Colegio) | Human | Sprint 2 | [USER] |
| O4 | Keyword volumes (Ahrefs / Keyword Planner) | Research | Sprint 2 | [HYBRID] |
| O5 | Запуск парсера Clasipar — правовое OK | Legal | Sprint 0 | [USER] |

**Стартовая блокировка снята.** Sprint 0 в работе.
