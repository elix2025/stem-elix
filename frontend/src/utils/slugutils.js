// Utility functions for URL slug management

/**
 * Converts a string to a URL-friendly slug
 * @param {string} text - The text to convert to slug
 * @returns {string} URL-friendly slug
 */
export const createSlug = (text) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

/**
 * Converts a slug back to a readable title (for display purposes)
 * @param {string} slug - The slug to convert back
 * @returns {string} Readable title
 */
export const slugToTitle = (slug) => {
  if (!slug) return "";

  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Finds a course by its slug from a list of courses
 * @param {Array} courses - Array of course objects
 * @param {string} slug - The slug to search for
 * @returns {Object|null} Course object or null if not found
 */
export const findCourseBySlug = (courses, slug) => {
  if (!courses || !slug) return null;

  return courses.find((course) => createSlug(course.title) === slug) || null;
};

/**
 * Finds a user by their username/name slug
 * @param {Array} users - Array of user objects
 * @param {string} slug - The username/name slug to search for
 * @returns {Object|null} User object or null if not found
 */
export const findUserBySlug = (users, slug) => {
  if (!users || !slug) return null;

  // First try to find by username if it exists
  let user = users.find(
    (user) => user.username && createSlug(user.username) === slug
  );

  // If not found by username, try by name
  if (!user) {
    user = users.find((user) => createSlug(user.name) === slug);
  }

  return user || null;
};

/**
 * Generates a user slug, preferring username over name over email
 * @param {Object|string} user - User object with name, username, and/or email, or a string
 * @returns {string} User slug
 */
export const createUserSlug = (user) => {
  if (!user) return "";

  // Handle both string input and object input
  let displayName;

  if (typeof user === "string") {
    displayName = user;
  } else if (typeof user === "object") {
    // Prefer username > name > email for URL
    displayName = user.username || user.name || user.email;
  }

  if (!displayName) {
    console.warn("createUserSlug: No valid field found for user slug", user);
    return "";
  }

  // If using email, take the part before @ symbol
  const slugText = displayName.includes("@")
    ? displayName.split("@")[0]
    : displayName;

  return createSlug(slugText);
};

/**
 * Validates if a slug is valid (contains only allowed characters)
 * @param {string} slug - The slug to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidSlug = (slug) => {
  if (!slug || typeof slug !== "string") return false;

  // Check if slug contains only lowercase letters, numbers, and hyphens
  const slugPattern = /^[a-z0-9-]+$/;
  return slugPattern.test(slug);
};
