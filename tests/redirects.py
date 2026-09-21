"""Exercise the deployment redirect configuration with an actual nginx binary.
Usage: python3 tests/redirects.py /path/to/nginx
"""
from pathlib import Path
import os, pwd, socket, subprocess, sys, tempfile, time, urllib.request, urllib.error
repo=Path(__file__).resolve().parents[1]
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs): return None
with tempfile.TemporaryDirectory(prefix='gg-redirect-test-') as tmp:
    root=Path(tmp);(root/'logs').mkdir();(root/'index.html').write_text('home');(root/'guide.html').write_text('guide')
    (root/'create-creatine-gummies-review.html').write_text('review')
    with socket.socket() as sock: sock.bind(('127.0.0.1',0));port=sock.getsockname()[1]
    server=(repo/'nginx.conf.template').read_text().replace('${PORT}',str(port)).replace('/usr/share/nginx/html',tmp)
    config=root/'nginx.conf';config.write_text(f'user {pwd.getpwuid(os.getuid()).pw_name}; daemon off; master_process off; pid {tmp}/nginx.pid; error_log stderr; events {{}} http {{ access_log off; {server} }}')
    binary=str(Path(sys.argv[1]).resolve());subprocess.run([binary,'-t','-p',tmp+'/', '-c',str(config)],check=True)
    proc=subprocess.Popen([binary,'-p',tmp+'/', '-c',str(config)],stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    opener=urllib.request.build_opener(urllib.request.ProxyHandler({}),NoRedirect())
    def request(path,host=None):
        req=urllib.request.Request(f'http://127.0.0.1:{port}'+path,headers={'Host':host or 'getgummygains.com'})
        try:
            with opener.open(req,timeout=2) as r:return r.status,r.headers.get('Location')
        except urllib.error.HTTPError as e:return e.code,e.headers.get('Location')
    try:
        for _ in range(30):
            try:request('/');break
            except urllib.error.URLError:
                if proc.poll() is not None:raise RuntimeError(proc.stderr.read().decode())
                time.sleep(.1)
        cases=[('/',200,None),('/?utm_source=chatgpt.com',200,None),('/index.html',301,'/'),('/index.html?utm_source=chatgpt.com',301,'/?utm_source=chatgpt.com'),('/guide.html',301,'/guide'),('/guide.html?utm_source=chatgpt.com&x=a%2Fb',301,'/guide?utm_source=chatgpt.com&x=a%2Fb'),('/guide?utm_source=chatgpt.com',200,None),('/create-creatine-monohydrate-gummies-review?utm_source=chatgpt.com',301,'/create-creatine-gummies-review?utm_source=chatgpt.com'),('/absent',404,None),('/?next=/guide.html',200,None)]
        for path,code,location in cases:
            actual=request(path);assert actual==(code,location),(path,actual);print('PASS',path,actual)
        actual=request('/guide.html?utm_source=chatgpt.com','www.getgummygains.com')
        assert actual==(301,'https://getgummygains.com/guide.html?utm_source=chatgpt.com'),actual
        print('PASS www host preserves path and query; 11 scenarios passed')
    finally:
        proc.terminate();proc.communicate(timeout=5)
