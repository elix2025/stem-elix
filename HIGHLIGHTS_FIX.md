# Highlights Update Fix - Complete Solution

## Problem
Highlights (and other array fields like prerequisites, tags, learningOutcomes) were not being saved when editing existing courses.

## Root Cause Analysis

The issue involved a mismatch in how array data was being transmitted between frontend and backend:

### Issue 1: Frontend Data Serialization (EditCourse.js)
**Problem:** When using FormData, array fields were being appended as multiple key-value pairs:
```javascript
// WRONG - creates multiple keys, not an array
formData.append("highlights", "highlight1");
formData.append("highlights", "highlight2");
```

**Impact:** Backend couldn't properly parse these as arrays, especially when mixed with file uploads.

### Issue 2: Content-Type Header Mismatch (AdminContext.js)
**Problem:** `editCourse` always sent `Content-Type: multipart/form-data` even when sending JSON:
```javascript
// WRONG - always multipart/form-data
headers: { "Content-Type": "multipart/form-data" }
```

**Impact:** When no file was uploaded, JSON arrays weren't properly recognized by axios.

### Issue 3: Backend Array Parsing (courseController.js)
**Problem:** Backend only checked `Array.isArray()` but received JSON strings from FormData:
```javascript
// WRONG - fails when highlights is a JSON string
if (Array.isArray(highlights)) { 
  updateData.highlights = highlights.filter(h => h.trim());
}
```

**Impact:** Arrays coming as stringified JSON were rejected.

---

## Solution Implemented

### 1. Frontend: Smart FormData Serialization (EditCourse.js)

```javascript
const handleSubmit = async (e) => {
  // ... preparation code ...

  // Prepare data with filtered arrays
  const dataToSend = {};
  Object.keys(formData).forEach((key) => {
    if (Array.isArray(formData[key])) {
      dataToSend[key] = formData[key].filter((item) => item.trim());
    } else {
      dataToSend[key] = formData[key];
    }
  });

  // If file upload: use FormData with JSON stringified arrays
  if (files.CourseThumbnail) {
    const courseData = new FormData();
    Object.keys(dataToSend).forEach((key) => {
      if (Array.isArray(dataToSend[key])) {
        // Stringify arrays for FormData transmission
        courseData.append(key, JSON.stringify(dataToSend[key]));
      } else {
        courseData.append(key, dataToSend[key]);
      }
    });
    courseData.append("CourseThumbnail", files.CourseThumbnail);
    const result = await editCourse(courseId, courseData);
  } 
  // If no file: send pure JSON
  else {
    const result = await editCourse(courseId, dataToSend);
  }
};
```

**Benefits:**
- ✅ Arrays properly serialized as JSON strings for FormData
- ✅ Pure JSON sent when no file upload needed
- ✅ No empty strings in arrays

### 2. API Layer: Dynamic Content-Type (AdminContext.js)

```javascript
const editCourse = async (courseId, courseData) => {
  try {
    const adminToken = localStorage.getItem("adminToken");
    const isFormData = courseData instanceof FormData;
    
    const headers = {
      Authorization: `Bearer ${adminToken}`,
    };

    // Only set Content-Type to JSON when not FormData
    // axios handles FormData Content-Type automatically
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const res = await axios.put(
      `${Admin_Base_URL}/courses/${courseId}`,
      courseData,
      { headers }
    );
    // ... response handling ...
  }
  // ... error handling ...
};
```

**Benefits:**
- ✅ Correctly identifies FormData vs JSON
- ✅ Sets appropriate Content-Type header
- ✅ Axios handles FormData boundary automatically

### 3. Backend: Robust Array Parsing (courseController.js)

```javascript
// Helper function to parse array fields
const parseArray = (field) => {
  if (!field) return [];
  if (typeof field === 'string') {
    try {
      // Try to parse as JSON (from FormData)
      return JSON.parse(field);
    } catch (e) {
      // Single string value, wrap in array
      return [field];
    }
  }
  // Already an array (from JSON request)
  return Array.isArray(field) ? field : [];
};

// Apply to all array fields
if (highlights !== undefined) {
  const highlightArray = parseArray(highlights);
  updateData.highlights = highlightArray.filter((h) => h?.trim?.());
}

if (prerequisites !== undefined) {
  const prereqArray = parseArray(prerequisites);
  updateData.prerequisites = prereqArray.filter((p) => p?.trim?.());
}

if (learningOutcomes !== undefined) {
  const outcomeArray = parseArray(learningOutcomes);
  updateData.learningOutcomes = outcomeArray.filter((l) => l?.trim?.());
}

if (tags !== undefined) {
  const tagArray = parseArray(tags);
  updateData.tags = tagArray.filter((tag) => tag?.trim?.());
}
```

