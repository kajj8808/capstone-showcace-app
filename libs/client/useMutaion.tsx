import { useState } from "react";

interface UseMutaionState {
  loading: boolean;
  data?: object;
  error?: object;
}

type UseMutaionResult = [(data: any) => void, UseMutaionState];

/**
 * 어떤 url을 받아 mutate 할지 결정합니다.
 * 데이터를 받아 데이터 베이스의상태를 mutate 하는 hook 이고
 * Array 를 리턴하며 첫번쨰로 FormData 를받아 Data 를 만드는 함수,
 * 두번째로는 함수를 이용해 만든 데이터,로딩,에러 오브젝트 를 반환합니다.
 */
export default function useMutation(url: string): UseMutaionResult {
  /* 
  const [state , setState] = useState({
    loading : false,
    data : undifined,
    error : undifined
  })
   */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  /** data is FormData ex) userName , Name */
  function mutation(data: any) {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().catch(() => {}))
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }
  return [mutation, { loading, data, error }];
}
