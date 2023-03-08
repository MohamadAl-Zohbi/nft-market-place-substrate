import { decode } from "./jwt";

function userRouteGuard(req) {
  try {
    let token = decode(req.headers.token);
    if (typeof token != "string")
      return {
        authData: token,
        body: req.body,
        params: req.params,
        query: req.query,
        files: req.files,
      };
    return null;
  } catch (e) {
    return null;
  }
}

function adminRouteGuard(req) {
  try {
    let token = decode(req.headers.token);
    if (typeof token != "string")
      if (token.isAdmin)
        return {
          authData: token,
          body: req.body,
          params: req.params,
          query: req.query,
          files: req.files,
        };
    return null;
  } catch (e) {
    return null;
  }
}

function userInterceptorGuard(
  req: {
    headers: { token: string };
    body: any;
    params: any;
    query: any;
    files: any;
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (): void; new (): any };
    };
  },
  next: () => void
) {
  try {
    let token = decode(req.headers.token);
    console.log(token);
    if (typeof token != "string") {
      req.body.userId = token.userId;
      req.body.walletAddress = token.walletAddress;
      next();
      return;
    }
  } catch (_e) {}
  res.status(400).send();
  return;
}

function adminInterceptorGuard(
  req: {
    headers: { token: string };
    body: any;
    params: any;
    query: any;
    files: any;
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (): void; new (): any };
    };
  },
  next: () => void
) {
  try {
    let token = decode(req.headers.token);
    console.log(token);
    if (typeof token != "string")
      if (token.isAdmin) {
        req.body.userId = token.userId;
        req.body.walletAddress = token.walletAddress;
        next();
        return;
      }
  } catch (_e) {}
  res.status(400).send();
  return;
}

export {
  userRouteGuard,
  adminRouteGuard,
  adminInterceptorGuard,
  userInterceptorGuard,
};
