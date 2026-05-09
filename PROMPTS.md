# AI-Assisted Development Prompts

## Primary Prompt

```text
You are a senior Frontend Engineer. Build a production-quality React + TypeScript application for the Eulerity Web Take-Home Challenge.

Tech Stack Requirements:
- React
- TypeScript
- Vite
- styled-components
- react-router-dom
- fetch API only
- Context API or Redux for global state
- Responsive design
- Clean architecture

Project Goal:
Create a pet gallery application using the API endpoint:
/pets

The application must include:

CORE FEATURES
1. Fetch and display pets from the API
   - Each pet object includes:
     - id
     - image_url
     - title
     - description
     - created_at
   - Use fetch API
   - Show loading state
   - Show error state
   - Show empty state

2. Gallery UI
   - Responsive grid:
     - Mobile: 1 column
     - Tablet: 2 columns
     - Desktop: 4 columns
   - Each card should include:
     - Image
     - Title
     - Short description
     - Creation date
     - Checkbox for selection
     - Button/link to detail page

3. Selection Features
   - User can select multiple pets
   - Selection state must persist across routes
   - Display:
     - total selected count
     - estimated total file size
   - Buttons:
     - Select All
     - Clear Selection
     - Download Selected

4. Sorting
   Add dropdown:
   - Name A-Z
   - Name Z-A
   - Date Newest First
   - Date Oldest First

5. Search
   - Searchbar filters by:
     - title
     - description
   - Debounced input preferred

6. Routing
   Use react-router-dom:
   Routes:
   - /
   - /pets/:id
   - /about
   - 404 page

7. Detail Page
   Dynamic route:
   /pets/:id

   Show:
   - Large image
   - Full description
   - Metadata
   - Back button
   - Preserve selection state

8. Custom Hook
   Create reusable hook:
   usePets()

   Must handle:
   - loading
   - error
   - empty states
   - pagination/infinite scroll logic

9. Pagination or Infinite Scroll
   Implement either:
   - Infinite scrolling
   OR
   - Pagination controls

10. Styled Components
   Entire UI must use styled-components
   Include:
   - theme file
   - reusable styled primitives
   - responsive utilities

11. Code Quality
   - Strong TypeScript typing
   - Reusable components
   - Folder structure
   - Comments where necessary
   - Clean naming
   - No unnecessary complexity

12. Bonus Enhancements
   Add:
   - Dark/light theme toggle
   - Image lazy loading
   - Framer-motion animations
   - Toast notifications
   - Skeleton loaders
   - Accessibility improvements
   - Keyboard navigation
   - LocalStorage persistence
   - Optimized performance

PROJECT STRUCTURE
Use a scalable structure like:

src/
  api/
  components/
  hooks/
  pages/
  routes/
  context/
  styles/
  utils/
  types/

DELIVERABLES
Also generate:
1. README.md
   Include:
   - setup steps
   - architecture explanation
   - feature list
   - tradeoffs
   - future improvements

2. PROMPTS.md
   Include all prompts used during AI-assisted development.

3. Professional UI
   Make the app visually modern and polished.

4. Production-level code quality.

IMPORTANT
- Do not use mock data unless API fails.
- Handle all edge cases.
- Make it interview-quality.
- Ensure code is ready to push directly to GitHub.
- Explain architectural decisions in comments where useful.
- Use modern React patterns only.

Now generate the entire application step-by-step with complete code files.
```

## Additional Prompt Notes

- No separate external prompt chain or third-party AI prompt set was used beyond the direct task prompt above.
