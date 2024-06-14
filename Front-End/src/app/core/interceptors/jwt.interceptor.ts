import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  // Get the token from the local storage
  const token = localStorage.getItem('UserToken');
  // Clone the request and add the token to the headers
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  // Pass the cloned request to the next handler
  return next(newReq);
};
