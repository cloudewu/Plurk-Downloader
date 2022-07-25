const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

type APIRequest = string;
type APISuccess = {
  success: true;
  response: string;
}
type APIFailure = {
  success: false;
  reason: any;
}
type APIResponse = APISuccess | APIFailure;

export async function callAPI(request: APIRequest) {
  const url = `${API_PATH}/markdown?q=${encodeURIComponent(request)}`;

  let response: APIResponse;
  // TODO: refactor
  try {
    const res = await fetch(url);
    if (res.ok) {
      response = {
        success: true,
        response: await res.text(),
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
