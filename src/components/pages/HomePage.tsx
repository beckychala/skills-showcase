// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Github, Mail, Download, ExternalLink, ArrowRight, Terminal, Database, Shield, Cpu, ChevronRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Skills, Projects, Experience, Certifications } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

// --- Utility Components for Layout & Typography ---

const SectionDivider = () => (
  <div className="w-full h-px bg-medium-gray/20 my-0" />
);

const SectionLabel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`font-paragraph text-xs font-medium tracking-[0.2em] uppercase text-medium-gray ${className}`}>
    {children}
  </span>
);

const LargeHeading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-dark-text tracking-tight leading-[1.1] ${className}`}>
    {children}
  </h2>
);

// --- Main Component ---

export default function HomePage() {
  // --- 1. Data Fidelity Protocol: Canonical Data Sources ---
  const [skills, setSkills] = useState<Skills[]>([]);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll Progress for global bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [skillsData, projectsData, experienceData, certificationsData] = await Promise.all([
        BaseCrudService.getAll<Skills>('skills'),
        BaseCrudService.getAll<Projects>('projects'),
        BaseCrudService.getAll<Experience>('experience'),
        BaseCrudService.getAll<Certifications>('certifications')
      ]);

      setSkills(skillsData.items.sort((a, b) => (a.order || 0) - (b.order || 0)));
      setProjects(projectsData.items);
      setExperience(experienceData.items);
      setCertifications(certificationsData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render ---

  return (
    <div className="min-h-screen bg-light-gray-background text-dark-text selection:bg-dark-text selection:text-white overflow-x-clip">
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-dark-text origin-left z-50"
        style={{ scaleX }}
      />
      <Header />
      <main className="w-full">
        
        {/* --- HERO SECTION --- */}
        <section className="relative w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 overflow-hidden">
          {/* Background Grid Texture */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />

          <div className="relative z-10 max-w-[100rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-9">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <SectionLabel className="block mb-8">Portfolio 2024</SectionLabel>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-dark-text/10 shadow-2xl flex-shrink-0"
                  >
                    <Image
                      src="https://static.wixstatic.com/media/f431ba_bc55ebcc76684845829b998ddb6ca94c~mv2.jpg"
                      alt="Bereket Chala Daba"
                      width={192}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-dark-text">
                    Bereket<br />Chala Daba
                  </h1>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
              >
                <p className="font-paragraph text-xl md:text-2xl text-dark-text/80 leading-relaxed mb-10">
                  Information Systems Graduate specializing in <span className="text-dark-text font-medium">IT Support</span>, <span className="text-dark-text font-medium">Data Science</span>, and <span className="text-dark-text font-medium">Cybersecurity</span>. Building practical, real-world technical solutions.
                </p>
                
                <div className="flex flex-wrap gap-4">

                  <Button
                    asChild
                    variant="outline"
                    className="border-dark-text text-dark-text hover:bg-dark-text hover:text-white h-14 px-8 rounded-none text-base tracking-wide transition-all duration-300"
                  >
                    <a
                      href="https://github.com/Becky-Chala"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Decorative / Abstract Element */}
            <div className="lg:col-span-3 hidden lg:flex flex-col justify-end items-end opacity-50">
               <div className="w-full aspect-square border border-dark-text/20 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                  <div className="w-2/3 h-2/3 border border-dark-text/20 rounded-full" />
               </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* --- ABOUT SECTION (Sticky Layout) --- */}
        <section id="about" className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-32">
                <SectionLabel className="block mb-4">01 — Profile</SectionLabel>
                <LargeHeading>About Me</LargeHeading>
              </div>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-paragraph text-2xl md:text-3xl lg:text-4xl leading-tight text-dark-text mb-12">
                  I am an Information Systems graduate from Haramaya University with strong hands-on experience in IT support, system troubleshooting, and project-based data, AI, and cybersecurity work.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-paragraph text-lg text-medium-gray leading-relaxed">
                  <p>
                    I have worked as an IT support and lab assistant, completed an internship at the Ethiopian Statistical Agency, and participated in an intensive AI and data engineering program through 10 Academy in partnership with Kifiya.
                  </p>
                  <p>
                    I also provide freelance IT support services to students, individuals, and small businesses. I enjoy solving practical problems, learning independently, and building useful technical solutions.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* --- SKILLS SECTION (Masonry / Grid) --- */}
        <section id="skills" className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-32 bg-white">
          <div className="mb-20">
            <SectionLabel className="block mb-4">02 — Expertise</SectionLabel>
            <LargeHeading>Technical Skills</LargeHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {isLoading ? (
              <div className="col-span-full text-center py-20 text-medium-gray">Loading skills...</div>
            ) : (
              skills.map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-light-gray-background group-hover:border-dark-text transition-colors duration-500">
                    {skill.categoryIcon ? (
                      <div className="w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity">
                        <Image
                          src={skill.categoryIcon}
                          alt={skill.categoryName || 'Icon'}
                          width={32}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <Terminal className="w-6 h-6 text-medium-gray group-hover:text-dark-text transition-colors" />
                    )}
                    <h3 className="font-heading text-xl font-medium text-dark-text">
                      {skill.categoryName}
                    </h3>
                  </div>
                  
                  {skill.shortDescription && (
                    <p className="font-paragraph text-sm text-medium-gray mb-4 italic">
                      {skill.shortDescription}
                    </p>
                  )}

                  <ul className="space-y-3">
                    {skill.skillsList?.split('\n').map((item, i) => (
                      <li key={i} className="flex items-start gap-3 font-paragraph text-base text-dark-text/80">
                        <span className="block w-1.5 h-1.5 mt-2 rounded-full bg-link-accent/60" />
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* --- PROJECTS SECTION (The "Most Important" Section) --- */}
        <section id="projects" className="w-full bg-dark-text text-white py-32">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/20 pb-8">
              <div>
                <SectionLabel className="block mb-4 text-white/60">03 — Selected Works</SectionLabel>
                <h2 className="font-heading text-5xl md:text-7xl font-bold text-white">Projects</h2>
              </div>
              <p className="font-paragraph text-white/60 max-w-md mt-6 md:mt-0 text-right">
                A collection of technical solutions, simulations, and data analysis projects.
              </p>
            </div>

            <div className="space-y-32">
              {isLoading ? (
                <div className="text-white/50">Loading projects...</div>
              ) : (
                projects.map((project, index) => (
                  <div key={project._id} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Project Visual (Using Placeholder as Abstract Cover) */}
                    <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[16/9] overflow-hidden bg-white/5 rounded-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-link-accent/20 to-transparent mix-blend-overlay z-10" />
                        <Image
                          src={project.projectTitle?.toLowerCase().includes('social shield') || project.projectTitle?.toLowerCase().includes('cybersecurity') 
                            ? "https://static.wixstatic.com/media/f431ba_8d28f237d14c4999a441f259a73399ac~mv2.png"
                            : "https://static.wixstatic.com/media/f431ba_f3e4f97687b04e80b44c98e2397b6e2b~mv2.png?originWidth=1152&originHeight=640"}
                          alt={project.projectTitle || "Project Preview"}
                          width={1200}
                          className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                      </motion.div>
                    </div>

                    {/* Project Details */}
                    <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                          {project.projectTitle}
                        </h3>
                        <p className="font-paragraph text-lg text-white/70 mb-8 leading-relaxed">
                          {project.technicalDescription}
                        </p>
                        
                        {project.technologiesUsed && (
                          <div className="mb-8">
                            <span className="block text-xs font-medium uppercase tracking-wider text-white/40 mb-3">Technologies</span>
                            <div className="flex flex-wrap gap-2">
                              {project.technologiesUsed.split(',').map((tech, i) => (
                                <span key={i} className="px-3 py-1 border border-white/20 rounded-full text-sm text-white/80">
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-4">
                          {(project.projectTitle?.toLowerCase().includes('social shield') || project.projectTitle?.toLowerCase().includes('cybersecurity')) && (
                            <Button
                              asChild
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white hover:text-dark-text h-12 px-6 rounded-none transition-all duration-300"
                            >
                              <a
                                href="https://social-shield-29c92.web.app"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" /> View Website
                              </a>
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION (Timeline) --- */}
        <section id="experience" className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <SectionLabel className="block mb-4">04 — Career</SectionLabel>
                <LargeHeading>Experience</LargeHeading>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="relative border-l border-medium-gray/30 ml-3 md:ml-0 space-y-16 pl-8 md:pl-12 py-4">
                {isLoading ? (
                  <div>Loading experience...</div>
                ) : (
                  experience.map((exp, index) => (
                    <motion.div
                      key={exp._id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Dot */}
                      <span className="absolute -left-[41px] md:-left-[57px] top-2 w-4 h-4 rounded-full bg-light-gray-background border-2 border-dark-text" />
                      
                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                        <h3 className="font-heading text-2xl font-bold text-dark-text">
                          {exp.roleTitle}
                        </h3>
                        <span className="font-paragraph text-sm font-medium text-link-accent">
                          {exp.startDate && (
                            <>
                              {new Date(exp.startDate).getFullYear()} – {exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                            </>
                          )}
                        </span>
                      </div>
                      
                      <h4 className="font-heading text-lg text-medium-gray mb-4">
                        {exp.organizationName}
                      </h4>
                      
                      {exp.description && (
                        <p className="font-paragraph text-base text-dark-text/80 leading-relaxed max-w-2xl">
                          {exp.description}
                        </p>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* --- CERTIFICATIONS SECTION --- */}
        <section id="certifications" className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-32 bg-white">
          <div className="mb-16">
            <SectionLabel className="block mb-4">05 — Credentials</SectionLabel>
            <LargeHeading>Certifications</LargeHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              <div>Loading certifications...</div>
            ) : (
              certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group p-8 border border-light-gray-background hover:border-dark-text/20 bg-light-gray-background/30 hover:bg-white transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white rounded-sm shadow-sm">
                      <Shield className="w-6 h-6 text-dark-text" />
                    </div>
                    {cert.dateIssued && (
                      <span className="text-sm text-medium-gray font-mono">
                        {new Date(cert.dateIssued).getFullYear()}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold text-dark-text mb-2 group-hover:text-link-accent transition-colors">
                    {cert.certificationName}
                  </h3>
                  <p className="font-paragraph text-medium-gray mb-4">
                    {cert.issuingOrganization}
                  </p>
                  
                  {cert.details && (
                    <p className="font-paragraph text-sm text-dark-text/70 mb-6 line-clamp-2">
                      {cert.details}
                    </p>
                  )}

                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-dark-text hover:text-link-accent transition-colors"
                    >
                      View Credential <ChevronRight className="ml-1 w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="w-full bg-dark-text text-white py-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-[100rem] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel className="block mb-8 text-white/60">06 — Get in Touch</SectionLabel>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-12 tracking-tight">
                Let's work together.
              </h2>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
                <a 
                  href="mailto:bereket.c.m@gmail.com"
                  className="group flex items-center gap-4 text-2xl md:text-3xl hover:text-link-accent transition-colors"
                >
                  <Mail className="w-8 h-8" />
                  <span className="border-b border-white/30 group-hover:border-link-accent pb-1">bereket.c.m@gmail.com</span>
                </a>
              </div>

              <div className="flex justify-center gap-6">
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white hover:text-dark-text h-12 px-8 rounded-full"
                >
                  <a href="https://github.com/Becky-Chala" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" /> GitHub
                  </a>
                </Button>
                <div className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white/80">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Based in Ethiopia
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}