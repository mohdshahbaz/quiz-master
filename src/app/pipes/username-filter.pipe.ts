import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernameFilter'
})
export class UsernameFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;


    args = args.toLowerCase();

    return value.filter(function(data){
        return JSON.stringify(data.username).toLowerCase().includes(args);
    });
  }

}
