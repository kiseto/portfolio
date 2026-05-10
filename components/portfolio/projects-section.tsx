import fs from "node:fs";
import path from "node:path";

import {
  ProjectsAccordion,
  type Project,
} from "@/components/portfolio/projects-accordion";
import { SectionHeading } from "@/components/portfolio/section-heading";

const imageExtensions = ["webp", "png", "jpg", "jpeg"];

type ProjectData = Omit<Project, "imageSrc"> & {
  imageFolder: string;
  thumbnail: string;
};

const projectData: ProjectData[] = [
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
    githubUrl: "https://github.com/kiseto/coffee_web_demo",
    liveUrl: "https://brewincoffee.netlify.app/",
    imageFolder: "coffee-demo",
    thumbnail: "coffee-demo-1.png",
  },
];

function resolveProjectImage(project: ProjectData) {
  const imagesDirectory = path.join(
    process.cwd(),
    "public",
    "images",
    "projects",
    project.imageFolder
  );

  const imageExtension = imageExtensions.find((extension) =>
    fs.existsSync(path.join(imagesDirectory, project.thumbnail)) &&
    project.thumbnail.endsWith(`.${extension}`)
  );

  return imageExtension
    ? `/images/projects/${project.imageFolder}/${project.thumbnail}`
    : undefined;
}

export function ProjectsSection() {
  const projects = projectData.map((project) => ({
    ...project,
    imageSrc: resolveProjectImage(project),
  }));

  return (
    <section
      id="projects"
      className="flex min-h-[calc(100svh-5.5rem)] scroll-mt-24 flex-col px-5 py-12 sm:px-8 lg:px-12"
    >
      <SectionHeading
        title="#projects"
        subtitle="Selected academic and personal work."
      />

      <div className="mt-12 sm:mt-16 lg:mt-20">
        <ProjectsAccordion projects={projects} />
      </div>
    </section>
  );
}
