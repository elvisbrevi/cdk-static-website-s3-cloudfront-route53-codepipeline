import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Props {
  url     : string;
  method  : string;
  data?   : any;
  render  : (
    params  : { 
      response  : AxiosResponse | null, 
      error     : Error | null, 
      loading   : boolean, 
      callApi   : () => Promise<void> 
    }
  ) => JSX.Element;
}

function ApiCall({ url, method, data, render }: Props) {

  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const callApi = async () => {

    setLoading(true);
    
    try {

        const config = {
          method: method,
          maxBodyLength: Infinity,
          url: url,
          headers: { 
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(data)
        };

        const response = await axios(config);
        setResponse(response);
    } catch (error: any) {
        setError(error);
    } finally {
        setLoading(false);
    }
  };

  return render({ response, error, loading, callApi });
}

export default ApiCall;