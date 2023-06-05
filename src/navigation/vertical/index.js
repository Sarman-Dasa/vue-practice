import store from "@/store";

let userRole = store.state.app.userData.role;
console.log("Role::",userRole);
let menuItem = [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
  }
]

let hrMenuItem = {
  title: 'Second Page',
  route: 'second-page',
  icon: 'FileIcon',
}

let employeeItem = {
  title: 'Employee List',
  route: 'employeeList',
  icon: 'UserIcon'
}

if(userRole == 'superAdmin') {
  menuItem.push(hrMenuItem);
  menuItem.push(employeeItem);
}

else if(userRole == 'humanResource') {
  menuItem.push(hrMenuItem);
}
if(userRole == 'Employee') {
  menuItem.push(employeeItem);
}
export default menuItem;