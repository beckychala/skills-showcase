/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: certifications
 * Interface for Certifications
 */
export interface Certifications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  certificationName?: string;
  /** @wixFieldType text */
  issuingOrganization?: string;
  /** @wixFieldType text */
  details?: string;
  /** @wixFieldType date */
  dateIssued?: Date | string;
  /** @wixFieldType url */
  credentialUrl?: string;
}


/**
 * Collection ID: experience
 * Interface for Experience
 */
export interface Experience {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  roleTitle?: string;
  /** @wixFieldType text */
  organizationName?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType date */
  endDate?: Date | string;
  /** @wixFieldType boolean */
  isCurrent?: boolean;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  technicalDescription?: string;
  /** @wixFieldType text */
  technologiesUsed?: string;
  /** @wixFieldType url */
  liveDemoUrl?: string;
  /** @wixFieldType url */
  repositoryUrl?: string;
}


/**
 * Collection ID: skills
 * Interface for Skills
 */
export interface Skills {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  categoryName?: string;
  /** @wixFieldType text */
  skillsList?: string;
  /** @wixFieldType number */
  order?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  categoryIcon?: string;
  /** @wixFieldType text */
  shortDescription?: string;
}
