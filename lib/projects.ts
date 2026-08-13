import fs from "node:fs";
import path from "node:path";

import { assetPath } from "@/lib/site";

const imageExtensions = new Set([".webp", ".png", ".jpg", ".jpeg"]);

export type Project = {
  slug: string;
  title: string;
  summary: string;
  type: string;
  stack: string;
  role: string;
  description: string;
  problem: string;
  built: string;
  challenges: string;
  githubUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  imageFolder: string;
  thumbnail: string;
};

export type ProjectCardData = Project & {
  imageSrc?: string;
};

export type ProjectDetailData = ProjectCardData & {
  images: string[];
};

export const projectData: Project[] = [
  {
    slug: "balai-almeda-hotel-imis",
    title: "Balai Almeda Hotel IMIS",
    summary:
      "Public booking portal and internal hotel management system for operational workflows.",
    type: "Academic Capstone Project",
    stack: "Vue 3, Tailwind CSS, MySQL, Express, Node.js",
    role: "Full-stack Developer",
    description:
      "A comprehensive web-based hotel system bridging a public booking portal with internal management workflows for reservations, operations, and reporting.",
    problem:
      "Hotel inquiries, reservations, and internal tracking depended on scattered manual steps that made it difficult to keep guest-facing and operations data aligned. The project was built to connect the booking experience with the back-office workflow in one system.",
    built:
      "I built the full-stack reservation and management system, including public booking flows, admin interfaces, database structure, and operational reporting screens for hotel staff.",
    challenges:
      "The main technical decision was designing reservation data around both guest-facing availability and internal status tracking, so the same records could support booking, operations, and reporting without duplicated state.",
    githubUrl: "https://github.com/kiseto/balai-almeda-capstone",
    liveLabel: "soon",
    imageFolder: "balai",
    thumbnail: "balai-reservation-system-1.png",
  },
  {
    slug: "enrollment-system",
    title: "Enrollment System",
    summary: "Student enrollment, cashier queueing, schedules, and reporting.",
    type: "Academic Project",
    stack: "PHP, JavaScript, HTML, Bootstrap",
    role: "Full-stack Developer",
    description:
      "An enrollment system for cashier queueing, student schedules, treasury workflows, and related reporting needs.",
    problem:
      "Enrollment workflows involved several handoffs between student records, payment steps, schedules, and treasury reporting. The project was built to make those steps easier to track in a single academic workflow.",
    built:
      "I developed the full-stack enrollment interface and supporting logic for student registration, cashier queueing, schedule views, treasury workflows, and reporting pages.",
    challenges:
      "The key challenge was organizing multiple department-facing workflows into clear screens, while keeping the data relationships understandable across students, payments, schedules, and reports.",
    githubUrl: "https://github.com/kiseto/enrollmentsystem",
    liveUrl: "https://kiseto.github.io/ncst-ui/",
    imageFolder: "ncst-ui",
    thumbnail: "ncst-ui-1.png",
  },
  {
    slug: "student-task-manager",
    title: "Student Task Manager",
    summary:
      "Task management app for students with authentication and notifications.",
    type: "Personal Project",
    stack: "Dart, Flutter, Firebase",
    role: "Mobile Developer",
    description:
      "A Flutter app for students to manage tasks with authentication, CRUD operations, and notifications using Firebase.",
    problem:
      "Students often manage assignments and reminders across separate notes, calendars, or chat messages. This app was built as a focused mobile workspace for tracking tasks with account-based persistence.",
    built:
      "I built the Flutter mobile app, Firebase authentication flow, task CRUD experience, and notification behavior for student task reminders.",
    challenges:
      "The main thing learned was coordinating app state with Firebase-backed data so authentication, task updates, and reminders stayed responsive in a mobile interface.",
    githubUrl: "https://github.com/kiseto/student_task_manager_flutter",
    liveLabel: "no live",
    imageFolder: "student-task",
    thumbnail: "student-task-4.png",
  },
  {
    slug: "coffee-web-demo",
    title: "Coffee Web Demo",
    summary: "Coffee shop web design concept for a small business storefront.",
    type: "UI/UX Web Demo",
    stack: "HTML, CSS, JavaScript",
    role: "UI/UX Designer, Frontend Developer",
    description:
      "A polished coffee shop website concept that demonstrates storefront-focused UI/UX, visual presentation, and responsive frontend execution for business owners.",
    problem:
      "Small storefronts need a clear first impression that communicates menu, atmosphere, and contact points quickly. This concept was built to practice turning a local business idea into a responsive marketing site.",
    built:
      "I designed and implemented the frontend experience, including the visual direction, responsive sections, product presentation, and lightweight interactions.",
    challenges:
      "The key decision was balancing visual warmth with straightforward navigation, so the design felt like a coffee brand while still keeping important business information easy to scan.",
    githubUrl: "https://github.com/kiseto/coffee_web_demo",
    liveUrl: "https://coffee-web-demo.vercel.app/",
    imageFolder: "coffee-demo",
    thumbnail: "coffee-demo-1.png",
  },
];

function getProjectImagesDirectory(project: Project) {
  return path.join(
    process.cwd(),
    "public",
    "images",
    "projects",
    project.imageFolder
  );
}

function projectImagePath(project: Project, filename: string) {
  return assetPath(`/images/projects/${project.imageFolder}/${filename}`);
}

export function resolveProjectImage(project: Project) {
  const imagePath = path.join(
    getProjectImagesDirectory(project),
    project.thumbnail
  );
  const extension = path.extname(project.thumbnail).toLowerCase();

  return imageExtensions.has(extension) && fs.existsSync(imagePath)
    ? projectImagePath(project, project.thumbnail)
    : undefined;
}

export function getProjectGalleryImages(project: Project) {
  const imagesDirectory = getProjectImagesDirectory(project);

  if (!fs.existsSync(imagesDirectory)) {
    return [];
  }

  const imageFiles = fs
    .readdirSync(imagesDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) =>
      imageExtensions.has(path.extname(filename).toLowerCase())
    )
    .sort((current, next) => {
      if (current === project.thumbnail) {
        return -1;
      }

      if (next === project.thumbnail) {
        return 1;
      }

      return current.localeCompare(next);
    });

  return imageFiles.map((filename) => projectImagePath(project, filename));
}

export function getProjects(): ProjectCardData[] {
  return projectData.map((project) => ({
    ...project,
    imageSrc: resolveProjectImage(project),
  }));
}

export function getProjectBySlug(slug: string): ProjectDetailData | undefined {
  const project = projectData.find((item) => item.slug === slug);

  if (!project) {
    return undefined;
  }

  return {
    ...project,
    imageSrc: resolveProjectImage(project),
    images: getProjectGalleryImages(project),
  };
}
