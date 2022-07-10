import { ListingDataModel } from "../listing-component/listing-data-model";

export interface BaseDataModel {
	//"title": "form title",
	title: string;

	// "columns": "how many groups per line",
	columns: number;

	// "groups": []
	groups: ListingDataModel[];
}

