import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";;
import { ItemEditorModel } from "../item-component/item.model";
import { ListingDataModel } from "./listing-data-model";

export class ListingEditorModel {

	title: string = "ListingEditorModel Title";
	columns: number = 1;
	controls: ItemEditorModel[] = [new ItemEditorModel()];

	public fromModel(item: ListingDataModel | null): ListingEditorModel {
		if (item) {
			this.title = item.title;
			this.columns = item.columns;
			this.controls = item.controls.map((x) => new ItemEditorModel().fromModel(x));
		}
		return this;
	}

	buildForm(): FormGroup {
		let formArray: FormArray = new FormArray([]);
		if (this.controls != null && this.controls.length != 0)
			this.controls.forEach(item => {
				formArray.push(item.buildForm());
			});
		return new FormBuilder().group({
			title: [this.title, [Validators.required]],
			columns: [this.columns, [Validators.required]],
			controls:[formArray,[]]
		});
	}
}