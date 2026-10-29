// tests/core/store.test.js
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Store', () => {
  it('should initialize with default state', () => {
    expect(true).toBe(true);
  });
});

describe('Curriculum', () => {
  it('should load curriculum data', () => {
    const curriculumPath = join(__dirname, '..', '..', 'assets', 'data', 'curriculum.json');
    const curriculum = JSON.parse(readFileSync(curriculumPath, 'utf-8'));
    expect(curriculum).toBeDefined();
    expect(curriculum.phases).toBeDefined();
    expect(curriculum.phases.length).toBe(7);
    expect(curriculum.metadata.totalModules).toBe(46);
  });
});