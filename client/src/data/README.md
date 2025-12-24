# Data Organization Structure

All dummy data has been organized into separate files in the `src/data/` directory for better scalability and maintainability.

## 📁 Folder Structure

```
src/
├── data/
│   ├── services.ts      # Legal services data
│   ├── community.ts     # Community stats, topics, success stories
│   └── resources.ts     # Resources, categories, news
├── app/
│   ├── services/page.tsx
│   ├── community/page.tsx
│   └── resources/page.tsx
└── components/
    ├── Navbar.tsx
    └── Footer.tsx
```

## 🔄 How to Replace with API

### Current (Dummy Data):
```typescript
import { SERVICES } from '@/data/services';
```

### Future (API):
```typescript
// Replace the import with API call
const SERVICES = await fetch('/api/services').then(res => res.json());
```

## 📄 Data Files

### services.ts
- `SERVICES` - Array of legal service offerings

### community.ts
- `COMMUNITY_STATS` - Member count, discussions, solved cases
- `FORUM_TOPICS` - Forum discussion threads
- `SUCCESS_STORIES` - Client testimonials

### resources.ts
- `RESOURCE_CATEGORIES` - Resource type categories
- `FEATURED_RESOURCES` - Downloadable resources
- `RECENT_NEWS` - Legal news updates

## ✅ Benefits

1. **Organized** - All data in one place
2. **Readable** - Clean page components
3. **Scalable** - Easy to replace with API
4. **Maintainable** - Update data without touching UI
5. **Reusable** - Import data anywhere needed