**Benefits:**
- ✅ Handles JSON strings from FormData
- ✅ Handles actual arrays from JSON requests
- ✅ Handles single string values gracefully
- ✅ Filters empty strings from all arrays
- ✅ Safe undefined checks

### 4. Boolean Field Fix (courseController.js)

```javascript
if (featured !== undefined) {
  // Handle boolean from FormData (comes as string) or JSON (actual boolean)
  updateData.featured = featured === "true" || featured === true;
}

if (hasCertificate !== undefined) {
  // Same pattern for other booleans
  updateData.hasCertificate = hasCertificate === "true" || hasCertificate === true;
}
```

**Benefits:**
- ✅ FormData strings ("true"/"false") properly converted
- ✅ Native booleans still work
- ✅ Consistent boolean handling

---

## Files Modified

1. **admin/src/components/EditCourse.js**
   - Updated `handleSubmit` function
   - Proper FormData vs JSON decision logic
   - Array stringification for FormData

2. **admin/src/context/AdminContext.js**
   - Updated `editCourse` function
   - Dynamic Content-Type header handling
   - FormData vs JSON detection

3. **backend/controllers/courseController.js**
   - Added `parseArray` helper function
   - Updated array field parsing for all fields
   - Fixed boolean field parsing
   - Applied to: highlights, prerequisites, learningOutcomes, tags

---

## Testing the Fix

### Scenario 1: Edit with Highlights (No File Upload)
1. Navigate to Edit Course
2. Add/modify highlights
3. Submit without changing thumbnail
4. ✅ Should send pure JSON with array
5. ✅ Backend should parse array correctly
6. ✅ Highlights should save

### Scenario 2: Edit with Highlights + New Thumbnail
1. Navigate to Edit Course
2. Add/modify highlights
3. Upload new thumbnail
4. Submit form
5. ✅ Should send FormData with stringified arrays
6. ✅ Backend should parse stringified array
7. ✅ Both file and highlights should save

### Scenario 3: Clear Highlights
1. Edit existing course with highlights
2. Remove all highlight fields
3. Submit
4. ✅ Empty strings filtered out
5. ✅ highlights array should be empty []
6. ✅ Should save successfully

### Scenario 4: Multiple Array Fields
1. Edit course with all array fields (highlights, prerequisites, tags, learningOutcomes)
2. Modify each one
3. Submit
4. ✅ All arrays should be parsed correctly
5. ✅ All should save independently

---

## Data Flow After Fix

### JSON Flow (No File):
```
EditCourse Component
  ↓ (filtered data object)
AdminContext.editCourse()
  ↓ (Content-Type: application/json)
Backend courseController
  ↓ (JSON parsed, arrays recognized)
parseArray() returns actual array
  ↓
updateData.highlights = filtered array
  ↓
Course.findByIdAndUpdate() saves
  ↓
Success response
```

### FormData Flow (With File):
```
EditCourse Component
  ↓ (FormData with stringified arrays)
AdminContext.editCourse()
  ↓ (Content-Type: multipart/form-data)
Backend courseController
  ↓ (req.body parsed, JSON strings detected)
parseArray() parses JSON string → array
  ↓
updateData.highlights = filtered array
  ↓
Course.findByIdAndUpdate() saves
  ↓
Success response
```

---

## Validation & Safe Handles

- ✅ Undefined field checks (`if (field !== undefined)`)
- ✅ Empty array handling (returns `[]`)
- ✅ JSON parse error catching (fallback to string)
- ✅ Null/undefined safety (`field?.trim?.()`)
- ✅ Boolean string conversion (`=== "true"`)
- ✅ Filter empty strings from all arrays

---

## Summary

The fix implements a **three-layer solution**:

1. **Frontend**: Properly serialize arrays as JSON strings in FormData
2. **API Layer**: Detect FormData vs JSON and set correct headers
3. **Backend**: Parse both FormData JSON strings and native JSON arrays

This ensures that highlights and other array fields work correctly whether sending with or without file uploads, making the course editing functionality fully reliable.
