import { learningPathExisting, learningPathMissingAction, learningPathNew, learningPathUpdated } from './learningPath.js';
import { addToMock } from './fetchMock.js';
import { courseExisting } from  './course.js';

addToMock('/learning-path/new', learningPathNew);
addToMock('/learning-path/existing', learningPathExisting);
addToMock('/learning-path/missing-action', learningPathMissingAction);
addToMock('/course/existing', courseExisting);
addToMock('/description/update', learningPathUpdated);
