import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((key, req) => {
  console.log("\nTESTS --> ", req.user)
  return key ? req.user[key] : req.user;
});
