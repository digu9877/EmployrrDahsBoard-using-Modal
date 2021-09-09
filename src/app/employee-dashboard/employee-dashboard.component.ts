import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!:FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd! : boolean;
  showUpdate!: boolean;


  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this. formbuilder.group({

      Name: [''],

      Email: [''],

      MobileNo : [''],

      Salary: [''],

      })

      this.getAllEmployee();
  }

  postEmployeeDetails(){

    this.employeeModelObj.Name = this.formValue.value.Name;

    this.employeeModelObj.Email = this.formValue.value.Email;

    this.employeeModelObj.MobileNo = this.formValue.value.MobileNo;

    this.employeeModelObj.Salary = this.formValue.value.Salary;

    this.api.postmployee(this.employeeModelObj).subscribe(res => {
      console.log(res);
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=> {
      alert("Something went wrong")
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(data => {
      this.employeeData = data;
    })
  }

  deleteEmployee(employee : any){
    this.api.deleteEmployee(employee.id).subscribe(res =>{
      alert("User Deleted Successfully");
      this.getAllEmployee();
    })
  }

  onEdit(employee : any){
    this.showAdd= false;
    this.showUpdate= true;
    this.employeeModelObj.id= employee.id;
    this.formValue.controls['Name'].setValue(employee.Name);
    this.formValue.controls['Email'].setValue(employee.Email);
    this.formValue.controls['MobileNo'].setValue(employee.MobileNo);
    this.formValue.controls['Salary'].setValue(employee.Salary);

  }
  updateEmployeeDetails(){
    this.employeeModelObj.Name = this.formValue.value.Name;

    this.employeeModelObj.Email = this.formValue.value.Email;

    this.employeeModelObj.MobileNo = this.formValue.value.MobileNo;

    this.employeeModelObj.Salary = this.formValue.value.Salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(res =>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })

  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd= true;
    this.showUpdate= false;
  }




}
