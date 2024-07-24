I am building this app to be able to create shareable documents and notes with custom tags for personal filtering and searching functionality 
- built off the project created by [Javascript Mastery](https://www.youtube.com/watch?v=y5vE8y_f_OM&ab_channel=JavaScriptMastery): 

NextJS 
Typescript 
Tailwind 
Shadcn/UI : default style; slate; no css variables for colors 
Clerk : installed clerk/themes to style the clerk provider 

Editor: using jsm-editor by JavascriptMastery; rich text editor built on top of Lexical 
npm i jsm-editor 
npx jsm-editor add editor 

collaborative component: using liveblocks to add multi-user collaboration for each document
install liveblocks -  npm install @liveblocks/client @liveblocks/react @liveblocks/react-ui @liveblocks/react-lexical lexical @lexical/react 
initialize liveblocks.config.ts -  npx create-liveblocks-app@latest --init --framework react 
to add authentication for the collaborative rooms:  npm install @liveblocks/node 

Syntax for making a link with custom text: [Sample Text](https://nextjs.org/docs/deployment) 
