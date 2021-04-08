import './custom/d2l-activity-description-specialization.js';
import './custom/d2l-activity-description-content.js';
import './custom/d2l-activity-description-checklist.js';
import './custom/d2l-activity-description-assignment.js';
import './custom/d2l-activity-description-discussion.js';
import './custom/d2l-activity-description-quiz.js';
import './custom/d2l-activity-description-course.js';
import { DescriptionMixin } from './custom/DescriptionMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

class ActivityDescription extends DescriptionMixin {}

customHypermediaElement('d2l-activity-description', ActivityDescription);
