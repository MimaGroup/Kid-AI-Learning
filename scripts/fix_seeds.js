import { readFileSync, writeFileSync } from 'fs';

// Fix script 029 - column header already correct, but VALUES still have slug field
let sql029 = readFileSync('/scripts/029_seed_lessons_coding.sql', 'utf8');

// Remove the slug value line from each INSERT block
// Pattern: after the title line, there's a slug line like '  'slug-value','
sql029 = sql029.replace(/SELECT c\.id, (\d+), (\d+),\n  '([^']+)',\n  '[a-z0-9-]+',\n  'text',/g, 
  "SELECT c.id, $1, $2,\n  '$3',\n  'text',");

// Rename 'activities' references in VALUES to key_concepts format isn't needed since header is already fixed

writeFileSync('/scripts/029_seed_lessons_coding.sql', sql029);
console.log('[v0] Fixed 029 - removed slug values from INSERT statements');

// Fix script 030 - both header and values need fixing
let sql030 = readFileSync('/scripts/030_seed_lessons_art.sql', 'utf8');

// Fix column headers
sql030 = sql030.replace(
  /INSERT INTO course_lessons \(course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities\)/g,
  'INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content_type, content, duration_minutes, key_concepts)'
);

// Remove slug values from each INSERT
sql030 = sql030.replace(/SELECT c\.id, (\d+), (\d+),\n  '([^']+)',\n  '[a-z0-9-]+',\n  'text',/g,
  "SELECT c.id, $1, $2,\n  '$3',\n  'text',");

writeFileSync('/scripts/030_seed_lessons_art.sql', sql030);
console.log('[v0] Fixed 030 - fixed column headers and removed slug values');

// Verify
const verify029 = readFileSync('/scripts/029_seed_lessons_coding.sql', 'utf8');
const verify030 = readFileSync('/scripts/030_seed_lessons_art.sql', 'utf8');

const slugCount029 = (verify029.match(/slug/g) || []).length;
const slugCount030 = (verify030.match(/slug/g) || []).length;
console.log(`[v0] 029 remaining 'slug' mentions: ${slugCount029} (should only be in WHERE clause)`);
console.log(`[v0] 030 remaining 'slug' mentions: ${slugCount030} (should only be in WHERE clause)`);

// Count INSERT statements
const inserts029 = (verify029.match(/INSERT INTO/g) || []).length;
const inserts030 = (verify030.match(/INSERT INTO/g) || []).length;
console.log(`[v0] 029 has ${inserts029} INSERT statements`);
console.log(`[v0] 030 has ${inserts030} INSERT statements`);
