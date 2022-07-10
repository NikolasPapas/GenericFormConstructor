import { FormArray } from '@angular/forms';
import { elementAt, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { BaseComponent } from '../base/base.component';
import { BaseEditorModel } from './base.model';
import { BaseDataModel } from './base-data-model';
import { CashingService } from 'src/app/services/cashing-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {

  private mainService: MainService;
  private cashingService: CashingService;
  public homeData: BaseDataModel | null = null;
  public homeForm: FormGroup = new BaseEditorModel().fromModel(null).buildForm();
  public columnSpan: number = 1
  public selectedResult: number = -1
  public initialFormStructure: string = "{\"title\":\"User registration\",\"columns\":1,\"groups\":[{\"title\":\"main feilds\",\"columns\":3,\"controls\":[{\"title\":\"Name\",\"name\":\"firstName\",\"type\":\"text\",\"order\":1,\"required\":true},{\"title\":\"Surname\",\"name\":\"surname\",\"type\":\"text\",\"order\":2,\"required\":true},{\"title\":\"Nationality\",\"name\":\"nationality\",\"type\":\"combobox\",\"order\":3,\"data\":[{\"1\":\"Greek\",\"2\":\"Italian\",\"3\":\"French\"}],\"defaultValue\":\"1\"},{\"title\":\"Address\",\"name\":\"address\",\"type\":\"text\",\"span\":3,\"order\":4},{\"title\":\"Interview date\",\"name\":\"interviewDate\",\"type\":\"date\",\"order\":4}]}]}"
  public resultForm: string = "";
  form: FormGroup = new FormBuilder().group({});

  constructor(mainService: MainService, cashingService: CashingService) {
    super();
    this.mainService = mainService;
    this.cashingService = cashingService;
  }

  ngOnInit(): void {
    this.setFormModel(this.homeData);
    this.mainService.onChangeFormStructureItem().pipe(takeUntil(this._destroyed))
      .subscribe(data => {
        if (data != null) {
          this.homeData = JSON.parse(data);
          this.setFormModel(this.homeData);
          setTimeout(() => {
            this.homeForm = new BaseEditorModel().fromModel(this.homeData).buildForm();
          });
        };
      });
    this.mainService.changeFormStructureItem(this.initialFormStructure)
    this.columnSpan = Math.round(10 / this.homeForm.get('columns')?.value);
  }

  private setFormModel(homeData: BaseDataModel | null) {
    this.form = new FormBuilder().group({});
    let formArray: FormArray = new FormArray([]);
    homeData?.groups.forEach(group => {
      let formGroup = new FormBuilder().group({});
      group.controls.forEach(control => {
        if (control.required === true)
          formGroup.addControl(control.name, new FormControl(control.defaultValue, Validators.required));
        else
          formGroup.addControl(control.name, new FormControl(control.defaultValue));
      });
      formArray.push(formGroup);
    });
    this.form.addControl('data', formArray);
  }

  public selectNewJson(x: any) {
    if (this.initialFormStructure == "")
      this.mainService.changeFormStructureItem(null);
    else
      this.mainService.changeFormStructureItem(this.initialFormStructure);
  }

  public getResult(x: any) {
    if (this.form.valid && this.form.enabled) {
      this.resultForm = JSON.stringify(this.form.getRawValue());
      this.cashingService.addResults(this.resultForm);
    }
    else
      this.resultForm = "";
    return;
  }

  public getArray(): number[] {
    return this.cashingService.getResults();
  }

  public selectOldJson(x: any) {
    if (this.selectedResult != -1)
      this.resultForm = this.cashingService.getIndexedResults(this.selectedResult);
  }
}
