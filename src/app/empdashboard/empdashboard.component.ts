import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { EmployeeModel } from './empdashboard.model';
import { ApiService } from '../shared/api.service'

@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.css']
})
export class EmpdashboardComponent implements OnInit {

  formValue !: FormGroup;

  employeeModelObj : EmployeeModel = new EmployeeModel();

  employeeData !: any;

  showAdd !: boolean;
  showUpdate !: boolean;
  

  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    
    this.formValue = this.formbuilder.group({

      name : [''],
      email : [''],
      mobile : ['']

    })
    this.getAllEmployee();
  }

  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong");
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(data:any){
    this.api.deleteEmployee(data.id).subscribe(res => {
      alert("Record Deleted");
      this.getAllEmployee();
    })

  }


  onEdit(data: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
  }


  updateEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
   
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(res => {
      alert("Data Updated");
      this.getAllEmployee();
 
    })
  }

//   downloadfile(){
//     let link = document.createElement("a");
//     link.download = "filename";
//     link.href = "/assets/header.png";
//     link.click();
// }

}
