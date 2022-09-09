
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json'
    let url = options.url;
    const formData = new FormData();
   
    if(options.data) {
        if(options.method === 'GET') {
              url += '?' + Object.entries(options.data).map(
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            ).join('&');
        } else {Object.entries(options.data).forEach(element => formData.append(...element));
            }
    }
    try {
        xhr.open(options.method, url );
                if(options.method === 'GET') {
                    xhr.send();
                } else {xhr.send(formData);}
      }
    catch (e) {
        callback(e);
      }
   
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            let err = null;
            let resp = null;
      
            if (xhr.status != 200) { 
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); 
            } else { 
                const r = xhr.response;
                if(r && r.success) {        
                    resp = r;
                }else {
                    err = r;
                } 
              }
            options.callback(err, resp)
        };
    }
};
