import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemDataModel, ItemDataModelType } from './Item-data-model';

export class ItemEditorModel {

	data: ItemDataModel = {
		title: "ItemDataModel Title",
		name: "ItemDataModel Name",
		type: ItemDataModelType.text,
		span: 1,
		order: 1,
		data: null,
		required: null,
		defaultValue: null,
	};

	public fromModel(item: ItemDataModel | null): ItemEditorModel {
		if (item) this.data = item;
		return this;
	}

	public buildForm(): FormGroup {
		return new FormBuilder().group({
			title: [this.data?.title, [Validators.required]],
			name: [this.data?.name, [Validators.required]],
			type: [this.data?.type, [Validators.required]],
			span: [this.data?.span, [Validators.required]],
			order: [this.data?.order, []],
			data: [this.data?.data, []],
			required: [this.data?.required, []],
			defaultValue: [this.data?.defaultValue, []],
		});
	}
}
