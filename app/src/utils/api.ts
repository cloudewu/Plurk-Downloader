export type MDInfo = {
  title: string;
  content: string;
}

type APIRequest = string;
type APISuccess = {
  success: true;
  data: MDInfo;
}
type APIFailure = {
  success: false;
  reason: any;
}
type APIResponse = APISuccess | APIFailure;

export async function callAPI(request: APIRequest) {
  const url = `/api/markdown?q=${encodeURIComponent(request)}`;

  let response: APIResponse;
  // TODO: refactor
  try {
    const res = await fetch(url);
    if (res.ok) {
      response = {
        success: true,
        data: await res.json(),
      };
    } else {
      response = {
        success: false,
        reason: await res.text(),
      };
    }
  } catch (error) {
    response = {
      success: false,
      reason: error,
    };
  }

  return response;
}

export function postAPIcall() {
  return 0;
}
