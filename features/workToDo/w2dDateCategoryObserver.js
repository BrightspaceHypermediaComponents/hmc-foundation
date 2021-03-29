import { Observable } from '@brightspace-hmc/foundation-engine/state/observable/Observable.js';

export class W2DSirenClasses extends Observable {
	get classes() {
		return this._observers.value;
	}

	set classes(value) {
		if (this.classes !== value) {
			this._observers.setProperty(value);
		}
	}

	setSirenEntity(sirenEntity) {
		this.classes = sirenEntity && sirenEntity['class'];
	}
}
