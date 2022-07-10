


import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from "../base/base.component";
import { ItemDataModel } from "../item-component/Item-data-model";
import { ListingDataModel } from "./listing-data-model";
import { ListingEditorModel } from "./listing.model";


@Component({
	selector: 'app-listing',
	templateUrl: 'listing.component.html',
	styleUrls: ['listing.component.scss'],
})
export class ListingComponent extends BaseComponent implements OnInit {

	@Input() itemData: ListingDataModel | null = null;
	@Input() listingForm: FormGroup = new ListingEditorModel().fromModel(null).buildForm();
	@Input() form: FormGroup = new FormBuilder().group({});
	public columnSpan: number = 1

	constructor() {
		super();
	}

	ngOnInit() {
		this.listingForm = new ListingEditorModel().fromModel(this.itemData).buildForm();
		this.columnSpan = Math.round(10 / this.listingForm.get('columns')?.value);
	}

	getOrderedList(): FormGroup[] {
		return (this.listingForm.get('controls')?.value?.controls as FormGroup[]).sort((a, b) =>
			compare(a.get('order')?.value, b.get('order')?.value, true));
	}

	getOrderedItemDataList(): ItemDataModel[] {
		return (this.itemData?.controls as ItemDataModel[]).sort((a, b) => {
			return compare(a.order, b.order, true);
		});
	}
}

function compare(a: number | null, b: number | null, isAsc: boolean) {
	let ap = 1;
	let bp = 1;
	if (a != null) ap = a;
	if (b != null) bp = b;
	return (ap < bp ? -1 : 1) * (isAsc ? 1 : -1);
}