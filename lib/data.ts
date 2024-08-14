export const allRoles = {
  USER: true,
  STUDENT_COORDINATOR: true,
  FACULTY_COORDINATOR: true,
  MANAGEMENT: true,
  ADMIN: true,
  DESK: true,
} as const;

export type AllRoles = keyof typeof allRoles;

export const allDepartments = {
  NA: 'Other',
  ai: 'Artificial Intelligence & DS',
  ec: 'Electronics and Communication',
  cs: 'Computer Science',
  cy: 'Cyber Security',
  ecs: 'Electronics and Computer Science',
  ee: 'Electrical Engineering',
  ce: 'Civil Engineering',
  me: 'Mechanical Engineering',
  mca: 'Master of Computer Applications',
  mba: 'Master of Business Administration',
  es: 'Electronics and Computer Science',
  ei: 'Electronic & Instrumentation',
} as const; // + "NA" for other users/managements

export type AllDepartments = keyof typeof allDepartments;

export const allYears = {
  NA: true,
  '2021': true,
  '2022': true,
  '2023': true,
  '2024': true,
  '2025': true,
  '2026': true,
  '2027': true,
} as const; // + "NA" for other users/managements

export type AllYears = keyof typeof allYears;

export type College = 'SJCET' | 'NA' | (string & {})