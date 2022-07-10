import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseComponent } from "../base/base.component";
import { ItemEditorModel } from "./item.model";
import { ItemDataModel, ItemDataModelType } from "./Item-data-model";

@Component({
	selector: 'app-item',
	templateUrl: 'item.component.html',
	styleUrls: ['item.component.scss'],
})
export class ItemComponent extends BaseComponent implements OnInit {

	@Input() groupTitle: string = "";
	@Input() itemData: ItemDataModel | null = null;
	@Input() form: FormGroup = new FormBuilder().group({});
	itemForm: FormGroup = new FormBuilder().group({});
	public ItemDataModelType = ItemDataModelType;

	constructor() {
		super();
	}

	ngOnInit(): void {
		this.itemForm = new ItemEditorModel().fromModel(this.itemData).buildForm();
	}

	public getArray():string[]{
		let res= this.itemForm.get('data')?.value;
		return [res[0][1] ,res[0][2],res[0][3]];
	}

	legalFormsTrackByFn(index:number, item: any) {
		return index;
	}
}

