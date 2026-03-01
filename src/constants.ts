const ORANGE = "#E8892B";
const GREEN = "#4CAF7D";
const BLUE = "#64B5F6";

export const ROADMAP = [
  {
    id: 1, label: "Month 1", title: "Foundations", subtitle: "Product Design Language + Course Tasks 1–10", color: ORANGE,
    weeks: [
      {
        id: "m1w1", label: "Week 1", theme: "Real Problem Discovery",
        days: [
          { day: "MON", type: "wfh", tasks: [
            { id:"m1w1-mon-1", time:"45m", text:"Watch Task 1 – Real Problem Identification", detail:"5 lectures (~29 min). Identify 1 app you'll audit all month as your case study.", ref:"Your Course: Task 1", url:"" },
            { id:"m1w1-mon-2", time:"60m", text:"Task 2 – Market Research lectures", detail:"Watch lectures then research 3 direct competitors of your chosen app. Note their strengths/gaps.", ref:"Your Course: Task 2", url:"" },
            { id:"m1w1-mon-3", time:"30m", text:"Figma setup & Auto-Layout warm-up", detail:"Open Figma, watch the official Auto-Layout intro (~20 min). Recreate 1 simple card component using Auto-Layout.", ref:"Figma: Auto Layout Docs", url:"https://help.figma.com/hc/en-us/articles/5731482952599" },
            { id:"m1w1-mon-4", time:"30m", text:"Design Twitter – Create account + first post", detail:"Post: 'Day 1 of my transition from Graphic Designer to Product Designer. Auditing [App Name] this month. Thread incoming 🧵'", ref:"Design Twitter Tips", url:"https://twitter.com" },
          ]},
          { day: "TUE", type: "office", tasks: [
            { id:"m1w1-tue-1", time:"45m", text:"Task 3 – Competitor Analysis lectures", detail:"1hr 5min of content. Focus on frameworks: feature matrix, positioning map.", ref:"Your Course: Task 3", url:"" },
            { id:"m1w1-tue-2", time:"30m", text:"Build competitor feature matrix in FigJam", detail:"Open FigJam, map 3 competitors across 8–10 features. Note where your case study app wins/loses.", ref:"FigJam Templates", url:"https://www.figma.com/community/file/814113055275990546" },
            { id:"m1w1-tue-3", time:"30m", text:"Read: Double Diamond Design Process", detail:"Understand the design thinking model you'll follow for every project.", ref:"Interaction Design Foundation", url:"https://www.interaction-design.org/literature/article/what-is-design-thinking-and-why-is-it-so-popular" },
          ]},
          { day: "WED", type: "wfh", tasks: [
            { id:"m1w1-wed-1", time:"60m", text:"Task 4 – User Research lectures", detail:"Study Jobs-to-be-Done, pain point interviews, observational research methods.", ref:"Your Course: Task 4", url:"" },
            { id:"m1w1-wed-2", time:"60m", text:"Figma Auto-Layout deep dive – Part 1", detail:"Study Auto-Layout nesting, constraints, resizing. Rebuild a navigation bar + card grid from scratch.", ref:"Auto Layout Crash Course – YouTube", url:"https://www.youtube.com/results?search_query=figma+auto+layout+2024+crash+course" },
            { id:"m1w1-wed-3", time:"45m", text:"Write 8 user interview questions for your case study app", detail:"Follow the format: 2 warm-up, 4 core problem, 2 closing. Save to a Notion doc.", ref:"NN/g Interview Guide", url:"https://www.nngroup.com/articles/user-interviews/" },
            { id:"m1w1-wed-4", time:"30m", text:"Schedule 1 real user interview (friend/family/colleague)", detail:"Ask someone who actually uses your case study app. Even 15 min is enough.", ref:"Recruiting Participants Guide", url:"https://www.nngroup.com/articles/recruiting-usability-test-participants/" },
          ]},
          { day: "THU", type: "office", tasks: [
            { id:"m1w1-thu-1", time:"50m", text:"Task 5 – Affinity Mapping lectures + practice", detail:"Watch lectures then build an affinity map from your research notes in FigJam.", ref:"Your Course: Task 5", url:"" },
            { id:"m1w1-thu-2", time:"40m", text:"Read: How to analyse qualitative research data", detail:"Understand thematic analysis. This makes your affinity map stronger.", ref:"UX Research Analysis – NN/g", url:"https://www.nngroup.com/articles/affinity-diagram/" },
            { id:"m1w1-thu-3", time:"30m", text:"Figma practice: Auto-Layout forms component", detail:"Build a form (label + input + button) that flexes responsively using Auto-Layout.", ref:"Figma Components + Auto Layout", url:"https://help.figma.com/hc/en-us/articles/360038662654" },
          ]},
          { day: "FRI", type: "office", tasks: [
            { id:"m1w1-fri-1", time:"50m", text:"Task 6 – User Persona lectures", detail:"Study persona frameworks: demographics, goals, frustrations, behaviours.", ref:"Your Course: Task 6", url:"" },
            { id:"m1w1-fri-2", time:"40m", text:"Draft Persona #1 for your case study app", detail:"Use a free Figma persona template. Fill in with real data from your interview/research.", ref:"Figma Persona Template", url:"https://www.figma.com/community/file/880742245476819087" },
            { id:"m1w1-fri-3", time:"25m", text:"Review week. Post progress on Twitter", detail:"Share your competitor map screenshot or affinity map. Caption: 'Week 1 of learning product design process. Here's what I discovered about [App]…'", ref:"Design Twitter", url:"https://twitter.com" },
          ]},
          { day: "SAT", type: "weekend", tasks: [
            { id:"m1w1-sat-1", time:"90m", text:"DEEP WORK: Gray-box wireframe of a hit app – Part 1", detail:"Pick Spotify, Airbnb, or Duolingo. Gray-box wireframe 5–6 key screens in Figma. Focus on layout logic, not visuals.", ref:"Gray Box Wireframing Guide", url:"https://uxdesign.cc/what-is-a-wireframe-856f9a2be635" },
            { id:"m1w1-sat-2", time:"60m", text:"Figma Auto-Layout – Advanced challenge", detail:"Recreate a real UI section (a card feed or dashboard row) that reflows perfectly when columns change.", ref:"Figma Auto Layout Playground", url:"https://www.figma.com/community/file/988810561390363483" },
            { id:"m1w1-sat-3", time:"60m", text:"Watch: The UX process explained (free YouTube resource)", detail:"Get a 10,000-ft view of the whole process before diving deeper into each task next week.", ref:"AJ&Smart UX Process", url:"https://www.youtube.com/results?search_query=ux+design+process+explained+2024" },
            { id:"m1w1-sat-4", time:"30m", text:"Set up your Notion Design Journal", detail:"One note per week: what you learned, what confused you, what you want to revisit. This compounds fast.", ref:"Notion Templates", url:"https://www.notion.so/templates/design-system" },
          ]},
          { day: "SUN", type: "weekend", tasks: [
            { id:"m1w1-sun-1", time:"90m", text:"Complete gray-box wireframe – Screens 7–10 + reverse-engineer doc", detail:"Write the 'what/why/how' for 5 key design decisions you observed. This is Portfolio Piece #0.", ref:"Reverse Engineering Case Studies", url:"https://www.figma.com/blog/how-to-reverse-engineer-a-design/" },
            { id:"m1w1-sun-2", time:"60m", text:"Complete User Persona #2 for case study app", detail:"Second persona for a different user archetype. Cross-check against your affinity map.", ref:"Your Course: Task 6", url:"" },
            { id:"m1w1-sun-3", time:"45m", text:"Week 1 review & plan Week 2 in your journal", detail:"Note: What's harder than expected? What clicked? Adjust next week if needed.", ref:"Your Design Journal (Notion)", url:"" },
            { id:"m1w1-sun-4", time:"30m", text:"Read: What is Product Design (vs Graphic Design)?", detail:"Understand the mental shift you're making. Critical for framing your own story later.", ref:"Figma Blog: What is Product Design", url:"https://www.figma.com/resource-library/what-is-product-design/" },
          ]},
        ]
      },
      {
        id: "m1w2", label: "Week 2", theme: "Empathy, Personas & Deep Figma",
        days: [
          { day: "MON", type: "wfh", tasks: [
            { id:"m1w2-mon-1", time:"60m", text:"Task 7 – Empathy Mapping lectures + build maps", detail:"Create empathy maps (Says/Thinks/Does/Feels) for BOTH your personas in FigJam.", ref:"Your Course: Task 7", url:"" },
            { id:"m1w2-mon-2", time:"60m", text:"Task 8 – Mental Models lectures", detail:"Understand how users expect the app to behave vs. how it actually works. Document 3 mental model gaps.", ref:"Your Course: Task 8", url:"" },
            { id:"m1w2-mon-3", time:"60m", text:"Figma Auto-Layout – Component variants practice", detail:"Build a Button component with 4 variants (Primary/Secondary × Default/Hover). Use component properties.", ref:"Figma Component Variants", url:"https://help.figma.com/hc/en-us/articles/360056440594" },
            { id:"m1w2-mon-4", time:"30m", text:"Read: Mental Models in UX Design", detail:"The most underrated concept in product design. Read before next lecture.", ref:"NN/g: Mental Models", url:"https://www.nngroup.com/articles/mental-models/" },
          ]},
          { day: "TUE", type: "office", tasks: [
            { id:"m1w2-tue-1", time:"60m", text:"Task 9 – User Journey Mapping lectures + maps", detail:"Map 2 full user journeys for your case study app. Plot emotional highs/lows at each step.", ref:"Your Course: Task 9", url:"" },
            { id:"m1w2-tue-2", time:"40m", text:"Build journey map in FigJam using template", detail:"Use a free Figma/FigJam journey map template. Add real quotes from your interview.", ref:"Journey Map Template – Figma Community", url:"https://www.figma.com/community/file/745593151984369794" },
            { id:"m1w2-tue-3", time:"20m", text:"Twitter post: Share empathy map or journey map screenshot", detail:"Caption: 'Understanding the user before touching Figma. This is what product design is really about.'", ref:"Design Twitter", url:"" },
          ]},
          { day: "WED", type: "wfh", tasks: [
            { id:"m1w2-wed-1", time:"75m", text:"Task 10 – Problem Statement & HMW lectures + writing", detail:"Write 3 strong HMW statements from your research. These will guide all future design decisions.", ref:"Your Course: Task 10", url:"" },
            { id:"m1w2-wed-2", time:"75m", text:"Figma: Recreate a complex UI section pixel-perfectly", detail:"Pick any hi-fi screen from Dribbble. Recreate it in Figma to build speed and accuracy.", ref:"Dribbble for reference", url:"https://dribbble.com/search/mobile-ui" },
            { id:"m1w2-wed-3", time:"60m", text:"Consolidate all research into a 1-page Research Brief", detail:"Personas + Journey maps + HMW statements in one Figma frame. This is your case study foundation.", ref:"Case Study Structure Guide", url:"https://uxfol.io/blog/ux-case-study" },
            { id:"m1w2-wed-4", time:"30m", text:"Read: Writing strong HMW statements", detail:"HMW is the bridge between research and design. Master this format.", ref:"IDEO HMW Method", url:"https://www.designkit.org/methods/how-might-we" },
          ]},
          { day: "THU", type: "office", tasks: [
            { id:"m1w2-thu-1", time:"60m", text:"Figma: Auto-Layout responsive card grid deep dive", detail:"Build a 3-col card grid that collapses to 1-col. Pure Auto-Layout, no manual resizing.", ref:"Responsive Design in Figma", url:"https://www.youtube.com/results?search_query=figma+responsive+layout+auto+layout+2024" },
            { id:"m1w2-thu-2", time:"30m", text:"Review Week 1 wireframe – annotate with new learnings", detail:"Now that you understand journey maps and HMW, add annotations to your gray-box wireframes.", ref:"Wireframe Annotation Best Practices", url:"https://www.nngroup.com/articles/wireframe-annotation/" },
            { id:"m1w2-thu-3", time:"30m", text:"Watch: Introduction to Design Systems (free)", detail:"Preview of what you'll build in Month 2. Get excited about it.", ref:"Figma: Intro to Design Systems", url:"https://www.youtube.com/watch?v=EK-pHkc5EL4" },
          ]},
          { day: "FRI", type: "office", tasks: [
            { id:"m1w2-fri-1", time:"60m", text:"Figma practice: Build a navigation bar + tab bar component", detail:"Build a top nav and a bottom tab bar with Auto-Layout. Add active/inactive states.", ref:"Navigation Patterns – Mobile", url:"https://www.nngroup.com/articles/mobile-navigation-patterns/" },
            { id:"m1w2-fri-2", time:"45m", text:"Review all 10 course tasks completed so far", detail:"Can you explain each task in 2 sentences? If not, revisit that module.", ref:"Your Course Curriculum", url:"" },
            { id:"m1w2-fri-3", time:"15m", text:"Twitter: Thread on 'My first 2 weeks learning product design'", detail:"3-4 tweet thread. What surprised you most? What's hardest?", ref:"Design Twitter", url:"" },
          ]},
          { day: "SAT", type: "weekend", tasks: [
            { id:"m1w2-sat-1", time:"120m", text:"Redesign #1 – Pick a frustrating app, redesign 3 screens", detail:"Choose an app with obvious UX problems. Apply your research process first (even 15 min). Then redesign.", ref:"Redesign Process Guide", url:"https://uxdesign.cc/how-to-do-a-ux-case-study-redesign-b484a87ac5b5" },
            { id:"m1w2-sat-2", time:"90m", text:"Continue gray-box wireframe – write full what/why/how doc", detail:"Write the narrative for your reverse-engineered app. 500–800 words. This IS a portfolio piece.", ref:"Reverse Engineering Example", url:"https://uxdesign.cc/reverse-engineering-amazon-ux-c71ea7df4bef" },
            { id:"m1w2-sat-3", time:"60m", text:"Read: 'Don't Make Me Think' Chapter 1–3", detail:"Most practical UX book ever written. Free PDF widely available online.", ref:"Don't Make Me Think – Steve Krug", url:"https://www.google.com/search?q=don%27t+make+me+think+pdf" },
          ]},
          { day: "SUN", type: "weekend", tasks: [
            { id:"m1w2-sun-1", time:"90m", text:"Redesign #1 – Polish to hi-fi and document decisions", detail:"For each redesigned screen, write 1 sentence: 'I changed X because Y and it solves Z.'", ref:"Design Decision Documentation", url:"" },
            { id:"m1w2-sun-2", time:"60m", text:"Figma: Explore variables and tokens (preview)", detail:"Watch intro to Figma variables. You'll use this heavily in Month 2 for your Design System.", ref:"Figma Variables – Official Docs", url:"https://help.figma.com/hc/en-us/articles/15339657135383" },
            { id:"m1w2-sun-3", time:"60m", text:"Plan your Design System – sketch structure on paper", detail:"What components do you need? Typography scale? Color tokens? Spacing system? Sketch it.", ref:"Design System Checklist", url:"https://www.designsystemchecklist.com/" },
          ]},
        ]
      },
      {
        id: "m1w3", label: "Week 3", theme: "Features, Flows & Daily Practice",
        days: [
          { day: "MON", type: "wfh", tasks: [
            { id:"m1w3-mon-1", time:"75m", text:"Preview Task 11 – Features Brainstorming", detail:"Even though this is Month 2 territory, start brainstorming 20 feature ideas for your case study app.", ref:"Your Course: Task 11", url:"" },
            { id:"m1w3-mon-2", time:"60m", text:"Figma: Build a full card component library", detail:"Build 4 card variants: basic, image, action, stats. All Auto-Layout. All with component properties.", ref:"Card Design Patterns", url:"https://uxdesign.cc/designing-cards-for-beginners-9ed9454d27f6" },
            { id:"m1w3-mon-3", time:"45m", text:"Redesign #2 – Begin research phase", detail:"Pick a second app. Spend 45 min only on research: competitor check, user pain points, 3 HMW statements.", ref:"Your Course Process (Tasks 1–10)", url:"" },
            { id:"m1w3-mon-4", time:"30m", text:"Read: Atomic Design by Brad Frost (Chapter 1 free online)", detail:"The conceptual foundation of every great design system.", ref:"Atomic Design – Brad Frost", url:"https://atomicdesign.bradfrost.com/chapter-1/" },
          ]},
          { day: "TUE", type: "office", tasks: [
            { id:"m1w3-tue-1", time:"60m", text:"Task 12 – User Flow lectures", detail:"Understand how users move between screens. Map 3 flows for your case study.", ref:"Your Course: Task 12", url:"" },
            { id:"m1w3-tue-2", time:"50m", text:"Build user flows in Figma using simple shapes", detail:"Rectangles = screens, diamonds = decisions, arrows = paths. Map 'happy path' + 1 error state.", ref:"User Flow Templates – Figma Community", url:"https://www.figma.com/community/file/902951684467143170" },
            { id:"m1w3-tue-3", time:"10m", text:"Twitter post: Share a user flow diagram", detail:"'Most designers skip this step. I'm mapping user flows BEFORE wireframing. Here's why…'", ref:"Design Twitter", url:"" },
          ]},
          { day: "WED", type: "wfh", tasks: [
            { id:"m1w3-wed-1", time:"75m", text:"Redesign #2 – Wireframe and hi-fi 3 screens", detail:"Apply your HMW statements. Design 3 improved screens. Document each decision.", ref:"Figma Wireframe Kit", url:"https://www.figma.com/community/file/1042693594609122560" },
            { id:"m1w3-wed-2", time:"60m", text:"Task 13 – Information Architecture lectures (1hr 24min)", detail:"Learn site mapping, card sorting, and how to structure content logically.", ref:"Your Course: Task 13", url:"" },
            { id:"m1w3-wed-3", time:"60m", text:"Figma: Build a form component system", detail:"Text input, password input, dropdown, checkbox, radio – all as components with error/focus states.", ref:"Form Design Best Practices – NN/g", url:"https://www.nngroup.com/articles/web-form-design/" },
            { id:"m1w3-wed-4", time:"30m", text:"Watch: UX Case Study Structure (how to present your work)", detail:"Understanding presentation structure now saves you hours in Month 4–5.", ref:"How to Present UX Work – YouTube", url:"https://www.youtube.com/results?search_query=how+to+present+ux+case+study+2024" },
          ]},
          { day: "THU", type: "office", tasks: [
            { id:"m1w3-thu-1", time:"60m", text:"Build sitemap for your case study app in Figma", detail:"Top-down hierarchy: Home → Sections → Screens. Keep it clean and scannable.", ref:"Sitemap Template – Figma Community", url:"https://www.figma.com/community/file/880742245476819087" },
            { id:"m1w3-thu-2", time:"50m", text:"Task 14 – Paper Sketching + Wireframing lectures", detail:"Study rapid sketching methods. The goal is quantity, not quality.", ref:"Your Course: Task 14", url:"" },
            { id:"m1w3-thu-3", time:"10m", text:"Sketch 10 micro-screen thumbnails by hand (phone paper)", detail:"Super fast, 1 min each. You're practicing divergent thinking, not drawing.", ref:"Crazy Eights Method", url:"https://designsprintkit.withgoogle.com/methodology/phase3-sketch/crazy-8s" },
          ]},
          { day: "FRI", type: "office", tasks: [
            { id:"m1w3-fri-1", time:"60m", text:"Redesign #2 – Final polish + write-up", detail:"Write the case study blurb: Problem / Research Summary / Design Decisions / Outcome.", ref:"Case Study Template", url:"https://uxfol.io/blog/ux-case-study" },
            { id:"m1w3-fri-2", time:"60m", text:"Figma: Build a navigation + tab bar system (all variants)", detail:"Mobile bottom nav (3/4/5 tabs), top nav with search icon, hamburger menu – as a full component set.", ref:"Navigation Component Patterns", url:"https://uxplanet.org/best-practices-for-mobile-navigation-beec6485e079" },
          ]},
          { day: "SAT", type: "weekend", tasks: [
            { id:"m1w3-sat-1", time:"120m", text:"Design System – Sprint Day 1: Colors & Typography", detail:"Define your full color palette (primary, secondary, neutrals, semantic). Define type scale (12/14/16/20/24/32/40/48px).", ref:"Design Token Structure Guide", url:"https://www.figma.com/blog/design-tokens-studio/" },
            { id:"m1w3-sat-2", time:"90m", text:"AI-assisted design practice – Generate then polish in Figma", detail:"Use Figma AI or Midjourney to generate an app concept. Recreate and polish it in Figma manually.", ref:"Figma AI Features", url:"https://www.figma.com/blog/introducing-ai/" },
            { id:"m1w3-sat-3", time:"60m", text:"Read: Laws of UX (free online resource)", detail:"10 psychological principles every product designer needs. Bookmark and revisit monthly.", ref:"Laws of UX – lawsofux.com", url:"https://lawsofux.com/" },
          ]},
          { day: "SUN", type: "weekend", tasks: [
            { id:"m1w3-sun-1", time:"120m", text:"App Design #1 from Prompt – Full session", detail:"Go to Sharpen.design, get a random brief. Design 5 screens. No overthinking. Just ship it.", ref:"Sharpen.design – Random Brief Generator", url:"https://sharpen.design/" },
            { id:"m1w3-sun-2", time:"75m", text:"Design System – Spacing & Grid system", detail:"Define your spacing scale (4/8/12/16/24/32/48px). Set up your 8pt grid in Figma.", ref:"8pt Grid System Guide", url:"https://spec.fm/specifics/8-pt-grid" },
            { id:"m1w3-sun-3", time:"45m", text:"Twitter: Post Month 1 Week 3 progress thread", detail:"Show before/after of your redesign. Real learning builds real audience.", ref:"Design Twitter", url:"" },
          ]},
        ]
      },
      {
        id: "m1w4", label: "Week 4", theme: "Month 1 Wrap-Up & System Building",
        days: [
          { day: "MON", type: "wfh", tasks: [
            { id:"m1w4-mon-1", time:"75m", text:"Task 15 – Typography System lectures + apply to Design System", detail:"Define your full type scale as Figma text styles. Apply to all existing components.", ref:"Your Course: Task 15", url:"" },
            { id:"m1w4-mon-2", time:"60m", text:"Task 16 – Color System lectures + apply to Design System", detail:"Convert your color palette to Figma variables/styles. Name semantically: --color-primary-500, etc.", ref:"Your Course: Task 16", url:"" },
            { id:"m1w4-mon-3", time:"60m", text:"Redesign #3 – Research phase (30 min) + begin wireframes", detail:"Third redesign. Focus on micro-interactions and UX copy improvements this time.", ref:"UX Improvements Checklist", url:"https://www.nngroup.com/articles/ten-usability-heuristics/" },
            { id:"m1w4-mon-4", time:"30m", text:"Review all Month 1 Figma work – organise into pages", detail:"Clean up your Figma files. One file = one project. Label frames clearly.", ref:"Figma File Organisation", url:"https://www.figma.com/best-practices/guide-to-developer-handoff/organising-your-file/" },
          ]},
          { day: "TUE", type: "office", tasks: [
            { id:"m1w4-tue-1", time:"60m", text:"Task 17 – Iconography (Pen Tool) lectures", detail:"2hr 5min content – watch Part 1 today. Focus on pen tool fundamentals and icon grid.", ref:"Your Course: Task 17", url:"" },
            { id:"m1w4-tue-2", time:"40m", text:"Pen Tool practice: Trace 5 simple icons", detail:"Download SVG icons, trace them from scratch in Figma to build pen tool muscle memory.", ref:"Figma Pen Tool Practice", url:"https://www.figma.com/community/file/830403000734221975" },
            { id:"m1w4-tue-3", time:"20m", text:"Twitter: Post your Design System color palette", detail:"'Built my first proper Design System color palette this week. Here's the structure I followed…'", ref:"Design Twitter", url:"" },
          ]},
          { day: "WED", type: "wfh", tasks: [
            { id:"m1w4-wed-1", time:"90m", text:"Task 17 cont. – Create 10 custom icons for your Design System", detail:"Design 10 icons on a 24×24 grid. Consistent stroke width, optical alignment, unified style.", ref:"Your Course: Task 17", url:"" },
            { id:"m1w4-wed-2", time:"75m", text:"Redesign #3 – Hi-fi 3 screens + document decisions", detail:"Complete the third redesign. This completes Level 1 Goal #4.", ref:"Level 1 – Redesigns (3 of 3)", url:"" },
            { id:"m1w4-wed-3", time:"60m", text:"App Design #2 from Prompt – Full brief to final screens", detail:"Another Sharpen brief. 5 screens. Use your Design System components this time.", ref:"Sharpen.design", url:"https://sharpen.design/" },
          ]},
          { day: "THU", type: "office", tasks: [
            { id:"m1w4-thu-1", time:"60m", text:"Use AI to create an app design – then polish in Figma", detail:"Use ChatGPT/Figma AI to scaffold an app layout, then refine it heavily for consistency and quality.", ref:"Level 1 Goal #6 – AI + Figma Polish", url:"" },
            { id:"m1w4-thu-2", time:"50m", text:"Use Figma Make to improve an existing app screen", detail:"Use Figma Make (AI redesign feature) on one screen. Document what you changed and why.", ref:"Figma Make – Official", url:"https://www.figma.com/ai/" },
            { id:"m1w4-thu-3", time:"10m", text:"Twitter: Post your Figma Make before/after", detail:"This type of post gets massive engagement. Show the tool, show your improvement.", ref:"Design Twitter", url:"" },
          ]},
          { day: "FRI", type: "office", tasks: [
            { id:"m1w4-fri-1", time:"60m", text:"Month 1 Review – Go through all deliverables", detail:"Wireframe doc ✓ Redesigns ✓ App Designs ✓ Icons ✓ Design System start ✓ Twitter posts ✓", ref:"Level 1 Checklist", url:"" },
            { id:"m1w4-fri-2", time:"60m", text:"Read: Building a design portfolio – what to include", detail:"Start thinking about narrative. Your work from Month 1 is already portfolio material.", ref:"Portfolio Guide – UX Collective", url:"https://uxdesign.cc/how-to-build-a-ux-portfolio-from-scratch-bba00b4bae0d" },
          ]},
          { day: "SAT", type: "weekend", tasks: [
            { id:"m1w4-sat-1", time:"150m", text:"Design System – Sprint Day 2: Core Components", detail:"Build Button, Input, Card, Badge, Avatar, Divider, Modal – all using Auto-Layout and variants.", ref:"Design System Components Guide", url:"https://www.designsystemchecklist.com/" },
            { id:"m1w4-sat-2", time:"90m", text:"Finalize gray-box wireframe case study doc", detail:"Final polish on your reverse-engineered app case study. This is Portfolio Piece #0.", ref:"Your Wireframe Case Study", url:"" },
            { id:"m1w4-sat-3", time:"60m", text:"Read: The Product Design Interview Process", detail:"Understanding what you're working toward keeps motivation high.", ref:"Otta.com Interview Guide", url:"https://otta.com/resources/product-design-interview-guide" },
          ]},
          { day: "SUN", type: "weekend", tasks: [
            { id:"m1w4-sun-1", time:"120m", text:"Design System – Sprint Day 3: Navigation + Layout Components", detail:"Header, Bottom Tab Bar, Sidebar, Breadcrumb, Pagination – complete the navigation suite.", ref:"Your Design System (Level 1 Goal #3)", url:"" },
            { id:"m1w4-sun-2", time:"75m", text:"Month 1 retrospective in your Design Journal", detail:"What did you complete? What's still open? What was harder than expected? What are you most proud of?", ref:"Your Notion Journal", url:"" },
            { id:"m1w4-sun-3", time:"45m", text:"Twitter: Month 1 journey thread – your biggest learnings", detail:"Real, personal, specific. This is the type of content that builds a real following.", ref:"Design Twitter", url:"" },
          ]},
        ]
      },
    ]
  },
  {
    id: 2, label: "Month 2", title: "Systems Thinking", subtitle: "Design System + IA + Course Tasks 11–17", color: "#CE93D8",
    weeks: [
      { id:"m2w1", label:"Week 5", theme:"Feature Thinking & IA", days:[
        { day:"MON", type:"wfh", tasks:[
          { id:"m2w1-mon-1", time:"75m", text:"Task 11 – Features Brainstorming: MoSCoW method", detail:"Generate 20 ideas. Apply Must/Should/Could/Won't. Keep only your top 5.", ref:"MoSCoW Method Guide", url:"https://www.productplan.com/glossary/moscow-prioritization/" },
          { id:"m2w1-mon-2", time:"75m", text:"Design System – Expand components: Toast, Tooltip, Tag, Progress", detail:"Build 4 new components with all states. Everything Auto-Layout.", ref:"Your Design System", url:"" },
          { id:"m2w1-mon-3", time:"60m", text:"Task 12 – User Flow: Map 3 flows for your feature set", detail:"Map flows for your top 3 MoSCoW features. Include edge cases and error paths.", ref:"Your Course: Task 12", url:"" },
          { id:"m2w1-mon-4", time:"30m", text:"Read: How top products prioritise features", detail:"Product thinking separates PDs from UI designers.", ref:"Intercom: Product Feature Prioritisation", url:"https://www.intercom.com/blog/product-prioritization-techniques/" },
        ]},
        { day:"TUE", type:"office", tasks:[
          { id:"m2w1-tue-1", time:"60m", text:"Task 13 – Information Architecture: Sitemap deep dive", detail:"1hr 24min lectures. Build a full sitemap for a new app concept.", ref:"Your Course: Task 13", url:"" },
          { id:"m2w1-tue-2", time:"50m", text:"Card sorting exercise for your IA", detail:"Use Optimal Workshop free tier to run an online card sort with 3+ people.", ref:"Optimal Workshop – Free Tier", url:"https://www.optimalworkshop.com/" },
          { id:"m2w1-tue-3", time:"10m", text:"Twitter: Share your feature prioritisation process", detail:"Show your MoSCoW matrix. Real process content builds credibility.", ref:"Design Twitter", url:"" },
        ]},
        { day:"WED", type:"wfh", tasks:[
          { id:"m2w1-wed-1", time:"90m", text:"Task 14 – Paper Sketching: Crazy 8s session", detail:"Set a timer. 8 sketches in 8 minutes. Do 3 rounds for different parts of your app.", ref:"Your Course: Task 14", url:"" },
          { id:"m2w1-wed-2", time:"90m", text:"Design System – Dark mode: Duplicate and retheme everything", detail:"Create a dark mode version of your design system using Figma Variables for semantic color switching.", ref:"Figma Variables Dark Mode", url:"https://www.figma.com/blog/everything-dev-mode/" },
          { id:"m2w1-wed-3", time:"60m", text:"Build low-fidelity wireframes for your new app (10 screens)", detail:"Pure gray-box. No color, no real type. Just layout and hierarchy.", ref:"Lo-fi Wireframe Kit", url:"https://www.figma.com/community/file/1042693594609122560" },
          { id:"m2w1-wed-4", time:"30m", text:"Read: The Elements of Typographic Style (key chapters)", detail:"Typography is where your Graphic Design background shines. Deepen it.", ref:"Practical Typography – free online", url:"https://practicaltypography.com/" },
        ]},
        { day:"THU", type:"office", tasks:[
          { id:"m2w1-thu-1", time:"60m", text:"Typography System – Define 2 type pairings for your Design System", detail:"Display font for headings, body font for content. Test across all your text style sizes.", ref:"Google Fonts Pairing Tool", url:"https://fonts.google.com/knowledge/choosing_type/pairing_typefaces" },
          { id:"m2w1-thu-2", time:"50m", text:"Task 15 – Typography System lectures (apply immediately)", detail:"Every lecture = immediately update your Figma Design System text styles.", ref:"Your Course: Task 15", url:"" },
          { id:"m2w1-thu-3", time:"10m", text:"Twitter: Show your type system", detail:"Type scales are catnip for design twitter. Show your scale with examples.", ref:"Design Twitter", url:"" },
        ]},
        { day:"FRI", type:"office", tasks:[
          { id:"m2w1-fri-1", time:"60m", text:"Task 16 – Color System: Semantic color naming deep dive", detail:"Rebuild your palette with semantic naming: --brand-primary, --surface-default, --text-muted, --feedback-error", ref:"Your Course: Task 16", url:"" },
          { id:"m2w1-fri-2", time:"60m", text:"Figma Variables: Wire up your color system to your components", detail:"Connect your semantic color variables to every component so dark mode works with one click.", ref:"Figma Variables Tutorial", url:"https://help.figma.com/hc/en-us/articles/15339657135383" },
        ]},
        { day:"SAT", type:"weekend", tasks:[
          { id:"m2w1-sat-1", time:"150m", text:"Design System – Full component audit + completion sprint", detail:"Go through Design System Checklist website. Mark what's done. Build the gaps.", ref:"Design System Checklist", url:"https://www.designsystemchecklist.com/" },
          { id:"m2w1-sat-2", time:"90m", text:"Task 17 – Iconography: Build 10 more custom icons", detail:"Total: 20 icons in your Design System. Two styles: outline + filled versions of core icons.", ref:"Your Course: Task 17", url:"" },
          { id:"m2w1-sat-3", time:"60m", text:"Read: Atlassian Design System for inspiration", detail:"Study how a professional DS is documented. Note what you want to replicate.", ref:"Atlassian Design System", url:"https://atlassian.design/" },
        ]},
        { day:"SUN", type:"weekend", tasks:[
          { id:"m2w1-sun-1", time:"120m", text:"Light/Dark Mode App: Build a full 5-screen app using your Design System", detail:"Use your completed Design System to build a real app flow. Both light and dark mode.", ref:"Level 2 Goal #2", url:"" },
          { id:"m2w1-sun-2", time:"75m", text:"EA Game Redesign – Research phase", detail:"Pick FIFA/Apex/Sims. Research their current UI problems. Find 3 peer designers who've done similar.", ref:"Level 2 Goal #4 – Begins", url:"" },
          { id:"m2w1-sun-3", time:"45m", text:"Twitter: Share your Design System (screenshot tour)", detail:"Post a 5-frame carousel: cover → colors → typography → components → icons. This performs extremely well.", ref:"Design Twitter", url:"" },
        ]},
      ]},
      { id:"m2w2", label:"Week 6", theme:"EA Game Redesign + Hi-Fi System App", days:[
        { day:"MON", type:"wfh", tasks:[
          { id:"m2w2-mon-1", time:"90m", text:"EA Game Redesign – Competitor analysis + 3 HMW statements", detail:"Research 2 games with better UI (e.g. Valorant, Fortnite). Write your redesign brief.", ref:"Level 2 Goal #4", url:"" },
          { id:"m2w2-mon-2", time:"90m", text:"EA Game Redesign – Wireframe 5 key screens", detail:"Lo-fi first. Focus on hierarchy, navigation, and information density.", ref:"Game UI Design Patterns", url:"https://www.gameuidatabase.com/" },
          { id:"m2w2-mon-3", time:"60m", text:"App from Design System – Expand to 8 screens (Light)", detail:"Complete the light mode version. Every screen should use Design System components only.", ref:"Your Design System", url:"" },
          { id:"m2w2-mon-4", time:"30m", text:"Read: Game UI Design Best Practices", detail:"Game UI is a different beast – high density, player feedback, onboarding. Study the patterns.", ref:"Game UI Database", url:"https://www.gameuidatabase.com/" },
        ]},
        { day:"TUE", type:"office", tasks:[
          { id:"m2w2-tue-1", time:"75m", text:"App from Design System – Build dark mode (8 screens)", detail:"Apply your dark mode variables. This should be fast since your components are already variable-connected.", ref:"Level 2 Goal #2 – Completing", url:"" },
          { id:"m2w2-tue-2", time:"45m", text:"Review: What is Product Design beyond App/Web?", detail:"Read about service design, design systems at scale, 0-to-1 product thinking, B2B design.", ref:"Level 2 Goal #5", url:"https://uxdesign.cc/product-design-is-not-ui-design-a3e0fe21a0e8" },
          { id:"m2w2-tue-3", time:"10m", text:"Share dark/light mode app screenshots on Twitter", detail:"Side-by-side comparison. Caption the design decisions behind your mode choices.", ref:"Design Twitter", url:"" },
        ]},
        { day:"WED", type:"wfh", tasks:[
          { id:"m2w2-wed-1", time:"120m", text:"EA Game Redesign – Hi-fi 5 screens (Day 1)", detail:"Start hi-fi. Focus on the main menu, match lobby, and player stats screens.", ref:"Level 2 Goal #4", url:"" },
          { id:"m2w2-wed-2", time:"90m", text:"Get peer feedback on your Game redesign", detail:"Post WIP screenshots on Design Twitter or a design Discord. Ask 2 specific questions.", ref:"Designer Hangout Discord", url:"https://www.designerhangout.co/" },
          { id:"m2w2-wed-3", time:"60m", text:"Design System – Documentation: Write component usage notes", detail:"For each component, write: when to use, when not to use, props/variants available.", ref:"Component Documentation Guide", url:"https://www.nngroup.com/articles/design-systems-101/" },
        ]},
        { day:"THU", type:"office", tasks:[
          { id:"m2w2-thu-1", time:"75m", text:"EA Game Redesign – Hi-fi 5 screens (Day 2)", detail:"In-game HUD, settings screen, victory screen. Total: 10 screens hi-fi.", ref:"Level 2 Goal #4 – Completing", url:"" },
          { id:"m2w2-thu-2", time:"45m", text:"Write EA Game Redesign case study brief (200 words)", detail:"Problem / Research / Key Changes / Impact. Short but structured.", ref:"Case Study Writing Guide", url:"https://uxfol.io/blog/ux-case-study" },
          { id:"m2w2-thu-3", time:"10m", text:"Twitter: Final EA redesign reveal post", detail:"Show the before/after. This is your most shareable post yet.", ref:"Design Twitter", url:"" },
        ]},
        { day:"FRI", type:"office", tasks:[
          { id:"m2w2-fri-1", time:"75m", text:"Read + watch: Product Design beyond App and Web", detail:"Explore: conversational UI, voice interfaces, AR/VR design, service design blueprints, design ops.", ref:"Level 2 Goal #5 – Completing", url:"https://uxdesign.cc/beyond-screens-the-future-of-ux-design-9e7e4be5e60a" },
          { id:"m2w2-fri-2", time:"45m", text:"Portfolio planning: Decide your 3 hero case studies", detail:"From all your Month 1–2 work, which 3 projects tell the best story?", ref:"Portfolio Strategy Guide", url:"https://uxdesign.cc/how-to-build-a-ux-portfolio-from-scratch-bba00b4bae0d" },
        ]},
        { day:"SAT", type:"weekend", tasks:[
          { id:"m2w2-sat-1", time:"150m", text:"Start learning Framer – Core concepts", detail:"Watch: Framer for Beginners (YouTube). Build your first basic page with interactions.", ref:"Level 2 Goal #3 – Begins", url:"https://www.youtube.com/results?search_query=framer+for+beginners+2024" },
          { id:"m2w2-sat-2", time:"90m", text:"Portfolio – Outline all 3 case studies in Notion", detail:"For each: Project name / The problem / Your process / Key screens / What you learned.", ref:"Case Study Template – Notion", url:"https://www.notion.so/templates/ux-case-study" },
          { id:"m2w2-sat-3", time:"60m", text:"Read: How designers got hired at top companies", detail:"Read 5 case studies from Bestfolios or Read.cv to understand the bar.", ref:"Bestfolios – Top UX Portfolios", url:"https://www.bestfolios.com/portfolio" },
        ]},
        { day:"SUN", type:"weekend", tasks:[
          { id:"m2w2-sun-1", time:"120m", text:"Framer – Build a simple interactive page with animations", detail:"Hero section + feature cards + CTA. Add scroll animations and hover states.", ref:"Framer Tutorial – Official", url:"https://www.framer.com/learn/" },
          { id:"m2w2-sun-2", time:"90m", text:"Month 2 checkpoint: All Level 1 items should be done", detail:"Go through Level 1 checklist. Any gaps? Use this session to close them.", ref:"Level 1 Checklist", url:"" },
          { id:"m2w2-sun-3", time:"60m", text:"Twitter: Month 2 reflection thread + what's coming", detail:"Be honest. Show real progress. The internet respects consistency.", ref:"Design Twitter", url:"" },
        ]},
      ]},
    ]
  },
  {
    id: 3, label: "Month 3", title: "Execution", subtitle: "Figma Mastery, Prototyping + Course Tasks 18–25", color: BLUE,
    weeks: [
      { id:"m3w1", label:"Week 9", theme:"Figma Deep Dive + Low-Fi Prototyping", days:[
        { day:"MON", type:"wfh", tasks:[
          { id:"m3w1-mon-1", time:"90m", text:"Task 18 – Intro to Figma: Pixel-perfect recreation", detail:"Pick any hi-fi Dribbble screen. Recreate it pixel-perfectly. No components — raw skill practice.", ref:"Your Course: Task 18", url:"" },
          { id:"m3w1-mon-2", time:"75m", text:"Task 19 – Low Fidelity: Build 10-screen lo-fi prototype", detail:"For your original app idea (from Month 1 HMW statements). Pure lo-fi, Figma connector arrows.", ref:"Your Course: Task 19 (1hr 31min)", url:"" },
          { id:"m3w1-mon-3", time:"60m", text:"Framer – Component animations and scroll effects", detail:"Add scroll-triggered animations to your Month 2 Framer page. Polish the feel.", ref:"Framer Animation Docs", url:"https://www.framer.com/motion/" },
          { id:"m3w1-mon-4", time:"30m", text:"Read: How to write a good product design brief", detail:"You need this for App Design #2 and the EA redesign documentation.", ref:"Design Brief Writing Guide", url:"https://www.figma.com/resource-library/design-brief/" },
        ]},
        { day:"TUE", type:"office", tasks:[
          { id:"m3w1-tue-1", time:"75m", text:"Task 20 – Interactive Prototyping lectures", detail:"Figma prototyping: overlays, scrolling, interactions, smart animate. Build test prototype.", ref:"Your Course: Task 20", url:"" },
          { id:"m3w1-tue-2", time:"45m", text:"Add interactions to your lo-fi prototype", detail:"Make it clickable. Happy path only for now. Test it on your phone.", ref:"Figma Prototype on Mobile", url:"https://help.figma.com/hc/en-us/articles/360040318193" },
          { id:"m3w1-tue-3", time:"20m", text:"Share prototype preview on Twitter", detail:"Use Loom to screen-record your prototype walkthrough. Much better engagement than static.", ref:"Loom – Free Screen Recorder", url:"https://www.loom.com/" },
        ]},
        { day:"WED", type:"wfh", tasks:[
          { id:"m3w1-wed-1", time:"90m", text:"App Design #1 from Prompt – Full brief to hi-fi (Day 1)", detail:"Go to Sharpen.design. Get a brief. Research (20 min) → wireframes (30 min) → hi-fi start (40 min).", ref:"Sharpen.design", url:"https://sharpen.design/" },
          { id:"m3w1-wed-2", time:"75m", text:"Task 21 – Interview Questions for Usability Testing", detail:"Write 10 usability test questions for your interactive prototype. Include warm-up and closing Qs.", ref:"Your Course: Task 21", url:"" },
          { id:"m3w1-wed-3", time:"60m", text:"App Design #1 – Complete hi-fi, 5 screens with Design System", detail:"All components from your Design System. Consistent spacing, type, color.", ref:"Your Design System", url:"" },
          { id:"m3w1-wed-4", time:"30m", text:"Read: Writing usability test scripts", detail:"Understanding testing now improves your design decisions in real time.", ref:"NN/g Usability Testing Script", url:"https://www.nngroup.com/articles/usability-test-checklist/" },
        ]},
        { day:"THU", type:"office", tasks:[
          { id:"m3w1-thu-1", time:"75m", text:"Task 22 – Usability Testing: Run 2 guerrilla tests", detail:"Show your prototype to 2 real people. Record on Loom with permission. Take notes.", ref:"Your Course: Task 22", url:"" },
          { id:"m3w1-thu-2", time:"45m", text:"Synthesise test findings into an action list", detail:"3 things to fix. Prioritise by impact. Update your prototype.", ref:"Usability Testing Synthesis", url:"https://www.nngroup.com/articles/synthesizing-usability-findings/" },
          { id:"m3w1-thu-3", time:"10m", text:"Twitter: 'I just ran my first usability test. Here's what I learned...'", detail:"This type of post resonates deeply in the design community.", ref:"Design Twitter", url:"" },
        ]},
        { day:"FRI", type:"office", tasks:[
          { id:"m3w1-fri-1", time:"75m", text:"Task 23 – A/B Testing: Design 2 variants of your hero screen", detail:"Variant A: current design. Variant B: alternative layout. Write a test hypothesis for each.", ref:"Your Course: Task 23", url:"" },
          { id:"m3w1-fri-2", time:"45m", text:"A/B Testing – Document rationale + present both to a peer", detail:"Get one person's opinion. Which variant solves the user problem better, and why?", ref:"A/B Test Documentation Template", url:"https://uxdesign.cc/a-b-testing-in-ux-research-2af0c38f7a40" },
        ]},
        { day:"SAT", type:"weekend", tasks:[
          { id:"m3w1-sat-1", time:"150m", text:"App Design #2 from Prompt – Full session", detail:"Second Sharpen brief. This time: stronger research, faster execution. Ship 6 screens.", ref:"Sharpen.design", url:"https://sharpen.design/" },
          { id:"m3w1-sat-2", time:"90m", text:"Task 24 – UI Components: Full component library audit", detail:"Compare your Design System to the course component list. Build what's missing.", ref:"Your Course: Task 24", url:"" },
          { id:"m3w1-sat-3", time:"60m", text:"Figma Make: Improve 2 existing screens with AI assist", detail:"Apply Figma Make to a screen, then manually push it further. Document what AI got right vs. wrong.", ref:"Level 1 Goal #7", url:"https://www.figma.com/ai/" },
        ]},
        { day:"SUN", type:"weekend", tasks:[
          { id:"m3w1-sun-1", time:"120m", text:"Task 25 – Auto Layouts + Constraints: Rebuild 3 components", detail:"Take your most complex components, rebuild with advanced auto layout rules and constraints.", ref:"Your Course: Task 25", url:"" },
          { id:"m3w1-sun-2", time:"90m", text:"Portfolio Case Study #1 – Write full narrative", detail:"Your strongest project from Months 1–3. Write the full story: problem → process → solution → result.", ref:"Portfolio Narrative Writing", url:"https://uxfol.io/blog/ux-case-study" },
          { id:"m3w1-sun-3", time:"30m", text:"Level 1 Checkpoint: All 8 Level 1 items should be complete", detail:"If anything's outstanding, block time next week to finish.", ref:"Your Level 1 Checklist", url:"" },
        ]},
      ]},
      { id:"m3w2", label:"Week 10", theme:"Testing, Components & Case Studies", days:[
        { day:"MON", type:"wfh", tasks:[
          { id:"m3w2-mon-1", time:"90m", text:"Case Study #2 – EA Game Redesign: Full written narrative", detail:"Document your process: why you chose this app, research insights, design decisions, before/after.", ref:"Your EA Redesign", url:"" },
          { id:"m3w2-mon-2", time:"75m", text:"Figma: Build your interactive prototype to presentation standard", detail:"Add smart animate transitions, overlay menus, scroll behaviour. Make it feel like a real app.", ref:"Figma Advanced Prototyping", url:"https://help.figma.com/hc/en-us/articles/360039818254" },
          { id:"m3w2-mon-3", time:"60m", text:"Framer – Build a multi-section portfolio template", detail:"Start building your actual portfolio layout in Framer. Just the structure for now.", ref:"Framer Portfolio Tutorial", url:"https://www.youtube.com/results?search_query=framer+portfolio+tutorial+2024" },
          { id:"m3w2-mon-4", time:"30m", text:"Read: How to present design work in interviews", detail:"The presentation skill is separate from the design skill. Practice both.", ref:"Presenting Design Work – NN/g", url:"https://www.nngroup.com/articles/presenting-ux-research-findings/" },
        ]},
        { day:"TUE", type:"office", tasks:[
          { id:"m3w2-tue-1", time:"75m", text:"Case Study #3 planning – Original app idea", detail:"Structure the narrative for your strongest original app design. Map: problem → persona → solution → screens.", ref:"Your Course Final Case Study prep", url:"" },
          { id:"m3w2-tue-2", time:"45m", text:"Earn Certification #1 – Figma Essentials (Coursera/Udemy)", detail:"Pick a short Figma cert course. Many can be completed in 6–8 hrs total. Start today.", ref:"Level 3 Goal #3 – Cert 1", url:"https://www.coursera.org/search?query=figma" },
        ]},
        { day:"WED", type:"wfh", tasks:[
          { id:"m3w2-wed-1", time:"120m", text:"Month 3 big project: Full app design (10+ screens) hi-fi", detail:"This should be your best work yet. Use your full process. Post updates daily.", ref:"Your strongest app concept", url:"" },
          { id:"m3w2-wed-2", time:"90m", text:"Certification: 2 hrs of course progress", detail:"Push toward completing Cert #1.", ref:"Certification Course", url:"" },
          { id:"m3w2-wed-3", time:"60m", text:"Watch: Senior PD portfolio walkthroughs (YouTube)", detail:"Watch 3 real PD portfolio reviews. Note the narrative structure they all share.", ref:"Product Design Portfolio Reviews", url:"https://www.youtube.com/results?search_query=product+designer+portfolio+review+2024" },
        ]},
        { day:"THU", type:"office", tasks:[
          { id:"m3w2-thu-1", time:"75m", text:"Big app project: Continue hi-fi screens (screens 6–10)", detail:"Maintain design system consistency. Add micro-interactions.", ref:"Your Design System", url:"" },
          { id:"m3w2-thu-2", time:"45m", text:"Certification: 2 more hrs progress", detail:"On track to finish Cert #1 this week or next.", ref:"Certification Course", url:"" },
          { id:"m3w2-thu-3", time:"10m", text:"Twitter: WIP screens from your big app project", detail:"'Working on something I'm really excited about. Screens coming soon 👀'", ref:"Design Twitter", url:"" },
        ]},
        { day:"FRI", type:"office", tasks:[
          { id:"m3w2-fri-1", time:"75m", text:"Complete and polish big app project (all 10+ screens done)", detail:"Final quality pass. Check: spacing consistency, component usage, type hierarchy, colour accessibility.", ref:"Design QA Checklist", url:"https://www.checklist.design/" },
          { id:"m3w2-fri-2", time:"45m", text:"Book a free ADPList mentorship session", detail:"ADPList has free 30-min mentorship with senior designers. Book one for next 2 weeks.", ref:"ADPList – Free Mentorship", url:"https://adplist.org/" },
        ]},
        { day:"SAT", type:"weekend", tasks:[
          { id:"m3w2-sat-1", time:"180m", text:"Certification #1 – Final push to completion", detail:"Complete all remaining modules. Take the exam/quiz. Get your certificate. Screenshot it.", ref:"Level 3 Goal #3 – Cert 1 Done", url:"" },
          { id:"m3w2-sat-2", time:"90m", text:"Month 3 retrospective: All Level 1 items verified complete", detail:"Final check. Any outstanding items from Level 1? Close them today.", ref:"Level 1 Final Check", url:"" },
          { id:"m3w2-sat-3", time:"30m", text:"Twitter: Certificate earned + month 3 highlights", detail:"'3 months in. Here's everything I've built so far…' (thread with all project screenshots)", ref:"Design Twitter", url:"" },
        ]},
        { day:"SUN", type:"weekend", tasks:[
          { id:"m3w2-sun-1", time:"120m", text:"Portfolio: Add 2 case studies to Framer template", detail:"Real case study content in your Framer portfolio. Start placing real screens and writing.", ref:"Your Framer Portfolio", url:"" },
          { id:"m3w2-sun-2", time:"90m", text:"Plan Month 4 in your Design Journal", detail:"Tasks 26–29 are the final course modules. Plan which project each task applies to.", ref:"Your Design Journal", url:"" },
        ]},
      ]},
    ]
  },
  {
    id: 4, label: "Month 4", title: "Depth & Case Studies", subtitle: "UX Writing, Hi-Fi, Website + Course Tasks 26–29", color: GREEN,
    weeks: [
      { id:"m4w1", label:"Week 13", theme:"UX Copywriting + Portfolio Strategy", days:[
        { day:"MON", type:"wfh", tasks:[
          { id:"m4w1-mon-1", time:"90m", text:"Task 26 – UX Copywriting lectures + audit all your designs", detail:"Rewrite every button, label, placeholder, error message across all 3 of your main projects.", ref:"Your Course: Task 26", url:"" },
          { id:"m4w1-mon-2", time:"75m", text:"Before/after microcopy document: 10 improvements", detail:"Screenshot old copy → new copy with reasoning. This becomes a portfolio talking point.", ref:"UX Writing – Google Material", url:"https://m3.material.io/foundations/content-design/ux-writing-resource/writing-principles" },
          { id:"m4w1-mon-3", time:"60m", text:"Portfolio: Full structure planned and started in Framer", detail:"Pages: Home, Case Studies (3), About, Contact. Navigation working.", ref:"Your Framer Portfolio", url:"" },
          { id:"m4w1-mon-4", time:"30m", text:"Read: UX writing fundamentals (Mailchimp Content Style Guide)", detail:"The best free resource for UX writing. Bookmark and refer throughout the month.", ref:"Mailchimp Style Guide", url:"https://styleguide.mailchimp.com/" },
        ]},
        { day:"TUE", type:"office", tasks:[
          { id:"m4w1-tue-1", time:"75m", text:"Task 27 – High Fidelity Screen Designs (5hr 15min total) – Part 1", detail:"Start the long lectures. Apply every principle immediately to your current design.", ref:"Your Course: Task 27", url:"" },
          { id:"m4w1-tue-2", time:"45m", text:"Apply hi-fi learnings to Design System app – improve 5 screens", detail:"Polish shadows, gradients, imagery, micro-interactions on your existing app design.", ref:"Your Design System App", url:"" },
          { id:"m4w1-tue-3", time:"10m", text:"Twitter: Before/after microcopy improvement post", detail:"This type of practical post gets incredible engagement. Show the power of words.", ref:"Design Twitter", url:"" },
        ]},
        { day:"WED", type:"wfh", tasks:[
          { id:"m4w1-wed-1", time:"120m", text:"Task 27 – High Fidelity: Part 2 of lectures + apply", detail:"Continue the long module. Keep applying to your project live.", ref:"Your Course: Task 27", url:"" },
          { id:"m4w1-wed-2", time:"90m", text:"EA Game Redesign – Polish to full hi-fi standard with peer review incorporated", detail:"Implement feedback you received in Month 2. Final version.", ref:"Level 2 Goal #4 – Final", url:"" },
          { id:"m4w1-wed-3", time:"60m", text:"Certification #2 – Begin Google UX Design Certificate (Coursera)", detail:"Free to audit. Or use a Coursera Plus trial. This is a highly respected cert.", ref:"Level 3 Goal #3 – Cert 2", url:"https://www.coursera.org/professional-certificates/google-ux-design" },
          { id:"m4w1-wed-4", time:"30m", text:"Read: Building Accessible Design Systems", detail:"Accessibility is increasingly expected in PD interviews. Know the basics.", ref:"WCAG Quick Reference", url:"https://www.w3.org/WAI/WCAG21/quickref/" },
        ]},
        { day:"THU", type:"office", tasks:[
          { id:"m4w1-thu-1", time:"75m", text:"Task 27 – High Fidelity: Part 3 + complete module", detail:"Finish the hi-fi lectures. Apply visual polish to your case study project.", ref:"Your Course: Task 27 – Final", url:"" },
          { id:"m4w1-thu-2", time:"45m", text:"Cert #2: 2 hrs progress on Google UX cert", detail:"Continue the cert. The quiz modules are quick once you know the material.", ref:"Google UX Certificate", url:"" },
          { id:"m4w1-thu-3", time:"10m", text:"Twitter: Hi-fi screen reveal (your best screen yet)", detail:"Show your most polished screen. Caption the top 3 design decisions.", ref:"Design Twitter", url:"" },
        ]},
        { day:"FRI", type:"office", tasks:[
          { id:"m4w1-fri-1", time:"75m", text:"Task 28 – Website Design lectures (5hr 50min) – Part 1", detail:"Study landing page structure: hero, features, social proof, CTA, footer. Note patterns.", ref:"Your Course: Task 28", url:"" },
          { id:"m4w1-fri-2", time:"45m", text:"Sketch your portfolio website layout (paper first)", detail:"Hero: who you are. Projects: your 3 best. About: your story. Contact. Sketch it before building.", ref:"Portfolio Layout Inspiration", url:"https://www.bestfolios.com/" },
        ]},
        { day:"SAT", type:"weekend", tasks:[
          { id:"m4w1-sat-1", time:"180m", text:"Task 28 – Website Design: Build your portfolio landing page in Figma first", detail:"Design full portfolio website in Figma: all sections. Use your Design System.", ref:"Your Course: Task 28", url:"" },
          { id:"m4w1-sat-2", time:"90m", text:"Cert #2: 4 hrs progress – major push toward completion", detail:"Spend dedicated cert time today. You should be 50%+ through by end of day.", ref:"Google UX Certificate", url:"" },
          { id:"m4w1-sat-3", time:"30m", text:"Read: Portfolio case studies from Bestfolios – note narrative structure", detail:"Studying 5 great portfolios teaches you more than any tutorial.", ref:"Bestfolios", url:"https://www.bestfolios.com/portfolio" },
        ]},
        { day:"SUN", type:"weekend", tasks:[
          { id:"m4w1-sun-1", time:"150m", text:"Build portfolio website in Framer (implementing your Figma design)", detail:"Translate your Figma portfolio design into Framer. Hero + 3 project cards minimum.", ref:"Your Framer Portfolio", url:"" },
          { id:"m4w1-sun-2", time:"90m", text:"Task 29 – Final Case Study: Begin (this is your capstone)", detail:"Start the final course case study. Follow the full process: research → IA → wireframe → hi-fi.", ref:"Your Course: Task 29", url:"" },
          { id:"m4w1-sun-3", time:"30m", text:"Twitter: Portfolio preview (teaser only)", detail:"'Building my design portfolio. Here's what's going in…' Show your Framer layout.", ref:"Design Twitter", url:"" },
        ]},
      ]},
      { id:"m4w2", label:"Week 16", theme:"Final Case Study + Course Completion", days:[
        { day:"MON", type:"wfh", tasks:[
          { id:"m4w2-mon-1", time:"120m", text:"Task 29 – Final Case Study: Full research + IA + wireframes", detail:"This is your highest-quality work. Take your time. Follow every step of the process.", ref:"Your Course: Task 29", url:"" },
          { id:"m4w2-mon-2", time:"90m", text:"Task 29 cont. – Hi-fi designs (10+ screens)", detail:"Apply all your skills: Auto-Layout, Design System, UX Copy, hi-fi polish.", ref:"Your Course: Task 29", url:"" },
          { id:"m4w2-mon-3", time:"60m", text:"Cert #2 – Final push to complete Google UX Cert", detail:"Finish all remaining modules. This cert has a lot of material but it's well worth it.", ref:"Cert #2 – Completing", url:"" },
          { id:"m4w2-mon-4", time:"30m", text:"Read: Product Design beyond App/Web (deep dive)", detail:"Finish Level 2 Goal #5. Read about Design Systems at scale, Figma design ops, 0-to-1.", ref:"Level 2 Goal #5", url:"https://uxdesign.cc/the-future-of-product-design-aa5929568b98" },
        ]},
        { day:"TUE", type:"office", tasks:[
          { id:"m4w2-tue-1", time:"75m", text:"Task 29 – Final Case Study: Interactive prototype", detail:"Build a full clickable prototype. Smart animations. Real transitions. User-testable.", ref:"Your Course: Task 29", url:"" },
          { id:"m4w2-tue-2", time:"45m", text:"Task 29 – Write case study narrative (500 words)", detail:"Problem / Users / Research / Process / Solution / Key Decisions / Outcome.", ref:"Case Study Writing", url:"" },
          { id:"m4w2-tue-3", time:"10m", text:"Twitter: 'Just completed all 29 tasks of my product design course'", detail:"Milestone post. These perform extremely well. Show your most polished screen.", ref:"Design Twitter", url:"" },
        ]},
        { day:"WED", type:"wfh", tasks:[
          { id:"m4w2-wed-1", time:"120m", text:"Portfolio: All 3 case studies fully written and designed in Framer", detail:"Each case study page: hero image, problem, process (with screens), outcome. Minimum 800 words each.", ref:"Your Framer Portfolio", url:"" },
          { id:"m4w2-wed-2", time:"90m", text:"Portfolio About page + Contact page complete", detail:"About: your story, background, why you're transitioning. Be human. Contact: email + LinkedIn + Twitter.", ref:"Your Portfolio", url:"" },
          { id:"m4w2-wed-3", time:"60m", text:"Begin Cert #3 – NN/g UX Certificate or Interaction Design Foundation", detail:"Third and final certificate towards Level 3 Goal #3.", ref:"Level 3 Goal #3 – Cert 3", url:"https://www.interaction-design.org/courses" },
          { id:"m4w2-wed-4", time:"30m", text:"Read: LinkedIn profile optimisation for designers", detail:"Your LinkedIn should tell the same story as your portfolio.", ref:"LinkedIn Design Profile Guide", url:"https://uxdesign.cc/the-ultimate-guide-to-linkedin-for-ux-designers-d9a0faff9b05" },
        ]},
        { day:"THU", type:"office", tasks:[
          { id:"m4w2-thu-1", time:"75m", text:"Get 3 pieces of portfolio feedback (Designer Hangout / ADPList)", detail:"Ask specifically: 'Is my story clear? Does my process come through? What would make you not hire me?'", ref:"ADPList + Designer Hangout", url:"https://adplist.org/" },
          { id:"m4w2-thu-2", time:"45m", text:"Implement top 2 portfolio feedback items immediately", detail:"Don't sit on feedback. Act fast, especially if it involves clarity of your case study narrative.", ref:"Your Portfolio", url:"" },
          { id:"m4w2-thu-3", time:"10m", text:"Update LinkedIn with new title and portfolio link", detail:"'Product Designer | Transitioning from Graphic Design | [Portfolio URL]'", ref:"LinkedIn", url:"https://linkedin.com" },
        ]},
        { day:"FRI", type:"office", tasks:[
          { id:"m4w2-fri-1", time:"90m", text:"All 29 course tasks complete – Final review", detail:"Go through every task. Can you name the deliverable you made for each? If yes, you're done.", ref:"Your Course – Complete", url:"" },
          { id:"m4w2-fri-2", time:"30m", text:"Month 4 retrospective: What's done, what's next", detail:"Level 2 complete? If yes, celebrate. If not, block time to close any gaps.", ref:"Your Design Journal", url:"" },
        ]},
        { day:"SAT", type:"weekend", tasks:[
          { id:"m4w2-sat-1", time:"180m", text:"Portfolio final polish sprint – every page reviewed", detail:"Spelling, spacing, imagery quality, case study depth, mobile responsiveness in Framer.", ref:"Portfolio QA Checklist", url:"https://www.checklist.design/" },
          { id:"m4w2-sat-2", time:"90m", text:"Cert #3 progress: 4+ hrs", detail:"Strong push on your third certification.", ref:"Cert #3 – In Progress", url:"" },
          { id:"m4w2-sat-3", time:"30m", text:"Twitter: Portfolio launch announcement (save this for when it's ready)", detail:"Draft the tweet now: 'After 4 months of learning, building, and sharing — my portfolio is live…'", ref:"Design Twitter", url:"" },
        ]},
        { day:"SUN", type:"weekend", tasks:[
          { id:"m4w2-sun-1", time:"120m", text:"Publish portfolio – Get the URL live in Framer", detail:"This is Level 3 Goal #1 and #2 complete. Your website is live. Your work is showcased.", ref:"Level 3 Goals #1 and #2", url:"" },
          { id:"m4w2-sun-2", time:"90m", text:"Share portfolio publicly on Twitter, LinkedIn, and design communities", detail:"Post the launch tweet you drafted. DM 5 designers you respect and ask for feedback.", ref:"Portfolio Launch", url:"" },
          { id:"m4w2-sun-3", time:"30m", text:"Month 4 journal: How far you've come in 4 months", detail:"Write it. Read your Month 1 journal entry. You'll be amazed.", ref:"Your Design Journal", url:"" },
        ]},
      ]},
    ]
  },
  {
    id: 5, label: "Month 5", title: "Portfolio & Presence", subtitle: "Certifications, Framer + Community Building", color: "#81C784",
    weeks: [
      { id:"m5w1", label:"Week 17", theme:"Certifications + Portfolio Refinement", days:[
        { day:"MON", type:"wfh", tasks:[
          { id:"m5w1-mon-1", time:"120m", text:"Cert #3 – Major sprint to completion", detail:"Aim to finish Cert #3 this week. Full push today.", ref:"Level 3 Goal #3 – Final cert", url:"" },
          { id:"m5w1-mon-2", time:"75m", text:"Portfolio: Add social proof + refine copywriting", detail:"Add cert badges to portfolio. Refine your About page story. Make your 'why' clear.", ref:"Your Portfolio", url:"" },
          { id:"m5w1-mon-3", time:"60m", text:"Framer: Add page transitions and micro-animations to portfolio", detail:"Subtle fade-ins, staggered card reveals. Polish the feel without overdoing it.", ref:"Framer Animations", url:"https://www.framer.com/learn/animate-page-transitions/" },
          { id:"m5w1-mon-4", time:"30m", text:"Read: How to cold email product design teams", detail:"You'll need this in Month 6. Understand the format before you need it.", ref:"Cold Email Guide for Designers", url:"https://uxdesign.cc/how-to-reach-out-to-designers-at-your-dream-company-db05f7e52cf6" },
        ]},
        { day:"TUE", type:"office", tasks:[
          { id:"m5w1-tue-1", time:"75m", text:"Cert #3 – Final modules and exam", detail:"Complete and earn your third certificate. 3 certs = Level 3 Goal #3 done.", ref:"Level 3 Goal #3 – COMPLETE", url:"" },
          { id:"m5w1-tue-2", time:"45m", text:"Update portfolio with all 3 cert badges + links", detail:"Add a credentials section or footer. Verification links matter to recruiters.", ref:"Your Portfolio", url:"" },
          { id:"m5w1-tue-3", time:"10m", text:"Twitter: 3 certs completed milestone post", detail:"'Certifications done: [Cert 1], [Cert 2], [Cert 3]. Now building toward my first PD role.'", ref:"Design Twitter", url:"" },
        ]},
        { day:"WED", type:"wfh", tasks:[
          { id:"m5w1-wed-1", time:"120m", text:"Case study depth: Expand weakest case study to full length", detail:"Every case study should have: 5+ process images, written rationale, prototype link, outcome.", ref:"Your Portfolio", url:"" },
          { id:"m5w1-wed-2", time:"90m", text:"Framer: Portfolio mobile responsiveness check + fix", detail:"Test on 3 device sizes. Fix anything that breaks. Mobile recruiter browsing is real.", ref:"Framer Responsive Design", url:"https://www.framer.com/learn/breakpoints/" },
          { id:"m5w1-wed-3", time:"60m", text:"Research: List 20 target companies for Month 6 applications", detail:"Mix of size (startup, scale-up, enterprise). Note: open roles, design team size, stack they use.", ref:"Target Company Research", url:"https://www.linkedin.com/jobs/" },
          { id:"m5w1-wed-4", time:"30m", text:"Read: What PD hiring managers actually look for", detail:"Not just portfolio — curiosity, communication, process thinking. Understand the full picture.", ref:"Hiring Manager POV – YouTube", url:"https://www.youtube.com/results?search_query=what+product+design+hiring+managers+look+for" },
        ]},
        { day:"THU", type:"office", tasks:[
          { id:"m5w1-thu-1", time:"75m", text:"Prepare 3-minute case study verbal walkthrough (record on Loom)", detail:"Walk through your best case study out loud. Time yourself. Watch it back critically.", ref:"Loom – Free Recorder", url:"https://www.loom.com/" },
          { id:"m5w1-thu-2", time:"45m", text:"LinkedIn: Full profile optimisation", detail:"Headline, About section, Featured projects (link your portfolio), Experience reframed toward PD.", ref:"LinkedIn Profile Tips", url:"https://uxdesign.cc/the-ultimate-guide-to-linkedin-for-ux-designers-d9a0faff9b05" },
          { id:"m5w1-thu-3", time:"10m", text:"Reach out to 3 PDs on LinkedIn for informational interviews", detail:"Be specific: 'I'm transitioning from graphic design. Could I ask 3 questions about your role at [Company]?'", ref:"Informational Interview Script", url:"" },
        ]},
        { day:"FRI", type:"office", tasks:[
          { id:"m5w1-fri-1", time:"75m", text:"Practice design challenge: '30-minute design exercise'", detail:"Pick a random brief. Design 1 screen in 30 minutes. Document your decisions as you go.", ref:"Design Challenge Practice", url:"https://sharpen.design/" },
          { id:"m5w1-fri-2", time:"45m", text:"Write: Your 'designer story' in 3 versions (30 sec / 2 min / 5 min)", detail:"You'll use these in cover letters, interviews, and networking. Practice all three.", ref:"Your Story Template", url:"" },
        ]},
        { day:"SAT", type:"weekend", tasks:[
          { id:"m5w1-sat-1", time:"180m", text:"Design system expansion: Add documentation page to portfolio", detail:"Create a standalone Design System page in your portfolio. Show your system as a work sample.", ref:"Your Design System", url:"" },
          { id:"m5w1-sat-2", time:"90m", text:"ADPList mentorship session (if booked) + follow-up actions", detail:"Come prepared: portfolio link, 3 specific questions, a WIP project to show.", ref:"ADPList", url:"https://adplist.org/" },
          { id:"m5w1-sat-3", time:"30m", text:"Twitter: 5-month journey milestone thread", detail:"'5 months in. Here's everything I've built:' [project screenshots]. Real proof builds real credibility.", ref:"Design Twitter", url:"" },
        ]},
        { day:"SUN", type:"weekend", tasks:[
          { id:"m5w1-sun-1", time:"150m", text:"Speculative project: Design a feature for a company you want to work at", detail:"Pick one of your target companies. Design 1 feature they're missing. Show process.", ref:"Speculative Portfolio Projects", url:"https://uxdesign.cc/speculative-ux-projects-portfolio-ideas-da5c3e7c4ed9" },
          { id:"m5w1-sun-2", time:"60m", text:"Add speculative project to portfolio with brief case study", detail:"Even a short one: problem, 3 screens, rationale. Shows initiative and ambition.", ref:"Your Portfolio", url:"" },
          { id:"m5w1-sun-3", time:"60m", text:"Month 5 retrospective + Month 6 application plan", detail:"By end of this month: portfolio live, 3 certs done, target company list ready, story rehearsed.", ref:"Your Design Journal", url:"" },
        ]},
      ]},
    ]
  },
  {
    id: 6, label: "Month 6", title: "Launch Mode", subtitle: "Job Applications + Interview Prep + Keep Building", color: "#EF9A9A",
    weeks: [
      { id:"m6w1", label:"Week 21", theme:"Application Blitz Week 1", days:[
        { day:"MON", type:"wfh", tasks:[
          { id:"m6w1-mon-1", time:"90m", text:"Write your master cover letter template", detail:"Structure: hook (specific to company) → your story (concise) → why them → call to action. 250 words max.", ref:"Cover Letter Template", url:"https://uxdesign.cc/how-to-write-a-ux-designer-cover-letter-7073cae68f4b" },
          { id:"m6w1-mon-2", time:"75m", text:"Apply to Companies #1, #2, #3 from your target list", detail:"Tailor each cover letter with 1 company-specific sentence. Portfolio link in every application.", ref:"Level 3 Goal #4 – Begins", url:"" },
          { id:"m6w1-mon-3", time:"60m", text:"Design challenge prep: Timed 1-hour design exercise", detail:"Simulate an interview design challenge. Document your process out loud.", ref:"Design Challenge Practice", url:"https://sharpen.design/" },
          { id:"m6w1-mon-4", time:"30m", text:"Create an application tracking spreadsheet", detail:"Columns: Company / Role / Date Applied / Status / Follow-up Date / Notes.", ref:"Job Application Tracker Template", url:"https://www.notion.so/templates/job-search-tracker" },
        ]},
        { day:"TUE", type:"office", tasks:[
          { id:"m6w1-tue-1", time:"75m", text:"Apply to Companies #4, #5 + research 5 more targets", detail:"Keep the pipeline full. More companies than you think you need.", ref:"Level 3 Goal #4", url:"" },
          { id:"m6w1-tue-2", time:"45m", text:"Interview prep: Product design process question practice", detail:"'Walk me through your design process.' Practice answering in 3 minutes with a real example.", ref:"PD Interview Questions – YouTube", url:"https://www.youtube.com/results?search_query=product+designer+interview+questions+2024" },
          { id:"m6w1-tue-3", time:"10m", text:"Twitter: 'I'm actively job hunting. Looking for Product Designer roles.' post", detail:"Include your portfolio link. Many people get jobs from Twitter/X posts. It works.", ref:"Design Twitter", url:"" },
        ]},
        { day:"WED", type:"wfh", tasks:[
          { id:"m6w1-wed-1", time:"120m", text:"Apply to Companies #6–10 + personalise each cover letter", detail:"10 applications out by end of this week. Volume matters early on.", ref:"Level 3 Goal #4", url:"" },
          { id:"m6w1-wed-2", time:"90m", text:"Portfolio: Final final pass – fix any remaining issues", detail:"Ask one more fresh pair of eyes: 'What would stop you hiring me based on this portfolio alone?'", ref:"Your Portfolio", url:"" },
          { id:"m6w1-wed-3", time:"60m", text:"Prepare 'design process' answer for 5 common interview questions", detail:"'Tell me about a project where things went wrong.' 'How do you handle design feedback?' etc.", ref:"PD Interview Question Bank", url:"https://uxdesign.cc/ux-interview-questions-to-help-you-prepare-a90b4e63e5a3" },
          { id:"m6w1-wed-4", time:"30m", text:"Reach out to 5 designers for referrals at target companies", detail:"Be specific. 'I applied to [Role] at [Company]. If you have a moment, I'd love a quick intro.'", ref:"LinkedIn Referral Outreach", url:"" },
        ]},
        { day:"THU", type:"office", tasks:[
          { id:"m6w1-thu-1", time:"75m", text:"Interview prep: Case study walkthrough practice (recorded)", detail:"Record yourself presenting your strongest case study in 5 minutes. Watch it back. Fix what feels weak.", ref:"Case Study Presentation", url:"" },
          { id:"m6w1-thu-2", time:"45m", text:"Speculative project: Design challenge for a dream company", detail:"This can be sent directly to a company's design team with a cold email. Bold but memorable.", ref:"Speculative Projects", url:"" },
          { id:"m6w1-thu-3", time:"10m", text:"Follow up on any applications older than 7 days", detail:"'Following up on my application for [Role]. Still very interested. Happy to share anything further.'", ref:"Application Follow-Up Email", url:"" },
        ]},
        { day:"FRI", type:"office", tasks:[
          { id:"m6w1-fri-1", time:"75m", text:"Design skills keep sharp: Build 1 new screen from a prompt", detail:"Don't stop designing during the job hunt. Skills need maintenance.", ref:"Sharpen.design", url:"https://sharpen.design/" },
          { id:"m6w1-fri-2", time:"45m", text:"Week 21 review: Applications sent / Responses received / Interviews booked", detail:"Update your tracker. Adjust strategy if needed. It's a numbers game early on.", ref:"Application Tracker", url:"" },
        ]},
        { day:"SAT", type:"weekend", tasks:[
          { id:"m6w1-sat-1", time:"120m", text:"Apply to Companies #11–15 (weekend applications)", detail:"Many companies review applications on Mondays. Applying Sat/Sun means yours sits at the top.", ref:"Level 3 Goal #4 – 15 applications", url:"" },
          { id:"m6w1-sat-2", time:"90m", text:"Interview prep: Whiteboard challenge simulation", detail:"Get someone to give you a brief verbally. Design live for 45 minutes. Present back. Practice the pressure.", ref:"Design Challenge Prep Guide", url:"https://uxdesign.cc/how-to-ace-the-design-challenge-in-product-design-interviews-dbbeac247d71" },
          { id:"m6w1-sat-3", time:"60m", text:"Build one new portfolio piece: redesign something you use this week", detail:"Staying active shows interviewers you build constantly, not just when job hunting.", ref:"Your Portfolio", url:"" },
        ]},
        { day:"SUN", type:"weekend", tasks:[
          { id:"m6w1-sun-1", time:"120m", text:"Twitter: Write your 6-month journey thread", detail:"'6 months ago I was a graphic designer. Today I'm applying for Product Designer roles. Here's the full story...' This thread will get you inbound.", ref:"Design Twitter – Major Post", url:"" },
          { id:"m6w1-sun-2", time:"75m", text:"Month 6 plan: Respond to all inbound, prep for interviews, keep applying", detail:"Keep the momentum. The hardest part of job hunting is consistency.", ref:"Your Application Tracker", url:"" },
          { id:"m6w1-sun-3", time:"45m", text:"6-month retrospective in your Design Journal", detail:"What did you build? What did you learn? What are you most proud of? Read Month 1's entry one more time.", ref:"Your Design Journal", url:"" },
          { id:"m6w1-sun-4", time:"30m", text:"Plan Month 7 – Keep going. One job doesn't end the journey.", detail:"The best designers never stop building, learning, and shipping. Month 7 starts tomorrow.", ref:"Your Ongoing Design Practice", url:"" },
        ]},
      ]},
    ]
  },
];

export const DAY_COLORS = { office: { bg: "#1a1a1a", border: ORANGE, badge: ORANGE, label: "OFFICE" }, wfh: { bg: "#111", border: GREEN, badge: GREEN, label: "WFH" }, weekend: { bg: "#111", border: BLUE, badge: BLUE, label: "WEEKEND" } };

export type RoadmapMonth = (typeof ROADMAP)[number];
export type RoadmapWeek = RoadmapMonth["weeks"][number];
export type RoadmapDay = RoadmapWeek["days"][number];
export type RoadmapTask = RoadmapDay["tasks"][number];

