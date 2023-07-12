import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernameFilter'
})
export class UsernameFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //To return empty list initially
    // console.log(value,args);
    let index;
    // console.log(JSON.parse(sessionStorage.getItem('students')));
    if(JSON.parse(sessionStorage.getItem('students')) != null)
    {
      index = JSON.parse(sessionStorage.getItem('students')).findIndex(i=>i.email == args);
      // console.log(index);
    }
    if(args=='')
    {
      return [];
    }
    //End

    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter(function(data){
        //to search only by username
        // return JSON.stringify(data.username).toLowerCase().includes(args);
        
        //to search only by email or phone
        // return (JSON.stringify(data.email).toLowerCase().includes(args) || JSON.stringify(data.phone).toLowerCase().includes(args));
        
        //To return data only when exact match is there
        if(data.email==args || data.phone.toString()==args)
        {
          if(JSON.parse(sessionStorage.getItem('students')) != null)
          {
            if(index==-1)
            {
              return JSON.stringify(data).toLowerCase().includes(args);
            }
          }
          else{
            return JSON.stringify(data).toLowerCase().includes(args);
          }
        }
    });
  }

}
