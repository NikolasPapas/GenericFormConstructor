import { Injectable } from "@angular/core";



@Injectable()
export class CashingService {

	private results: resultItem[] = [];

	public addResults(res: string): void {
		let item: resultItem = {
			index: this.getLastResultIndex() + 1,
			data: res
		};
		this.results.push(item);
	}

	private getLastResultIndex(): number {
		if(this.results.length>0){
			return this.results.sort((a, b) => {
				return compare(a.index, b.index, false);
			})[0].index;
		}
		return -1;
	}

	public getResults(): number[] {
		return this.results.map(x => x.index);
	}

	public getIndexedResults(res: number): string {
		return this.results[res].data;
	}

}

export interface resultItem {
	index: number;
	data: string;
}

function compare(a: number | null, b: number | null, isAsc: boolean) {
	let ap = 1;
	let bp = 1;
	if (a != null) ap = a;
	if (b != null) bp = b;
	return (ap < bp ? -1 : 1) * (isAsc ? 1 : -1);
}
