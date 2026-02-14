# Requirements Planner Agent Memory

## User Preferences
- Language: Korean (default)
- No emojis in responses
- Detailed, structured documentation preferred
- Provide concrete options (A/B/C) rather than open-ended questions

## Observed Tech Stack Preferences
- Backend: Spring Boot + JPA
- Frontend: React + TypeScript + Zustand (state management)
- DB: MySQL
- Target: Mobile web (responsive)
- Auth: JWT preferred

## Domain Patterns

### Drum Score Application (2026-02-26)
- Drum parts: HH_CLOSED, HH_OPEN, HH_FOOT, RIDE, CRASH, SNARE, HIGH_TOM, MID_TOM, FLOOR_TOM, KICK
- Grid resolution: 16th note (gridPosition 0~15 per 4/4 bar)
- Hierarchy: Score > Section > Bar > Note
- API pattern: Bar-level batch note save (PUT /bars/{id}/notes) preferred over individual note PUT
- Auto-save: 2 second debounce after last change, dirty flag per bar
- Mobile UX: Minimum 44px cell size (Apple HIG), horizontal scroll grid with sticky drum part labels

## Planning Style
- Output format: Requirements doc + Implementation plan in one response
- Include: DB schema SQL, TypeScript types, component tree, API table, risk register, phased roadmap
- Phase structure: MVP (core editing) → User auth + PDF → Advanced features
- Always end with 3 clarifying questions as concrete A/B options

## Links to Detail Files
- (none yet)
