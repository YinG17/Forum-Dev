import { Injectable } from '@angular/core';
import { ERROR } from './angular-wordpress-api.interface';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor() {}

  /**
   * ===============
   * error handling
   * ===============
   */

  public handleError(error: any) {
    console.log(error);
    const err = error.error;
    const errCode = err.code;
    const errData = err.data;
    const errMsg = err.message;
    const errStatus = error.status;

    this.message(errMsg);
  }

  private message(message: string) {
    return alert(message);
  }
}

// // internal server errors - GET
// switch (errStatus) {
//   // Get - Internal Server Error
//   case 500: {
//     switch (errCode) {
//       // Auth Errors
//       case ERROR.INVALID_USER || ERROR.EMPTY_USER:
//         {
//           this.message(`Invalid Username or Password`);
//         }
//         break;
//       case ERROR.EMPTY_PASS: {
//         this.message(`Password is empty`);
//       }
//     }
//     break;
//   }
//   // Post - Bad Request
//   case 400:
//     {
//       // code 400 will return params, if it is required and missing
//       const errParam = errData.params;
//       switch (errCode) {
//         // Register Error
//         case ERROR.MISSING_PARAM:
//           {
//             let param = '';
//             for (const data of errParam) {
//               param += data + ', ';
//             }
//             this.message(`${param} is required`);
//           }
//           break;
//         // Post error, If both post title and content is empty
//         case ERROR.EMPTY_CONTENT:
//           {
//             this.message(
//               `You cannot submit an empty post. please supply either post title or content`
//             );
//           }
//           break;
//         // error when trying to submit an empty comment
//         case ERROR.COMMENT_CONTENT_INVALID: {
//           this.message(`You cannot submit an empty comment`);
//         }
//       }
//     }
//     break;
//   // Post - Conflict
//   case 409:
//     {
//       this.message(`${errMsg}`);
//     }
//     break;
//   // catch unidentified errors, will be removed after errors are completely identified
//   default: {
//     console.log(error);
//     this.message(
//       `something went wrong!? n\ Error Status: ${errStatus}, Error Code: ${errCode}`
//     );
//   }
// }
