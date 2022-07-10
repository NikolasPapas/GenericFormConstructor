import { ItemDataModel } from "../item-component/Item-data-model";

export interface ListingDataModel {
	//"title": "group title",
	title: string;

	// "columns": "how many controls per line",
	columns: number;

	// "controls": []
	controls: ItemDataModel[];
}
