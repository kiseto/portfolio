import fs from "node:fs";
import path from "node:path";

import {
  ProjectsAccordion,
  type Project,
} from "@/components/portfolio/projects-accordion";
import { SectionHeading } from "@/components/portfolio/section-heading";

const imageExtensions = ["webp", "png", "jpg", "jpeg"];

const projectData: Omit<Project, "imageSrc">[] = [
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
  },
];

function resolveProjectImage(slug: string) {
  const imagesDirectory = path.join(
    process.cwd(),
    "public",
    "images",
    "projects"
  );

  const imageExtension = imageExtensions.find((extension) =>
    fs.existsSync(path.join(imagesDirectory, `${slug}.${extension}`))
  );

  return imageExtension ? `/images/projects/${slug}.${imageExtension}` : undefined;
}

export function ProjectsSection() {
  const projects = projectData.map((project) => ({
    ...project,
    imageSrc: resolveProjectImage(project.slug),
  }));

  return (
    <section
      id="projects"
      className="scroll-mt-24 px-5 py-12 sm:px-8 lg:px-12"
    >
      <SectionHeading
        title="#projects"
        subtitle="Selected academic and personal work."
      />

      <ProjectsAccordion projects={projects} />
    </section>
  );
}
