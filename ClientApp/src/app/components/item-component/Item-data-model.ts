export interface ItemDataModel {
	// "title": "control title",
	title:string;

	// "name": "control name",
	name:string;

	// "type": "control can be: text | date | combobox,
	//in case of date we need a calendar to select the date and we need to display the date in the format '23 May 2022',
	// in case of combo the options will come from the data field below and the default value will be the defaultValue property below",
	type:ItemDataModelType

	// "span?": "the control can occupy more than one columns in case we have long fields such as address, if not set then default will be 1",
	span:number;

	// "order?": "define the position of the control in the form the layout will be from top left to bottom right (Z layout)",
	order:number|null;

	// "data?": "available options in case of control of type combobox it will be a key value dataset, the system will post the key",
	data:object|null;

	// "required?": "we will have a dummy post action, if the control is required then the action will stop and the system will notify the user (visually)",
	required:boolean|null;

	// "defaultValue?": "in case of combobox this will be the default value"
	defaultValue:string|null;
}

export enum ItemDataModelType {
	text = 'text',
	date = 'date',
	combobox='combobox',
}
