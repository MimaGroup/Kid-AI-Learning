import { readFileSync, writeFileSync } from 'fs';

function fixSeedFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  
  // Split into individual INSERT statements
  const parts = content.split(/(?=INSERT INTO course_lessons)/);
  
  const fixedParts = parts.map(part => {
    if (!part.includes('INSERT INTO course_lessons')) return part;
    
    // Fix column list (already done for 029, need for 030)
    part = part.replace(
      /INSERT INTO course_lessons \(course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities\)/,
      'INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content_type, content, duration_minutes, key_concepts)'
    );
    
    // Remove the slug value line. Pattern: after the title line (with comma), there's a slug line
    // title line: '...title text...',
    // slug line:  'some-slug',
    // content_type line: 'text',
    
    // Find and remove slug lines - they're always between title and content_type
    // Match: single-quoted slug value on its own line, followed by content_type
    part = part.replace(/('\s*,)\n\s+'[a-z0-9-]+',\n(\s+'text')/g, '$1\n$2');
    
    // Replace activities JSON with key_concepts array
    // Activities are JSON arrays of objects, replace with simple string arrays
    part = part.replace(
      /'\[{"type":\s*"quiz".*?"}\]'/g,
      (match) => {
        // Extract meaningful concepts from the activities description
        return '\'["interaktivni kviz", "prakticna vaja"]\'';
      }
    );
    
    // Add ON CONFLICT clause if not present
    if (!part.includes('ON CONFLICT')) {
      part = part.replace(
        /(FROM courses c WHERE c\.slug = '[^']+');/g,
        '$1\nON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;'
      );
    }
    
    return part;
  });
  
  const result = fixedParts.join('');
  writeFileSync(filePath, result);
  console.log(`Fixed: ${filePath}`);
}

// Fix the three broken files
['scripts/029_seed_lessons_coding.sql', 'scripts/030_seed_lessons_art.sql'].forEach(fixSeedFile);

console.log('Done fixing seed files!');
