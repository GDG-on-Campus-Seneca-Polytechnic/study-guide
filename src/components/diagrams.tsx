import {
  BookOpen,
  Box,
  Braces,
  BrainCircuit,
  CalendarClock,
  Cloud,
  CloudCog,
  Code2,
  Database,
  Eye,
  FileCode2,
  FolderOpen,
  Gamepad2,
  Globe,
  Hammer,
  KeyRound,
  Laptop,
  Layers,
  Lightbulb,
  Link2,
  LogIn,
  MessageSquareText,
  Monitor,
  Package,
  Presentation,
  QrCode,
  RefreshCw,
  ScrollText,
  Server,
  Smartphone,
  Sprout,
  Terminal,
  Ticket,
  TicketCheck,
  UserRound,
  Vote,
} from 'lucide-react';
import { Flow, type FlowSpec } from './flow';

// Every diagram in the guide, by name. Use one in MDX with <Diagram name="cloud-run" />.
// Draw only what the page already says. Generic shapes and our own colours:
// no product logos.
export const diagrams = {
  // How this guide works
  'guide-path': {
    track: 'guide',
    alt: 'The path through the guide: claim the free tools in Get set up, follow one track (Web, Cloud, AI and ML, or Mobile), then build something at the Code Jam.',
    caption: 'Claim the tools once, pick any track, then bring what you learned to the jam.',
    columns: [
      { icon: KeyRound, label: 'Get set up', sub: 'Free keys, credits and student packs', track: 'setup', tone: 'accent' },
      [
        { icon: Globe, label: 'Web', sub: 'Firebase Hosting', track: 'web', tone: 'accent' },
        { icon: Cloud, label: 'Cloud', sub: 'Cloud Run', track: 'cloud', tone: 'accent' },
        { icon: BrainCircuit, label: 'AI and ML', sub: 'Gemini API', track: 'ai', tone: 'accent' },
        { icon: Smartphone, label: 'Mobile', sub: 'Flutter', track: 'mobile', tone: 'accent' },
      ],
      { icon: CalendarClock, label: 'Code Jam', sub: 'Build in two hours, then vote', track: 'code-jam', tone: 'accent' },
    ],
  },

  // Get set up
  'setup-map': {
    track: 'setup',
    alt: 'Which sign-up each track needs: the Gemini API key for the AI track and the Code Jam, Google Cloud credits for the Cloud track, a Google account for the Web track, and the GitHub Student Developer Pack for any track.',
    caption: 'Which sign-up unlocks which part of the guide.',
    columns: [
      [
        { id: 'key', icon: KeyRound, label: 'Gemini API key', sub: 'Free, no card' },
        { id: 'credits', icon: CloudCog, label: 'Google Cloud credits', sub: '$300 trial or lab credits' },
        { id: 'account', icon: UserRound, label: 'Google account', sub: 'Personal, not school' },
        { id: 'gh', icon: Code2, label: 'GitHub Student Pack', sub: 'Worth having' },
      ],
      [
        { id: 'ai', icon: BrainCircuit, label: 'AI track and Code Jam', track: 'ai', tone: 'accent' },
        { id: 'cloud', icon: Cloud, label: 'Cloud track', track: 'cloud', tone: 'accent' },
        { id: 'web', icon: Globe, label: 'Web track', track: 'web', tone: 'accent' },
        { id: 'any', icon: Layers, label: 'Any track', track: 'guide', tone: 'accent' },
      ],
    ],
    edges: [
      ['key', 'ai'],
      ['credits', 'cloud'],
      ['account', 'web'],
      ['gh', 'any'],
    ],
    width: 640,
  },

  // Web
  'web-request': {
    track: 'web',
    alt: 'What happens when someone opens your site: their browser asks the nearest Firebase CDN location over HTTPS, and the CDN sends back the files from your public folder as they are, with no server code.',
    caption: 'Static hosting: the CDN hands out your files as they are. There is no server code to run.',
    columns: [
      { icon: Monitor, label: 'Browser', sub: 'Opens `your-project.web.app`' },
      { icon: Globe, label: 'Firebase CDN', sub: 'Nearest location, HTTPS included', tone: 'accent' },
      { icon: FolderOpen, label: 'Your files', sub: '`public/index.html` and friends' },
    ],
  },
  'firebase-deploy': {
    track: 'web',
    alt: 'The Firebase Hosting lesson: your public folder goes up with the Firebase CLI to Firebase Hosting, which serves it at your live web.app address or at a temporary preview channel link.',
    caption: 'One folder, two ways out: the live site, or a preview link that expires after 7 days.',
    columns: [
      { icon: FolderOpen, label: 'public/', sub: 'Your `index.html`' },
      { icon: Terminal, label: 'Firebase CLI', sub: '`firebase deploy`' },
      { icon: Globe, label: 'Firebase Hosting', sub: 'Served from a CDN', tone: 'accent' },
      [
        { icon: Link2, label: 'Live site', sub: 'Your `web.app` address' },
        { icon: Eye, label: 'Preview link', sub: 'Expires in 7 days', tone: 'ghost' },
      ],
    ],
  },

  // Cloud
  'cloud-why': {
    track: 'cloud',
    alt: 'Why you need a server: the browser calls your code on Cloud Run, and only your code holds the API key or talks to a database, so neither is exposed to the browser.',
    caption: 'Your code runs on Cloud Run, so secrets and data stay on the server side.',
    columns: [
      { icon: Monitor, label: 'Browser', sub: 'Sends a request' },
      { icon: Server, label: 'Your code on Cloud Run', sub: 'Keeps the API key secret', tone: 'accent' },
      [
        { icon: BrainCircuit, label: 'An API', sub: 'For example Gemini', track: 'ai' },
        { icon: Database, label: 'A database', sub: 'To save data' },
      ],
    ],
  },
  'cloud-run': {
    track: 'cloud',
    alt: 'Deploying from source: gcloud run deploy sends your folder to Cloud Build, which makes a container image and stores it in Artifact Registry. Cloud Run runs that container and gives it a public HTTPS run.app address.',
    caption: (
      <>
        <code>gcloud run deploy --source .</code> does every step in the frame for you.
      </>
    ),
    columns: [
      { icon: FileCode2, label: 'Your source', sub: '`index.js` and `package.json`' },
      { icon: Hammer, label: 'Cloud Build', sub: 'Makes a container' },
      { icon: Package, label: 'Artifact Registry', sub: 'Stores the image' },
      { icon: Box, label: 'Cloud Run', sub: 'Runs it, scales to zero', tone: 'accent' },
      { icon: Link2, label: 'HTTPS URL', sub: 'A `run.app` address' },
    ],
    frame: { from: 1, to: 3, label: 'Google Cloud' },
  },

  // AI and ML
  'ai-overview': {
    track: 'ai',
    alt: 'Two ways to reach Gemini: try prompts in Google AI Studio, or call the Gemini API from your own code with your key. Either way Gemini sends back an answer.',
    caption: 'Prototype in AI Studio, then move the same prompt into code.',
    columns: [
      [
        { icon: MessageSquareText, label: 'AI Studio', sub: 'Try prompts, no code' },
        { icon: Code2, label: 'Your code', sub: 'Node.js or Python' },
      ],
      { icon: BrainCircuit, label: 'Gemini API', sub: 'The model reads your prompt', tone: 'accent' },
      { icon: ScrollText, label: 'Answer', sub: 'Text back to you' },
    ],
    width: 640,
  },
  'gemini-call': {
    track: 'ai',
    alt: 'Your first Gemini call: your script calls the Google Gen AI SDK, the SDK reads the GEMINI_API_KEY environment variable and sends the request to the Gemini API, and the answer comes back and prints in your terminal.',
    caption: 'The key lives in an environment variable, never in your code.',
    columns: [
      { icon: FileCode2, label: 'Your script', sub: '`index.js` or `main.py`' },
      { icon: Braces, label: 'Gen AI SDK', sub: 'Reads `GEMINI_API_KEY`' },
      { icon: BrainCircuit, label: 'Gemini API', sub: 'The model you named', tone: 'accent' },
      { icon: Terminal, label: 'Answer', sub: 'Printed in your terminal' },
    ],
  },
  'system-instructions': {
    track: 'ai',
    alt: 'A system instruction and the prompt go to Gemini together. The system instruction sets rules for the whole conversation and the user does not see it; the prompt is what the user asks each time. The reply follows both: a hint first, under 80 words.',
    caption: 'The system instruction sets the rules. The prompt changes every time.',
    columns: [
      [
        { icon: ScrollText, label: 'System instruction', sub: 'The role and rules. Users do not see it', tone: 'accent' },
        { icon: MessageSquareText, label: 'Prompt', sub: 'What the user asks each time' },
      ],
      { icon: BrainCircuit, label: 'Gemini', sub: 'Follows both', tone: 'accent' },
      { icon: Lightbulb, label: 'Reply', sub: 'A hint first, under 80 words' },
    ],
    width: 640,
  },

  // Mobile
  'mobile-paths': {
    track: 'mobile',
    alt: 'Two ways to build mobile apps: Dart code with Flutter runs on Android, iOS, the web and desktop; Kotlin code with Jetpack Compose builds native Android apps.',
    caption: 'Flutter reaches every platform from one codebase. Compose goes deep on Android.',
    columns: [
      [
        { id: 'dart', icon: FileCode2, label: 'Dart code', sub: 'One codebase' },
        { id: 'kotlin', icon: FileCode2, label: 'Kotlin code', sub: 'Native Android' },
      ],
      [
        { id: 'flutter', icon: Layers, label: 'Flutter', sub: 'This track starts here', tone: 'accent' },
        { id: 'compose', icon: Layers, label: 'Jetpack Compose', sub: 'The Android path' },
      ],
      [
        { id: 'everywhere', icon: Monitor, label: 'Android, iOS, web, desktop' },
        { id: 'android', icon: Smartphone, label: 'Android' },
      ],
    ],
    edges: [
      ['dart', 'flutter'],
      ['flutter', 'everywhere'],
      ['kotlin', 'compose'],
      ['compose', 'android'],
    ],
  },
  'flutter-targets': {
    track: 'mobile',
    alt: 'Your Flutter app: you edit lib/main.dart, flutter run builds it, and the same code runs in Chrome for this lesson, or on Android and iOS once you add a device.',
    caption: 'Same code, many targets. This lesson uses Chrome, so you need no phone or emulator.',
    columns: [
      { icon: FileCode2, label: 'lib/main.dart', sub: 'Your widgets' },
      { icon: Layers, label: 'Flutter', sub: '`flutter run -d chrome`', tone: 'accent' },
      [
        { icon: Globe, label: 'Chrome', sub: 'This lesson' },
        { icon: Smartphone, label: 'Android', sub: 'Add a device later', tone: 'ghost' },
        { icon: Smartphone, label: 'iOS', sub: 'Add a device later', tone: 'ghost' },
      ],
    ],
    width: 640,
  },
  'hot-reload': {
    track: 'mobile',
    alt: 'The hot reload loop: change the code, save and press r in the terminal running flutter run, and the running app updates while keeping the counter value.',
    caption: 'Hot reload keeps your place: the counter value survives the change.',
    columns: [
      { icon: Code2, label: 'Change code', sub: 'Title or seed colour' },
      { icon: RefreshCw, label: 'Save and press r', sub: 'In the `flutter run` terminal', tone: 'accent' },
      { icon: Smartphone, label: 'App updates', sub: 'Counter keeps its value' },
    ],
    width: 640,
    nodeHeight: 104,
  },

  // Code Jam
  'jam-day': {
    track: 'code-jam',
    alt: 'The Code Jam day in order: check in and get a voting code, sign in to your personal Google account and get or check your AI Studio key, pick an idea (your own or from Jam Seed), build for two hours, then show what you built and vote with your code.',
    caption: 'Friday, November 27, 1 to 4 PM, at Seneca Helix.',
    columns: [
      [
        { icon: Ticket, label: '1. Check in', sub: 'Get a voting code', track: 'web', tone: 'accent' },
        { icon: LogIn, label: '2. Sign in', sub: 'Personal Google account', track: 'mobile', tone: 'accent' },
        { icon: KeyRound, label: '3. Your key', sub: 'From AI Studio', track: 'ai', tone: 'accent' },
      ],
      { icon: Sprout, label: '4. Pick an idea', sub: 'Yours, or from Jam Seed', track: 'cloud', tone: 'accent' },
      { icon: Hammer, label: '5. Build', sub: 'Two hours. Aim small', track: 'web', tone: 'accent' },
      { icon: Vote, label: '6. Show and vote', sub: 'Vote with your check-in code', track: 'mobile', tone: 'accent' },
    ],
    frame: { from: 0, to: 0, label: 'Arrive and set up' },
  },

  // Club tools: how the event-day apps fit together
  'club-system': {
    track: 'club-tools',
    alt: 'Event-day systems. Phones scan a QR code to join Bean Bash or open the voting ballot. The organizer runs the vote from its host page. Bean Bash and Code Jam voting run on Cloudflare Workers with Durable Objects, next to Jam Seed, which is coming soon. The projector shows the Bean Bash arena or the vote results. The study guide on GitHub Pages links to every tool.',
    caption: 'Event day: phones and the host page talk to the apps on Cloudflare; the projector shows the result.',
    columns: [
      [
        { id: 'phones', icon: QrCode, label: 'Phones', sub: 'Scan the QR code', track: 'web' },
        { id: 'host', icon: Laptop, label: 'Organizer', sub: 'Vote host page', track: 'mobile' },
        { id: 'guide', icon: BookOpen, label: 'Study guide', sub: 'On GitHub Pages', track: 'guide' },
      ],
      [
        { id: 'bean', icon: Gamepad2, label: 'Bean Bash', sub: 'Trivia game rooms', tone: 'accent', track: 'ai' },
        { id: 'vote', icon: TicketCheck, label: 'Code Jam vote', sub: 'Polls, codes, tally', tone: 'accent', track: 'cloud' },
        { id: 'seed', icon: Sprout, label: 'Jam Seed', sub: 'Coming soon', tone: 'ghost' },
      ],
      { id: 'projector', icon: Presentation, label: 'Projector', sub: 'Arena or results', track: 'web' },
    ],
    edges: [
      ['phones', 'bean'],
      ['phones', 'vote'],
      ['host', 'vote'],
      ['guide', 'bean'],
      ['guide', 'vote'],
      ['guide', 'seed'],
      ['bean', 'projector'],
      ['vote', 'projector'],
    ],
    frame: { from: 1, to: 1, label: 'Cloudflare Workers + Durable Objects' },
  },
} satisfies Record<string, FlowSpec>;

export type DiagramName = keyof typeof diagrams;

export function Diagram({ name, large = false }: { name: DiagramName; large?: boolean }) {
  const spec: FlowSpec | undefined = diagrams[name];
  if (!spec) throw new Error(`Unknown diagram "${name}". Add it to src/components/diagrams.tsx.`);
  return <Flow spec={spec} maxWidth={large ? 1000 : undefined} />;
}

