import { DomElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Employeemodal } from './employee-dashboard modal';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!: FormGroup;
  employeeModalobject: Employeemodal = new Employeemodal();
  employeeData !: any;
  showAdd: boolean= true;
  showUpdate!:boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmployee();
  }
  postEmployeeDetails() {
    this.employeeModalobject.firstName = this.formValue.value.firstName;
    this.employeeModalobject.lastName = this.formValue.value.lastName;
    this.employeeModalobject.mobile = this.formValue.value.mobile;
    this.employeeModalobject.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModalobject).subscribe(res => {
      console.log(res);
      alert("Employee added")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.getAllEmployee();
      this.formValue.reset();
    },
      err =>
        alert("something went wrong")
    )
  }
  getAllEmployee() {
    this.api.getEmployee().subscribe(res => this.employeeData = res);
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe(res => {
      console.log(res);
      alert("Employee removed")
      this.getAllEmployee();
    },
    err =>
        alert("something went wrong")
    )
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModalobject.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModalobject.firstName = this.formValue.value.firstName;
    this.employeeModalobject.lastName = this.formValue.value.lastName;
    this.employeeModalobject.mobile = this.formValue.value.mobile;
    this.employeeModalobject.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModalobject.id,this.employeeModalobject).subscribe(res => {
      console.log(res);
      alert("Employee updates ")
      this.getAllEmployee();
    },
    err =>
        alert("something went wrong")
    )
  }
  
}
