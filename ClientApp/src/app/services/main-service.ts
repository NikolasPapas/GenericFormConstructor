import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class MainService {

	private formStructureItem = new Subject<string | null>();

	changeFormStructureItem(newFormStructureItem?: string | null) {
		if (newFormStructureItem != null)
			this.formStructureItem.next(newFormStructureItem);
		else
			this.formStructureItem.next(null);
	}

	onChangeFormStructureItem(): Observable<string | null> {
		return this.formStructureItem.asObservable();
	}
}