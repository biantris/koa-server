import { Context, Request } from 'koa';

import { GraphQLContext } from './graphql/types';
import { getDataloaders } from './modules/loader/loaderRegister';

type ContextVars = {
  //user?: IUser | null;
  req?: Request;
  koaContext: Context;
  //setCookie: (cookieName: string, token: string) => void;
};

export const getContext = async (ctx: ContextVars) => {
  const dataloaders = getDataloaders();

  return {
    req: ctx.req,
    dataloaders,
    //user: ctx.user,
    koaContext: ctx.koaContext,
    //setCookie: ctx.setCookie,
  } as GraphQLContext;
};
