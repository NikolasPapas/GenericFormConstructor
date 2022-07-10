
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ListingEditorModel } from "../listing-component/listing.model";
import { BaseDataModel } from './base-data-model';

export class BaseEditorModel {

	title: string = "BaseEditorModel Title";
	columns: number = 1;
	groups: ListingEditorModel[] = [new ListingEditorModel()];

	public fromModel(item: BaseDataModel | null): BaseEditorModel {
		if (item) {
			this.title = item.title;
			this.columns = item.columns;
			this.groups = item.groups.map((x) => new ListingEditorModel().fromModel(x));
		}
		return this;
	}

	public buildForm(): FormGroup {
		let formArray: FormArray = new FormArray([]);
		if (this.groups != null && this.groups.length != 0)
			this.groups.forEach(item => {
				formArray.push(item.buildForm());
			});
		return new FormBuilder().group({
			title: [this.title, [Validators.required]],
			columns: [this.columns, [Validators.required]],
			groups: [formArray, []]
		});
	}
}
